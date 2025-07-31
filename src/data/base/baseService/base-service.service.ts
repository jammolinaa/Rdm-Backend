import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verbose } from 'src/data/verbose/verbose';
import {
  DeepPartial,
  Repository,
  FindOptionsWhere,
  FindOneOptions,
  FindManyOptions,
  DeleteResult,
  EntityManager,
  EntityTarget,
  ObjectLiteral,
} from 'typeorm';

/**
 * Servicio base genérico que proporciona operaciones CRUD comunes para cualquier entidad de TypeORM.
 * @template EntityRepo - Entidad principal.
 * @template CreateDto - DTO para creación.
 * @template UpdateDto - DTO para actualización.
 * @template PartialDto - DTO parcial (por defecto es Partial<EntityRepo>).
 */
export abstract class BaseService<EntityRepo extends ObjectLiteral, CreateDto, UpdateDto, PartialDto = Partial<EntityRepo>> {
  verbose: Verbose;

  constructor(
    @InjectRepository(Object) private readonly entityRepository: Repository<EntityRepo>,
    nameInVerbose: string,
    private relations?: string[],
  ) {
    this.verbose = new Verbose(nameInVerbose);
  }

  // Método abstracto que cada servicio debe implementar
  abstract create(item: CreateDto): Promise<EntityRepo>;

  async update(id: number, item: UpdateDto) {
    const primaryKey = this.getPrimaryKeyName();
    const itemFound = await this.entityRepository.findOne({
      where: { [primaryKey]: id } as FindOptionsWhere<EntityRepo>,
    });

    if (!itemFound) throw new HttpException(...this.verbose.notFound());

    const updatedData: Record<string, boolean> = {};
    for (const key of Object.keys(itemFound)) {
      if ((item as Record<string, unknown>).hasOwnProperty(key)) {
        updatedData[key] = itemFound[key as keyof EntityRepo] !== (item[key as keyof UpdateDto] as unknown);
      }
    }

    const updatedItem = Object.assign(itemFound, item);
    if (Object.values(updatedData).every((v) => !v)) {
      throw new HttpException(...this.verbose.dataIsSame());
    }

    return {
      item: await this.entityRepository.save(updatedItem),
      updatedData,
    };
  }

  async remove(id: number) {
    const primaryKey = this.getPrimaryKeyName();
    const result = await this.entityRepository.delete({
      [primaryKey]: id,
    } as FindOptionsWhere<EntityRepo>);

    if (!result.affected) throw new HttpException(...this.verbose.notFound());

    return result;
  }

  async findAll(items?: Partial<EntityRepo>[] | PartialDto[]) {
    const options: FindManyOptions<EntityRepo> = {
      relations: this.relations,
    };

    if (items) {
      options.where = items as FindOptionsWhere<EntityRepo>[];
    }

    return await this.entityRepository.find(options);
  }

  async findOne(id: number) {
    const primaryKey = this.getPrimaryKeyName();
    const item = await this.entityRepository.findOne({
      where: { [primaryKey]: id } as FindOptionsWhere<EntityRepo>,
      relations: this.relations,
    });

    if (!item) throw new HttpException(...this.verbose.notFound());

    return item;
  }

  async findOneBy(item: Partial<EntityRepo> | number | PartialDto) {
    return this.whereOptionIfExistsRelations(item);
  }

  private async whereOptionIfExistsRelations(param: Partial<EntityRepo> | number | PartialDto) {
    const primaryKey = this.getPrimaryKeyName();

    const whereClause =
      typeof param === 'number'
        ? ({ [primaryKey]: param } as FindOptionsWhere<Partial<EntityRepo>>)
        : (param as FindOptionsWhere<Partial<EntityRepo>>);

    return await this.entityRepository.findOne({
      where: whereClause,
      relations: this.relations,
    });
  }

  /**
   * Obtiene el nombre de la clave primaria de la entidad.
   */
  private getPrimaryKeyName(): string {
    return this.entityRepository.metadata.primaryColumns[0].propertyName;
  }

  /**
   * Ejecuta operaciones personalizadas con EntityManager.
   */
  async executeQueryRunnerOperation<T>(
    queryRunner: EntityManager,
    entity: EntityTarget<T>,
    methodName: keyof EntityManager,
    options?: EntityManagerOptions<typeof methodName, T>,
  ): Promise<EntityManagerReturnType<typeof methodName, T>> {
    if (typeof queryRunner[methodName] !== 'function') {
      throw new Error(`Método ${methodName} no soportado en el manager`);
    }
    return await (queryRunner[methodName] as any)(entity, options);
  }
}

/**
 * Tipos auxiliares para trabajar con EntityManager.
 */
type EntityManagerOptions<T extends keyof EntityManager, E> = T extends 'find' | 'findAndCount'
  ? FindManyOptions<E>
  : T extends 'findOne'
    ? FindOneOptions<E>
    : T extends 'save' | 'insert'
      ? DeepPartial<E>
      : T extends 'update'
        ? DeepPartial<E> & FindOneOptions<T>
        : T extends 'delete'
          ? string | string[] | number | number[] | Date | Date[] | any
          : T extends 'remove'
            ? E | E[]
            : T extends 'query'
              ? any[]
              : never;

type EntityManagerReturnType<T extends keyof EntityManager, E> = T extends 'find' | 'findAndCount'
  ? Promise<[Array<E>, number]>
  : T extends 'findOne'
    ? Promise<E | null>
    : T extends 'save'
      ? Promise<E>
      : T extends 'delete'
        ? Promise<DeleteResult>
        : T;

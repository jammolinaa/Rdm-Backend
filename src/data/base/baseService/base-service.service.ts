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
 * Permite la reutilización de lógica y facilita la extensión para servicios específicos.
 *
 * @template EntityRepo - Entidad principal que extiende BaseEntity.
 * @template CreateDto - DTO para creación, debe ser DeepPartial de la entidad.
 * @template UpdateDto - DTO para actualización.
 * @template PartialDto - DTO parcial, por defecto Partial<EntityRepo>.
 */
export abstract class BaseService<EntityRepo extends ObjectLiteral, CreateDto, UpdateDto, PartialDto = Partial<EntityRepo>> {
  verbose: Verbose;
  /**
   * Crea una instancia del servicio base.
   * @param entityRepository Repositorio de TypeORM para la entidad.
   * @param nameInVerbose Nombre de la entidad para mensajes de Verbose.
   * @param relations (Opcional) Relaciones a incluir en las consultas.
   */
  constructor(
    @InjectRepository(Object) private readonly entityRepository: Repository<EntityRepo>,
    nameInVerbose: string,
    private relations?: string[],
  ) {
    this.verbose = new Verbose(nameInVerbose);
  }

  /**
   * Crea una nueva entidad en la base de datos.
   * @param item DTO de creación.
   * @returns La entidad creada.
   */
  abstract create(item: CreateDto): Promise<EntityRepo>;

  /**
   * Actualiza una entidad existente en la base de datos.
   * Se ha modificado para usar la clave primaria dinámica.
   * @param id ID de la entidad a actualizar.
   * @param item DTO de actualización.
   * @returns La entidad actualizada y un objeto con los campos actualizados.
   */
  async update(id: number, item: UpdateDto) {
    // Obtiene el nombre de la clave primaria de la metadata de la entidad
    const primaryKey = this.getPrimaryKeyName();

    const itemFound = await this.entityRepository.findOne({
      where: { [primaryKey]: id } as FindOptionsWhere<EntityRepo>, // Usa la clave primaria dinámica
    });

    if (!itemFound) {
      throw new HttpException(...this.verbose.notFound());
    }

    const updatedData: Record<string, boolean> = {};
    for (const key of Object.keys(itemFound)) {
      if ((item as Record<string, unknown>).hasOwnProperty(key)) {
        updatedData[key] = itemFound[key as keyof EntityRepo] !== (item[key as keyof UpdateDto] as unknown);
      }
    }

    const updatedItem = Object.assign(itemFound, item);
    if (Object.values(updatedData).every((value) => !value)) {
      throw new HttpException(...this.verbose.dataIsSame());
    }

    return {
      item: await this.entityRepository.save(updatedItem),
      updatedData,
    };
  }

  /**
   * Elimina una entidad por su ID.
   * Se ha modificado para usar la clave primaria dinámica.
   * @param id ID de la entidad a eliminar.
   * @returns Resultado de la operación de eliminación.
   * @throws HttpException si la entidad no fue encontrada.
   */
  async remove(id: number) {
    // Obtiene el nombre de la clave primaria de la metadata de la entidad
    const primaryKey = this.getPrimaryKeyName();

    const result = await this.entityRepository.delete({
      [primaryKey]: id, // Usa la clave primaria dinámica
    } as FindOptionsWhere<EntityRepo>);

    if (!result.affected) {
      throw new HttpException(...this.verbose.notFound());
    }

    return result;
  }

  /**
   * Busca todas las entidades, con opción a filtrar por condiciones.
   * Se ha refactorizado la lógica de construcción de las opciones de búsqueda.
   * @param items (Opcional) Condiciones de búsqueda.
   * @returns Lista de entidades encontradas.
   */
  async findAll(items?: Partial<EntityRepo>[] | PartialDto[]) {
    const relationsItems = this.relations;
    const options: FindManyOptions<EntityRepo> = {
      // Objeto de opciones unificado
      relations: relationsItems,
    };

    if (items) {
      options.where = items as FindOptionsWhere<EntityRepo>[]; // Aplica el filtro 'where' si existen items
    }

    // Realiza la búsqueda con las opciones construidas
    return await this.entityRepository.find(options);
  }

  /**
   * Busca una entidad por su ID.
   * Se ha modificado para usar la clave primaria dinámica.
   * @param id ID de la entidad a buscar.
   * @returns La entidad encontrada.
   * @throws HttpException si la entidad no fue encontrada.
   */
  async findOne(id: number) {
    // Obtiene el nombre de la clave primaria de la metadata de la entidad
    const primaryKey = this.getPrimaryKeyName();
    const relationsItems = this.relations;

    const item = await this.entityRepository.findOne({
      where: { [primaryKey]: id } as FindOptionsWhere<EntityRepo>, // Usa la clave primaria dinámica
      relations: relationsItems,
    });

    if (!item) {
      throw new HttpException(...this.verbose.notFound());
    }

    return item;
  }

  /**
   * Busca una entidad por un campo específico o un DTO parcial.
   * @param item Objeto parcial o ID de la entidad.
   * @returns La entidad encontrada.
   */
  async findOneBy(item: Partial<EntityRepo> | number | PartialDto) {
    return this.whereOptionIfExistsRelations(item);
  }

  /**
   * Busca una entidad por un campo específico o un DTO parcial, incluyendo relaciones si existen.
   * Se ha modificado para usar la clave primaria dinámica.
   * @param param Objeto parcial o ID de la entidad.
   * @returns La entidad encontrada, con relaciones si están definidas.
   */
  private async whereOptionIfExistsRelations(param: Partial<EntityRepo> | number | PartialDto) {
    const relationsItems = this.relations;
    // Obtiene el nombre de la clave primaria de la metadata de la entidad
    const primaryKey = this.getPrimaryKeyName();

    // Construye la cláusula 'where' usando la clave primaria dinámica si el parámetro es un número
    const whereClause =
      typeof param === 'number'
        ? ({ [primaryKey]: param } as FindOptionsWhere<Partial<EntityRepo>>)
        : (param as FindOptionsWhere<Partial<EntityRepo>>);

    return await this.entityRepository.findOne({
      where: whereClause,
      relations: relationsItems,
    });
  }

  /**
   * **Nuevo método**: Obtiene el nombre de la columna de la clave primaria de la entidad.
   * Permite que el servicio sea genérico y no asuma que la clave primaria siempre se llama 'id'.
   * Se basa en la metadata de TypeORM.
   * @returns El nombre de la propiedad de la clave primaria.
   */
  private getPrimaryKeyName(): string {
    // Accede a la metadata del repositorio para encontrar la primera columna primaria
    return this.entityRepository.metadata.primaryColumns[0].propertyName;
  }

  /**
   * Ejecuta una operación personalizada usando un EntityManager y un QueryRunner.
   * @template M Nombre del método de EntityManager.
   * @param queryRunner Instancia de EntityManager.
   * @param entity Entidad objetivo.
   * @param methodName Nombre del método a ejecutar.
   * @param options Opciones específicas del método.
   * @throws Error si el método no es soportado.
   * @returns {Promise<any>} Resultado de la operación.
   */
  async executeQueryRunnerOperation<T>(
    queryRunner: EntityManager,
    entity: EntityTarget<T>,
    methodName: keyof EntityManager,
    options?:   EntityManagerOptions<typeof methodName, T>,
  ): Promise<EntityManagerReturnType<typeof methodName, T>> {
    if (typeof queryRunner[methodName] !== 'function') {
      throw new Error(`Método ${methodName} no soportado en el manager`);
    }
    return await (queryRunner[methodName] as any)(entity, options);
  }
}

/**
 * Tipo auxiliar para definir las opciones de los métodos de EntityManager.
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

/**
 * Tipo auxiliar para definir el tipo de retorno de los métodos de EntityManager.
 */
type EntityManagerReturnType<T extends keyof EntityManager, E> = T extends 'find' | 'findAndCount'
  ? Promise<[Array<E>, number]>
  : T extends 'findOne'
    ? Promise<E | null>
    : T extends 'save'
      ? Promise<E>
      : T extends 'delete'
        ? Promise<DeleteResult>
        : T;

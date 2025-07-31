import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from 'src/data/entities/type/type.entity';
import { SourceModule } from 'src/core/source/source.module'; // 👈 Importa el módulo

@Module({
  imports: [
    TypeOrmModule.forFeature([Type]),
    SourceModule, // 👈 IMPORTA el módulo que provee SourceListener
  ],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}

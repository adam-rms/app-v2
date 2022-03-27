import { Module } from "@nestjs/common";
import { Manufacturers } from "./manufacturers.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Assettypes } from "./asset-types.entity";
import { Instances } from "../instances/instances.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Manufacturers, Assettypes, Instances])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class ManufacturersModule {}

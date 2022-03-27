import { Module } from "@nestjs/common";
import { Instancepositions } from "./instance-positions.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Instances } from "../instances.entity";
import { Signupcodes } from "../signup-codes.entity";
import { Userinstances } from "../user-instances.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Instancepositions,
      Instances,
      Signupcodes,
      Userinstances,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class InstancepositionsModule {}

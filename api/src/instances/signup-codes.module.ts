import { Module } from "@nestjs/common";
import { Signupcodes } from "./signup-codes.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Instances } from "./instances.entity";
import { Instancepositions } from "./permissions/instance-positions.entity";
import { Userinstances } from "./user-instances.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Signupcodes,
      Instances,
      Instancepositions,
      Userinstances,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class SignupcodesModule {}

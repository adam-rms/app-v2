import { Module } from "@nestjs/common";
import { Assetsassignments } from "./assets-assignments.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Assets } from "../assets.entity";
import { Projects } from "../../projects/projects.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Assetsassignments, Assets, Projects])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class AssetsassignmentsModule {}

import { Module } from "@nestjs/common";
import { Projectsvacantroles } from "./projects-vacant-roles.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Projects } from "../projects.entity";
import { Projectsvacantrolesapplications } from "./projects-vacant-roles-applications.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Projectsvacantroles,
      Projects,
      Projectsvacantrolesapplications,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class ProjectsvacantrolesModule {}

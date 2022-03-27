import { Module } from "@nestjs/common";
import { Projectsvacantrolesapplications } from "./projects-vacant-roles-applications.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../../auth/users/users.entity";
import { Projectsvacantroles } from "./projects-vacant-roles.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Projectsvacantrolesapplications,
      Users,
      Projectsvacantroles,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class ProjectsvacantrolesapplicationsModule {}

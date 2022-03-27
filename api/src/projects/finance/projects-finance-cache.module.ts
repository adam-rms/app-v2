import { Module } from "@nestjs/common";
import { Projectsfinancecache } from "./projects-finance-cache.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Projects } from "../projects.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Projectsfinancecache, Projects])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class ProjectsfinancecacheModule {}

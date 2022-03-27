import { Module } from "@nestjs/common";
import { Locations } from "./locations.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Assets } from "../assets/assets.entity";
import { Clients } from "../clients/clients.entity";
import { Instances } from "../instances/instances.entity";
import { Projects } from "../projects/projects.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Locations, Assets, Clients, Instances, Projects]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class LocationsModule {}

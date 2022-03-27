import { Module } from "@nestjs/common";
import { Clients } from "./clients.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Instances } from "../instances/instances.entity";
import { Locations } from "../locations/locations.entity";
import { Projects } from "../projects/projects.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Clients, Instances, Locations, Projects]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class ClientsModule {}

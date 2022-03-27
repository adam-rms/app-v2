import { Module } from "@nestjs/common";
import { Clients } from "./clients.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Instances } from "../instances/instances.entity";
import { Locations } from "../locations/locations.entity";
import { Projects } from "../projects/projects.entity";
import { ClientsController } from "./clients.controller";
import { ClientsService } from "./clients.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Clients, Instances, Locations, Projects]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [TypeOrmModule],
})
export class ClientsModule {}

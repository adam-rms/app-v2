import { Module } from "@nestjs/common";
import { Maintenancejobsstatuses } from "./maintenance-jobs-statuses.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Instances } from "../instances/instances.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Maintenancejobsstatuses, Instances])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class MaintenancejobsstatusesModule {}

import { Module } from "@nestjs/common";
import { Assetgroups } from "./asset-groups.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Instances } from "../../instances/instances.entity";
import { Users } from "../../auth/users/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Assetgroups, Instances, Users])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class AssetgroupsModule {}

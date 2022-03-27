import { Module } from "@nestjs/common";
import { Assets } from "./assets.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Assettypes } from "./asset-types.entity";
import { Assetsassignments } from "./assignments/assets-assignments.entity";
import { Assetsbarcodesscans } from "./barcodes/assets-barcodes-scans.entity";
import { Assetsbarcodes } from "./barcodes/assets-barcodes.entity";
import { Instances } from "../instances/instances.entity";
import { Locations } from "../locations/locations.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Assets,
      Assettypes,
      Assetsassignments,
      Assetsbarcodesscans,
      Assetsbarcodes,
      Instances,
      Locations,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class AssetsModule {}

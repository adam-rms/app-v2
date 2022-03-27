import { Module } from "@nestjs/common";
import { Assetsbarcodes } from "./assets-barcodes.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Assets } from "../assets.entity";
import { Assetsbarcodesscans } from "./assets-barcodes-scans.entity";
import { Users } from "../../auth/users/users.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Assetsbarcodes,
      Assets,
      Assetsbarcodesscans,
      Users,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class AssetsbarcodesModule {}

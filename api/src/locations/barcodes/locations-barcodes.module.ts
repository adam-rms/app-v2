import { Module } from "@nestjs/common";
import { Locationsbarcodes } from "./locations-barcodes.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Assetsbarcodesscans } from "../../assets/barcodes/assets-barcodes-scans.entity";
import { Users } from "../../auth/users/users.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Locationsbarcodes, Assetsbarcodesscans, Users]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class LocationsbarcodesModule {}

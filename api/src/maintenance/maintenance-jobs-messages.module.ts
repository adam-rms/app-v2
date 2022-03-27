import { Module } from "@nestjs/common";
import { Maintenancejobsmessages } from "./maintenance-jobs-messages.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { S3files } from "../files/s3-files.entity";
import { Maintenancejobs } from "./maintenance-jobs.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Maintenancejobsmessages,
      S3files,
      Maintenancejobs,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class MaintenancejobsmessagesModule {}

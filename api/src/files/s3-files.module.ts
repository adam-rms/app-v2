import { Module } from "@nestjs/common";
import { S3files } from "./s3-files.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../auth/users/users.entity";
import { Instances } from "../instances/instances.entity";
import { Maintenancejobsmessages } from "../maintenance/maintenance-jobs-messages.entity";
import { Modules } from "../training/modules.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      S3files,
      Users,
      Instances,
      Maintenancejobsmessages,
      Modules,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class S3filesModule {}

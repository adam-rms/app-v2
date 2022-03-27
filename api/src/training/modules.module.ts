import { Module } from "@nestjs/common";
import { Modules } from "./modules.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../auth/users/users.entity";
import { S3files } from "../files/s3-files.entity";
import { Instances } from "../instances/instances.entity";
import { Usermodulescertifications } from "./user-modules-certifications.entity";
import { Modulessteps } from "./modules-steps.entity";
import { Usermodules } from "./user-modules.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Modules,
      Users,
      S3files,
      Instances,
      Usermodulescertifications,
      Modulessteps,
      Usermodules,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class ModulesModule {}

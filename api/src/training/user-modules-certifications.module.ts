import { Module } from "@nestjs/common";
import { Usermodulescertifications } from "./user-modules-certifications.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../auth/users/users.entity";
import { Modules } from "./modules.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Usermodulescertifications, Users, Modules]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class UsermodulescertificationsModule {}

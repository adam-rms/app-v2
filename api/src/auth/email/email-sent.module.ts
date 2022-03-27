import { Module } from "@nestjs/common";
import { Emailsent } from "./email-sent.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../users/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Emailsent, Users])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class EmailsentModule {}

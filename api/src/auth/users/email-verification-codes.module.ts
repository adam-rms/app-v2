import { Module } from "@nestjs/common";
import { Emailverificationcodes } from "./email-verification-codes.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Emailverificationcodes, Users])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class EmailverificationcodesModule {}

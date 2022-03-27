import { Module } from "@nestjs/common";
import { Auditlog } from "./audit-log.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Auditlog, Users])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class AuditlogModule {}

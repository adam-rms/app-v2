import { Module } from "@nestjs/common";
import { Cmspagesdrafts } from "./cms-pages-drafts.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../auth/users/users.entity";
import { Cmspages } from "./cms-pages.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cmspagesdrafts, Users, Cmspages])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class CmspagesdraftsModule {}

import { Module } from "@nestjs/common";
import { Instanceactions } from "./instance-actions.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Instanceactionscategories } from "./instance-actions-categories.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Instanceactions, Instanceactionscategories]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class InstanceactionsModule {}

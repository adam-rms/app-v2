import { Module } from "@nestjs/common";
import { Actions } from "./actions.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Actionscategories } from "./actions-categories.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Actions, Actionscategories])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class ActionsModule {}

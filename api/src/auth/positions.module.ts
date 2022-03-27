import { Module } from "@nestjs/common";
import { Positions } from "./positions.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Userpositions } from "./user-positions.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Positions, Userpositions])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class PositionsModule {}

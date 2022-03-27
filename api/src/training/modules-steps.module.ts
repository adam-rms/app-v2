import { Module } from "@nestjs/common";
import { Modulessteps } from "./modules-steps.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Modules } from "./modules.entity";
import { Usermodules } from "./user-modules.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Modulessteps, Modules, Usermodules])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class ModulesstepsModule {}

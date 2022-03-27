import { Module } from "@nestjs/common";
import { Loginattempts } from "./login-attempts.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Loginattempts])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class LoginattemptsModule {}

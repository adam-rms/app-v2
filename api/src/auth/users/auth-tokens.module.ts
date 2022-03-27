import {Module} from "@nestjs/common";
import { Authtokens } from "./auth-tokens.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Authtokens,
			Users,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class AuthtokensModule {}
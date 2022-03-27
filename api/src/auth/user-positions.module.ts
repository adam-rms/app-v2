import {Module} from "@nestjs/common";
import { Userpositions } from "./user-positions.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Positions } from './positions.entity';
import { Users } from './users/users.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Userpositions,
			Positions,
			Users,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class UserpositionsModule {}
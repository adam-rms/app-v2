import {Module} from "@nestjs/common";
import { Userinstances } from "./user-instances.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../auth/users/users.entity';
import { Instancepositions } from './permissions/instance-positions.entity';
import { Signupcodes } from './signup-codes.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Userinstances,
			Users,
			Instancepositions,
			Signupcodes,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class UserinstancesModule {}
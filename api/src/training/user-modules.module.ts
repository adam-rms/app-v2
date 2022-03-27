import {Module} from "@nestjs/common";
import { Usermodules } from "./user-modules.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../auth/users/users.entity';
import { Modulessteps } from './modules-steps.entity';
import { Modules } from './modules.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Usermodules,
			Users,
			Modulessteps,
			Modules,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class UsermodulesModule {}
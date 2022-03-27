import {Module} from "@nestjs/common";
import { Maintenancejobs } from "./maintenance-jobs.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../auth/users/users.entity';
import { Maintenancejobsmessages } from './maintenance-jobs-messages.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Maintenancejobs,
			Users,
			Maintenancejobsmessages,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class MaintenancejobsModule {}
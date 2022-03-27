import {Module} from "@nestjs/common";
import { Crewassignments } from "./crew-assignments.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../auth/users/users.entity';
import { Projects } from '../projects.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Crewassignments,
			Users,
			Projects,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class CrewassignmentsModule {}
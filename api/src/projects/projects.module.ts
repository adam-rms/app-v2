import {Module} from "@nestjs/common";
import { Projects } from "./projects.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assetsassignments } from '../assets/assignments/assets-assignments.entity';
import { Users } from '../auth/users/users.entity';
import { Clients } from '../clients/clients.entity';
import { Instances } from '../instances/instances.entity';
import { Locations } from '../locations/locations.entity';
import { Crewassignments } from './crew/crew-assignments.entity';
import { Projectsvacantroles } from './crew/projects-vacant-roles.entity';
import { Payments } from './finance/payments.entity';
import { Projectsfinancecache } from './finance/projects-finance-cache.entity';
import { Projectsnotes } from './projects-notes.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Projects,
			Assetsassignments,
			Users,
			Clients,
			Instances,
			Locations,
			Crewassignments,
			Projectsvacantroles,
			Payments,
			Projectsfinancecache,
			Projectsnotes,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class ProjectsModule {}
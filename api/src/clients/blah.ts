import {Module} from "@nestjs/common";
import { Clients } from "./clients.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import {ClientsService} from "./clients.service";
import {ClientsController} from "./clients.controller";
// import { Instances } from '../instances/instances.entity';
import { Locations } from '../locations/locations.entity';
// import { Projects } from '../projects/projects.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Clients,
			// Instances,
			Locations,
			// Projects,

		])
	],
	controllers: [ClientsController],
	providers: [ClientsService],
	exports: [TypeOrmModule]
})
export class Blah {}

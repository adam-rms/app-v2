import {Module} from "@nestjs/common";
import { Instances } from "./instances.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assettypes } from '../assets/asset-types.entity';
import { Assets } from '../assets/assets.entity';
import { Assetsassignmentsstatus } from '../assets/assignments/assets-assignments-status.entity';
import { Assetcategories } from '../assets/categories/asset-categories.entity';
import { Assetgroups } from '../assets/groups/asset-groups.entity';
import { Manufacturers } from '../assets/manufacturers.entity';
import { Clients } from '../clients/clients.entity';
import { Cmspages } from '../cms/cms-pages.entity';
import { S3files } from '../files/s3-files.entity';
import { Instancepositions } from './permissions/instance-positions.entity';
import { Locations } from '../locations/locations.entity';
import { Maintenancejobsstatuses } from '../maintenance/maintenance-jobs-statuses.entity';
import { Projectstypes } from '../projects/projects-types.entity';
import { Projects } from '../projects/projects.entity';
import { Modules } from '../training/modules.entity';
import { Signupcodes } from './signup-codes.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Instances,
			Assettypes,
			Assets,
			Assetsassignmentsstatus,
			Assetcategories,
			Assetgroups,
			Manufacturers,
			Clients,
			Cmspages,
			S3files,
			Instancepositions,
			Locations,
			Maintenancejobsstatuses,
			Projectstypes,
			Projects,
			Modules,
			Signupcodes,

		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class InstancesModule {}

import {Module} from "@nestjs/common";
import { Cmspages } from "./cms-pages.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instances } from '../instances/instances.entity';
import { Cmspagesdrafts } from './cms-pages-drafts.entity';
import { Cmspagesviews } from './cms-pages-views.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Cmspages,
			Instances,
			Cmspagesdrafts,
			Cmspagesviews,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class CmspagesModule {}
import {Module} from "@nestjs/common";
import { Assettypes } from "./asset-types.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assetcategories } from './categories/asset-categories.entity';
import { Assets } from './assets.entity';
import { Instances } from '../instances/instances.entity';
import { Manufacturers } from './manufacturers.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Assettypes,
			Assetcategories,
			Assets,
			Instances,
			Manufacturers,

		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class AssettypesModule {}

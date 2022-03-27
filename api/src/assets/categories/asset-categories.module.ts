import {Module} from "@nestjs/common";
import { Assetcategories } from "./asset-categories.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instances } from '../../instances/instances.entity';
import { Assetcategoriesgroups } from './asset-categories-groups.entity';
import { Assettypes } from '../asset-types.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Assetcategories,
			Instances,
			Assetcategoriesgroups,
			Assettypes,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class AssetcategoriesModule {}
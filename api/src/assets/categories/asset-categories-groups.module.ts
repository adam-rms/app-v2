import {Module} from "@nestjs/common";
import { Assetcategoriesgroups } from "./asset-categories-groups.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assetcategories } from './asset-categories.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Assetcategoriesgroups,
			Assetcategories,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class AssetcategoriesgroupsModule {}
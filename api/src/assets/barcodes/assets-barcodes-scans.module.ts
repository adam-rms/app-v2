import {Module} from "@nestjs/common";
import { Assetsbarcodesscans } from "./assets-barcodes-scans.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assets } from '../assets.entity';
import { Assetsbarcodes } from './assets-barcodes.entity';
import { Locationsbarcodes } from '../../locations/barcodes/locations-barcodes.entity';
import { Users } from '../../auth/users/users.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Assetsbarcodesscans,
			Assets,
			Assetsbarcodes,
			Locationsbarcodes,
			Users,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class AssetsbarcodesscansModule {}
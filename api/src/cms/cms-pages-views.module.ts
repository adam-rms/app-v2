import {Module} from "@nestjs/common";
import { Cmspagesviews } from "./cms-pages-views.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../auth/users/users.entity';
import { Cmspages } from './cms-pages.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Cmspagesviews,
			Users,
			Cmspages,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class CmspagesviewsModule {}
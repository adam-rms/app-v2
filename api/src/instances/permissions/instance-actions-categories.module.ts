import {Module} from "@nestjs/common";
import { Instanceactionscategories } from "./instance-actions-categories.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instanceactions } from './instance-actions.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Instanceactionscategories,
			Instanceactions,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class InstanceactionscategoriesModule {}
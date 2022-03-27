import {Module} from "@nestjs/common";
import { Actionscategories } from "./actions-categories.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actions } from './actions.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Actionscategories,
			Actions,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class ActionscategoriesModule {}
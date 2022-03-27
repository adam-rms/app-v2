import {Module} from "@nestjs/common";
import { Positionsgroups } from "./positions-groups.entity";
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Positionsgroups,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class PositionsgroupsModule {}
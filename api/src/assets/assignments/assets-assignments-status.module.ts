import {Module} from "@nestjs/common";
import { Assetsassignmentsstatus } from "./assets-assignments-status.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instances } from '../../instances/instances.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Assetsassignmentsstatus,
			Instances,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class AssetsassignmentsstatusModule {}
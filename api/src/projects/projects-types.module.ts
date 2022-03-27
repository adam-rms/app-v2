import {Module} from "@nestjs/common";
import { Projectstypes } from "./projects-types.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instances } from '../instances/instances.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Projectstypes,
			Instances,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class ProjectstypesModule {}
import {Module} from "@nestjs/common";
import { Projectsnotes } from "./projects-notes.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../auth/users/users.entity';
import { Projects } from './projects.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Projectsnotes,
			Users,
			Projects,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class ProjectsnotesModule {}
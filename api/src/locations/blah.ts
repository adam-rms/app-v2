import {Module} from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import {Locations} from "./locations.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Locations
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class Blah {}

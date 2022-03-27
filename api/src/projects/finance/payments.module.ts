import {Module} from "@nestjs/common";
import { Payments } from "./payments.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from '../projects.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Payments,
			Projects,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class PaymentsModule {}
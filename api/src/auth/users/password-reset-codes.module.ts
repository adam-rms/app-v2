import {Module} from "@nestjs/common";
import { Passwordresetcodes } from "./password-reset-codes.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';



@Module({
	imports: [
		TypeOrmModule.forFeature([
			Passwordresetcodes,
			Users,
			
		])
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule]
})
export class PasswordresetcodesModule {}
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import * as joi from "joi";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { AccessTokenGuard } from "./auth/guards/access-token.guard";
import { AuthGuard } from "./auth/guards/auth.guard";
import databaseConfig, { databaseSchema } from "./config/database.config";
import jwtConfig, { jwtSchema } from "./config/jwt.config";
import { UsersModule } from "./users/users.module";
import { SeederModule } from './seeder/seeder.module';
import { GenresModule } from './genres/genres.module';
import { PaginationModule } from './common/pagination/pagination.module';
import { RatingsModule } from './ratings/ratings.module';
import { MoviesModule } from './movies/movies.module';
import { SeatsModule } from './seats/seats.module';
import { TheatersModule } from './theaters/theaters.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: joi.object({
				...databaseSchema,
				...jwtSchema,
			}),
			load: [databaseConfig, jwtConfig],
			envFilePath: ".env",
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>("database.host"),
				dbName: configService.get<string>("database.databaseName"),
			}),
			inject: [ConfigService],
		}),
		UsersModule,
		AuthModule,
		SeederModule,
		GenresModule,
		PaginationModule,
		RatingsModule,
		MoviesModule,
		SeatsModule,
		TheatersModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		AccessTokenGuard,
	],
})
export class AppModule {}

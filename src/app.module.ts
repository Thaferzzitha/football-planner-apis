import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(
          'MONGO_DB_CONNECTION',
          'mongodb://root:root@localhost:27017/nest?authSource=admin',
        ),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      /* { name: Dimension.name, schema: DimensionSchema }, */
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PhishingSimulationModule } from './phishing/phishing.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { validateEnvSchema } from './shared/utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate: validateEnvSchema,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    PhishingSimulationModule,
  ],
})
export class AppModule {}

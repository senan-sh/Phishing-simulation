import { Module } from '@nestjs/common';
import { PhishingSimulationModule } from './phishing/phishing.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { z } from 'zod';

const validateEnvSchema = (config) => {
  const schema = z.object({
    MONGO_URI: z.string().url().nonempty('MONGO_URI is required'),
    EMAIL_HOST: z.string().nonempty('EMAIL_HOST is required'),
    EMAIL_PORT: z
      .string()
      .regex(/^\d+$/, 'EMAIL_PORT must be a valid number')
      .transform(Number)
      .refine((port) => port > 0 && port <= 65535, {
        message: 'EMAIL_PORT must be between 1 and 65535',
      }),
    EMAIL_USER: z.string().email('EMAIL_USER must be a valid email'),
    EMAIL_USER_PASSWORD: z
      .string()
      .min(8, 'EMAIL_USER_PASSWORD must be at least 8 characters long'),
  });

  const result = schema.safeParse(config);

  if (!result.success) {
    const errors = result.error.errors
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join(', ');
    throw new Error(`Config validation error: ${errors}`);
  }

  return result.data;
};
@Module({
  imports: [
    ConfigModule.forRoot({ validate: validateEnvSchema }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    PhishingSimulationModule,
  ],
})
export class AppModule {}

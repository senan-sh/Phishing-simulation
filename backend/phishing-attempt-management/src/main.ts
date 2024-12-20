import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    app.enableCors({
      allowedHeaders: 'Content-type',
      methods: '*',
      credentials: true,
      origin: 'http://localhost:5173',
    });
    const config = new DocumentBuilder()
      .setTitle('Phishing Attempt Mmanagement')
      .setDescription('Phishing attempt management API documentation')
      .setVersion('1.0')
      .addBearerAuth({ type: 'http' })
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
  }

  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

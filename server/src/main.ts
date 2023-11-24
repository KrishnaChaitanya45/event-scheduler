import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from './trpc/trpc.router';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  // const trpc = app.get(TrpcRouter);
  // trpc.applyMiddleware(app);
  await app.listen(5000);
}
bootstrap();

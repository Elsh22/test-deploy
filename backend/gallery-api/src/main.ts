import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import { securityHeaders } from './security-http';

async function bootstrap() {
  const port = Number(process.env.PORT ?? 4000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.use(securityHeaders);
  app.use(json({ limit: '32kb', strict: true }));
  app.enableShutdownHooks();
  try {
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.listen(port, '127.0.0.1');
  } catch (error: unknown) {
    await app.close();
    throw error;
  }
  console.log(`DMC Gallery API: http://127.0.0.1:${port}/health`);
}

bootstrap().catch((error: unknown) => {
  const code = (error as NodeJS.ErrnoException | undefined)?.code;
  console.error(
    code === 'EADDRINUSE'
      ? 'Port is already in use. Stop the existing Gallery API before restarting; see README.md.'
      : 'Gallery API failed to start. Check PORT, DATABASE_URL, and database availability.',
  );
  process.exitCode = 1;
});

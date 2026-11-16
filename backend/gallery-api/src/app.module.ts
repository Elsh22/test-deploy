import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AlbumsModule } from './albums/albums.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UploadsModule } from './uploads/uploads.module';
import { APP_FILTER } from '@nestjs/core';
import { SecurityExceptionFilter } from './security-http';

@Module({
  imports: [PrismaModule, AlbumsModule, AuthModule, AdminModule, UploadsModule],
  controllers: [AppController],
  providers: [{ provide: APP_FILTER, useClass: SecurityExceptionFilter }],
})
export class AppModule {}

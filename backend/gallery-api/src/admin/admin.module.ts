import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminAlbumsController } from './admin-albums.controller';
import { AdminAlbumsService } from './admin-albums.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PublicationStorageService } from './publication-storage.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AdminController, AdminAlbumsController],
  providers: [AdminAlbumsService, PublicationStorageService, JwtAuthGuard, RolesGuard],
})
export class AdminModule {}

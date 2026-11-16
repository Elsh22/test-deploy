
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SecurityService } from './security.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.getOrThrow<string>('JWT_ACCESS_SECRET');
        if (Buffer.byteLength(secret) < 32) throw new Error('JWT_ACCESS_SECRET must contain at least 32 bytes.');
        return {
          secret,
          signOptions: {
            algorithm: 'HS256',
            expiresIn: '15m',
            issuer: 'dmc-gallery-api',
            audience: 'dmc-gallery-admin',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SecurityService],
  exports: [AuthService, JwtModule, SecurityService],
})
export class AuthModule {}

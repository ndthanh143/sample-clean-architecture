import { Module } from '@nestjs/common';
import { GoogleAuthService } from './googleAuth.service';

@Module({
  providers: [GoogleAuthService],
  exports: [GoogleAuthService],
})
export class GoogleAuthModule {}

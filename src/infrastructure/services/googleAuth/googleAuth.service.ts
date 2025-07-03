import { IGoogleAuthService } from '@/domain/adapters/googleAuth.service';
import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthService implements IGoogleAuthService {
  private client = new OAuth2Client(
    '164572563225-jk4q110403tm9seok8fu1bsnpkbfqrbj.apps.googleusercontent.com',
  );

  async verifyIDToken(idToken: string) {
    console.log('🚀 ~ GoogleAuthService ~ verifyIDToken ~ idToken:', idToken);
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: '164572563225-jk4q110403tm9seok8fu1bsnpkbfqrbj.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();

    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      email_verified: payload.email_verified,
      sub: payload.sub,
    };
  }
}

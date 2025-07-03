export interface IGoogleAuthService {
  verifyIDToken(idToken: string): Promise<{
    email: string;
    name: string;
    picture: string;
    email_verified: boolean;
    sub: string;
  }>;
}

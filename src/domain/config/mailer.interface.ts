export interface MailerConfig {
  getMailerHost(): string;
  getMailerPort(): number;
  getMailerUser(): string;
  getMailerPass(): string;
  getMailerFrom(): string;
  getMailerFromName(): string;
}

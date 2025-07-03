import { IMailerService } from '@/domain/adapters/mailer.interface';
import { ILogger } from '@/domain/logger/logger.interface';

interface SendEmailTemplatePayload {
  to: string;
  subject: string;
  template: string; // e.g., 'password-updated'
  context: {
    name: string;
    link?: string;
    [key: string]: any;
  };
}

export class SendEmailTemplateUseCases {
  constructor(
    private readonly mailerService: IMailerService,
    private readonly logger: ILogger,
  ) {}

  async execute(payload: SendEmailTemplatePayload): Promise<void> {
    const { to, subject, template, context } = payload;

    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
    });

    this.logger.log(
      'SendEmailTemplateUseCases execute',
      `Email sent to ${to} with subject "${subject}" using template "${template}"`,
    );
  }
}

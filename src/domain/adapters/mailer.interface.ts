export interface IJwtServicePayload {
  id: number;
  email: string;
}

export interface IMailerService {
  sendMail(options: {
    to: string | string[];
    subject: string;
    template?: string; // if using template engine
    context?: Record<string, any>; // template variables
    html?: string; // optional: direct HTML body
    text?: string; // optional: fallback text
    cc?: string | string[];
    bcc?: string | string[];
    replyTo?: string;
    headers?: Record<string, string>;
    from?: string;
  }): Promise<void>;
}

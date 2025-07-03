import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { IMailerService } from '@/domain/adapters/mailer.interface';
import { OrderItemM } from '@/domain/model/order-item';
import { LoggerService } from '@/infrastructure/logger/logger.service';
import * as path from 'path';

@Injectable()
export class MailerService implements IMailerService {
  constructor(
    private readonly mailer: NestMailerService,
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {}
  async sendForgotPasswordEmail(email: string, resetPasswordLink: string) {
    return this.sendMail({
      to: email,
      subject: 'VNShop - Yêu cầu thay đổi mật khẩu',
      template: 'forgot-password',
      context: {
        resetPasswordLink,
      },
    });
  }
  // Function gửi email xác nhận đơn hàng bị hủy do chưa thanh toán
  async sendOrderCancelledDueToNoPayment(
    email: string,
    orderCode: string,
    productName: string,
    cancellationDate: string,
  ) {
    return this.sendMail({
      to: email,
      subject: `VNShop - Đơn hàng #${orderCode} đã bị hủy do chưa thanh toán`,
      template: 'order-cancelled-no-payment',
      context: {
        orderCode,
        productName,
        cancellationDate,
      },
    });
  }

  // Function gửi email thông báo tài khoản sắp hết hạn sử dụng
  async sendAccountExpiryReminder(
    email: string,
    name: string,
    accountEmail: string,
    expiryDate: string,
    productName: string,
    link: string,
  ) {
    return this.sendMail({
      to: email,
      subject: `VNShop - Tài khoản của bạn sắp hết hạn sử dụng`,
      template: 'account-expiry-reminder',
      context: {
        name,
        accountEmail,
        expiryDate,
        productName,
        link,
      },
    });
  }

  // Function gửi email khi mật khẩu tài khoản được cập nhật
  async sendMailWhenAccountPasswordUpdated(
    email: string,
    name: string,
    accountEmail: string,
    newPassword: string,
    productName: string,
    link: string,
  ) {
    return this.sendMail({
      to: email,
      subject: 'VNShop - Mật khẩu tài khoản đã được cập nhật',
      template: 'account-updated',
      context: {
        name,
        accountEmail,
        newPassword,
        productName,
        link,
      },
    });
  }

  // Function gửi email xác nhận đơn hàng
  async sendOrderConfirmation(
    userName: string,
    email: string,
    orderCode: number,
    orderDate: string,
    orderItems: OrderItemM[],
    totalAmount: number,
    paymentMethod: string,
    trackingLink: string,
  ) {
    this.logger.log('Mailer: sendOrderConfirmation execution', 'sending...');
    return this.mailer.sendMail({
      to: 'nguyenduythanh421.tna@gmail.com',
      subject: `Đơn hàng #${orderCode} đã được xác nhận`,
      template: 'order-confirmation',
      context: {
        userName,
        orderId: orderCode,
        orderDate,
        orderItems,
        totalAmount,
        paymentMethod,
        trackingLink,
      },
    });
  }

  async sendMail(options: {
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
  }) {
    console.log('options', options);
    const { to, subject, template, context, html, text, cc, bcc, replyTo, headers, from } = options;
    console.log('🚀 ~ MailerService ~ template:', template);

    const defaultFrom =
      from || this.configService.get<string>('MAIL_FROM') || 'no-reply@example.com';

    const mailOptions: ISendMailOptions = {
      to,
      from: defaultFrom,
      subject,
      cc,
      bcc,
      replyTo,
      headers,
    };

    if (template) {
      mailOptions.template = template;
      mailOptions.context = context;
    } else {
      // fallback to raw HTML or text
      if (html) mailOptions.html = html;
      if (text) mailOptions.text = text;
    }

    console.log('🚀 ~ MailerService ~ mailOptions:', mailOptions);

    return this.mailer.sendMail(mailOptions);
  }
}

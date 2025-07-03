import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductDetailRepository } from '@/domain/repositories/productDetailRepository.interface';
import { MailerService } from '../../services/mailer/mailer.service';
import { Inject, NotFoundException } from '@nestjs/common';
import { DatabaseProductDetailRepository } from '@/infrastructure/repositories/productDetail.repository';
import { AccountPasswordUpdatedCommand } from '@/domain/events/account-password-updated.command';
import { EnvironmentConfigService } from '@/infrastructure/config/environment-config/environment-config.service';

@CommandHandler(AccountPasswordUpdatedCommand)
export class AccountPasswordUpdatedCommandHandler
  implements ICommandHandler<AccountPasswordUpdatedCommand>
{
  constructor(
    @Inject(DatabaseProductDetailRepository)
    private readonly productDetailRepo: ProductDetailRepository,
    @Inject(MailerService)
    private readonly mailerService: MailerService,
    @Inject(EnvironmentConfigService)
    private readonly configService: EnvironmentConfigService,
  ) {}

  async execute(event: AccountPasswordUpdatedCommand): Promise<void> {
    const productDetail = await this.productDetailRepo.findByIdToSendEmail(event.productDetailId);
    if (!productDetail) {
      throw new NotFoundException('Product detail not found');
    }

    const usersData = productDetail.userProductDetails.map((userProductDetail) => ({
      email: userProductDetail.user.email,
      userName: userProductDetail.user.lastName,
    }));

    const accountEmail = productDetail.email;
    const newPassword = productDetail.password;
    const productName = productDetail.product.name;
    const link = `${this.configService.getClientSiteUrl()}/my-accounts?id=${productDetail.id}`;

    usersData.forEach(async (userData) => {
      await this.mailerService.sendMailWhenAccountPasswordUpdated(
        userData.email,
        userData.userName,
        accountEmail,
        newPassword,
        productName,
        link,
      );
    });
  }
}

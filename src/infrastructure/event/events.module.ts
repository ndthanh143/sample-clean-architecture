// import { Module } from '@nestjs/common';
// import { CqrsModule } from '@nestjs/cqrs';
// import { ProductSubscriber } from './product.subcriber';
// import { OrderConfirmationSubcriber } from './order-confirmation.subcriber';
// import { DatabaseProductDetailRepository } from '../repositories/productDetail.repository';
// import { DatabaseOrderRepository } from '../repositories/order.repository';
// import { DatabaseProductRepository } from '../repositories/product.repository';
// import { MailerService } from '@nestjs-modules/mailer';
// import { OrderConfirmationHandler } from './handlers/order-confirmation.handler';

// @Module({
//   imports: [CqrsModule],
//   providers: [
//     DatabaseProductRepository,
//     DatabaseOrderRepository,
//     {
//       inject: [DatabaseOrderRepository, MailerService],
//       provide: 'OrderConfirmationHandler',
//       useFactory: (orderRepository: DatabaseOrderRepository, mailerService: MailerService) =>
//         new OrderConfirmationHandler(orderRepository, mailerService),
//     },
//   ],
//   exports: [DatabaseProductRepository, DatabaseOrderRepository, ...EventHandlers, ...Subscribers],
// })
// export class EventsModule {}

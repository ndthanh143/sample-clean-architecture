import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { PaymentRepository } from '@/domain/repositories/paymentRepository.interface';
import { Payment } from '../entities/payment.entity';
import { PaymentM } from '@/domain/model/payment';

@Injectable()
export class DatabasePaymentRepository implements PaymentRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly repository: Repository<Payment>,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async findById(id: number): Promise<PaymentM | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return this.mapper.map(entity, Payment, PaymentM);
  }

  async insert(data: PaymentM): Promise<PaymentM> {
    const entity = this.mapper.map(data, PaymentM, Payment);
    entity.paymentCode = await this.generatePaymentCodeFromId(data.order.id);

    const saved = await this.repository.save(entity);

    return this.mapper.map(saved, Payment, PaymentM);
  }

  async update(id: number, data: Partial<PaymentM>): Promise<PaymentM> {
    const existing = await this.repository.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    const updated = this.repository.merge(existing, data);
    const result = await this.repository.save(updated);
    return this.mapper.map(result, Payment, PaymentM);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }

  async generatePaymentCodeFromId(id: number): Promise<string> {
    const paddedId = id.toString().padStart(5, '0').trim();
    return `VNS${paddedId}`;
  }
}

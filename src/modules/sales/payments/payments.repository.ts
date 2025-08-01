import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly repository: Repository<Payment>,
  ) {}

  create(data: Partial<Payment>): Payment {
    return this.repository.create(data);
  }

  async save(payment: Payment): Promise<Payment> {
    return this.repository.save(payment);
  }

  async find(options: FindManyOptions<Payment>): Promise<Payment[]> {
    return this.repository.find(options);
  }

  async findOneBy(criteria: Partial<Payment>): Promise<Payment | null> {
    return this.repository.findOneBy(criteria);
  }
}
import { Module } from '@nestjs/common';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { CustomerController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';

import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  providers: [CustomersService, UsersService],
  controllers: [CustomerController, UsersController],
})
export class UsersModule {}

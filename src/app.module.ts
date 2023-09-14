/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import {HttpModule, HttpService} from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { firstValueFrom } from 'rxjs';

const API_KEY = '123456';
const API_KEY_Prod = 'PROD123456';
@Module({
  imports: [HttpModule, UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_Prod : API_KEY,
    },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        // const request = await http.get('https://jsonplaceholder.typicode.com/todos');
          // .get('https://jsonplaceholder.typicode.com/todos')
          // .toPromise();
          const tasks = await firstValueFrom(http.get('https://jsonplaceholder.typicode.com/todos'));
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}

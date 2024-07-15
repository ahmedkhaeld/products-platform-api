import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import Config from '../config/Configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Config],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: Config().postgres.host,
      port: parseInt(Config().postgres.port),
      username: Config().postgres.user,
      password: Config().postgres.pass,
      database: Config().postgres.db,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

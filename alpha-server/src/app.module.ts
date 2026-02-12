import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CommunicationModule } from './communication/communication.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { NewsPostModule } from './news-post/news-post.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/local', {
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => {
          console.log('📀 Database connected');
        });
        connection.on('disconnected', () => {
          console.warn('📀 Database disconnected');
        });
        connection.on('error', (error) => {
          console.error(`📀 Database connection failed! for error: ${error.message}`);
        });
        return connection;
      },
    }),
    CommunicationModule,
    AuthModule,
    NewsPostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

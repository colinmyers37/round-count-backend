import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirearmsModule } from './firearms/firearms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
config();

if (!process.env.DB_URI) {
  throw new Error('DB_URI environment variable is not defined');
}

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    FirearmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

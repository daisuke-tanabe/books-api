import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { FirebaseService } from '../../shared/firebase/firebase.service';

@Module({
  imports: [],
  controllers: [BooksController],
  providers: [BooksService, FirebaseService],
})
export class BooksModule {}

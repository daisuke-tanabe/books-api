import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { RequestInterceptor } from '../interceptor/request';

@Controller('books')
export class BooksController {
  constructor(private readonly appService: BooksService) {}

  @Get()
  getBooks() {
    return this.appService.getBooks();
  }

  @Get('/:id')
  getBook(@Param('id') id: string) {
    return this.appService.getBookById(id);
  }

  @UseInterceptors(new RequestInterceptor())
  @Post()
  createBook(@Body('title') title: string, @Body('author') author: string) {
    if (!title || !author) {
      throw new HttpException(
        {
          status: 'Bad Request',
          message:
            'Client sent an invalid request, such as lacking required request body or parameter.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    this.appService.createBook(title, author);
  }
}

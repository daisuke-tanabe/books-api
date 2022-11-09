import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  BadRequestException,
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
      throw new BadRequestException();
    }
    this.appService.createBook(title, author);
  }
}

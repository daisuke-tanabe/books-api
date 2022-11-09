import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BooksService } from './books.service';

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

  @Post()
  createBook(@Body('title') title: string, @Body('author') author: string) {
    if (!title || !author) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error:
            'Client sent an invalid request, such as lacking required request body or parameter.',
        },
        400,
      );
    }
    this.appService.createBook(title, author);
  }
}

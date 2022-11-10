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
import { GetBookByIdDto, CreateBooksDto } from './dto/books.dto';
import { RequestInterceptor } from '../../shared/interceptor/request';

@Controller('books')
export class BooksController {
  constructor(private readonly appService: BooksService) {}

  @Get()
  getBooks() {
    return this.appService.getBooks();
  }

  @Get('/:id')
  getBook(@Param() getBookByIdDto: GetBookByIdDto) {
    const { id } = getBookByIdDto;
    return this.appService.getBookById(id);
  }

  @UseInterceptors(new RequestInterceptor())
  @Post()
  createBook(@Body() createBooksDto: CreateBooksDto) {
    const { title, author } = createBooksDto;
    if (!title || !author) {
      throw new BadRequestException();
    }
    this.appService.createBook(title, author);
  }
}

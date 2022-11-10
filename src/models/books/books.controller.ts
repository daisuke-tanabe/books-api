import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseInterceptors,
  BadRequestException,
  DefaultValuePipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { GetBookByIdDto, CreateBooksDto } from './dto/books.dto';
import { RequestInterceptor } from '../../shared/interceptor/request';

@Controller('books')
export class BooksController {
  constructor(private readonly appService: BooksService) {}

  @Get()
  getBooks(
    @Query('limit', new DefaultValuePipe(20)) limit?: number,
    @Query('order', new DefaultValuePipe('desc')) order?: 'desc' | 'asc',
  ) {
    return this.appService.getBooks({ limit, order });
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
    if (!title || typeof author === 'undefined') {
      throw new BadRequestException();
    }
    this.appService.createBook(title, author);
  }
}

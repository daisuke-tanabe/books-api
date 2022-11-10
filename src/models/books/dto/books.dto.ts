import { IsNotEmpty, IsString } from 'class-validator';

export class GetBookByIdDto {
  id: string;
}

export class CreateBooksDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;
}

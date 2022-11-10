import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetBookByIdDto {
  id: string;
}

export class CreateBooksDto {
  @IsNotEmpty()
  @IsString()
  @Length(0, 512)
  title: string;

  @IsString()
  @Length(0, 256)
  author: string;
}

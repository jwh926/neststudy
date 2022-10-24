import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { IsNumber } from 'class-validator/types/decorator/decorators';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
	
}
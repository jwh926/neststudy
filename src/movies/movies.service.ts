import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
	private movies: Movie[] = [];

	getAll(): Movie[] {
		return this.movies;
	}

	getItemById(movieId: number): Movie {
		const movie = this.movies.find((movie) => movie.id === +movieId);
		if (!movie) {
			throw new NotFoundException(`movie with id ${movieId} not found`);
		}
		return movie;
	}

	createItem(movieData: any) {
		this.movies.push({
			id: this.movies.length+1,
			...movieData
		});
		return;
	}

	deleteItemById(movieId: number) {
		this.getItemById(movieId);
		this.movies = this.movies.filter(movie => movie.id !== movieId);
	}

	updateItemById(movieId: number, data: UpdateMovieDto){
		const movie = this.getItemById(movieId);
		this.deleteItemById(movieId);
		this.movies.push({...movie, ...data});
	}
}

import { Injectable } from "@nestjs/common";
import { Movie } from "./entities/movie.entity";

@Injectable()
export class MoviesService {
	private movies: Movie[] = [];

	getAll(): Movie[] {
		return this.movies;
	}

	getItemById(id: string): Movie {
		return this.movies.find((movie) => movie.id === +id);
	}

	deleteItemById(id: string) {
		this.movies.filter((movie) => movie.id !== +id);
		return true;
	}

	createItem(data) {
		this.movies.push({
			id: this.movies.length + 1,
			...data,
		});
	}
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { Movie } from "./entities/movie.entity";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Get()
	getAll(): Movie[] {
		return this.moviesService.getAll();
	}

	@Get("search")
	searchMovie(@Query("year") y) {
		return y;
	}

	@Get(":id")
	getItemById(@Param("id") movieId: string): Movie {
		return this.moviesService.getItemById(movieId);
	}

	@Post()
	createMovie(@Body() movieData) {
		return this.moviesService.createItem(movieData);
	}

	@Patch(":id")
	updateMovie(@Param("id") movieId, @Body() data) {
		return {
			id: movieId,
			...data,
		};
	}

	@Delete(":id")
	deleteMovie(@Param("id") movieId: string) {
		return this.moviesService.deleteItemById(movieId);
	}
}

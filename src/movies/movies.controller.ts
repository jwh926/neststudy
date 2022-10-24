import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
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
	getItemById(@Param("id") movieId: number): Movie {
		return this.moviesService.getItemById(movieId);
	}

	@Post()
	createMovie(@Body() data: CreateMovieDto) {
		return this.moviesService.createItem(data);
	}

	@Patch(":id")
	updateMovie(@Param("id") movieId: number, @Body() data: UpdateMovieDto) {
		return this.moviesService.updateItemById(movieId, data);
	}

	@Delete(":id")
	deleteMovie(@Param("id") movieId: number) {
		return this.moviesService.deleteItemById(movieId);
	}
}

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
	let service: MoviesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [MoviesService],
		}).compile();

		service = module.get<MoviesService>(MoviesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getAll()', () => {
		it('should return an array', () => {
			const result = service.getAll();
			expect(result).toBeInstanceOf(Array);
		});
	});

	describe('getItemById()', () => {
		it('should return a movie', () => {
			service.createItem({
				title: 'test',
				year: 1234,
				genres: ['asdf', 'qwer'],
			});
			const movie = service.getItemById(1);
			expect(movie).toBeDefined();
			expect(movie.id).toEqual(1);
		});
		it('should throw 404 error', () => {
			try {
				service.getItemById(999);
			} catch (e) {
				expect(e).toBeInstanceOf(NotFoundException);
				expect(e.message).toEqual('movie with id 999 not found');
			}
		});
	});
	describe('deleteItemById()', () => {
		it('deletes a movie', () => {
			service.createItem({
				title: 'asdf',
				year: 1234,
				genres: ['asdf', 'qwer'],
			});
			const m1 = service.getAll.length;
			service.deleteItemById(1);
			const m2 = service.getAll.length;
			expect(m2).toEqual(m1);
		});
		it('should throw NotFoundException', () => {
			try {
				service.deleteItemById(1);
			} catch (e) {
				expect(e).toBeInstanceOf(NotFoundException);
			}
		});
	});
	describe('createItem()', () => {
		it('should create a movie', () => {
			service.createItem({
				title: 'asdf',
				year: 1234,
				genres: ['asdf', 'qwer'],
			});
			const movie = service.getItemById(1);
			expect(movie).toBeDefined();
		});
	});
	describe('updateItem()', () => {
		it('should change title', () => {
			service.createItem({
				title: 'asdf',
				year: 1234,
				genres: ['asdf', 'qwer'],
			});
			service.updateItemById(1, {
				title: 'test',
				year: 2222,
				genres: [],
			});
			const movie = service.getItemById(1);
			expect(movie.title).toEqual('test');
			expect(movie.year).toEqual(2222);
			expect(movie.genres).toEqual([]);
		});
		it('should throw NotFoundException', () => {
			try {
				service.updateItemById(1, {
					title: "asdf"
				});
			} catch(e) {
				expect(e).toBeInstanceOf(NotFoundException);
			}
		});
	});
});

import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

import { CurrentUser, Protected } from '../../shared/decorators'
import { ToggleFavoritesRequest } from '../favorite/dto/toggle-favorites.request'

import { CreateTrackRequest } from './dto/create-track.request'
import { TrackService } from './track.service'

@Controller('track')
export class TrackController {
	constructor(private readonly trackService: TrackService) {}

	// ============================================================
	//   Получение всех марштуров
	// ============================================================
	@ApiOperation({
		summary: 'Получения всего списка маршрутов',
		description: 'Получения всего списка маршрутов'
	})
	@Get('/')
	@HttpCode(HttpStatus.OK)
	public async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.trackService.getAll(searchTerm)
	}

	// ============================================================
	//   Фильтрация маршрутов
	// ============================================================
	@ApiOperation({
		summary: 'Фильтрация маршрутов',
		description: 'Фильтрация маршрутов'
	})
	@Get('/filtered')
	@HttpCode(HttpStatus.OK)
	public async getFiltered(
		@Query('search') searchTerm?: string,
		@Query('region') region?: string,
		@Query('tag') tag?: string,
		@Query('sort') sortBy?: 'date' | 'likes'
	) {
		return this.trackService.getFiltered({
			searchTerm,
			region,
			tag,
			sortBy
		})
	}

	// ============================================================
	//   Получение общего кол-ва маршуртов
	// ============================================================
	@ApiOperation({
		summary: 'Получение общего кол-ва маршуртов',
		description: 'Получение общего кол-ва маршуртов'
	})
	@Get('/count')
	@HttpCode(HttpStatus.OK)
	public async getCount() {
		return this.trackService.getCounts()
	}

	// ============================================================
	//   Получение списка имен регионов
	// ============================================================
	@ApiOperation({
		summary: 'Получение списка имен регионов',
		description: 'Получение списка имен регионов'
	})
	@Get('/region/name')
	@HttpCode(HttpStatus.OK)
	public async getRegionName() {
		return this.trackService.getRegionName()
	}

	// ============================================================
	//   Получение количества регионов
	// ============================================================
	@ApiOperation({
		summary: 'Получение количества регионов',
		description: 'Получение количества регионов'
	})
	@Get('/region/count')
	@HttpCode(HttpStatus.OK)
	public async getRegionCount() {
		return this.trackService.getRegionCount()
	}

	// ============================================================
	//   Получение маршрута по ID
	// ============================================================
	@ApiOperation({
		summary: 'Получение маршрута по ID',
		description: 'Получение маршрута по ID'
	})
	@Get('/by-id/:id')
	@HttpCode(HttpStatus.OK)
	public async getById(@Param('id') trackId: string) {
		return this.trackService.getById(trackId)
	}

	// ============================================================
	//   Получение маршрутов текущего пользователя
	// ============================================================
	@ApiOperation({
		summary: 'Получение списка маршрутов текущего пользователя',
		description: 'Получение списка маршрутов текущего пользователя'
	})
	@ApiBearerAuth()
	@Protected()
	@Get('/my-track')
	@HttpCode(HttpStatus.OK)
	public async findMyTrack(@CurrentUser() userId: string) {
		return this.trackService.findByUser(userId)
	}

	// ============================================================
	//   Получение маршрутов по пользователю
	// ============================================================
	@ApiOperation({
		summary: 'Получение списка маршрутов по пользователю',
		description: 'Получение списка маршрутов по пользователю'
	})
	@Get('/by-user/:id')
	@HttpCode(HttpStatus.OK)
	public async findByUser(@Param('id') userId: string) {
		return this.trackService.findByUser(userId)
	}

	// ============================================================
	//   Создание нового маршрута
	// ============================================================
	@ApiOperation({
		summary: 'Создание нового маршрута',
		description: 'Создание нового маршрута'
	})
	@ApiBearerAuth()
	@Protected()
	@Post('/')
	@HttpCode(HttpStatus.OK)
	public async create(
		@CurrentUser() userId: string,
		@Body() data: CreateTrackRequest
	) {
		return this.trackService.create(userId, data)
	}

	// ============================================================
	//   Получение популярных маршрутов
	// ============================================================
	@ApiOperation({
		summary: 'Получение популярных маршрутов',
		description: 'Получение популярных маршрутов'
	})
	@Get('/most-popular')
	@HttpCode(HttpStatus.OK)
	public async getMostPopular() {
		return this.trackService.getMostPopular()
	}

	// ============================================================
	//   Получение наименование регионов с количеством маршрутов
	// ============================================================
	@ApiOperation({
		summary: 'Получение наименование регионов с количеством маршрутов',
		description: 'Получение наименование регионов с количеством маршрутов'
	})
	@Get('/region/name-with-count')
	@HttpCode(HttpStatus.OK)
	public async getRegions() {
		return this.trackService.getRegions()
	}
}

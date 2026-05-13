import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

import { CurrentUser, Protected } from '../../shared/decorators'

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
	public async getAll() {
		return this.trackService.getAll()
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
	@ApiBearerAuth()
	@Protected()
	@Get('/find-by-user/:id')
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
}

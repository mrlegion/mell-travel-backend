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

import { ToggleFavoritesRequest } from './dto/toggle-favorites.request'
import { FavoriteService } from './favorite.service'

@Controller('favorite')
export class FavoriteController {
	constructor(private readonly favoriteService: FavoriteService) {}

	// ============================================================
	//	Добавление/удаление маршрута из избранного пользователя
	// ============================================================
	@ApiOperation({
		summary: 'Добавление/удаление маршрута из избранного пользователя',
		description: 'Добавление/удаление маршрута из избранного пользователя'
	})
	@ApiBearerAuth()
	@Protected()
	@Post('/toggle')
	@HttpCode(HttpStatus.OK)
	public async toggleFavorites(
		@CurrentUser() userId: string,
		@Body() data: ToggleFavoritesRequest
	) {
		return this.favoriteService.toggleFavorites(userId, data)
	}

	// ============================================================
	//   Получить избранное текущего пользователя
	// ============================================================
	@ApiOperation({
		summary: 'Получить избранное текущего пользователя',
		description: 'Получить избранное текущего пользователя'
	})
	@ApiBearerAuth()
	@Protected()
	@Get('/my')
	@HttpCode(HttpStatus.OK)
	public async getMyFavorites(@CurrentUser() userId: string) {
		return this.favoriteService.getUserFavorites(userId)
	}

	// ============================================================
	//   Получить избранное пользователя
	// ============================================================
	@ApiOperation({
		summary: 'Получить избранное пользователя',
		description: 'Получить избранное пользователя'
	})
	@Get('/user/:id')
	@HttpCode(HttpStatus.OK)
	public async getUserFavorites(@Param('id') userId: string) {
		return this.favoriteService.getUserFavorites(userId)
	}

	// ============================================================
	//   Проверка наличия маршрута в избранном пользователя
	// ============================================================
	@ApiOperation({
		summary: 'Проверка наличия маршрута в избранном пользователя',
		description: 'Проверка наличия маршрута в избранном пользователя'
	})
	@ApiBearerAuth()
	@Protected()
	@Get('/in/:id')
	@HttpCode(HttpStatus.OK)
	public async tackIsFavorites(
		@CurrentUser() userId: string,
		@Param('id') trackId: string
	) {
		return this.favoriteService.trackInFavorites(userId, trackId)
	}
}

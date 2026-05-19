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

import { LikeRequest } from './dto/like.request'
import { LikeService } from './like.service'

@Controller('like')
export class LikeController {
	constructor(private readonly likeService: LikeService) {}

	// ============================================================
	//   Переключение лайка на маршруте
	// ============================================================
	@ApiOperation({
		summary: 'Переключение лайка на маршруте',
		description: 'Переключение лайка на маршруте'
	})
	@ApiBearerAuth()
	@Protected()
	@Post('/toggle')
	@HttpCode(HttpStatus.OK)
	public async toggleLike(
		@CurrentUser() userId: string,
		@Body() data: LikeRequest
	) {
		return this.likeService.toggleLike(userId, data)
	}

	// ============================================================
	//   Проверка является ли текущий маршрут лайкнутым в пользователя
	// ============================================================
	@ApiOperation({
		summary:
			'Проверка является ли текущий маршрут лайкнутым в пользователя',
		description:
			'Проверка является ли текущий маршрут лайкнутым в пользователя'
	})
	@ApiBearerAuth()
	@Protected()
	@Get('/:trackId')
	@HttpCode(HttpStatus.OK)
	public async isLikedTrack(
		@CurrentUser() userId: string,
		@Param('trackId') trackId: string
	) {
		return this.likeService.isLikedTrack(userId, trackId)
	}
}

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

import { CommentsService } from './comments.service'
import { CreateCommentRequest } from './dto/create-comment.request'


@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	// ============================================================
	//   Получение списка комментариев к маршруту
	// ============================================================
	@ApiOperation({
		summary: 'Получение списка комментариев к маршруту',
		description: 'Получение списка комментариев к маршруту'
	})
	@Get('/find-by-track/:track')
	@HttpCode(HttpStatus.OK)
	public async getOnTrack(@Param('track') trackId: string) {
		return this.commentsService.getByTrack(trackId)
	}

	// ============================================================
	//   Получение списка комментариев пользователя
	// ============================================================
	@ApiOperation({
		summary: 'Получение списка комментариев пользователя',
		description: 'Получение списка комментариев пользователя'
	})
	@Get('/find-by-user/:user')
	@HttpCode(HttpStatus.OK)
	public async getOnUser(@Param('user') userId: string) {
		return this.commentsService.getByUser(userId)
	}

	// ============================================================
	//   Получение списка комментариев текущего пользователя
	// ============================================================
	@ApiOperation({
		summary: 'Получение списка комментариев текущего пользователя',
		description: 'Получение списка комментариев текущего пользователя'
	})
	@Protected()
	@ApiBearerAuth()
	@Get('/')
	@HttpCode(HttpStatus.OK)
	public async getOnMe(@CurrentUser() userId: string) {
		return this.commentsService.getByUser(userId)
	}

	// ============================================================
	//   Добавление нового комментария к маршруту
	// ============================================================
	@ApiOperation({
		summary: 'Добавление нового комментария к маршруту',
		description: 'Добавление нового комментария к маршруту'
	})
	@ApiBearerAuth()
	@Protected()
	@Post('/:track')
	@HttpCode(HttpStatus.OK)
	public async create(
		@CurrentUser() userId: string,
		@Param('track') trackId: string,
		@Body() data: CreateCommentRequest
	) {
		return this.commentsService.create(trackId, userId, data)
	}
}

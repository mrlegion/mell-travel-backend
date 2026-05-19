import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { ApiBearerAuth, ApiExtraModels, ApiOperation } from '@nestjs/swagger'

import { CurrentUser, Protected } from '../../shared/decorators'

import { ProfileUpdateRequest } from './dto/profile-update.request'
import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	// ============================================================
	//   Получение данных текущего пользователя
	// ============================================================
	@ApiOperation({
		summary: 'Получение информации текущего пользователя',
		description: 'Получение информации текущего пользователя'
	})
	@ApiBearerAuth()
	@Protected()
	@Get('/')
	@HttpCode(HttpStatus.OK)
	public async getMe(@CurrentUser() userId: string) {
		return this.profileService.getMe(userId)
	}

	// ============================================================
	//   Обновление данных текущего пользователя
	// ============================================================
	@ApiOperation({
		summary: 'Обновление данных профиля пользователя',
		description: 'Обновление данных профиля пользователя'
	})
	@ApiExtraModels(ProfileUpdateRequest)
	@ApiBearerAuth()
	@Protected()
	@Patch('/')
	@HttpCode(HttpStatus.OK)
	public async update(
		@CurrentUser() userId: string,
		@Body() data: ProfileUpdateRequest
	) {
		return this.profileService.update(userId, data)
	}

	// ============================================================
	//   Получить данные пользователя по ID
	// ============================================================
	@ApiOperation({
		summary: 'Получить данные пользователя по ID',
		description: 'Получить данные пользователя по ID'
	})
	@Get('/by-id/:id')
	@HttpCode(HttpStatus.OK)
	public async getById(@Param('id') userId: string) {
		return this.profileService.getMe(userId)
	}
}

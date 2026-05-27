import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOperation } from '@nestjs/swagger'
import type { Request, Response } from 'express'

import { AuthService } from './auth.service'
import { LoginRequest } from './dto/login.request'
import { RegisterRequest } from './dto/register.request'

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly config: ConfigService
	) {}

	// ============================================================
	//   Вход в систему
	// ============================================================
	@ApiOperation({
		summary: 'Вход в систему',
		description: 'Вход в систему'
	})
	@Post('login')
	@HttpCode(HttpStatus.OK)
	public async login(
		@Body() data: LoginRequest,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.login(data, res)
	}

	// ============================================================
	//   Регистрация в системе
	// ============================================================
	@ApiOperation({
		summary: 'Регистрация в системе',
		description: 'Регистрация в системе'
	})
	@Post('register')
	@HttpCode(HttpStatus.OK)
	public async register(
		@Body() data: RegisterRequest,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.register(data, res)
	}

	// ============================================================
	//   Обновление токена доступа
	// ============================================================
	@ApiOperation({
		summary: 'Обновление токена доступа',
		description: 'Обновление токена доступа'
	})
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	public async refresh(
		@Req() req: Request,
		@Res({ passthrough: true })
		res: Response
	) {
		console.log('Запуск обновления токенов...')
		const refreshToken = req.cookies[this.authService.REFRESH_TOKEN_NAME]

		if (!refreshToken) {
			this.authService.removeRefreshTokenFromResponse(res)
			throw new UnauthorizedException('Токен обновления не прошел')
		}

		return this.authService.refresh({ refreshToken }, res)
	}

	// ============================================================
	//   Выход из системы
	// ============================================================
	@ApiOperation({
		summary: 'Выход из системы',
		description: 'Выход из системы'
	})
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	public async logout(@Res({ passthrough: true }) res: Response) {
		return this.authService.logout(res)
	}
}

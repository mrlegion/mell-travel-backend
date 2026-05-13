import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { hash, verify } from 'argon2'
import type { Response } from 'express'

import { AccountRepository } from '../../repositories/account/account.repository'
import { TokenService } from '../../services/token/token.service'

import { LoginRequest } from './dto/login.request'
import { RefreshRequest } from './dto/refresh.request'
import { RegisterRequest } from './dto/register.request'

@Injectable()
export class AuthService {
	public constructor(
		private readonly accountRepository: AccountRepository,
		private readonly config: ConfigService,
		private readonly token: TokenService
	) {}

	// ============================================================
	//   Вход в систему
	// ============================================================
	public async login(data: LoginRequest, res: Response) {
		const { email, password } = data

		const user = await this.accountRepository.findByEmail(email)
		if (!user)
			throw new NotFoundException(
				'Не верный электронный адрес или пароль'
			)

		const isVerifyPass = await verify(user.password, password)
		if (!isVerifyPass)
			throw new NotFoundException(
				'Не верный электронный адрес или пароль'
			)

		const { accessToken, refreshToken } = this.token.generate(user.id)

		this.setCookie(res, refreshToken)

		return { accessToken }
	}

	// ============================================================
	//   Регистрация в системе
	// ============================================================
	public async register(data: RegisterRequest, res: Response) {
		const { name, email, password } = data // для удобства достаем данные из структуры

		// проверим, что пользователя с таким электронным адресом нет
		const isEmailExist = await this.accountRepository.findByEmail(email)
		if (isEmailExist)
			throw new BadRequestException(
				`Пользователь с таким электронным адресом ${email} уже существует`
			)

		// создаем пользователя
		const user = await this.accountRepository.create({
			email,
			name,
			password: await hash(password),
			avatar: 'images/account-default.png',
			bio: ''
		})

		const { accessToken, refreshToken } = this.token.generate(user.id)

		this.setCookie(res, refreshToken)

		return { accessToken }
	}

	// ============================================================
	//   Обновление токена доступа
	// ============================================================
	public async refresh(data: RefreshRequest, res: Response) {
		const { refreshToken } = data

		const result = this.token.verify(refreshToken)

		if (!result.valid)
			throw new BadRequestException('Не верный токен обновления')

		if (!result.userId)
			throw new NotFoundException('Пользователь не найден')

		const tokens = this.token.generate(result.userId)
		this.setCookie(res, tokens.refreshToken)

		return { accessToken: tokens.accessToken }
	}

	// ============================================================
	//   Выход из системы
	// ============================================================
	public async logout(res: Response) {
		this.clearCookie(res)

		return { success: true }
	}

	// ============================================================
	//   Очистка cookies
	// ============================================================
	private clearCookie(res: Response) {
		res.cookie('refreshToken', '', {
			httpOnly: true,
			secure:
				this.config.getOrThrow<string>('NODE_ENV') !== 'development',
			domain: this.config.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			expires: new Date(0)
		})
	}

	// ============================================================
	//   Установка токена обновления в cookies
	// ============================================================
	private setCookie(res: Response, token: string) {
		res.cookie('refreshToken', token, {
			httpOnly: true,
			secure:
				this.config.getOrThrow<string>('NODE_ENV') !== 'development',
			domain: this.config.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			maxAge: this.config.getOrThrow<number>('COOKIES_AGE') // 30 дней
		})
	}
}

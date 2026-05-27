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
import { Favorite, Track, User } from '../../shared/types'

import { LoginRequest } from './dto/login.request'
import { LoginResponse } from './dto/login.response'
import { RefreshRequest } from './dto/refresh.request'
import { RegisterRequest } from './dto/register.request'
import { RegisterResponse } from './dto/register.response'

@Injectable()
export class AuthService {
	public REFRESH_TOKEN_NAME = 'refreshToken'

	public constructor(
		private readonly accountRepository: AccountRepository,
		private readonly config: ConfigService,
		private readonly token: TokenService
	) {}

	// ============================================================
	//   Вход в систему
	// ============================================================
	public async login(
		data: LoginRequest,
		res: Response
	): Promise<LoginResponse> {
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

		const retUser: User = this.mapAccountToUserWithAuthor(user)

		return { accessToken, user: retUser }
	}

	// ============================================================
	//   Регистрация в системе
	// ============================================================
	public async register(
		data: RegisterRequest,
		res: Response
	): Promise<RegisterResponse> {
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
			bio: ''
		})

		const retUser: User = this.mapAccountToUserWithAuthor(user)

		const { accessToken, refreshToken } = this.token.generate(user.id)

		this.setCookie(res, refreshToken)

		return { accessToken, user: retUser }
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
	//   Удаление токена из Cookies
	// ============================================================
	public removeRefreshTokenFromResponse(res: Response) {
		this.clearCookie(res)
	}

	// ============================================================
	//   Очистка cookies
	// ============================================================
	private clearCookie(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
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
		res.cookie(this.REFRESH_TOKEN_NAME, token, {
			httpOnly: true,
			secure:
				this.config.getOrThrow<string>('NODE_ENV') !== 'development',
			domain: this.config.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			maxAge: this.config.getOrThrow<number>('COOKIES_AGE') // 30 дней
		})
	}

	private mapAccountToUserWithAuthor(user: any): User {
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			avatar: user.avatar,
			bio: user.bio,
			notificationNewComments: user.notificationNewComments,
			notificationLikes: user.notificationLikes,
			notificationNewTrackInFavorites:
				user.notificationNewTrackInFavorites,
			tracks: user.tracks
				? user.tracks.map((track: any) => ({
						id: track.id,
						title: track.title,
						region: track.region,
						tags: track.tags,
						excerpt: track.excerpt,
						images: track.images,
						likes: track.likes,
						author: {
							id: track.account?.id,
							name: track.account?.name,
							email: track.account?.email,
							avatar: track.account?.avatar
						}
					}))
				: [],
			favorites: user.favorites
				? user.favorites.map((favorite: any) => ({
						id: favorite.id,
						track: {
							id: favorite.track?.id,
							title: favorite.track?.title,
							region: favorite.track?.region,
							tags: favorite.track?.tags,
							excerpt: favorite.track?.excerpt,
							images: favorite.track?.images,
							likes: favorite.track?.likes,
							author: {
								id: favorite.track?.account?.id,
								name: favorite.track?.account?.name,
								email: favorite.track?.account?.email,
								avatar: favorite.track?.account?.avatar
							}
						}
					}))
				: []
		}
	}
}

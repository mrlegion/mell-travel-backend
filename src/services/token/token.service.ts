import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { PassportService } from '../passport/passport.service'

@Injectable()
export class TokenService {
	private readonly ACCESS_TOKEN_TTL: number
	private readonly REFRESH_TOKEN_TTL: number

	public constructor(
		private readonly config: ConfigService,
		private readonly passport: PassportService
	) {
		this.ACCESS_TOKEN_TTL = this.config.getOrThrow<number>(
			'PASSPORT_ACCESS_TTL'
		)
		this.REFRESH_TOKEN_TTL = this.config.getOrThrow<number>(
			'PASSPORT_REFRESH_TTL'
		)
	}

	// ============================================================
	//   Генерация токенов (доступа и обновления)
	// ============================================================
	public generate(userId: string) {
		const payload = { sub: userId }

		const accessToken = this.passport.generate(
			String(payload.sub),
			this.ACCESS_TOKEN_TTL
		)

		const refreshToken = this.passport.generate(
			String(payload.sub),
			this.REFRESH_TOKEN_TTL
		)

		return { accessToken, refreshToken }
	}

	// ============================================================
	//   Проверка токена
	// ============================================================
	public verify(token: string) {
		return this.passport.verify(token)
	}
}

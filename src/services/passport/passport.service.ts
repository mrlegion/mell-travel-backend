import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createHmac } from 'node:crypto'

import { base64UrlDecode, constantTimeEqual } from '../../shared/utils'
import { base64UrlEncode } from '../../shared/utils'

@Injectable()
export class PassportService {
	private readonly SECRET_KEY: string

	private static readonly HMAC = 'MellTrevelPassportTokenAuth/v1'
	private static readonly INTERNAL_SEPARATOR = '|'

	public constructor(private readonly config: ConfigService) {
		this.SECRET_KEY = config.getOrThrow<string>('PASSPORT_SECRET')
	}

	public generate(userId: string, ttl: number) {
		const issuedAt = this.now()
		const expiresAt = issuedAt + ttl

		const userPart = base64UrlEncode(userId)
		const iatPart = base64UrlEncode(String(issuedAt))
		const expPart = base64UrlEncode(String(expiresAt))

		const serialized = this.serialize(userPart, iatPart, expPart)
		const mac = this.computeHmac(this.SECRET_KEY, serialized)

		return `${userPart}.${iatPart}.${expPart}.${mac}`
	}

	public verify(token: string) {
		const parts = token.split('.')

		if (parts.length !== 4)
			return { valid: false, reason: 'Не верный формат токена' }

		const [userPart, iatPart, expPart, mac] = parts

		const serialized = this.serialize(userPart, iatPart, expPart)

		const expectedMac = this.computeHmac(this.SECRET_KEY, serialized)

		if (!constantTimeEqual(expectedMac, mac))
			return { valid: false, reason: 'Не верная сигнатура токена' }

		const expNumber = Number(base64UrlDecode(expPart))

		if (!Number.isFinite(expNumber))
			return { valid: false, reason: 'Не верный формат токена' }
		if (this.now() > expNumber)
			return { valid: false, reason: 'Токен истек' }

		return { valid: true, userId: base64UrlDecode(userPart) }
	}

	private now() {
		return Math.floor(Date.now() / 1000)
	}

	private serialize(user: string, iat: string, exp: string) {
		return [PassportService.HMAC, user, iat, exp].join(
			PassportService.INTERNAL_SEPARATOR
		)
	}

	private computeHmac(secretKey: string, data: string) {
		return createHmac('sha256', secretKey).update(data).digest('hex')
	}
}

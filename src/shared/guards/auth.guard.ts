import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import type { Request, Response } from 'express'

import { PassportService } from '../../services/passport/passport.service'

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(private readonly passport: PassportService) {}

	public canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest()
		const token = this.extractToken(request)

		if (!token) throw new UnauthorizedException('Токен не найден')

		const result = this.passport.verify(token)
		if (!result.valid) throw new UnauthorizedException(result.reason)

		request.user = {
			id: result.userId
		}

		return true
	}

	private extractToken(request: Request) {
		const header = request.headers.authorization

		if (!header)
			throw new UnauthorizedException('Заголовок авторизации отсутствует')

		if (!header.startsWith('Bearer '))
			throw new UnauthorizedException('Токен должен быть в заголовке')

		return header.replace(/^Bearer\s+/i, '').trim()
	}
}

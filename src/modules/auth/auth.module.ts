import { Module } from '@nestjs/common'

import { AccountRepository } from '../../repositories/account/account.repository'
import { PassportService } from '../../services/passport/passport.service'
import { TokenService } from '../../services/token/token.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	controllers: [AuthController],
	providers: [AuthService, AccountRepository, TokenService, PassportService]
})
export class AuthModule {}

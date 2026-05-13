import { Global, Module } from '@nestjs/common'

import { PassportService } from '../passport/passport.service'

import { TokenService } from './token.service'

@Global()
@Module({
	providers: [TokenService, PassportService],
	exports: [TokenService]
})
export class TokenModule {}

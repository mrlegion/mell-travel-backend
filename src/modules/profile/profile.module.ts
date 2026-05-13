import { Module } from '@nestjs/common'

import { AccountRepository } from '../../repositories/account/account.repository'
import { PassportService } from '../../services/passport/passport.service'

import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'

@Module({
	controllers: [ProfileController],
	providers: [ProfileService, AccountRepository, PassportService]
})
export class ProfileModule {}

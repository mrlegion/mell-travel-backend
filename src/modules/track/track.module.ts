import { Module } from '@nestjs/common'

import { AccountRepository } from '../../repositories/account/account.repository'
import { TrackRepository } from '../../repositories/track/track.repository'
import { PassportService } from '../../services/passport/passport.service'

import { TrackController } from './track.controller'
import { TrackService } from './track.service'

@Module({
	controllers: [TrackController],
	providers: [
		TrackService,
		TrackRepository,
		AccountRepository,
		PassportService
	]
})
export class TrackModule {}

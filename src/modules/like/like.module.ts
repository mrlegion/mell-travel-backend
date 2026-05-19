import { Module } from '@nestjs/common'

import { AccountRepository } from '../../repositories/account/account.repository'
import { LikesRepository } from '../../repositories/likes/likes.repository'
import { TrackRepository } from '../../repositories/track/track.repository'
import { PassportService } from '../../services/passport/passport.service'

import { LikeController } from './like.controller'
import { LikeService } from './like.service'

@Module({
	controllers: [LikeController],
	providers: [
		LikeService,
		LikesRepository,
		AccountRepository,
		PassportService,
		TrackRepository
	]
})
export class LikeModule {}

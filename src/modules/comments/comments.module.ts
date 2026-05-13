import { Module } from '@nestjs/common'

import { AccountRepository } from '../../repositories/account/account.repository'
import { CommentRepository } from '../../repositories/comment/comment.repository'
import { TrackRepository } from '../../repositories/track/track.repository'
import { PassportService } from '../../services/passport/passport.service'

import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'


@Module({
	controllers: [CommentsController],
	providers: [
		CommentsService,
		AccountRepository,
		TrackRepository,
		CommentRepository,
		PassportService
	]
})
export class CommentsModule {}

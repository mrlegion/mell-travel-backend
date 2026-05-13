import { Module } from '@nestjs/common'

import { TrackRepository } from '../../repositories/track/track.repository'

import { TrackController } from './track.controller'
import { TrackService } from './track.service'

@Module({
	controllers: [TrackController],
	providers: [TrackService, TrackRepository]
})
export class TrackModule {}

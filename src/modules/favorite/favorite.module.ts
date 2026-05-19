import { Module } from '@nestjs/common'

import { AccountRepository } from '../../repositories/account/account.repository'
import { FavoritesRepository } from '../../repositories/favorites/favorites.repository'
import { TrackRepository } from '../../repositories/track/track.repository'
import { PassportService } from '../../services/passport/passport.service'

import { FavoriteController } from './favorite.controller'
import { FavoriteService } from './favorite.service'

@Module({
	controllers: [FavoriteController],
	providers: [
		FavoriteService,
		AccountRepository,
		PassportService,
		FavoritesRepository,
		TrackRepository
	]
})
export class FavoriteModule {}

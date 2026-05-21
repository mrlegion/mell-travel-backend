import { Injectable, NotFoundException } from '@nestjs/common'

import { AccountRepository } from '../../repositories/account/account.repository'
import { FavoritesRepository } from '../../repositories/favorites/favorites.repository'
import { TrackRepository } from '../../repositories/track/track.repository'

import { ToggleFavoritesRequest } from './dto/toggle-favorites.request'


@Injectable()
export class FavoriteService {
	public constructor(
		private readonly favoritesRepository: FavoritesRepository,
		private readonly accountRepository: AccountRepository,
		private readonly trackRepository: TrackRepository
	) {}

	// ============================================================
	//   Проверка наличия маршрута в избранном пользователя
	// ============================================================
	public async trackInFavorites(userId: string, trackId: string) {
		const existingUser = await this.accountRepository.findById(userId)
		if (!existingUser)
			throw new NotFoundException('Пользователь  не найден')

		const existingTrack = await this.trackRepository.findById(trackId)
		if (!existingTrack) throw new NotFoundException('Маршрут не найден')

		const existInFavorites = await this.favoritesRepository.findOne(
			userId,
			trackId
		)

		return !!existInFavorites
	}

	// ============================================================
	//   Получить избранные маршруты пользователя
	// ============================================================
	public async getUserFavorites(userId: string) {
		const existingUser = await this.accountRepository.findById(userId)
		if (!existingUser)
			throw new NotFoundException('Пользователь  не найден')

		const favorites = await this.favoritesRepository.findByUser(
			existingUser.id
		)

		if (!favorites || favorites.length === 0)
			return { user: userId, tracks: [] }

		const trackIds = favorites.map(item => item.trackId)
		if (!trackIds || trackIds.length === 0)
			return { user: userId, tracks: [] }

		const tracks = await this.trackRepository.findManyByIds(trackIds)

		return {
			user: userId,
			tracks
		}
	}

	// ============================================================
	//   Добавление/удаление маршрута из избранного пользователя
	// ============================================================
	public async toggleFavorites(userId: string, data: ToggleFavoritesRequest) {
		const { trackId } = data

		// проверим маршрут
		const isTrackExist = await this.trackRepository.findById(trackId)
		if (!isTrackExist) throw new NotFoundException('Маршрут не найден')

		const existingFavoriteTrack = await this.favoritesRepository.findOne(
			userId,
			trackId
		)

		if (existingFavoriteTrack) {
			await this.favoritesRepository.delete(existingFavoriteTrack.id)
			return { success: false }
		} else {
			await this.favoritesRepository.create(userId, trackId)
			return { success: true }
		}
	}
}

import { Injectable, NotFoundException } from '@nestjs/common'

import { AccountRepository } from '../../repositories/account/account.repository'
import { LikesRepository } from '../../repositories/likes/likes.repository'
import { TrackRepository } from '../../repositories/track/track.repository'

import { LikeRequest } from './dto/like.request'


@Injectable()
export class LikeService {
	public constructor(
		private readonly accountRepository: AccountRepository,
		private readonly trackRepository: TrackRepository,
		private readonly likeRepository: LikesRepository
	) {}

	// ============================================================
	//   Переключение лайков на маршруте
	// ============================================================
	public async toggleLike(userId: string, data: LikeRequest) {
		const existUser = await this.accountRepository.findById(userId)
		if (!existUser) throw new NotFoundException('Пользователь не найден')

		const { trackId } = data
		const existTrack = await this.trackRepository.findById(trackId)
		if (!existTrack) throw new NotFoundException('Маршрут не найден')

		const existLike = await this.likeRepository.findOne(
			existUser.id,
			existTrack.id
		)
		if (existLike) {
			await this.likeRepository.delete(existLike.id)
			await this.trackRepository.changeLike(existTrack.id, {
				decrement: 1
			})
			return { liked: false, trackId: existTrack.id }
		} else {
			await this.likeRepository.create(existUser.id, existTrack.id)
			await this.trackRepository.changeLike(existTrack.id, {
				increment: 1
			})

			return { liked: true, trackId: existTrack.id }
		}
	}

	// ============================================================
	//   Проверка является ли текущий маршрут лайкнутым в пользователя
	// ============================================================
	public async isLikedTrack(userId: string, trackId: string) {
		const existUser = await this.accountRepository.findById(userId)
		if (!existUser) throw new NotFoundException('Пользователь не найден')

		const existTrack = await this.trackRepository.findById(trackId)
		if (!existTrack) throw new NotFoundException('Маршрут не найден')

		const existLike = await this.likeRepository.findOne(
			existUser.id,
			existTrack.id
		)

		return !!existLike
	}
}

import { Injectable, NotFoundException } from '@nestjs/common'

import { AccountRepository } from '../../repositories/account/account.repository'

import { ProfileUpdateRequest } from './dto/profile-update.request'

@Injectable()
export class ProfileService {
	public constructor(private readonly accountRepository: AccountRepository) {}

	// ============================================================
	//   Получение данных профиля пользователя
	// ============================================================
	public async getMe(userId: string) {
		const account = await this.accountRepository.findById(userId)
		if (!account) throw new NotFoundException('Пользователь не найден')

		return {
			user: {
				id: account.id,
				email: account.email,
				name: account.name,
				avatar: account.avatar,
				bio: account.bio,
				notificationNewComments: account.notificationNewComments,
				notificationLikes: account.notificationLikes,
				notificationNewTrackInFavorites:
					account.notificationNewTrackInFavorites
			}
		}
	}

	// ============================================================
	//   Обновление данных профиля пользователя
	// ============================================================
	public async update(userId: string, data: ProfileUpdateRequest) {
		const user = await this.accountRepository.findById(userId)
		if (!user) throw new NotFoundException('Пользователь не найден')

		const {
			name,
			bio,
			avatar,
			notificationNewTrackInFavorites,
			notificationNewComments,
			notificationLikes
		} = data

		await this.accountRepository.update(user.id, {
			name,
			bio,
			avatar,
			notificationNewTrackInFavorites,
			notificationNewComments,
			notificationLikes
		})

		return { success: true }
	}
}

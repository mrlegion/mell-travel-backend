import { Injectable, NotFoundException } from '@nestjs/common'

import { AccountRepository } from '../../repositories/account/account.repository'
import { CommentRepository } from '../../repositories/comment/comment.repository'
import { TrackRepository } from '../../repositories/track/track.repository'

import { CreateCommentRequest } from './dto/create-comment.request'

@Injectable()
export class CommentsService {
	public constructor(
		private readonly commentRepository: CommentRepository,
		private readonly accountRepository: AccountRepository,
		private readonly trackRepository: TrackRepository
	) {}

	// ============================================================
	//   Получить список комментариев по ID маршрута
	// ============================================================
	public async getByTrack(trackId: string) {
		return this.commentRepository.getByTrack(trackId)
	}

	// ============================================================
	//   Получить список комментариев пользователя
	// ============================================================
	public async getByUser(userId: string) {
		return this.commentRepository.getByUser(userId)
	}

	// ============================================================
	//   Создание нового комментария к маршруту
	// ============================================================
	public async create(
		trackId: string,
		userId: string,
		data: CreateCommentRequest
	) {
		// проверим маршрут
		const track = await this.trackRepository.findById(trackId)
		if (!track) throw new NotFoundException('Маршрут не найден')

		// проверим пользователя
		const user = await this.accountRepository.findById(userId)
		if (!user) throw new NotFoundException('Пользователь не найден')

		const { text, author } = data

		return this.commentRepository.create({
			text,
			author,
			account: {
				connect: { id: user.id }
			},
			track: {
				connect: { id: track.id }
			}
		})
	}
}

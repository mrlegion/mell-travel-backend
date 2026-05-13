import { Injectable } from '@nestjs/common'

import { Comment } from '../../../prisma/generated/client'
import { CommentCreateInput } from '../../../prisma/generated/models/Comment'
import { PrismaService } from '../../services/prisma/prisma.service'

@Injectable()
export class CommentRepository {
	public constructor(private readonly prisma: PrismaService) {}

	// ============================================================
	//   Получить список комментариев по маршруту
	// ============================================================
	public async getByTrack(trackId: string): Promise<Comment[] | null> {
		return this.prisma.comment.findMany({
			where: { trackId }
		})
	}

	// ============================================================
	//   Получить список комментариев по пользователю
	// ============================================================
	public async getByUser(userId: string): Promise<Comment[] | null> {
		return this.prisma.comment.findMany({
			where: {
				accountId: userId
			}
		})
	}

	// ============================================================
	//   Создание комментария к маршруту
	// ============================================================
	public async create(data: CommentCreateInput): Promise<Comment> {
		return this.prisma.comment.create({ data })
	}
}

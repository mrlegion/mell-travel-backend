import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../services/prisma/prisma.service'

@Injectable()
export class LikesRepository {
	public constructor(private readonly prisma: PrismaService) {}

	// ============================================================
	//   Создать запись
	// ============================================================
	public async create(accountId: string, trackId: string) {
		return this.prisma.like.create({
			data: {
				accountId,
				trackId
			}
		})
	}

	// ============================================================
	//   Удалить запись
	// ============================================================
	public async delete(id: string) {
		return this.prisma.like.delete({
			where: { id }
		})
	}

	// ============================================================
	//   Найти запись по пользователю и маршруту
	// ============================================================
	public async findOne(accountId: string, trackId: string) {
		return this.prisma.like.findUnique({
			where: {
				accountId_trackId: {
					accountId,
					trackId
				}
			}
		})
	}
}

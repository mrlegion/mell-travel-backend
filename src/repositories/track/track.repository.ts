import { Injectable } from '@nestjs/common'

import { Track } from '../../../prisma/generated/client'
import { TrackCreateInput } from '../../../prisma/generated/models/Track'
import { PrismaService } from '../../services/prisma/prisma.service'

@Injectable()
export class TrackRepository {
	public constructor(private readonly prisma: PrismaService) {}

	// ============================================================
	//   Найти по ID маршрута
	// ============================================================
	public async findById(id: string): Promise<Track | null> {
		return this.prisma.track.findUnique({
			where: { id },
			include: {
				account: true,
				comments: {
					include: {
						account: true
					}
				}
			}
		})
	}

	// ============================================================
	//   Найти по заголовку
	// ============================================================
	public async findByTitle(title: string): Promise<Track | null> {
		return this.prisma.track.findUnique({
			where: { title }
		})
	}

	// ============================================================
	//   Получить все маршруты
	// ============================================================
	public async getAll(): Promise<Track[] | null> {
		return this.prisma.track.findMany({
			include: {
				account: {
					select: {
						id: true,
						email: true,
						name: true,
						avatar: true,
						bio: true
					}
				},
				_count: {
					select: {
						comments: true
					}
				}
			}
		})
	}

	// ============================================================
	//   Найти по пользователю
	// ============================================================
	public async findByUser(userId: string): Promise<Track[] | null> {
		return this.prisma.track.findMany({
			where: {
				accountId: userId
			},
			include: {
				_count: {
					select: {
						comments: true
					}
				}
			}
		})
	}

	// ============================================================
	//
	// ============================================================
	public async create(data: TrackCreateInput): Promise<Track> {
		return this.prisma.track.create({ data })
	}
}

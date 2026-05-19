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
				account: {
					select: {
						id: true,
						email: true,
						name: true,
						avatar: true,
						bio: true
					}
				},
				comments: {
					include: {
						account: {
							select: {
								id: true,
								email: true,
								name: true,
								avatar: true,
								bio: true
							}
						}
					}
				}
			}
		})
	}

	// ============================================================
	//   Найти маршруты по списку Id
	// ============================================================
	public async findManyByIds(trackIds: string[]) {
		return this.prisma.track.findMany({
			where: {
				id: {
					in: trackIds
				}
			},
			select: {
				id: true,
				title: true,
				region: true,
				tags: true,
				excerpt: true,
				difficulty: true,
				images: true,
				likes: true,
				account: {
					select: {
						id: true,
						email: true,
						name: true,
						avatar: true
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
	public async getAll(searchTerm?: string): Promise<Track[] | null> {
		if (searchTerm) return this.getSearchTermFilter(searchTerm)

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
	//   Получить маршруты с текстом поиска
	// ============================================================
	private async getSearchTermFilter(searchTerm: string) {
		return this.prisma.track.findMany({
			where: {
				OR: [
					{
						title: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						excerpt: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						difficulty: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						duration: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			},
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
	//   Фильтрация маршрутов
	// ============================================================
	public async getFiltered(whereConditions: any, orderBy: any) {
		return this.prisma.track.findMany({
			where: whereConditions,
			orderBy,
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
	//   Получение количества маршрутов
	// ============================================================
	public async getCount(): Promise<number> {
		return this.prisma.track.count()
	}

	// ============================================================
	//   Получение количества регионов
	// ============================================================
	public async getRegionCount(): Promise<number> {
		const group = await this.prisma.track.groupBy({
			by: ['region']
		})

		return group.length
	}

	// ============================================================
	//   Получение списка регионов
	// ============================================================
	public async getRegionName(): Promise<string[]> {
		const result = await this.prisma.track.findMany({
			distinct: 'region',
			select: {
				region: true
			}
		})

		return result.map(item => item.region)
	}

	// ============================================================
	//
	// ============================================================
	public async create(data: TrackCreateInput): Promise<Track> {
		return this.prisma.track.create({ data })
	}

	// ============================================================
	//   Получить самые популярные маршруты
	// ============================================================
	public async getMostPopular() {
		return this.prisma.track.findMany({
			orderBy: {
				likes: 'desc'
			},
			select: {
				id: true,
				title: true,
				region: true,
				tags: true,
				excerpt: true,
				difficulty: true,
				images: true,
				likes: true,
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
			},
			take: 5
		})
	}

	// ============================================================
	//   Получение наименование регионов с количеством маршрутов
	// ============================================================
	public async getRegions() {
		// Сначала получаем группировку по регионам
		const regionGroups = await this.prisma.track.groupBy({
			by: ['region'],
			_count: {
				region: true
			},
			orderBy: {
				_count: {
					region: 'desc'
				}
			}
		})

		// Затем для каждого региона получаем первый трек с изображениями
		return await Promise.all(
			regionGroups.map(async regionGroup => {
				const firstTrack = await this.prisma.track.findFirst({
					where: {
						region: regionGroup.region
					},
					select: {
						images: true
					}
				})

				return {
					title: regionGroup.region,
					count: regionGroup._count.region,
					images: firstTrack?.images || []
				}
			})
		)
	}

	// ============================================================
	//   Изменение количества лайков
	// ============================================================
	public async changeLike(
		id: string,
		likes: { increment?: number; decrement?: number }
	) {
		return this.prisma.track.update({
			where: { id },
			data: {
				likes
			}
		})
	}
}

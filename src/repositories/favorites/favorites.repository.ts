import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../services/prisma/prisma.service'

@Injectable()
export class FavoritesRepository {
	public constructor(private readonly prisma: PrismaService) {}

	public async findByTrack(trackId: string) {
		return this.prisma.favorite.findMany({
			where: { trackId },
			include: {
				track: {
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
					}
				}
			}
		})
	}

	public async findByUser(userId: string) {
		return this.prisma.favorite.findMany({
			where: { accountId: userId },
			include: {
				track: {
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
					}
				}
			}
		})
	}

	public async findOne(accountId: string, trackId: string) {
		return this.prisma.favorite.findUnique({
			where: {
				accountId_trackId: {
					accountId,
					trackId
				}
			},
			include: {
				track: {
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
					}
				}
			}
		})
	}

	public async delete(id: string) {
		return this.prisma.favorite.delete({
			where: { id }
		})
	}

	public async create(accountId: string, trackId: string) {
		return this.prisma.favorite.create({
			data: {
				accountId,
				trackId
			}
		})
	}
}

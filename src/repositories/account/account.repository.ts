import { Injectable } from '@nestjs/common'

import { Account } from '../../../prisma/generated/client'
import {
	AccountCreateInput,
	AccountUpdateInput
} from '../../../prisma/generated/models/Account'
import { PrismaService } from '../../services/prisma/prisma.service'
import { User } from '../../shared/types'

@Injectable()
export class AccountRepository {
	public constructor(private readonly prisma: PrismaService) {}

	// ============================================================
	//   Найти по ID записи
	// ============================================================
	public async findById(id: string) {
		return this.prisma.account.findUnique({
			where: { id },
			include: {
				favorites: {
					select: {
						trackId: true
					}
				},
				likes: {
					select: {
						trackId: true
					}
				}
			}
		})
	}

	// ============================================================
	//   Найти по электронной почте
	// ============================================================
	public async findByEmail(email: string) {
		return this.prisma.account.findUnique({
			where: { email },
			include: {
				tracks: {
					select: {
						id: true,
						title: true,
						region: true,
						tags: true,
						excerpt: true,
						images: true,
						likes: true,
						account: {
							select: {
								id: true,
								name: true,
								email: true,
								avatar: true
							}
						}
					}
				},
				favorites: {
					select: {
						id: true,
						track: {
							select: {
								id: true,
								title: true,
								region: true,
								tags: true,
								excerpt: true,
								images: true,
								likes: true,
								account: {
									select: {
										id: true,
										name: true,
										email: true,
										avatar: true
									}
								}
							}
						}
					}
				}
			}
		})
	}

	// ============================================================
	//   Создать новую запись
	// ============================================================
	public async create(data: AccountCreateInput): Promise<Account> {
		return this.prisma.account.create({
			data
		})
	}

	// ============================================================
	//   Обновление данных записи
	// ============================================================
	public async update(
		id: string,
		data: AccountUpdateInput
	): Promise<Account> {
		return this.prisma.account.update({
			where: { id },
			data
		})
	}

	// ============================================================
	//   Удаление записи
	// ============================================================
	public async delete(id: string): Promise<Account> {
		return this.prisma.account.delete({
			where: { id }
		})
	}
}

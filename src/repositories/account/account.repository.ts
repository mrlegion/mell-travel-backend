import { Injectable } from '@nestjs/common'

import { Account } from '../../../prisma/generated/client'
import {
	AccountCreateInput,
	AccountUpdateInput
} from '../../../prisma/generated/models/Account'
import { PrismaService } from '../../services/prisma/prisma.service'

@Injectable()
export class AccountRepository {
	public constructor(private readonly prisma: PrismaService) {}

	// ============================================================
	//   Найти по ID записи
	// ============================================================
	public async findById(id: string): Promise<Account | null> {
		return this.prisma.account.findUnique({
			where: { id }
		})
	}

	// ============================================================
	//   Найти по электронной почте
	// ============================================================
	public async findByEmail(email: string): Promise<Account | null> {
		return this.prisma.account.findUnique({
			where: { email }
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

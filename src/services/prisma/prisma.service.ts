import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '../../../prisma/generated/client'

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(PrismaService.name)

	public constructor(private readonly config: ConfigService) {
		const adapter = new PrismaPg({
			user: config.getOrThrow<string>('DATABASE_USER'),
			password: config.getOrThrow<string>('DATABASE_PASSWORD'),
			host: config.getOrThrow<string>('DATABASE_HOST'),
			port: config.getOrThrow<number>('DATABASE_PORT'),
			database: config.getOrThrow<string>('DATABASE_NAME')
		})

		super({ adapter })
	}

	/**
	 * Выполняется при инициализации модуля.
	 * Устанавливает соединение с базой данных и логирует результат подключения.
	 * В случае ошибки подключения выбрасывает исключение.
	 */
	public async onModuleInit(): Promise<void> {
		const start = Date.now()

		this.logger.debug('Подключение к базе данных...')

		try {
			await this.$connect()

			this.logger.debug(
				`Подключение к БД успешно (time=${Date.now() - start}ms)`
			)
		} catch (error) {
			this.logger.error('Ошибка подключения к БД: ', error)
			throw error
		}
	}

	/**
	 * Выполняется при уничтожении модуля.
	 * Закрывает соединение с базой данных и логирует процесс отключения.
	 * В случае ошибки отключения выбрасывает исключение.
	 */
	public async onModuleDestroy(): Promise<void> {
		try {
			this.logger.debug('Отключение от базы данных ...')
			await this.$disconnect()
		} catch (error) {
			this.logger.error('Ошибка отключения от БД: ', error)
			throw error
		}
	}
}

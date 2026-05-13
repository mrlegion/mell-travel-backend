import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'

import { AccountRepository } from '../../repositories/account/account.repository'
import { TrackRepository } from '../../repositories/track/track.repository'

import { CreateTrackRequest } from './dto/create-track.request'

@Injectable()
export class TrackService {
	public constructor(
		private readonly trackRepository: TrackRepository,
		private readonly accountRepository: AccountRepository
	) {}

	// ============================================================
	//   Получение всех записей маршрутов
	// ============================================================
	public async getAll() {
		return this.trackRepository.getAll()
	}

	// ============================================================
	//   Найти маршруты по пользователю
	// ============================================================
	public async findByUser(userId: string) {
		return this.trackRepository.findByUser(userId)
	}

	// ============================================================
	//   Создание нового маршрута
	// ============================================================
	public async create(userId: string, data: CreateTrackRequest) {
		// проверим, что пользователь существует
		const user = await this.accountRepository.findById(userId)
		if (!user) throw new NotFoundException('Пользователь не найден')

		const {
			title,
			region,
			tags,
			text,
			excerpt,
			images,
			date,
			likes,
			lat,
			lng,
			duration,
			difficulty
		} = data

		// проверим, что заголовок у нас уникальный
		const isExistTitle = await this.trackRepository.findByTitle(title)
		if (isExistTitle)
			throw new BadRequestException(
				'Маршрут с таким заголовком уже существует'
			)

		return await this.trackRepository.create({
			title,
			region,
			tags,
			text,
			excerpt,
			images,
			date,
			likes,
			lat,
			lng,
			duration,
			difficulty,
			account: { connect: { id: userId } }
		})
	}
}

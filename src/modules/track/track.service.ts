import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'

import { Track } from '../../../prisma/generated/client'
import { AccountRepository } from '../../repositories/account/account.repository'
import { FavoritesRepository } from '../../repositories/favorites/favorites.repository'
import { TrackRepository } from '../../repositories/track/track.repository'
import { ToggleFavoritesRequest } from '../favorite/dto/toggle-favorites.request'

import { AllTagsResponse } from './dto/all-tags.response'
import { CreateTrackRequest } from './dto/create-track.request'
import { IFilteredQuery } from './dto/filtered-track.query'
import { UpdateTrackRequest } from './dto/update-track.request'

@Injectable()
export class TrackService {
	public constructor(
		private readonly trackRepository: TrackRepository,
		private readonly accountRepository: AccountRepository,
		private readonly favoritesRepository: FavoritesRepository
	) {}

	// ============================================================
	//   Получение всех записей маршрутов
	// ============================================================
	public async getAll(searchTerm?: string) {
		return this.trackRepository.getAll(searchTerm)
	}

	// ============================================================
	//   Фильтрация маршрутов
	// ============================================================
	public async getFiltered(filters: IFilteredQuery) {
		const whereConditions: any = {}

		if (filters.searchTerm) {
			whereConditions.OR = [
				{
					title: { contains: filters.searchTerm, mode: 'insensitive' }
				},
				{
					excerpt: {
						contains: filters.searchTerm,
						mode: 'insensitive'
					}
				},
				{ text: { contains: filters.searchTerm, mode: 'insensitive' } }
			]
		}

		if (filters.region) whereConditions.region = filters.region

		if (filters.tag) whereConditions.tags = { has: filters.tag }

		const orderBy: any = {}
		if (filters.sortBy === 'likes') {
			orderBy.likes = 'desc'
		} else {
			orderBy.createdAt = 'desc'
		}

		return this.trackRepository.getFiltered(whereConditions, orderBy)
	}

	// ============================================================
	//   Найти маршруты по пользователю
	// ============================================================
	public async findByUser(userId: string) {
		return this.trackRepository.findByUser(userId)
	}

	// ============================================================
	//   Получение количества маршрутов
	// ============================================================
	public async getCounts() {
		return this.trackRepository.getCount()
	}

	// ============================================================
	//   Получение количества регионов
	// ============================================================
	public async getRegionCount() {
		return this.trackRepository.getRegionCount()
	}

	// ============================================================
	//   Получение списка регионов
	// ============================================================
	public async getRegionName() {
		return this.trackRepository.getRegionName()
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
			date: new Date(date),
			likes: 0,
			lat,
			lng,
			duration,
			difficulty,
			account: { connect: { id: userId } }
		})
	}

	// ============================================================
	//   Получение самых популярных маршрутов
	// ============================================================
	public async getMostPopular() {
		return this.trackRepository.getMostPopular()
	}

	// ============================================================
	//   Получение наименование регионов с количеством маршрутов
	// ============================================================
	public async getRegions() {
		return this.trackRepository.getRegions()
	}

	// ============================================================
	//   Получение по ID
	// ============================================================
	public async getById(trackId: string) {
		return this.trackRepository.findById(trackId)
	}

	// ============================================================
	//   Обновление маршрута
	// ============================================================
	public async update(
		userId: string,
		trackId: string,
		data: UpdateTrackRequest
	) {
		const user = await this.accountRepository.findById(userId)
		if (!user) throw new NotFoundException('Пользователь не найден')

		const track = await this.trackRepository.findById(trackId)
		if (!track) throw new NotFoundException('Маршрут не найден')

		if (track.accountId !== user.id)
			throw new UnauthorizedException(
				'Маршрут не создан данным пользователем'
			)

		data.date = new Date(data.date).toISOString()

		await this.trackRepository.update(track.id, data)

		return true
	}

	// ============================================================
	//   Удаление маршрута
	// ============================================================
	public async remove(userId: string, trackId: string) {
		const user = await this.accountRepository.findById(userId)
		if (!user) throw new NotFoundException('Пользователь не найден')

		const track = await this.trackRepository.findById(trackId)
		if (!track) throw new NotFoundException('Маршрут не найден')

		if (track.accountId !== user.id)
			throw new UnauthorizedException(
				'Маршрут не создан данным пользователем'
			)

		await this.trackRepository.remove(track.id)

		return true
	}

	// ============================================================
	//   Получение списка всех тэгов
	// ============================================================
	public async getAllTags(): Promise<AllTagsResponse> {
		const tags = await this.trackRepository.getTags()
		return { tags }
	}
}

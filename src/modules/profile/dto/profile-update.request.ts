import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export class ProfileUpdateRequest {
	@ApiProperty({
		description: 'Имя пользователя',
		example: 'Иванов Иван'
	})
	@IsString()
	public name: string

	@ApiProperty({
		description: 'Изображение аватара',
		example: 'images/default-profile.png'
	})
	@IsString()
	public avatar: string

	@ApiProperty({
		description: 'Описание о себе',
		example:
			'Прошла более 3 000 км пешком по России. Специализируюсь на трекинге в горах и водных маршрутах. Верю, что самые красивые места — без асфальта.'
	})
	@IsString()
	public bio: string

	@ApiProperty({
		description: 'Новые комментарии к моим публикациям',
		example: true
	})
	@IsBoolean()
	public notificationNewComments: boolean

	@ApiProperty({
		description: 'Лайки к моим маршрутам',
		example: true
	})
	@IsBoolean()
	public notificationLikes: boolean

	@ApiProperty({
		description: 'Новые маршруты в избранных регионах',
		example: false
	})
	@IsBoolean()
	public notificationNewTrackInFavorites: boolean
}

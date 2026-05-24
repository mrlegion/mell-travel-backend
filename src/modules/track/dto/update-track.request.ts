import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	ArrayMinSize,
	ArrayNotEmpty,
	IsArray,
	IsISO8601,
	IsNumber,
	IsString
} from 'class-validator'

export class UpdateTrackRequest {
	@ApiProperty({
		example: 'Заголовок маршрута'
	})
	@IsString()
	public title: string

	@ApiProperty({
		example: 'Байкал'
	})
	@IsString()
	public region: string

	@ApiProperty({
		example: ['Горы']
	})
	@IsArray()
	@ArrayNotEmpty()
	@ArrayMinSize(1)
	@IsString({ each: true })
	public tags: string[]

	@ApiProperty({
		example: 'Полный текст для отображения'
	})
	@IsString()
	public text: string

	@ApiProperty({
		example: 'Простой текст для отображения'
	})
	@IsString()
	public excerpt: string

	@ApiProperty({
		example: [
			'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200'
		]
	})
	@IsArray()
	@ArrayNotEmpty()
	@ArrayMinSize(1)
	@IsString({ each: true })
	public images: string[]

	@ApiProperty({
		example: '2025-11-08'
	})
	@IsISO8601()
	public date: string

	@ApiProperty({
		example: 53.122294007642765
	})
	@IsNumber()
	public lat: number

	@ApiProperty({
		example: 98.22550839888048
	})
	@IsNumber()
	public lng: number

	@ApiProperty({
		example: '3 дня'
	})
	@IsString()
	public duration: string

	@ApiProperty({
		example: 'Средний'
	})
	@IsString()
	public difficulty: string
}

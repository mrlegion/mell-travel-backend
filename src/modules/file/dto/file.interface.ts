import { ApiProperty } from '@nestjs/swagger'

export class FileResponse {
	@ApiProperty({
		title: 'Ссылка для изображения с нашего сервера'
	})
	url: string

	@ApiProperty({
		title: 'Наименование изображения'
	})
	name: string
}

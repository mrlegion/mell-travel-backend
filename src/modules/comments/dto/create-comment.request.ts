import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateCommentRequest {
	@ApiProperty({
		description: 'Автор комментария',
		example: 'Иван Иванов'
	})
	@IsString()
	public author: string

	@ApiProperty({
		description: 'Текст комментария',
		example: 'Поделитесь впечатлением или задайте вопрос...'
	})
	@IsString()
	public text: string
}

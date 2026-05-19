import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateCommentRequest {
	@ApiProperty({
		description: 'Текст комментария',
		example: 'Поделитесь впечатлением или задайте вопрос...'
	})
	@IsString()
	public text: string
}

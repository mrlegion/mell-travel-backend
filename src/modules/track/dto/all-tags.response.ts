import { ApiProperty } from '@nestjs/swagger'

export class AllTagsResponse {
	@ApiProperty({
		title: 'Список уникальных тэгов'
	})
	tags: string[]
}

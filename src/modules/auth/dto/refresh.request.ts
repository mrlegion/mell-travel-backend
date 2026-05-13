import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class RefreshRequest {
	@ApiProperty({
		description: 'Токен обновления',
		example: 'you-token-refresh'
	})
	@IsString()
	public refreshToken: string
}

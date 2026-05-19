import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class LikeRequest {
	@ApiProperty({
		title: 'Id маршрута',
		example: 'generated_track_001'
	})
	@IsString()
	public trackId: string
}

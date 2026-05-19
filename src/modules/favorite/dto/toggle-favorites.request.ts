import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'

export class ToggleFavoritesRequest {
	@ApiProperty({
		example: 'generated_track_001'
	})
	@IsString()
	trackId: string
}

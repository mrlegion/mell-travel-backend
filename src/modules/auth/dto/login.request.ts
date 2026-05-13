import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class LoginRequest {
	@ApiProperty({
		description: 'Электронная почта',
		example: 'example@mail.ru'
	})
	@IsString()
	@IsEmail()
	public email: string

	@ApiProperty({
		description: 'Пароль',
		example: 'QwerAsdfZxcv321'
	})
	@IsString()
	@Length(8, 22)
	public password: string
}

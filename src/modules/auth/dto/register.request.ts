import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class RegisterRequest {
	@ApiProperty({
		description: 'Полное имя пользователя',
		example: 'Иванов Иван Иванович'
	})
	@IsString()
	public name: string

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

import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const config = app.get(ConfigService)

	const logger = new Logger()
	// требуется для хранения ключа авторизации
	app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))

	// подключаем глобальную проверку данных
	app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

	// настройка сервера для возможности изменения полей в браузере
	app.enableCors({
		origin: config.getOrThrow<string>('HTTP_CORS'),
		credentials: true
	})

	// используем Swagger для удобства отладки
	const swagger = SwaggerModule.createDocument(
		app,
		new DocumentBuilder()
			.setTitle('MellTravel Backend')
			.setDescription('Панель отладки API для приложения MellTravel')
			.setVersion('1.0.0')
			.addBearerAuth()
			.build()
	)
	SwaggerModule.setup('/docs', app, swagger, {
		jsonDocumentUrl: '/openapi.json'
	})

	const host = config.getOrThrow<string>('HTTP_HOST')
	const port = config.getOrThrow<string>('HTTP_PORT')

	await app.listen(port)

	logger.log(`Backend запустился: ${host}`)
	logger.log(`Swagger документация: ${host}/docs`)
}

void bootstrap()

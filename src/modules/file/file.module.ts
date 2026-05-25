import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'

import { PassportService } from '../../services/passport/passport.service'

import { FileController } from './file.controller'
import { FileService } from './file.service'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		})
	],
	controllers: [FileController],
	providers: [FileService, PassportService]
})
export class FileModule {}

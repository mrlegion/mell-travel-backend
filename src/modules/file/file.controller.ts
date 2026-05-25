import {
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import {
	ApiBearerAuth,
	ApiConsumes,
	ApiOperation,
	ApiResponse
} from '@nestjs/swagger'

import { Protected } from '../../shared/decorators'

import { FileResponse } from './dto/file.interface'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@ApiOperation({
		summary: 'Загрузка файлов на сервер'
	})
	@ApiResponse({
		type: FileResponse,
		status: HttpStatus.OK
	})
	@ApiBearerAuth()
	@UseInterceptors(FilesInterceptor('files'))
	@ApiConsumes('multipart/form-data')
	@Protected()
	@Post()
	@HttpCode(HttpStatus.OK)
	public async saveFiles(
		@UploadedFiles() files: Express.Multer.File[],
		@Query('folder') folder?: string
	) {
		return this.fileService.saveFiles(files, folder)
	}
}

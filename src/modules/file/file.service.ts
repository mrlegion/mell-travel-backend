import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'

import { FileResponse } from './dto/file.interface'

@Injectable()
export class FileService {
	public async saveFiles(
		files: Express.Multer.File[],
		folder: string = 'tracks'
	) {
		const uploadedFolder = `${path}/uploads/${folder}`

		await ensureDir(uploadedFolder)

		if (!files) return { message: 'файлы пустые' }

		const response: FileResponse[] = await Promise.all(
			files.map(async file => {
				const originalName = `${Date.now()}-${file.originalname}`

				await writeFile(
					`${uploadedFolder}/${originalName}`,
					file.buffer
				)

				return {
					url: `/uploads/${folder}/${originalName}`,
					name: originalName
				}
			})
		)

		return response
	}
}

import { Author } from './user.type'

export class Track {
	id: string
	title: string
	region: string
	tags: string[]
	excerpt: string
	images: string[]
	likes: number
	author: Author
}

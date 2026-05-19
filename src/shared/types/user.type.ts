import { Favorite } from './favorite.type'
import { Track } from './track.type'

export class User {
	id: string
	email: string
	name: string
	avatar: string
	bio: string
	notificationNewComments: boolean
	notificationLikes: boolean
	notificationNewTrackInFavorites: boolean
	tracks: Track[]
	favorites: Favorite[]
}

export class Author {
	id: string
	name: string
	email: string
	avatar: string
}

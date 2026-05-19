import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './modules/auth/auth.module'
import { CommentsModule } from './modules/comments/comments.module'
import { PrismaModule } from './services/prisma/prisma.module'
import { TokenModule } from './services/token/token.module'
import { TrackModule } from './modules/track/track.module';
import { ProfileModule } from './modules/profile/profile.module';
import { LikeModule } from './modules/like/like.module';
import { FavoriteModule } from './modules/favorite/favorite.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		AuthModule,
		PrismaModule,
		TokenModule,
		CommentsModule,
		TrackModule,
		ProfileModule,
		LikeModule,
		FavoriteModule
	]
})
export class AppModule {}

import { hash } from 'argon2'

import { CommentCreateManyInput } from './generated/models/Comment'
import { prisma } from './prisma-client'

async function createUsers() {
	await prisma.account.createMany({
		data: [
			{
				id: 'generated_user_001',
				email: 'ivan.ivanov@example.com',
				password: await hash('123456789'),
				name: 'Иван Иванов',
				bio: 'Люблю музыку'
			},
			{
				id: 'generated_user_002',
				email: 'petr.petrov@example.com',
				password: await hash('123456789'),
				name: 'Пётр Петров',
				bio: 'Активный слушатель'
			},
			{
				id: 'generated_user_003',
				email: 'maria.sidorova@example.com',
				password: await hash('123456789'),
				name: 'Мария Сидорова',
				bio: 'Фанат звука'
			},
			{
				id: 'generated_user_004',
				email: 'maria.sokolova@example.com',
				password: await hash('123456789'),
				name: 'Мария Соколова',
				avatar: 'https://api.mell-travel.ru/uploads/profile/generated_user_004/profile.jpg',
				bio: 'Прошла более 3 000 км пешком по России. Специализируюсь на трекинге в горах и водных маршрутах. Верю, что самые красивые места — без асфальта.'
			},
			{
				id: 'generated_user_005',
				email: 'dmitry.khramov@example.com',
				password: await hash('123456789'),
				name: 'Дмитрий Храмов',
				avatar: 'https://api.mell-travel.ru/uploads/profile/generated_user_005/profile.jpg',
				bio: 'Вело-путешественник, проехал более 15 000 км по России. Обожаю зимние маршруты и съёмку дикой природы. Моя цель — показать, что путешествовать можно в любую погоду.'
			},
			{
				id: 'generated_user_006',
				email: 'alexey.gorin@example.com',
				password: await hash('123456789'),
				name: 'Алексей Горин',
				bio: 'Вулканолог-любитель, исследователь Камчатки и Курил. Организую небольшие экспедиции к действующим вулканам. В путешествиях ценю аутентичность и тишину.'
			},
			{
				id: 'generated_user_007',
				email: 'olga.petrova@example.com',
				password: await hash('123456789'),
				name: 'Ольга Петрова',
				avatar: 'https://api.mell-travel.ru/uploads/profile/generated_user_007/profile.jpg',
				bio: 'Инструктор по водному туризму. Провожу сплавы по рекам Карелии и Кольского полуострова. Учу новичков чувствовать воду и управлять байдаркой.'
			},
			{
				id: 'generated_user_008',
				email: 'natalia.kim@example.com',
				password: await hash('123456789'),
				name: 'Наталья Ким',
				bio: 'Полярный гид, специалист по выживанию в арктических условиях. Провожу треки в Хибинах и на Кольском. Учу видеть красоту в суровой природе Севера.'
			},
			{
				id: 'generated_user_009',
				email: 'sergey.volkov@example.com',
				password: await hash('123456789'),
				name: 'Сергей Волков',
				bio: 'Автопутешественник, объездил весь Алтай и Саяны. Считаю, что лучший способ увидеть Россию — за рулём.',
				avatar: 'https://api.mell-travel.ru/uploads/profile/generated_user_009/profile.jpg'
			},
			{
				id: 'generated_user_010',
				email: 'elena.morozova@example.com',
				password: await hash('123456789'),
				name: 'Елена Морозова',
				avatar: 'https://api.mell-travel.ru/uploads/profile/generated_user_010/profile.jpg',
				bio: 'Эко-активистка, участница волонтёрских проектов по очистке Байкала. Люблю пешие походы и бережное отношение к природе.'
			},
			{
				id: 'generated_user_011',
				email: 'pavel.novikov@example.com',
				password: await hash('123456789'),
				name: 'Павел Новиков',
				avatar: 'https://api.mell-travel.ru/uploads/profile/generated_user_011/profile.jpg',
				bio: 'Альпинист, вулканолог. Покорил все действующие вулканы Камчатки. Пишу статьи о безопасности в горах.'
			},
			{
				id: 'generated_user_012',
				email: 'anna.vlasova@example.com',
				password: await hash('123456789'),
				name: 'Анна Власова',
				avatar: 'https://api.mell-travel.ru/uploads/profile/generated_user_012/profile.jpg',
				bio: 'Мастер спорта по водному туризму. Организую сплавы для команд и корпоративов. Учу работать в команде на воде.'
			},
			{
				id: 'generated_user_013',
				email: 'mikhail.zaytsev@example.com',
				password: await hash('123456789'),
				name: 'Михаил Зайцев',
				avatar: 'https://api.mell-travel.ru/uploads/profile/generated_user_013/profile.jpg',
				bio: 'Горный гид, знаю Алтай от и до. Помогаю туристам выбирать безопасные маршруты и получать максимум удовольствия.'
			}
		]
	})

	console.log(`✅ Создано 13 пользователей`)
}

async function createTracks() {
	await prisma.track.createMany({
		data: [
			{
				id: 'generated_track_001',
				title: 'Алтай: три недели в горах без связи',
				region: 'Алтай',
				tags: ['горы', 'трекинг', 'дикая природа'],
				text: 'Мы отправились на Алтай в середине августа, когда жара в городах становится невыносимой, а горы зовут прохладой и тишиной. Маршрут проходил через перевал Кату-Ярык — один из самых живописных и суровых перевалов Сибири. Горная тропа Долины Чулышмана открывается постепенно, каждый поворот дарит новую панораму. Мы прошли более 180 км за 20 дней, ночуя в палатках на берегах горных рек. Это был опыт, который изменил меня навсегда.',
				excerpt:
					'Маршрут через перевал Кату-Ярык и Долину Чулышмана — 180 км пешком без связи. Опыт, который меняет взгляд на жизнь.',
				images: [
					'https://api.mell-travel.ru/uploads/tracks/generated_track_001/photo (1).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_001/photo (2).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_001/photo (3).jpg'
				],
				date: new Date('2025-08-14'),
				likes: 142,
				lat: 51.5,
				lng: 87.6,
				duration: '20 дней',
				difficulty: 'Сложный',
				accountId: 'generated_user_004'
			},
			{
				id: 'generated_track_002',
				title: 'Байкал в марте: лёд, торосы и тишина',
				region: 'Байкал',
				tags: ['зима', 'лёд', 'природа'],
				text: 'Зимний Байкал — это другая планета. Лёд толщиной более метра поглощает звук, создавая абсолютную тишину. Мы путешествовали на велосипедах по льду от Листвянки до Ольхона — около 250 км за 7 дней. Ночевали в сёлах у местных жителей. Торосы — трещины во льду — создают сюрреалистичные скульптуры, которые невозможно описать словами. Только увидеть.',
				excerpt:
					'Зимний веломаршрут по льду Байкала — 250 км от Листвянки до Ольхона. Торосы, тишина и звёздное небо над самым глубоким озером планеты.',
				images: [
					'https://api.mell-travel.ru/uploads/tracks/generated_track_002/photo (1).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_002/photo (2).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_002/photo (3).jpg'
				],
				date: new Date('2025-03-20'),
				likes: 218,
				lat: 53.2,
				lng: 107.3,
				duration: '7 дней',
				difficulty: 'Средний',
				accountId: 'generated_user_005'
			},
			{
				id: 'generated_track_003',
				title: 'Камчатка: вулканы с близкого расстояния',
				region: 'Камчатка',
				tags: ['вулканы', 'экстрим', 'треккинг'],
				text: 'Восхождение на Авачинский вулкан — это боевое крещение для каждого туриста, приехавшего на Камчатку. Высота 2741 метр, серный запах, горячие фумаролы и вид на Авачинскую бухту, которая считается одной из красивейших в мире. Мы провели на полуострове 12 дней, посетив Долину Гейзеров, кальдеру Узон и медвежью рыбалку на реке Камбальной.',
				excerpt:
					'Восхождение на Авачинский вулкан, Долина Гейзеров и медвежья рыбалка. 12 дней на самом удалённом и удивительном полуострове России.',
				images: [
					'https://api.mell-travel.ru/uploads/tracks/generated_track_003/photo (3).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_003/photo (4).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_003/photo (5).jpg'
				],
				date: new Date('2025-07-05'),
				likes: 305,
				lat: 53.2,
				lng: 159.0,
				duration: '12 дней',
				difficulty: 'Сложный',
				accountId: 'generated_user_004'
			},
			{
				id: 'generated_track_004',
				title: 'Карелия: озёра, пороги и белые ночи',
				region: 'Карелия',
				tags: ['водный туризм', 'природа', 'каяк'],
				text: 'Сплав по рекам Карелии на байдарках — это мечта каждого любителя водного туризма. Мы прошли маршрут Суна–Воттовааре за 10 дней. Водопад Кивач, скалы Воттовааре, ночные зарницы в июне — всё это сложилось в незабываемую картину. В белые ночи не хочется спать совсем.',
				excerpt:
					'Байдарочный маршрут Суна–Воттовааре в Карелии. Водопад Кивач, скалы и удивительные белые ночи в 10 днях сплава.',
				images: [
					'https://api.mell-travel.ru/uploads/tracks/generated_track_004/photo (1).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_004/photo (2).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_004/photo (3).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_004/photo (4).jpg'
				],
				date: new Date('2025-06-18'),
				likes: 89,
				lat: 62.9,
				lng: 33.1,
				duration: '10 дней',
				difficulty: 'Средний',
				accountId: 'generated_user_007'
			},
			{
				id: 'generated_track_005',
				title: 'Хибины: полярный день и горная тундра',
				region: 'Мурманская область',
				tags: ['горы', 'арктика', 'треккинг'],
				text: 'Хибинский горный массив в Мурманской области — малоизвестный, но потрясающий уголок России. В июле здесь полярный день: солнце не заходит сутками. Мы прошли кольцевой маршрут вокруг горного массива за 8 дней. Горная тундра, перевалы, карликовые берёзы и тишина, нарушаемая лишь ветром.',
				excerpt:
					'Кольцевой маршрут по Хибинам в условиях полярного дня. Горная арктическая тундра в 8 днях пешего путешествия.',
				images: [
					'https://api.mell-travel.ru/uploads/tracks/generated_track_005/photo (1).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_005/photo (2).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_005/photo (3).jpg'
				],
				date: new Date('2025-07-22'),
				likes: 64,
				lat: 67.6,
				lng: 33.7,
				duration: '8 дней',
				difficulty: 'Средний',
				accountId: 'generated_user_004'
			},
			{
				id: 'generated_track_006',
				title: 'Алтай: Чуйский тракт и долина реки Чуя',
				region: 'Алтай',
				tags: ['горы', 'автотуризм', 'природа'],
				text: 'Чуйский тракт — одно из самых живописных шоссе в мире. Мы проехали от Бийска до границы с Монголией, останавливаясь в самых красивых местах: перевал Чике-Таман, петроглифы Калбак-Таш, Марс-1 и Марс-2. Ночёвки в палатках прямо у реки Чуи. Дорога отличная, но нужно быть готовым к резкой смене высот. Особенно впечатлили разноцветные горы в районе Кош-Агача — похоже на марсианский пейзаж.',
				excerpt:
					'Путешествие по Чуйскому тракту от Бийска до границы с Монголией. Марсианские пейзажи, петроглифы и палатки у реки.',
				images: [
					'https://api.mell-travel.ru/uploads/tracks/generated_track_006/photo (1).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_006/photo (2).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_006/photo (3).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_006/photo (4).jpg'
				],
				date: new Date('2025-07-30'),
				likes: 112,
				lat: 50.2,
				lng: 86.5,
				duration: '10 дней',
				difficulty: 'Средний',
				accountId: 'generated_user_009'
			},
			{
				id: 'generated_track_007',
				title: 'Байкал: Большая Байкальская тропа (Листвянка — Большие Коты)',
				region: 'Байкал',
				tags: ['трекинг', 'природа', 'озеро'],
				text: 'Один из самых доступных и красивых участков Большой Байкальской тропы. Мы прошли из Листвянки до посёлка Большие Коты за 2 дня с одной ночёвкой в палатке. Тропа идёт вдоль берега Байкала, открываются невероятные виды на озеро. В Больших Котах обязательно зайдите в музей Байкаловедения. Вода в озере даже в июле холодная, но купаться можно. Совет: берите с собой репеллент от клещей и дождевик — погода меняется быстро.',
				excerpt:
					'Поход по Большой Байкальской тропе от Листвянки до Больших Котов. 2 дня вдоль самого глубокого озера в мире.',
				images: [
					'https://api.mell-travel.ru/uploads/tracks/generated_track_007/photo (1).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_007/photo (2).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_007/photo (3).jpg'
				],
				date: new Date('2025-07-15'),
				likes: 98,
				lat: 51.9,
				lng: 104.8,
				duration: '2 дня',
				difficulty: 'Лёгкий',
				accountId: 'generated_user_010'
			},
			{
				id: 'generated_track_008',
				title: 'Камчатка: Восхождение на Мутновский вулкан',
				region: 'Камчатка',
				tags: ['вулканы', 'экстрим', 'треккинг'],
				text: 'Мутновский вулкан — один из самых активных и доступных на Камчатке. Высота 2322 метра. Восхождение занимает 5-6 часов. Главная фишка — активные фумаролы, грязевые котлы и пар из трещин прямо под ногами. Нужна хорошая физическая подготовка и тёплая непродуваемая одежда. Мы поднимались с гидом, но тропа хорошо обозначена. Вид на кратер и окрестные вулканы неописуемый. Обязательно берите с собой термос с горячим чаем!',
				excerpt:
					'Активный вулкан Мутновский: восхождение к кратеру с фумаролами и паровыми полями. 5-6 часов незабываемых впечатлений.',
				images: [
					'https://api.mell-travel.ru/uploads/tracks/generated_track_008/photo (1).jpeg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_008/photo (1).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_008/photo (3).jpg'
				],
				date: new Date('2025-08-20'),
				likes: 156,
				lat: 52.45,
				lng: 158.2,
				duration: '1 день',
				difficulty: 'Сложный',
				accountId: 'generated_user_011'
			},
			{
				id: 'generated_track_009',
				title: 'Карелия: Рафтинг на реке Шуя',
				region: 'Карелия',
				tags: ['водный туризм', 'экстрим', 'рафтинг'],
				text: 'Река Шуя — одна из лучших в Карелии для спортивного рафтинга. Пороги 2-3 категории сложности: «Гать», «Мост», «Труба». Мы прошли 60 км за 3 дня на катамаранах. Ночёвки на живописных берегах, рыбалка на щуку и окуня, купание в кристально чистых озёрах по пути. Требуется опыт водного туризма, но можно и с инструктором. В июне — белые ночи, спать почти не хочется!',
				excerpt:
					'Сплав по реке Шуя на катамаранах. Пороги, ночёвки на берегу и белые ночи карельского лета.',
				images: [
					'https://api.mell-travel.ru/uploads/tracks/generated_track_009/photo (1).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_009/photo (2).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_009/photo (3).jpg'
				],
				date: new Date('2025-07-10'),
				likes: 87,
				lat: 62.0,
				lng: 34.5,
				duration: '3 дня',
				difficulty: 'Средний',
				accountId: 'generated_user_012'
			},
			{
				id: 'generated_track_010',
				title: 'Алтай: Поход к Телецкому озеру',
				region: 'Алтай',
				tags: ['горы', 'озеро', 'трекинг'],
				text: 'Телецкое озеро — жемчужина Алтая. Мы прошли пешком от Артыбаша до водопада Корбу, а затем поднялись на смотровую площадку на хребте Торот. Вода в озере бирюзового цвета, видимость до 15 метров. Лучшее время — июль-август. Маршрут подходит для новичков: тропа хорошо оборудована, есть места для ночлега с палатками. Обязательно возьмите купальник — вода прогревается до +18!',
				excerpt:
					'Пеший поход к Телецкому озеру с восхождением на смотровую площадку. Идеальный маршрут для знакомства с Алтаем.',
				images: [
					'https://api.mell-travel.ru/uploads/tracks/generated_track_010/photo (1).JPG',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_010/photo (2).jpg',
					'https://api.mell-travel.ru/uploads/tracks/generated_track_010/photo (3).jpg'
				],
				date: new Date('2025-08-25'),
				likes: 104,
				lat: 51.8,
				lng: 87.3,
				duration: '4 дня',
				difficulty: 'Лёгкий',
				accountId: 'generated_user_013'
			}
		]
	})

	console.log(`✅ Создано 10 маршрутов`)
}

async function createFavorites() {
	await prisma.favorite.createMany({
		data: [
			{
				id: 'generated_f_001',
				accountId: 'generated_user_004',
				trackId: 'generated_track_001'
			},
			{
				id: 'generated_f_002',
				accountId: 'generated_user_004',
				trackId: 'generated_track_010'
			},
			{
				id: 'generated_f_003',
				accountId: 'generated_user_004',
				trackId: 'generated_track_008'
			},
			{
				id: 'generated_f_004',
				accountId: 'generated_user_004',
				trackId: 'generated_track_006'
			},
			{
				id: 'generated_f_005',
				accountId: 'generated_user_006',
				trackId: 'generated_track_001'
			},
			{
				id: 'generated_f_006',
				accountId: 'generated_user_006',
				trackId: 'generated_track_002'
			},
			{
				id: 'generated_f_007',
				accountId: 'generated_user_005',
				trackId: 'generated_track_004'
			},
			{
				id: 'generated_f_008',
				accountId: 'generated_user_005',
				trackId: 'generated_track_005'
			}
		]
	})

	console.log(`✅ Создано 8 избранного`)
}

async function createComments() {
	// 1. Получаем всех пользователей и треки из БД
	const accounts = await prisma.account.findMany()
	const tracks = await prisma.track.findMany()

	// 2. Создаём map для быстрого доступа к имени пользователя по accountId
	const accountNameMap = new Map(accounts.map(acc => [acc.id, acc.name]))

	// 3. Генерируем 30 комментариев
	const commentsData: CommentCreateManyInput[] = []

	for (let i = 1; i <= 30; i++) {
		// Выбираем случайного пользователя и случайный трек
		const randomAccount =
			accounts[Math.floor(Math.random() * accounts.length)]

		const randomTrack = tracks[Math.floor(Math.random() * tracks.length)]

		// Берём имя пользователя из account.name
		const authorName = accountNameMap.get(randomAccount.id) || 'Аноним'

		// Варианты текстов комментариев (разнообразие)
		const commentTexts = [
			'Красивейшее место! Обязательно повторю этот маршрут.',
			'Спасибо за подробный отчёт, очень полезно!',
			'А в какое время года лучше всего идти?',
			'Фотографии потрясающие!',
			'Добавил в избранное, планирую повторить.',
			'Был там в прошлом году, эмоции до сих пор переполняют.',
			'А как с ночёвками? Нужно бронировать заранее?',
			'Отличный трек, спасибо за координаты!',
			'Какая экипировка понадобится?',
			'Тоже хочу туда попасть, вдохновился вашим рассказом.',
			'Осторожнее там с клещами в сезон!',
			'Вода реально такой бирюзовой была или фильтры?',
			'Сколько километров в день проходили?',
			'А гида нанимали или сами?',
			'Лучшее путешествие в моей жизни!',
			'Сложновато для новичка, но очень хочется попробовать.',
			'Какая невероятная природа, словно в другом мире.',
			'Сохраню себе в копилку маршрутов.',
			'А дороги там нормальные? На обычной машине проехать?',
			'Сколько дней занял весь маршрут?',
			'Фотки супер, особенно закат на 3-й!',
			'А как с мобильной связью в тех местах?',
			'Мечтаю там побывать, спасибо за мотивацию!',
			'Очень подробный трек, респект автору!',
			'А диких зверей не встречали?',
			'Какая средняя температура была во время похода?',
			'Обязательно возьму на заметку для следующего отпуска.',
			'Повторил ваш маршрут летом - лучший отпуск!',
			'А с палатками проблем не было? Где останавливались?',
			'Неожиданно было увидеть такой красивый трек из своего региона!'
		]

		// Циклически проходим по текстам или выбираем случайный
		const text =
			commentTexts[Math.floor(Math.random() * commentTexts.length)]

		commentsData.push({
			text: text,
			author: authorName,
			accountId: randomAccount.id,
			trackId: randomTrack.id
		})
	}

	await prisma.comment.createMany({
		data: commentsData
	})

	console.log(`✅ Создано ${commentsData.length} комментариев`)
}

async function up() {
	await createUsers()
	await createTracks()
	await createFavorites()
	await createComments()
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "accounts" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "tracks" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "comments" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "favorites" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "likes" RESTART IDENTITY CASCADE`
}

async function main() {
	try {
		await down()
		await up()
	} catch (e) {
		console.error(e)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})

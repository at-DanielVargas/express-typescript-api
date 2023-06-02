// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

import { Greeting } from './entities/greeting.entity';
import GreetingSeeder from './seeding/greeting-seeder';

const options: DataSourceOptions & SeederOptions = {
	type: 'postgres',
	host: process.env.DATABASE_HOST || 'localhost',
	port: parseInt(process.env.DATABASE_PORT || '5432'),
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	logging: true,

	entities: [Greeting],

	factories: [],
	seeds: [GreetingSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
	await dataSource.synchronize(true);
	await runSeeders(dataSource);
	process.exit();
});

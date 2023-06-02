import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Greeting } from '../entities/greeting.entity';

export default class GreetingSeeder implements Seeder {
	public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
		const repository = dataSource.getRepository(Greeting);

		await repository.insert([
			{
				word: 'Hello',
				lang: 'en',
			},
			{
				word: 'Hola',
				lang: 'es',
			},
			{
				word: 'Hallo',
				lang: 'de',
			},
			{
				word: 'Привет',
				lang: 'ru',
			},
			{
				word: 'Bonjour',
				lang: 'fr',
			},
		]);
	}
}

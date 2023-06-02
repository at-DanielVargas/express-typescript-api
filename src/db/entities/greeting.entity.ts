import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'greeting' })
export class Greeting {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		length: 256,
	})
	word!: string;

	@Column({
		length: 2,
	})
	lang!: string;
}

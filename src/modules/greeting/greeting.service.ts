import { InsertResult } from 'typeorm';
import { Greeting } from '../../db/entities/greeting.entity';
import { dataSource } from '../../db/datasource';
import { Result } from '../../constants/result';
import { ErrorResult, NotFoundResult, SuccessResult } from 'src/interfaces/results';

export type CreateOrUpdateGreetingResult = SuccessResult<{ id: Greeting['id'] }> | ErrorResult;
export type DeleteGreetingResult = SuccessResult<null> | ErrorResult;
export type GreetingsResult = SuccessResult<Greeting[]> | ErrorResult;
export type GreetingResult = SuccessResult<Greeting> | NotFoundResult | ErrorResult;

export function updateGreetingEntry(
	greetingId: number,
	greetingData: Omit<Greeting, 'id'>
): Promise<CreateOrUpdateGreetingResult> {
	return dataSource
		.getRepository(Greeting)
		.update(
			{
				id: greetingId,
			},
			greetingData
		)
		.then<SuccessResult<{ id: Greeting['id'] }>>(() => ({
			type: Result.SUCCESS,
			data: { id: greetingId },
		}))
		.catch((error) => ({
			type: Result.ERROR,
			message: `An unexpected error occurred during updating greeting with id ${greetingId}`,
			error,
		}));
}

export function insertGreeting(
	greeting: Omit<Greeting, 'id'>
): Promise<CreateOrUpdateGreetingResult> {
	return dataSource
		.getRepository(Greeting)
		.insert(greeting)
		.then<SuccessResult<{ id: Greeting['id'] }>>((insertedGreeting: InsertResult) => ({
			type: Result.SUCCESS,
			data: { id: insertedGreeting.raw[0].id },
		}))
		.catch((error) => ({
			type: Result.ERROR,
			message: `An unexpected error occurred during creating greeting`,
			error,
		}));
}

export function deleteGreetingEntry(greetingId: number): Promise<DeleteGreetingResult> {
	return dataSource
		.getRepository(Greeting)
		.delete({
			id: greetingId,
		})
		.then<SuccessResult<null>>(() => ({
			type: Result.SUCCESS,
			data: null,
		}))
		.catch((error) => ({
			type: Result.ERROR,
			message: `An unexpected error occurred while deleting technology with id ${greetingId}`,
			error: error,
		}));
}

export function getGreetings(): Promise<SuccessResult<Greeting[]> | ErrorResult> {
	return dataSource
		.getRepository(Greeting)
		.find()
		.then<SuccessResult<Greeting[]>>((greetings: Greeting[]) => ({
			type: Result.SUCCESS,
			data: greetings,
		}))
		.catch((error) => ({
			type: Result.ERROR,
			message: error.message,
			error,
		}));
}

export function findGreeting(greetingId: number): Promise<GreetingResult> {
	return dataSource
		.getRepository(Greeting)
		.findOne({
			where: {
				id: greetingId,
			},
		})
		.then<SuccessResult<Greeting> | NotFoundResult>((result) => {
			if (!result) {
				return {
					type: Result.NOT_FOUND,
					message: `Could not find technology with id: ${greetingId}`,
				};
			}
			return {
				type: Result.SUCCESS,
				data: result,
			};
		})
		.catch((error) => {
			return {
				type: Result.ERROR,
				message: `Unexpected error while fetching technology with id ${greetingId}`,
				error,
			};
		});
}

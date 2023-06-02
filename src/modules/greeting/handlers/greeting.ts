import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { GreetingsResult, getGreetings } from '../greeting.service';
import { useCache } from '../../../cache/cache';
import { Result } from '../../../constants/result';
import { LogHelper } from '../../../utils/log-helper';

export async function greetings(req: Request, res: Response, next: NextFunction) {
	const result = await useCache<GreetingsResult>(req.baseUrl, getGreetings);

	if (result.type === Result.ERROR) {
		LogHelper.error('An unexpected error occurred', result.message, result.error);
		return next(result.error);
	}
	res.status(StatusCodes.OK).json(result.data);
}

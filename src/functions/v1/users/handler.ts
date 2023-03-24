// TODO: Module docs
import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import schema from './schema';
import { createUser } from './service';


//TODO: Function docs
const createUserFun: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	// Create user object.
	const user = {
		phone: event.body.phone,
		date: new Date().getTime()
	};

	try {
		// Save user to db.
		await createUser(user);

		return formatJSONResponse({
			statusCode: 201,
			message: 'User created',
			data: user.phone
		});
	} catch (error) {
		return formatJSONResponse({
			statusCode: 500,
			message: 'Failed to create user',
			error: error.message
		});
	}
};

export const createUserHan = middyfy(createUserFun);

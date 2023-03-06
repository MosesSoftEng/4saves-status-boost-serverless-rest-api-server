/*
 * Module that;
 * - Contains lambda function code, processes input and calls appropriate service methods.
 */

// API Gateway proxy event for custom validation on request.
import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';

// A utility function to create an HTTP response object with a JSON-formatted response body.
import {formatJSONResponse} from '@libs/api-gateway';

import {middyfy} from '@libs/lambda';
import {User} from './model';

// Structure of request.
import schema from './schema';

// Sercice methods - Business logic
import { createUser } from './service';

/*
 * createUser - function
 */
// Using type annotation for function identifier, in order to apply a custom validation on request
//	ValidatedEventAPIGatewayProxyEvent will handle validation of request body data based on schema.
const createUserFun: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	// Create user object.
	const user: User = {
		phone: event.body.phone, // Get phone from request body.
		code: '',
		codeVerified: false,
		token: '',
		date: new Date().getTime()
	};

	try {
		const newUser = await createUser(user);

		return formatJSONResponse({
			message: 'User created',
			data: newUser
		});
	} catch (error) {
		// TODO: hide error from consumer only inhouse.
		return formatJSONResponse({
			statusCode: 500,
			message: 'Failed to create user',
			error: error.message
		});
	}
};

export const createUserHan = middyfy(createUserFun);

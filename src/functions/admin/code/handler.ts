/*
 * Module that;
 * - Contains lambda function code, processes input and calls appropriate service methods.
 */

// API Gateway proxy event for custom validation on request.
import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';

// A utility function to create an HTTP response object with a JSON-formatted response body.
import {formatJSONResponse} from '@libs/api-gateway';

import {middyfy} from '@libs/lambda';

// Structure of request.
import schema from './schema';

// Business logic aka services.
import { createCode } from './service';

/*
 * createCodeHan - function
 */
const createCodeFun: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		const code = await createCode(event.body.phone);

		return formatJSONResponse({
			message: 'User created',
			data: code
		});
	} catch (error) {
		return formatJSONResponse({
			statusCode: 500,
			message: 'Failed to create code',
			error: error.message
		});
	}
};

export const createCodeHan = middyfy(createCodeFun);

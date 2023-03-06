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
import { verifyCode } from './service';

/*
 * 
 */
const verifyCodeFun: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		// TODO: use spread operator
		const token = await verifyCode(event.body.phone, event.body.code);

		return formatJSONResponse({
			message: 'User created',
			data: token
		});
	} catch (error) {
		// TODO: Do not show error in api, only for internal consumption, send sonsumer an error code
		return formatJSONResponse({
			statusCode: 500,
			message: 'Failed to verify code',
			error: error.message
		});
	}
};

export const verifyCodeHan = middyfy(verifyCodeFun);

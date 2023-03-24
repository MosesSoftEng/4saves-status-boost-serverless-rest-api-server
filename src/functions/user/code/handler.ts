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
import verifyCodeschema from './verifyCodeschema';

// Business logic aka services.
import {createCode, verifyCode} from './service';

//TODO: Document functions

/*
 * createCodeHan - function
 */
const createCodeFun: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		const code = await createCode(event.body.phone);

		return formatJSONResponse({
			message: 'Code created',
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

const createCodeHan = middyfy(createCodeFun);


/*
 * Check if a code is valid.
 */
const verifyCodeFun: ValidatedEventAPIGatewayProxyEvent<typeof verifyCodeschema> = async (event) => {
	try {
		const token = await verifyCode(event.queryStringParameters.phone, event.queryStringParameters.code);

		return formatJSONResponse({
			statusCode: 200,
			message: 'Code verified',
			data: token
		});
	} catch (error) {
		return formatJSONResponse({
			statusCode: 500,
			message: error.message
		});
	}
};

const verifyCodeHan = middyfy(verifyCodeFun);

export {createCodeHan, verifyCodeHan};

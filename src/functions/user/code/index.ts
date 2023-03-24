/*
 * Module that;
 * - Exports lambda functions.
 * - Defines configurations for lambda functions.
 */

import schema from './schema';
import {handlerPath} from '@libs/handler-resolver';

/*
 * Configuration object for lambda function createUser.
 */
// export default {
// 	// Specifies the path to the handler function for the Lambda function and exported function name.
// 	handler: `${handlerPath(__dirname)}/handler.createCodeHan`,

// 	//  Array of event objects that trigger the Lambda function. Hooks lambda function to events.
// 	events: [
// 		{
// 			// HTTP request event trigger.
// 			http: {
// 				method: 'post',
// 				path: 'user/code',
// 				request: {
// 					// Specifies the request schema.
// 					schemas: {
// 						'application/json': schema,
// 					},
// 				},
// 			},
// 		},
// 	],
// 	iamRoleStatements: [
// 		{
// 			Effect: 'Allow',
// 			Action: [
// 				'dynamodb:GetItem',
// 				'dynamodb:PutItem',
// 			],
// 			Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:service}-users-${self:provider.stage}',
// 		},
// 	],
// };

export const createCode = {
	// Specifies the path to the handler function for the Lambda function and exported function name.
	handler: `${handlerPath(__dirname)}/handler.createCodeHan`,

	//  Array of event objects that trigger the Lambda function. Hooks lambda function to events.
	events: [
		{
			// HTTP request event trigger.
			http: {
				method: 'post',
				path: 'user/code',
				request: {
					// Specifies the request schema.
					schemas: {
						'application/json': schema,
					},
				},
			},
		},
	],
	iamRoleStatements: [
		{
			Effect: 'Allow',
			Action: [
				'dynamodb:GetItem',
				'dynamodb:PutItem',
			],
			Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:service}-users-${self:provider.stage}',
		},
	],
};

export const verifyCode = {
	// Specifies the path to the handler function for the Lambda function and exported function name.
	handler: `${handlerPath(__dirname)}/handler.verifyCodeHan`,

	//  Array of event objects that trigger the Lambda function. Hooks lambda function to events.
	events: [
		{
			// HTTP request event trigger.
			http: {
				method: 'get',
				path: 'user/code/check',
			},
		},
	],
	iamRoleStatements: [
		{
			Effect: 'Allow',
			Action: [
				'dynamodb:GetItem',
			],
			Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:service}-users-${self:provider.stage}',
		},
	],
};

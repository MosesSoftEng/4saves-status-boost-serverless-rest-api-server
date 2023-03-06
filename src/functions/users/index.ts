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
export default {
	// Specifies the path to the handler function for the Lambda function and exported function name.
	handler: `${handlerPath(__dirname)}/handler.createUserHan`,

	//  Array of event objects that trigger the Lambda function. Hooks lambda function to events.
	events: [
		{
			// HTTP request event trigger.
			http: {
				method: 'post',
				path: 'users',
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

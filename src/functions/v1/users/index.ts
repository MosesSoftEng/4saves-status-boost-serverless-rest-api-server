// TODO: Add module docs.
import schema from './schema';
import {handlerPath} from '@libs/handler-resolver';


// TODO: Add function docs.
// TODO: OpenAPI dosc.
export const createCode_v1 = {
	// Specifies the path to the handler function for the Lambda function and exported function name.
	handler: `${handlerPath(__dirname)}/handler.createUserHan`,

	//  Array of event objects that trigger the Lambda function. Hooks lambda function to events.
	events: [
		{
			// HTTP request event trigger.
			http: {
				method: 'post',
				path: 'v1/users',
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
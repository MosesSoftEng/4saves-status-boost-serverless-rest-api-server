import type {AWS} from '@serverless/typescript';

import hello from '@functions/hello';
import users from '@functions/users';
import user from '@functions/user/code';
import adminCode from '@functions/admin/code';

const serverlessConfiguration: AWS = {
	service: 'four-saves',
	frameworkVersion: '3',
	plugins: [
		'serverless-esbuild',
		'serverless-offline',
		// Plugin to allow Custom Roles for each Lambda Function.
		'serverless-iam-roles-per-function',
	],
	provider: {
		// AWS profile to use.
		profile: 'completecoding.io-serverless',
		stage: 'dev',
		name: 'aws',
		runtime: 'nodejs14.x',
		region: 'us-east-1',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},

		// Environment variables.
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
			TABLE_USERS: '${self:service}-users-${self:provider.stage}',
			TABLE_SAVES: '${self:service}-saves-${self:provider.stage}',
		},
	},

	/*
	 * Lambda Functions.
	 */
	// Import the function via paths.
	functions: {hello, users, user, adminCode},
	package: {individually: true},
	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node14',
			define: {'require.resolve': undefined},
			platform: 'node',
			concurrency: 10,
		},
	},

	/*
	 * Resources
	 */
	resources: {
		Resources: {
			// DynamoDB tables.
			UsersTable: {
				Type: 'AWS::DynamoDB::Table',
				Properties: {
					TableName: '${self:provider.environment.TABLE_USERS}',
					AttributeDefinitions: [
						{
							AttributeName: 'phone',
							AttributeType: 'S',
						}
					],
					KeySchema: [
						{
							AttributeName: 'phone',
							KeyType: 'HASH',
						}
					],
					BillingMode: 'PAY_PER_REQUEST'
				},
			},
			SavesTable: {
				Type: 'AWS::DynamoDB::Table',
				Properties: {
					TableName: '${self:provider.environment.TABLE_SAVES}',
					AttributeDefinitions: [
						{
							AttributeName: 'userId',
							AttributeType: 'S',
						}
					],
					KeySchema: [
						{
							AttributeName: 'userId',
							KeyType: 'HASH',
						}
					],
					BillingMode: 'PAY_PER_REQUEST'
				},
			},
		}
	}
};

module.exports = serverlessConfiguration;

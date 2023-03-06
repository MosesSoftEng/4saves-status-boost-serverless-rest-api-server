/*
 * Module that;
 * - Interacts with data layer, abstract interaction with storage.
 */
import * as AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();

export async function getUserByPhone(userPhone: string): Promise<User> {
	const result = await docClient.get({
		TableName: process.env.TABLE_USERS,
		Key: {
			phone: userPhone,
		},
	}).promise();

	return result.Item as User;
}

export async function createUserCode(phone: string): Promise<string> {
	
	await docClient.put({
		TableName: process.env.TABLE_USERS,
		Item: user,
	}).promise();

	return user;
}

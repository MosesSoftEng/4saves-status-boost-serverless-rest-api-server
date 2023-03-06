/*
 * Module that;
 * - Interacts with data layer, abstract interaction with storage.
 */
import * as AWS from 'aws-sdk';
import {User} from './model';

const docClient = new AWS.DynamoDB.DocumentClient();


/**
 * Retrieves a user from the database table with the specified phone number.
 * @param {string} phone - The phone number of the user to retrieve.
 * @returns {Promise<User>} - A promise that resolves to the retrieved user object.
 */
export async function getUserByPhone(phone: string): Promise<User> {
	const result = await docClient.get({
		TableName: process.env.TABLE_USERS,
		Key: {
			phone: phone,
		},
	}).promise();

	return result.Item as User;
}

export async function createUser(user: User): Promise<User> {
	await docClient.put({
		TableName: process.env.TABLE_USERS,
		Item: user,
	}).promise();

	return user;
}

export async function updateUser(user: User): Promise<User> {
	await docClient.put({
		TableName: process.env.TABLE_USERS,
		Item: user,
	}).promise();

	return user;
}

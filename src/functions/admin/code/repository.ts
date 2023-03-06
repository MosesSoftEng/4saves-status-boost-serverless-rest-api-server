/*
 * Module that - 
 * - Interacts with data layer, abstract interaction with storage.
 */
import * as AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();

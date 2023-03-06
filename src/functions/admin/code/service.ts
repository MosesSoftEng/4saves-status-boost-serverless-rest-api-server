import * as userRepository from '../../users/repository';
import {generateCode} from '../../../utils/common';


export async function verifyCode(phone: string, code: string): Promise<string> {
	// Get user.
	const user = await userRepository.getUserByPhone(phone);

	// User check.
	if(!user) {
		throw new Error(`User with phone '${phone}' does not already exists`);
	}

	// Code check.
	if(user.code !== code) {
		throw new Error(`User with code '${code}' does not already exists`);
	}

	user.codeVerified = true;
	user.token = generateCode(32);

	// Save user by overwriting.
	await userRepository.createUser(user);

	return user.token;
}

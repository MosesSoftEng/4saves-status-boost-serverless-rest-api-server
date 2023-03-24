import * as userRepository from '../../users/repository';
import {generateCode} from '../../../utils/common';


export async function createCode(phone: string): Promise<string> {
	// Get user.
	let user = await userRepository.getUserByPhone(phone);

	// Create user.
	if(!user) {
		user = {
			phone: phone,
			code: '',
			codeVerified: false,
			token: '',
			date: new Date().getTime()
		};
	}

	// Update user code.
	user.code = generateCode(8);

	// Save user by overwriting.
	await userRepository.createUser(user);

	return user.code;
}

// TODO: use destrucutured parameters.
export async function verifyCode(phone: string, code: string): Promise<string> {
	// Get user.
	const user = await userRepository.getUserByPhone(phone);

	// User check.
	if (!user) {
		throw new Error(`User with phone '${phone}' does not exists`);
	}

	// Code check.
	if (user.code !== code) {
		throw new Error(`User with code '${code}' does not exists`);
	}

	// Check if verified.
	if (!user.codeVerified) {
		throw new Error('User not yet verified');	
	}

	return user.token;
}

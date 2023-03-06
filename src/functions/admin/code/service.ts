import * as userRepository from '../../users/repository';
import {generateCode} from '../../../utils/common';

type VerifyCodeParams = {
	body: {
		phone: string;
		code: string;
	};
}

export async function verifyCode({body: {phone, code}}: VerifyCodeParams): Promise<string> {
	// Get user.
	const user = await userRepository.getUserByPhone(phone);

	// User check.
	if (!user) {
		throw new Error(`User with phone '${phone}' does not already exists`);
	}

	// Code check.
	if (user.code !== code) {
		throw new Error(`User with code '${code}' does not already exists`);
	}

	user.codeVerified = true;
	user.token = generateCode(32);

	// Save user by overwriting.
	await userRepository.createUser(user);

	return user.token;
}

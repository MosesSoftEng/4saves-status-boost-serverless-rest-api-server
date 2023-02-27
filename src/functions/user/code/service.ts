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

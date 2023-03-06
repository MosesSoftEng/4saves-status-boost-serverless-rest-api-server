/*
 * Module that;
 * - Contains the business logic for the users feature.
 * - Implements the business rules and organises different components to fulfil request.
 */
import {User} from './model';
import * as userRepository from './repository';


export async function createUser(user: User): Promise<User> {
	// Validate user data.
	const existingUser = await userRepository.getUserByPhone(user.phone);

	if (existingUser) {
		throw new Error(`User with phone '${user.phone}' already exists`);
	}

	// Create user.
	const newUser = await userRepository.createUser(user);
	return newUser;
}

// export async function getLoginCode(user: User): Promise<string> {
// 	const existingUser = await userRepository.getUserByPhone(user.phone);

// 	if (existingUser) {
// 		// Update code.

// 		return existingUser;
// 	} else {
// 		// Create user.
// 		const newUser = await userRepository.createUser(user);
// 		return newUser;
// 	}
// }

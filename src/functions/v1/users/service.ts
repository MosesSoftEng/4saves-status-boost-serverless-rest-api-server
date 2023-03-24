// TODO: Module docs
import {User} from './model';
import * as userRepository from './repository';


//TODO: Function docs
export async function createUser(user): Promise<User> {
	// Create user.
	const newUser = await userRepository.createUser(user);
	return newUser;
}

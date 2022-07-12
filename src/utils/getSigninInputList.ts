import User from '../types/user/User';

const getSigninInputList = (userData: User) => [
	{
		id: 'username',
		label: 'Username',
		name: 'username',
		type: 'text',
		placeholder: 'Enter your username',
		value: userData.username!,
	},
	{
		id: 'password',
		label: 'Password',
		name: 'password',
		type: 'password',
		placeholder: 'Enter your password',
		value: userData.password!,
	}
];

export default getSigninInputList;
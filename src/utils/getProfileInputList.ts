import User from '../types/user/User';

const getSignupInputList = (userData: User) => [
	{
		id: 'firstName',
		label: 'First Name',
		name: 'firstName',
		type: 'text',
		placeholder: 'Enter your first name',
		value: userData.firstName!,
	},
	{
		id: 'lastName',
		label: 'Last Name',
		name: 'lastName',
		type: 'text',
		placeholder: 'Enter your last name',
		value: userData.lastName!,
	},
	{
		id: 'contact',
		label: 'Contact',
		name: 'contact',
		type: 'text',
		placeholder: 'Enter your contact',
		value: userData.contact!,
	},
	{
		id: 'address',
		label: 'Address',
		name: 'address',
		type: 'text',
		placeholder: 'Enter your address',
		value: userData.address!,
	},
	{
		id: 'email',
		label: 'Email',
		name: 'email',
		type: 'email',
		placeholder: 'Enter your email',
		value: userData.email!,
	},
];
export default getSignupInputList;
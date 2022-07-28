const getToken = () => {
	const token = localStorage.getItem('token');
	return token === 'true' ? true : false;
};

export default getToken;
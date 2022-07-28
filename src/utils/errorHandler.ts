/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';

const errorHandler = (err: any) => {
	const { response } = err;
	const { data, status } = response || {};
	const { message } = data || {};
	if (!message) toast.error('Something went wrong,Try again later!');
	else if (status < 500) toast.warning(data.message);
	else toast.error(data.message);
};

export default errorHandler;
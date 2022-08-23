/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';

const errorHandler = (err: any) => {
	const { response, message: errorMessage } = err;
	const { data, status } = response || {};
	const { message: dataMessage } = data || {};
	if (!dataMessage) toast.error(errorMessage || 'Something went wrong,Try again later!');
	else if (status < 500) toast.warning(data.message);
	else toast.error(data.message);
};

export default errorHandler;
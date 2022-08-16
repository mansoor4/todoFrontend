import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import getUserId from '../../utils/getUserId';
import classes from './Error.module.css';

const Error: FC = () => {
	const userId = getUserId();

	return <div className='container mt-5 mb-5 text-center'>
		<h1>Something went wrong!</h1>
		<p>Go to {userId ? <Link
			className={classes.link}
			to='/'
			onClick={() => window.location.reload()}> Home Page</Link> : <Link
			className={classes.link}
			to='/signin'
			onClick={() => window.location.reload()}>Signin Page</Link>}</p>
	</div>;
};

export default Error;
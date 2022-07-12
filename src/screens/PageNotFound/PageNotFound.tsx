import React from 'react';
import { Link } from 'react-router-dom';
import getToken from '../../utils/getToken';
import classes from './PageNotFound.module.css';

const PageNotFound = () => {
	const token = getToken();
	return <div className='container mt-5 mb-5 text-center'>
		<h1>Page not found</h1>
		<p>Go to {token ? <Link
			className={classes.link}
			to='/'> Home Page</Link> : <Link
			className={classes.link}
			to='/signin'>Signin Page</Link>}</p>
	</div>;
};

export default PageNotFound;
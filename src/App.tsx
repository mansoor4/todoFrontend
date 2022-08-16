import 'react-toastify/dist/ReactToastify.css';
import React, { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './UI/Header/Header';
import useGetUser from './hooks/useGetUser';
import Protected from './components/Protected/Protected';
import { Oval } from 'react-loader-spinner';
import getUserId from './utils/getUserId';
import classes from './App.module.css';

/* Screens */
import Profile from './screens/Profile/Profile';
import Signin from './screens/Signin/Signin';
import Signup from './screens/Signup/Signup';
import Todo from './screens/Todo/Todo';
import PageNotFound from './screens/PageNotFound/PageNotFound';
import Backdrop from './UI/Backdrop/Backdrop';
import { useAppSelector } from './hooks/useRedux';


const App = () => {
	const { getUser, isLoading } = useGetUser();
	const disable = useAppSelector(state => state.loading.disable);
	useEffect(() => {
		const userId = getUserId();
		if (userId) getUser();
	}, []);

	return (
		<div>
			{disable && <Backdrop disable={disable} />}
			<header>
				<Header />
			</header>
			{!isLoading &&
				<Fragment>
					<main>
						<Routes>
							<Route path='/' element={<Protected nav='/signin' userIdBool={false} Component={Todo} />} />
							<Route path='/signup' element={<Protected nav='/' userIdBool={true} Component={Signup} />} />
							<Route path='signin' element={<Protected nav='/' userIdBool={true} Component={Signin} />} />
							<Route path='/profile' element={<Protected nav='/signin' userIdBool={false} Component={Profile} />} />
							<Route path='*' element={<PageNotFound />} />
						</Routes>
					</main>
					<ToastContainer autoClose={2000} position='top-right' />
				</Fragment>
			}
			{isLoading && <Oval
				height={100}
				width={100}
				color='#b8b8b8'
				secondaryColor='#b8b8b8'
				wrapperClass={classes.app_loader} />
			}
		</div>
	);
};

export default App;

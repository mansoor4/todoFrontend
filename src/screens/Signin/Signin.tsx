import React, { FC, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { bindActionCreators } from 'redux';
import * as authActionCreators from '../../redux/auth/actionCreator';
import getInputList from '../../utils/getSigninInputList';
import User from '../../types/user/User';
import InputList from '../../components/InputList/InputList';
import Button from '../../UI/Button/Button';
import useGetGoogleLoginUrl from '../../hooks/useGetGoogleLoginUrl';
import useUserVerify from '../../hooks/useUserVerify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import classes from './Signin.module.css';
import { Oval } from 'react-loader-spinner';
import googleIcon from '../../assets/google_icon.jpg';

const Signin: FC = () => {
	const [userData, setUserData] = useState<User>({
		username: '',
		password: ''
	});

	const isLoadingSignin = useAppSelector((state) => state.auth.isLoading);
	const { isLoading: isLoadingGoogleLoginUrl, getGoogleLoginUrl } = useGetGoogleLoginUrl();
	const { isLoading: isLoadingUserVerify, userVerify } = useUserVerify();
	const isLoadingGoogle = isLoadingGoogleLoginUrl || isLoadingUserVerify;
	const dispatch = useAppDispatch();
	const { signin } = bindActionCreators(authActionCreators, dispatch);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const search = location.search;
		const query = new URLSearchParams(search);
		const code = query.get('code');
		if (code) userVerify(code);
	}, []);

	const submitHandler = () => {
		signin(userData, navigate);
	};

	const userDataChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setUserData((prevUserData) => {
			return {
				...prevUserData,
				[event.target.name]: event.target.value,
			};
		});
	};

	const inputList = getInputList(userData);

	return <div className='container' style={{ maxWidth: '500px' }}>
		<div className='row'>
			<div className='col'>
				<div className="card mt-5 mb-5 shadow-sm">
					<div className="card-header text-white" style={{ backgroundColor: '#212529' }}>
						<h1><FontAwesomeIcon icon={faArrowRightToBracket} className='me-3' />Signin</h1>
					</div>
					<div className="card-body">
						<InputList
							inputs={inputList}
							changeHandler={userDataChangeHandler} />
						<Button
							isLoading={isLoadingSignin}
							submitHandler={submitHandler}
							style='btn-primary'>Submit</Button>
						<hr />
						<div className='d-flex'>
							{!isLoadingGoogle &&
								// <div className='row justify-content-center'>
								// 	<div className='col-3 col-sm-4'>
								// 		<img src={googleIcon} className={classes.googleIcon} />
								// 	</div>
								// 	<div className='col-7 col-sm-6'>
								// 		<button
								// 			className={classes.googleButton} onClick={getGoogleLoginUrl}>
								// 			Google Login
								// 		</button>
								// 	</div>
								// </div>
								<div className={classes.googleButtonContainer}>
									<button
										className={classes.googleButton} onClick={getGoogleLoginUrl}>
										<img src={googleIcon} className={classes.googleIcon} />
										Google Login
									</button>

								</div>
							}
							{isLoadingGoogle && <Oval
								wrapperStyle={{ margin: 'auto' }}
								height={40}
								width={40}
								color='#b8b8b8'
								secondaryColor='#b8b8b8' />}
						</div>
						<hr />
						<p className='text-center'>Dont have an account?<Link to='/signup' className={classes.signupLink}> Signup</Link></p>
					</div>
				</div>

			</div>
		</div>
	</div>;
};

export default Signin;
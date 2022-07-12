import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { bindActionCreators } from 'redux';
import * as authActionCreators from '../../redux/auth/actionCreator';
import getInputList from '../../utils/getSignupInputList';
import User from '../../types/user/User';
import InputList from '../../components/InputList/InputList';
import Image from '../../UI/Image/Image';
import Button from '../../UI/Button/Button';
import defaultUrl from '../../assets/default_profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import classes from './Signup.module.css';

const Signup: FC = () => {
	const [userData, setUserData] = useState<User>({
		firstName: '',
		lastName: '',
		contact: '',
		address: '',
		email: '',
		username: '',
		password: '',
	});

	const [fileData, setFileData] = useState<File | null>(null);
	const isLoading = useAppSelector((state) => state.auth.isLoading);
	const dispatch = useAppDispatch();
	const { signup } = bindActionCreators(authActionCreators, dispatch);
	const navigate = useNavigate();


	const submitHandler = () => {
		signup(userData, fileData, navigate);
	};

	const userDataChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setUserData((prevUserData) => {
			return {
				...prevUserData,
				[event.target.name]: event.target.value,
			};
		});
	};

	const fileDataChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target;
		if (files?.length) setFileData(files[0]);
	};

	const removeProfileHandler = () => {
		setFileData(null);
	};

	let imageUrl = defaultUrl;
	if (fileData) imageUrl = URL.createObjectURL(fileData);

	const inputList = getInputList(userData);
	return <div className='container' style={{ maxWidth: '500px' }}>
		<div className='row'>
			<div className='col'>
				<div className="card mt-5 mb-5 shadow-sm">
					<div className="card-header text-white" style={{ backgroundColor: '#212529' }}>
						<h1><FontAwesomeIcon icon={faUserPlus} className='me-3' />Signup</h1>
					</div>
					<div className="card-body">
						<Image
							imageUrl={imageUrl}
							fileDataChangeHandler={fileDataChangeHandler}
							removeProfileHandler={removeProfileHandler} />
						<InputList
							inputs={inputList}
							changeHandler={userDataChangeHandler} />
						<Button
							style='btn-primary'
							isLoading={isLoading}
							submitHandler={submitHandler}>Submit</Button>
						<hr />
						<p className='text-center'>Already have an account?<Link to='/signin' className={classes.signinLink}> Signin</Link></p>
					</div>
				</div>
			</div>
		</div>
	</div>;
};

export default Signup;
import React from 'react';
import { FC, useEffect } from 'react';
import Button from '../../UI/Button/Button';
import Image from '../../UI/Image/Image';
import InputList from '../InputList/InputList';
import EditProfileType from '../../types/user/EditProfileType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';

const EditProfile: FC<EditProfileType> = (props) => {
	const { image, inputs, button, changeHandler, editCloseHandler, user, intializeUserData } = props;
	const { imageUrl, fileDataChangeHandler, removeProfileHandler } = image;
	const { isLoading, submitHandler } = button;

	useEffect(() => {
		intializeUserData(user);
	}, []);

	return <div className='container' style={{ maxWidth: '500px' }}>
		<div className='row'>
			<div className='col'>
				<div className="card mt-5 mb-5 shadow-sm">
					<div className="card-header text-white" style={{ backgroundColor: '#212529' }}>
						<h1><FontAwesomeIcon icon={faUserPen} className='me-3' />Update Profile</h1>
					</div>
					<div className="card-body">
						<Image
							imageUrl={imageUrl}
							fileDataChangeHandler={fileDataChangeHandler}
							removeProfileHandler={removeProfileHandler} />
						<InputList
							inputs={inputs}
							changeHandler={changeHandler} />
						<div className='row'>
							<div className='col-12 d-flex justify-content-between'>
								<Button
									style='btn-primary'
									isLoading={isLoading}
									submitHandler={submitHandler}>Submit</Button>
								<Button
									style='btn-outline-danger'
									submitHandler={editCloseHandler}>Cancel</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>;
	{/* <h1>Update Profile</h1>
		<Image
			imageUrl={imageUrl}
			fileDataChangeHandler={fileDataChangeHandler}
			removeProfileHandler={removeProfileHandler} />
		<InputList
			inputs={inputs}
			changeHandler={changeHandler} />
		<Button
			isLoading={isLoading}
			submitHandler={submitHandler}>Submit</Button>
		<Button
			submitHandler={editCloseHandler}>Cancel</Button> */}
};

export default EditProfile;
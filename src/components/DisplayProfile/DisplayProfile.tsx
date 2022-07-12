import React from 'react';
import { FC } from 'react';
import DisplayProfileType from '../../types/user/DisplayProfileType';
import Button from '../../UI/Button/Button';
import classes from './DisplayProfile.module.css';

const DisplayProfile: FC<DisplayProfileType> = (props) => {
	const { user, imageUrl, editOpenHandler } = props;
	const { firstName, lastName, address, contact, email } = user;

	return <div className='container mt-5'>
		<div className='row justify-content-between'>
			<div className='col-12 col-lg-3 mt-5 d-flex justify-content-center'>
				<img src={imageUrl} className={classes.profile_image} />
			</div>
			<div className='col-12 col-lg-8 mt-5 mb-5'>
				<div className={`card ${classes.profile_body_card}`}>
					<div className={`card-header ${classes.profile_body_header}`}>
						<h1>{`${firstName} ${lastName}`}</h1>
					</div>
					<div className="card-body" >
						<h5 className={`card-title ${classes.profile_body_title}`}>Details</h5>
						<hr />
						<div className='row justify-content-between text-center'>
							<div className='col-12 col-sm-4'>
								<h6 className={classes.profile_body_h6_header}>Address</h6>
								<p>{address}</p>
							</div>
							<div className='col-12 col-sm-3'>
								<h6 className={classes.profile_body_h6_header}>Contact</h6>
								<p>{contact}</p>
							</div>
							<div className='col-12 col-sm-3'>
								<h6 className={classes.profile_body_h6_header}>Email</h6>
								<p>{email}</p>
							</div>
						</div>
						<hr />
						<div className='row'>
							<Button
								style='btn-primary btn-lg'
								submitHandler={editOpenHandler}>Edit Profile</Button>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div >;
};

export default DisplayProfile;
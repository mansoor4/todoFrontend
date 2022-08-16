import React, { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import defaultUrl from '../../assets/default_profile.png';
import getUserId from '../../utils/getUserId';
import { bindActionCreators } from 'redux';
import * as authActionCreators from '../../redux/auth/actionCreator';
import classes from './Header.module.css';
import { Oval } from 'react-loader-spinner';

const Header: FC = () => {
	const imageUrl = useAppSelector((state) => state.user.profile?.url);
	const isLoading = useAppSelector((state) => state.auth.isLoading);
	const dispatch = useAppDispatch();
	const { logout } = bindActionCreators(authActionCreators, dispatch);
	const navigate = useNavigate();
	const userId = getUserId();
	return <div>
		<nav className="navbar navbar-expand-md navbar-dark  bg-dark text-lg">
			<div className="container-fluid">
				<NavLink to={userId ? '/' : '/signin'} className='navbar-brand'>TODO</NavLink>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse align-self-end" id="navbarSupportedContent">

					{userId && <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end" style={{ width: '100%' }}>
						<li className="nav-item me-4 mt-3 mt-md-0">
							<NavLink to='/profile'>
								<img src={imageUrl ? imageUrl : defaultUrl} className={`${classes.profileImage}`} />
							</NavLink>

						</li>
						<li className="nav-item me-4 mt-3 mt-md-0">
							{!isLoading &&
								<button onClick={() => logout(navigate)} className=' btn btn-outline-light'>Logout</button>
							}
							{isLoading &&
								<Oval
									height={35}
									width={35}
									color='#b8b8b8'
									secondaryColor='#b8b8b8' />
							}
						</li>
					</ul>
					}

					{!userId && <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end" style={{ width: '100%' }}>
						<li className="nav-item me-4 mt-2 mt-md-0">
							<NavLink
								to='/signin'>
								<button className='btn btn-outline-light'>Signin</button>
							</NavLink>
						</li>
						<li className="nav-item me-4 mt-2 mt-md-0">
							<NavLink
								to='/signup'
								className='nav-link text-white'>Signup</NavLink>
						</li>
					</ul>
					}

				</div>
			</div>
		</nav >
	</div >;
};

export default Header;
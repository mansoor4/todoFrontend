import React, { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import defaultUrl from '../../assets/default_profile.png';
import getToken from '../../utils/getToken';
import { bindActionCreators } from 'redux';
import * as authActionCreators from '../../redux/auth/actionCreator';
import classes from './Header.module.css';

const Header: FC = () => {
	const imageUrl = useAppSelector((state) => state.user.profile?.url);
	const dispatch = useAppDispatch();
	const { logout } = bindActionCreators(authActionCreators, dispatch);
	const navigate = useNavigate();
	const token = getToken();
	return <div>
		<nav className="navbar navbar-expand-md navbar-dark  bg-dark text-lg">
			<div className="container-fluid">
				<NavLink to={token ? '/' : '/signin'} className='navbar-brand'>TODO</NavLink>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse align-self-end" id="navbarSupportedContent">

					{token && <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end" style={{ width: '100%' }}>
						<li className="nav-item me-4 mt-3 mt-md-0">
							<NavLink to='/profile'>
								<img src={imageUrl ? imageUrl : defaultUrl} className={`${classes.profileImage}`} />
							</NavLink>

						</li>
						<li className="nav-item me-4 mt-3 mt-md-0">
							<button onClick={() => logout(navigate)} className='btn btn-outline-light'>Logout</button>
						</li>
					</ul>
					}

					{!token && <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end" style={{ width: '100%' }}>
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
		</nav>
	</div>;
};

export default Header;
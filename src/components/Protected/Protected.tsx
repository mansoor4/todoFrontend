import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import getUserId from '../../utils/getUserId';

type ProtectedProps = {
    nav: string,
    userIdBool: boolean,
    Component: FC
    children?: ReactNode,
}

const Protected: FC<ProtectedProps> = (props) => {
	const { nav, userIdBool, Component } = props;
	const userId = getUserId();
	if ((!userId && !userIdBool) || (userId && userIdBool)) return <Navigate to={nav} replace />;
	return <Component />;
};

export default Protected;
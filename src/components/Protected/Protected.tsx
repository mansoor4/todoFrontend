import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import getToken from '../../utils/getToken';

type ProtectedProps = {
    nav: string,
    tokenBool: boolean,
    Component: FC
    children?: ReactNode,
}

const Protected: FC<ProtectedProps> = (props) => {
	const { nav, tokenBool, Component } = props;
	const token = getToken();
	if ((!token && !tokenBool) || (token && tokenBool)) return <Navigate to={nav} replace />;
	return <Component />;
};

export default Protected;
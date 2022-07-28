import React from 'react';
import { FC } from 'react';
import { Oval } from 'react-loader-spinner';
import ButtonType from '../../types/app/ButtonType';

const Button: FC<ButtonType> = (props) => {
	const { isLoading, submitHandler, children, curLoadingType, loadingType, id, curId, style } = props;
	const typeCheck = curLoadingType ? curLoadingType?.find(type => loadingType === type) : true;
	const idCheck = id === curId;

	let buttonRender = <button
		className={`btn mt-2 mb-2 ${style}`} onClick={submitHandler}>{children}</button>;

	if (isLoading && typeCheck && idCheck) buttonRender = <Oval
		height={40}
		width={40}
		color='#b8b8b8'
		secondaryColor='#b8b8b8' />;

	return <div>
		{buttonRender}
	</div>;

};
export default Button;
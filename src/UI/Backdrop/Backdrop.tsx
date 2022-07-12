import React, { FC } from 'react';
import ModalType from '../../types/app/ModalType';
import classes from './Backdrop.module.css';

const Backdrop: FC<ModalType> = (props) => {
	const { closeHandler, disable } = props;
	return <div
		onClick={closeHandler}
		className={classes.backdrop} style={{ backgroundColor: !disable ? 'rgba(0, 0, 0, 0.30)' : 'rgba(0, 0, 0, 0)' }}></div>;
};

export default Backdrop;
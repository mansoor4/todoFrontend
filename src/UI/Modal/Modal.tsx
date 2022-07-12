import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import ModalType from '../../types/app/ModalType';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';
import { motion } from 'framer-motion';

const portalDiv = document.getElementById('portal') as HTMLElement;

const Modal: FC<ModalType> = (props) => {
	const { children, closeHandler } = props;
	return createPortal(<div >
		<Backdrop
			closeHandler={closeHandler} />
		<motion.div
			className={classes.modal}
			initial={{ top: '-100%', opacity: '0' }}
			animate={{ top: '20%', opacity: '1', transition: { type: 'spring', duration: 0.1, damping: 25, stiffness: 500 } }}
			exit={{ top: '60%', opacity: '0.1' }}>
			{children}
		</motion.div>
	</div>, portalDiv);
};

export default Modal;
import React from 'react';
import { FC } from 'react';
import ImageType from '../../types/app/ImageType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import classes from './Image.module.css';

const Image: FC<ImageType> = (props) => {
	const { imageUrl, fileDataChangeHandler, removeProfileHandler } = props;
	return <div className={classes.image_container}>
		<label
			htmlFor='profile'>
			<div>
				<img
					className={classes.image_img}
					src={imageUrl} />
			</div>
		</label>
		<FontAwesomeIcon icon={faSquareXmark} className={classes.removeIcon} onClick={removeProfileHandler} />
		<input
			style={{ display: 'none' }}
			onChange={fileDataChangeHandler}
			name='profile'
			id='profile'
			type='file' />
	</div>;
};
export default Image;
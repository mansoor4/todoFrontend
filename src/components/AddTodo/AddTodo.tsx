import React from 'react';
import { FC } from 'react';
import AddTodoType from '../../types/todo/AddTodoType';
import Button from '../../UI/Button/Button';
import InputList from '../InputList/InputList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import classes from './AddTodo.module.css';

const AddTodo: FC<AddTodoType> = (props) => {
	const { inputs, button, changeHandler, todoAddCloseHandler } = props;
	const { isLoading, submitHandler, loadingType } = button;
	return <div className={classes.addTodoContainer}>
		<div className='row'>
			<div className='col'>
				<div className="card  shadow-sm">
					<div className="card-header text-white" style={{ backgroundColor: '#212529' }}>
						<h1><FontAwesomeIcon icon={faListCheck} className='me-3' />Todo</h1>
					</div>
					<div className="card-body">
						<InputList
							inputs={inputs}
							changeHandler={changeHandler} />
						<div className='col-12 d-flex justify-content-between'>
							<Button
								style='btn-primary'
								isLoading={isLoading}
								loadingType={loadingType}
								curLoadingType={['create']}
								submitHandler={submitHandler}>Submit</Button>
							<Button
								style='btn-outline-danger'
								submitHandler={todoAddCloseHandler}
							>Cancel</Button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>;

};
export default AddTodo;
import React, { FC } from 'react';
import TodoListType from '../../types/todo/TodoListType';
import Button from '../../UI/Button/Button';
import DisplayTodo from '../DisplayTodo/DisplayTodo';
import Modal from '../../UI/Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import classes from './TodoList.module.css';
import { AnimatePresence } from 'framer-motion';

const TodoList: FC<TodoListType> = (props) => {
	const { todos,
		button,
		completeToggleHandler,
		deleteTodoHandler,
		updateTodoHandler,
		selectCloseHandler,
		selectOpenHandler,
		updateCloseHandler,
		updateOpenHandler,
	} = props;

	const { isLoading, loadingType, id } = button;
	return <div>
		{todos.length === 0 && <p className='text-break text-center mt-3' style={{ color: 'grey', fontSize: '25px' }}>Todo is not available...</p>}
		{todos.length !== 0 && todos.map(todo => {
			return <div
				key={todo.todo_id}>
				{!todo.select && <div className='border ps-2 pe-2 pt-2 mt-3 rounded'>
					<div className='text-break' style={{ color: '#212529', fontWeight: '500' }}>
						{todo.title?.toUpperCase()}
					</div>
					<div className='row'>
						<div className={`col-12 col-sm-11 d-flex ${classes.buttonContainer}`}>
							<Button
								style='btn-outline-success btn-sm'
								isLoading={isLoading}
								loadingType={loadingType}
								id={id}
								curId={todo.todo_id}
								curLoadingType={['update']}
								submitHandler={() => completeToggleHandler({ ...todo, complete: !todo.complete }, todo.todo_id)}>{!todo.complete ? 'Complete' : 'Incomplete'}</Button>
							<Button
								style='btn-outline-danger btn-sm ms-3'
								isLoading={isLoading}
								loadingType={loadingType}
								curLoadingType={['delete']}
								submitHandler={() => deleteTodoHandler(todo.todo_id)}
								id={id}
								curId={todo.todo_id}
							> Delete</Button>
						</div>
						<div className={`col-12 col-sm-1 ${classes.arrowContainer}`}>
							<FontAwesomeIcon icon={faArrowRightLong} onClick={() => selectOpenHandler(todo.todo_id)} className={classes.arrow} />
						</div>
					</div>
				</div>
				}
				<AnimatePresence
					initial={false}
					exitBeforeEnter={true}>{todo.select &&
						<Modal
							closeHandler={() => selectCloseHandler(todo.todo_id)}>
							<DisplayTodo
								todo={todo}
								updateTodoHandler={updateTodoHandler}
								selectCloseHandler={selectCloseHandler}
								button={button}
								updateCloseHandler={updateCloseHandler}
								updateOpenHandler={updateOpenHandler} />
						</Modal>}
				</AnimatePresence>
			</div>;
		})}
	</div>;

};
export default TodoList;
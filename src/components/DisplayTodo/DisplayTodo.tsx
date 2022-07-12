import React, { FC } from 'react';
import DisplayTodoType from '../../types/todo/DisplayTodoType';
import TodoData from '../TodoData/TodoData';
import UpdateTodo from '../UpdateTodo/UpdateTodo';


const DisplayTodo: FC<DisplayTodoType> = (props) => {
	const { todo,
		button,
		selectCloseHandler,
		updateCloseHandler,
		updateOpenHandler,
		updateTodoHandler } = props;


	return <div>
		{!todo.update && <TodoData
			todo={todo}
			selectCloseHandler={selectCloseHandler}
			updateOpenHandler={updateOpenHandler} />}
		{todo.update && <UpdateTodo
			button={button}
			todo={todo}
			updateCloseHandler={updateCloseHandler}
			updateTodoHandler={updateTodoHandler} />}
	</div>;
};
export default DisplayTodo;
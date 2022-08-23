import React, { FC } from 'react';
import TodoDataType from '../../types/todo/TodoDataType';
import Button from '../../UI/Button/Button';

const TodoData: FC<TodoDataType> = (props) => {
	const { todo, selectCloseHandler, updateOpenHandler } = props;
	return <div className='container'>
		<div className='row'>
			<div className='col'>
				<div className="card border-0">
					<div className="card-header border-0" style={{ backgroundColor: 'white' }}>
						<h3 style={{ color: '#212529', textDecoration: 'underline' }}>{todo.title?.toUpperCase()}</h3>
					</div>
					<div className="card-body">
						<div>
							<h5 style={{ color: '#c1bebe' }}>{todo.description?.toUpperCase()}</h5>
						</div>
						<hr />
						<div className='col-12 d-flex justify-content-between'>
							<Button
								style='btn-primary'
								submitHandler={() => updateOpenHandler(todo.todo_id)}>Update</Button>
							<Button
								style='btn-outline-danger'
								submitHandler={() => selectCloseHandler(todo.todo_id)}
							>Cancel</Button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>;
};

export default TodoData;
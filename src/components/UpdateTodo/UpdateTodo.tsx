import React, { FC, useState } from 'react';
import UpdateTodoType from '../../types/todo/UpdateTodoType';
import getInputList from '../../utils/getUpdateTodoInputList';
import Button from '../../UI/Button/Button';
import InputList from '../InputList/InputList';

const UpdateTodo: FC<UpdateTodoType> = (props) => {
	const { todo, updateCloseHandler, updateTodoHandler, button } = props;
	const { isLoading, loadingType, id } = button;
	const [description, setDescription] = useState(todo.description);

	const descriptionChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setDescription(event.target.value);
	};

	const inputList = getInputList({ description });
	return <div className='container'>
		<div className='row'>
			<div className='col'>
				<div className="card border-0">
					<div className="card-header border-0" style={{ backgroundColor: 'white' }}>
						<h3 style={{ color: '#212529', textDecoration: 'underline' }}>{todo.title?.toUpperCase()}</h3>
					</div>
					<div className="card-body">
						<InputList
							inputs={inputList}
							changeHandler={descriptionChangeHandler} />
						<div className='col-12 d-flex justify-content-between'>
							<Button
								style='btn-primary'
								isLoading={isLoading}
								loadingType={loadingType}
								curLoadingType={['update']}
								id={id}
								curId={todo.todo_id}
								submitHandler={() => updateTodoHandler({ ...todo, description }, todo.todo_id)}>Submit</Button>

							<Button
								submitHandler={() => updateCloseHandler(todo.todo_id)}
								style='btn-outline-danger'>Cancel</Button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>;
};
export default UpdateTodo;
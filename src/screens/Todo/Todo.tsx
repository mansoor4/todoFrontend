import React, { FC, useReducer, useState, useEffect } from 'react';
import todoReducer, { initialState } from '../../redux/todo/reducer';
import * as todoActionTypes from '../../redux/todo/actionType';
import errorHandler from '../../utils/errorHandler';
import TodoType from '../../types/todo/Todo';
import axios from '../../axios';
import TodoResponse from '../../types/todo/TodoResponse';
import getInputList from '../../utils/getAddTodoInputList';
import { toast } from 'react-toastify';
import AddTodo from '../../components/AddTodo/AddTodo';
import FilterTodo from '../../components/FilterTodo/FilterTodo';
import TodoList from '../../components/TodoList/TodoList';
import mappedTodos from '../../utils/mappedTodos';
import FilterType from '../../types/todo/FilterType';
import completeFilter from '../../utils/completeFilter';
import notCompleteFilter from '../../utils/notCompleteFilter';
import Button from '../../UI/Button/Button';
import classes from './Todo.module.css';
import { Oval } from 'react-loader-spinner';
import * as loadingActionTypes from '../../redux/loading/actionType';
import { useAppDispatch } from '../../hooks/useRedux';

const Todo: FC = () => {
	const [todoState, dispatch] = useReducer(todoReducer, initialState);
	const [todoData, setTodoData] = useState<TodoType>({
		title: '',
		description: '',
	});

	const [filter, setFilter] = useState<string>(FilterType.ALL);
	const [todoAdd, setTodoAdd] = useState(false);

	const loadingDispatch = useAppDispatch();

	useEffect(() => {
		getAllTodos();
	}, []);

	const createTodo = async (newTodo: TodoType) => {
		try {
			dispatch({ type: todoActionTypes.TODO_START, payload: { loadingType: 'create' } });
			loadingDispatch({ type: loadingActionTypes.LOADING_START });
			const result = await axios.post<TodoResponse>('/todo/', newTodo);
			const { data: { todo: createdTodo } } = result;
			dispatch({ type: todoActionTypes.TODO_CREATE, payload: { newTodo: { ...createdTodo, update: false, select: false } } });
			resetDataHandler();
			setFilter(FilterType.ALL);
			setTodoAdd(false);
			loadingDispatch({ type: loadingActionTypes.LOADING_END });
			toast.success('Added todo to your list!');

		} catch (err) {
			dispatch({ type: todoActionTypes.TODO_FAILED });
			loadingDispatch({ type: loadingActionTypes.LOADING_END });
			errorHandler(err);
		}
	};

	const getAllTodos = async () => {
		try {
			dispatch({ type: todoActionTypes.TODO_START, payload: { loadingType: 'get' } });
			loadingDispatch({ type: loadingActionTypes.LOADING_START });
			const result = await axios.get<TodoResponse>('/todo/');
			const { data: { todos } } = result;
			dispatch({ type: todoActionTypes.TODO_GET, payload: { todos: mappedTodos(todos!) } });
			loadingDispatch({ type: loadingActionTypes.LOADING_END });
		} catch (err) {
			dispatch({ type: todoActionTypes.TODO_FAILED });
			loadingDispatch({ type: loadingActionTypes.LOADING_END });
			errorHandler(err);
		}
	};

	const updateTodo = async (updateTodoData: TodoType, todoId?: string) => {
		try {
			dispatch({ type: todoActionTypes.TODO_START, payload: { loadingType: 'update', newTodo: { todo_id: todoId } } });
			loadingDispatch({ type: loadingActionTypes.LOADING_START });
			await axios.put(`/todo/${todoId}`, updateTodoData);
			dispatch({ type: todoActionTypes.TODO_UPDATE, payload: { todos: todoState.todos, newTodo: { todo_id: todoId, ...updateTodoData } } });
			loadingDispatch({ type: loadingActionTypes.LOADING_END });
			updateCloseHandler(todoId);
			toast.success('Update todo sucessfully!');
		} catch (err) {
			dispatch({ type: todoActionTypes.TODO_FAILED });
			loadingDispatch({ type: loadingActionTypes.LOADING_END });
			errorHandler(err);
		}
	};


	const deleteTodo = async (todoId?: string) => {
		try {
			dispatch({ type: todoActionTypes.TODO_START, payload: { loadingType: 'delete', newTodo: { todo_id: todoId } } });
			loadingDispatch({ type: loadingActionTypes.LOADING_START });
			await axios.delete(`/todo/${todoId}`);
			dispatch({ type: todoActionTypes.TODO_DELETE, payload: { todos: todoState.todos, newTodo: { todo_id: todoId } } });
			loadingDispatch({ type: loadingActionTypes.LOADING_END });
			toast.success('Delete todo sucessfully!');
		} catch (err) {
			dispatch({ type: todoActionTypes.TODO_FAILED });
			loadingDispatch({ type: loadingActionTypes.LOADING_END });
			errorHandler(err);
		}
	};

	const todoDataChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setTodoData((prevTodoData) => {
			return {
				...prevTodoData,
				[event.target.name]: event.target.value,
			};
		});
	};



	const updateOpenHandler = (todoId?: string) => {
		dispatch({ type: todoActionTypes.UPDATE_OPEN, payload: { todos: todoState.todos, newTodo: { todo_id: todoId } } });
	};

	const updateCloseHandler = (todoId?: string) => {
		dispatch({ type: todoActionTypes.UPDATE_CLOSE, payload: { todos: todoState.todos, newTodo: { todo_id: todoId } } });
	};

	const selectOpenHandler = (todoId?: string) => {
		dispatch({ type: todoActionTypes.SELECT_OPEN, payload: { todos: todoState.todos, newTodo: { todo_id: todoId } } });
	};

	const selectCloseHandler = (todoId?: string) => {
		dispatch({ type: todoActionTypes.SELECT_CLOSE, payload: { todos: todoState.todos, newTodo: { todo_id: todoId } } });
	};


	const todoAddOpenHandler = () => {
		setTodoAdd(true);
	};

	const todoAddCloseHandler = () => {
		setTodoAdd(false);
		resetDataHandler();
	};

	const filterChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setFilter(event.target.value);
	};

	const resetDataHandler = () => {
		setTodoData({
			title: '',
			description: '',
		});
	};


	let filterTodos = todoState.todos;
	if (filter === FilterType.COMPLETE) filterTodos = completeFilter(todoState.todos);
	else if (filter === FilterType.NOT_COMPLETE) filterTodos = notCompleteFilter(todoState.todos);

	const inputList = getInputList(todoData);
	const listLoading = todoState.isLoading && todoState.loadingType === 'get';

	return <div className='container mt-5 d-flex flex-column align-items-center'>
		<div className={`row ${classes.add_todo_container}`}>
			<div className='col d-flex justify-content-center'>
				{!todoAdd && <Button
					style='btn-primary btn-lg'
					submitHandler={todoAddOpenHandler}>
					Add Todo</Button>}
				{todoAdd && <AddTodo
					todoAddCloseHandler={todoAddCloseHandler}
					button={{
						isLoading: todoState.isLoading,
						loadingType: todoState.loadingType,
						submitHandler: () => { createTodo(todoData); }
					}}
					changeHandler={todoDataChangeHandler}
					inputs={inputList} />
				}
			</div>
		</div>
		<div className={`row mt-4 mb-5 shadow ${classes.todo_container}`}>
			<div className='col-12 d-flex justify-content-center'>
				<div className='row' style={{ width: '100%' }}>
					<div className='col-10 col-sm-6  mt-2' style={{ margin: 'auto' }}>
						<FilterTodo
							filter={filter}
							filterChangeHandler={filterChangeHandler} />
					</div>
					<div className='col-12'>
						{!listLoading && <TodoList
							todos={filterTodos}
							button={{ isLoading: todoState.isLoading, loadingType: todoState.loadingType, id: todoState.todoId }}
							completeToggleHandler={updateTodo}
							selectCloseHandler={selectCloseHandler}
							selectOpenHandler={selectOpenHandler}
							updateCloseHandler={updateCloseHandler}
							updateOpenHandler={updateOpenHandler}
							deleteTodoHandler={deleteTodo}
							updateTodoHandler={updateTodo}
						/>
						}
						{listLoading && <Oval

							height={100}
							width={100}
							color='#b8b8b8'
							secondaryColor='#b8b8b8'
							wrapperClass={`mt-2 ${classes.list_loader}`} />}
					</div>
				</div>
			</div>
		</div>
	</div >;
};

export default Todo;
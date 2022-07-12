import { Reducer } from 'react';
import { AnyAction } from 'redux';
import TodoState from '../../types/todo/TodoState';
import Todo from '../../types/todo/Todo';
import * as actionTypes from './actionType';

export const initialState: TodoState = {
	todos: [],
	isLoading: false,
	loadingType: '',
	todoId: '',
};

const todoReducer: Reducer<TodoState, AnyAction> = (state = initialState, action) => {
	const { type } = action;
	const { payload } = action;
	const { todos, newTodo, loadingType } = payload || {};
	const { todo_id } = newTodo || {};

	let index: number;
	switch (type) {
	case actionTypes.TODO_START:
		return {
			...state,
			todos: [...state.todos],
			isLoading: true,
			loadingType,
			todoId: todo_id,
		};
	case actionTypes.TODO_GET:
		return {
			...state,
			todos: [...todos],
			isLoading: false,
			loadingType: '',
			todoId: '',
		};
	case actionTypes.TODO_CREATE:
		return {
			...state,
			todos: [newTodo, ...state.todos],
			isLoading: false,
			loadingType: '',
			todoId: '',

		};
	case actionTypes.TODO_UPDATE:
		index = todos.findIndex((todo: Todo) => todo.todo_id === todo_id);
		todos[index] = newTodo;
		return {
			...state,
			todos: [...todos],
			isLoading: false,
			loadingType: '',
			todoId: '',
		};
	case actionTypes.TODO_DELETE:
		const updatedTodos = todos.filter((todo: Todo) => todo.todo_id !== todo_id);
		return {
			...state,
			todos: [...updatedTodos],
			isLoading: false,
			loadingType: '',
			todoId: '',
		};
	case actionTypes.UPDATE_OPEN:
		index = todos.findIndex((todo: Todo) => todo.todo_id === todo_id);
		todos[index].update = true;
		return {
			...state,
			todos: [...todos],
		};
	case actionTypes.UPDATE_CLOSE:
		index = todos.findIndex((todo: Todo) => todo.todo_id === todo_id);
		todos[index].update = false;
		return {
			...state,
			todos: [...todos],
		};
	case actionTypes.SELECT_OPEN:
		index = todos.findIndex((todo: Todo) => todo.todo_id === todo_id);
		todos[index].select = true;
		return {
			...state,
			todos: [...todos],
		};
	case actionTypes.SELECT_CLOSE:
		index = todos.findIndex((todo: Todo) => todo.todo_id === todo_id);
		todos[index].select = false;
		return {
			...state,
			todos: [...todos],
		};
	case actionTypes.TODO_FAILED:
		return {
			...state,
			todos: [...state.todos],
			isLoading: false,
			loadingType: '',
			todoId: '',
		};
	default:
		return state;
	}


};

export default todoReducer;
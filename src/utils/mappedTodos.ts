import Todo from '../types/todo/Todo';

const mappedTodos = (todos: Todo[]) => {
	return todos.map(todo => {
		return {
			...todo,
			update: false,
			select: false,
		};
	});
};


export default mappedTodos;
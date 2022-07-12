import Todo from '../types/todo/Todo';

const notCompleteFilter = (todos: Todo[]) => todos.filter(todo => !todo.complete);

export default notCompleteFilter;
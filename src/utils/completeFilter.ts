import Todo from '../types/todo/Todo';

const completeFilter = (todos: Todo[]) => todos.filter(todo => todo.complete);

export default completeFilter;
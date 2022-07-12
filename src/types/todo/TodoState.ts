import Todo from './Todo';

type TodoState = {
    todos: Todo[],
    isLoading: boolean,
    loadingType: string,
    todoId: string,
}

export default TodoState;
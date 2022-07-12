import Todo from './Todo';

type TodoDataType = {
    todo: Todo,
    selectCloseHandler: (todoId?: string) => void,
    updateOpenHandler: (todoId?: string) => void,
}

export default TodoDataType;
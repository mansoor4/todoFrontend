import ButtonType from '../app/ButtonType';
import Todo from './Todo';

type TodoListType = {
    todos: Todo[],
    button: ButtonType,
    completeToggleHandler: (todoData: Todo, todoId?: string) => void,
    selectOpenHandler: (todoId?: string) => void,
    selectCloseHandler: (todoId?: string) => void,
    updateOpenHandler: (todoId?: string) => void,
    updateCloseHandler: (todoId?: string) => void,
    deleteTodoHandler: (todoId?: string) => void
    updateTodoHandler: (tododata: Todo, todoId?: string) => void
}

export default TodoListType;
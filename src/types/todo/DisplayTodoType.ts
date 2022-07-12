import ButtonType from '../app/ButtonType';
import Todo from './Todo';

type DisplayTodoType = {
    todo: Todo,
    button:ButtonType,
    selectCloseHandler: (todoId?: string) => void,
    updateOpenHandler: (todoId?: string) => void,
    updateCloseHandler: (todoId?: string) => void,
    updateTodoHandler: (tododata: Todo, todoId?: string) => void
}

export default DisplayTodoType;
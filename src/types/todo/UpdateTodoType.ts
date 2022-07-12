import ButtonType from '../app/ButtonType';
import Todo from './Todo';

type UpdateTodoType = {
    todo: Todo,
    button: ButtonType,
    updateCloseHandler: (todoId?: string) => void,
    updateTodoHandler: (tododata: Todo, todoId?: string) => void
}

export default UpdateTodoType;
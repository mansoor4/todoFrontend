import ButtonType from '../app/ButtonType';
import InputListType from '../app/InputListType';

type AddTodoType = {
    inputs: InputListType,
    button: ButtonType,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    todoAddCloseHandler: () => void,
}

export default AddTodoType;
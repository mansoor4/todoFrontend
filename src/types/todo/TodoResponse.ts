import Todo from './Todo';

type TodoResponse = {
    message?: string,
    todo?: Todo,
    todos?: Todo[],

};

export default TodoResponse;
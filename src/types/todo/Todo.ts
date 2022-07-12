type Todo = {
    todo_id?: string,
    title?: string,
    description?: string,
    user_id?: string,
    created_at?: Date,
    updated_at?: Date,
    complete?: boolean,
    update?: boolean,
    select?: boolean,
};

export default Todo;
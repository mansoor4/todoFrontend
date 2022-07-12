import Todo from '../types/todo/Todo';

const getUpdateTodoInputList = (todoData: Todo) => [
	{
		id: 'description',
		label: 'Description',
		name: 'description',
		type: 'textarea',
		placeholder: 'Enter description',
		value: todoData.description!,
	}
];

export default getUpdateTodoInputList;
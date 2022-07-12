import Todo from '../types/todo/Todo';

const getAddTodoInputList = (todoData: Todo) => [
	{
		id: 'title',
		label: 'Title',
		name: 'title',
		type: 'text',
		placeholder: 'Enter title',
		value: todoData.title!,
	},
	{
		id: 'description',
		label: 'Description',
		name: 'description',
		type: 'textarea',
		placeholder: 'Enter description',
		value: todoData.description!,
	}
];

export default getAddTodoInputList;
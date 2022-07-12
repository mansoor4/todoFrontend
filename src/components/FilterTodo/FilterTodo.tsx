import React, { FC } from 'react';
import FilterTodoType from '../../types/todo/FilterTodoType';
import classes from './FilterTodo.module.css';

const FilterTodo: FC<FilterTodoType> = (props) => {
	const { filter, filterChangeHandler } = props;
	return <select
		className={`form-select ${classes.select}`}
		value={filter}
		onChange={filterChangeHandler}>
		<option
			value='all'>All</option>
		<option
			value='complete'>Complete</option>
		<option
			value='not complete'>Not Complete</option>
	</select>;
};

export default FilterTodo;
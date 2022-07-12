import React from 'react';
import { FC } from 'react';
import InputListType from '../../types/app/InputListType';

const InputList: FC<{ inputs: InputListType, changeHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }> = (props) => {
	const { inputs, changeHandler } = props;
	return <form>
		{inputs.map(input => (
			<div key={input.id} className="mb-3">
				<label htmlFor={input.id}
					className="form-label">{input.label}</label>
				{input.type !== 'textarea' && <input
					className="form-control"
					onChange={changeHandler}
					name={input.name}
					id={input.id}
					type={input.type}
					placeholder={input.placeholder}
					value={input.value} />}
				{input.type === 'textarea' && <textarea
					className="form-control"
					onChange={changeHandler}
					name={input.name}
					id={input.id}
					placeholder={input.placeholder}
					value={input.value} />}
			</div>))}
	</form >;
};

export default InputList;
import * as React from 'react';

import type { OcTextareaProps } from './types';

const OcTextarea: React.FC<OcTextareaProps> = React.memo((props) => {
	const {
		rows = 5,
		customClass = '',
		required = false,
		disabled = false,
		value,
		onChange,
		placeholder,
		...p
	} = props;

	return (
		<textarea
			className={`form-control ${customClass}`}
			value={value}
			onChange={onChange}
			rows={rows}
			placeholder={placeholder}
			required={required}
			disabled={disabled}
			{...p}
		/>
	);
});

export default OcTextarea;

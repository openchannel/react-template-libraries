import * as React from 'react';


export interface RadioProps {
	id: string;
	label: string;
	checked: boolean;
	onChange: (e: React.SyntheticEvent) => void;
}

export const Radio: React.FC<RadioProps> = React.memo((props) => {
	const {
		id,
		label,
		checked,
		onChange,
	} = props;

	return (
		<div className={`chart__period-item ${checked ? 'chart__period-item-active' : ''}`}>
			{/* eslint-disable-next-line jsx-a11y/label-has-for */}
			<label className="chart__period-item-label">
				<input
					type="radio"
					id={id}
					checked={checked}
					onChange={onChange}
					className="chart__period-item-radio"
				/>
				<span className="chart__period-item-checkmark" />
				<span className="chart__period-item-text">{label}</span>
			</label>
		</div>
	)
})

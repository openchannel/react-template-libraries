import * as React from 'react';

import './style.scss';

export interface SelectModel {
	label: string;
	checked: boolean;
	onChange?: any;
	name?: string;
}

export const ExpandableListItem: React.FC<SelectModel> = (props: SelectModel) => {
	const { label, ...p } = props;

	return (
		<li className="select-expandable__option">
			{/* eslint-disable-next-line jsx-a11y/label-has-for */}
			<label>
				<input className="select-expandable__option-input" type="checkbox" {...p} />
				<span className="select-expandable__option-label">{label}</span>
			</label>
		</li>
	);
};

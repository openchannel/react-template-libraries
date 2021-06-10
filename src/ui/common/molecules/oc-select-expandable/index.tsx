/* eslint-disable */
//commit 76978c0770aa82676498c56dd58843d7008b45d5 Author: Alex Tkachenko Date: 20.10.20, 13:52
import * as React from 'react';

import CollapsedIcon from '../../../../assets/img/select-down.svg';
import ExpandedIcon from '../../../../assets/img/select-up.svg';

import { ExpandableListItem, SelectModel } from './expandable-select-item';

import './style.scss';

export interface ExpandSelectProps {
	/**
	 * Select title
	 */
	title?: string;
	/**
	 * Collapse state or not
	 */
	isCollapsed?: boolean;
	/**
	 * Array of items to fill the element
	 */
	selectModels?: Array<SelectModel>;
	/**
	 * change handler
	 */
	onChange?: any;
	/**
	 * toggle function to change expanded state
	 */
	toggle: any;
}

export const OcExpandableSelect: React.FC<ExpandSelectProps> = (props) => {
	const { title, isCollapsed, toggle, selectModels = [], onChange } = props;
	const newItems = selectModels.map((item) => item);
	const handleChange = (e: any) => {
		newItems[e.target.name].checked = !newItems[e.target.name].checked;
		onChange(newItems);
	};
	return (
		<div className="select-expandable">
			<nav className="select-expandable__sidebar">
				<h6 className="select-expandable__heading" onClick={() => toggle(!isCollapsed)}>
					{title}
					<a className="select-expandable__icon">
						{isCollapsed ? <CollapsedIcon /> : <ExpandedIcon />}
					</a>
				</h6>
				{!isCollapsed && (
					<ul className="select-expandable__options">
						{selectModels.map((item, index) => (
							<ExpandableListItem
								checked={item.checked}
								label={item.label}
								onChange={handleChange}
								name={index.toString()}
								key={item.label}
							/>
						))}
					</ul>
				)}
			</nav>
		</div>
	);
};

//commit 76978c0770aa82676498c56dd58843d7008b45d5 Author: Alex Tkachenko Date: 20.10.20, 13:52
import * as React from 'react';
import {
	ExpandableListItem,
	SelectModel,
} from '../../molecules/oc-select-expandable/expandable-select-item';
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
	toggle?: any;
	/**
	 * collapsed icon source link
	 */
	collapsedIconLink?: string;
	/**
	 * expanded icon source link
	 */
	expandedIconLink?: string;
}

export const OcExpandableSelect: React.FC<ExpandSelectProps> = (props) => {
	const {
		title,
		isCollapsed = true,
		toggle,
		selectModels = [],
		onChange,
		collapsedIconLink = './img/select-down.svg',
		expandedIconLink = './img/select-up.svg',
	} = props;
	const newItems = selectModels.map((item) => item);
	const handleChange = React.useCallback(
		(e: any) => {
			newItems[e.target.name].checked = !newItems[e.target.name].checked;
			onChange(newItems);
		},
		[newItems, onChange],
	);
	const handleToggle = React.useCallback(() => toggle(!isCollapsed), [toggle, isCollapsed]);
	return (
		<div className="select-expandable">
			<nav className="select-expandable__sidebar">
				<h6 className="select-expandable__heading" onClick={handleToggle}>
					{title}
					<a className="select-expandable__icon">
						{isCollapsed ? (
							<img src={collapsedIconLink} alt="collapsed-icon" />
						) : (
							<img src={expandedIconLink} alt="expanded-icon" />
						)}
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

/* eslint-disable */
//commit 76978c0770aa82676498c56dd58843d7008b45d5 Author: Alex Tkachenko Date: 20.10.20, 13:52
import * as React from 'react';
import { ExpandableListItem, SelectModel } from './expandable-select-item';
import { ReactComponent as CollapsedIcon } from '../../../../assets/img/down-arrow.svg';
import { ReactComponent as ExpandedIcon } from '../../../../assets/img/select-up.svg';
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
		collapsedIconLink,
		expandedIconLink,
	} = props;
	const handleChange = React.useCallback(
		(e: any) => {
			let newItems = [...selectModels];
			newItems[e.target.name].checked = !newItems[e.target.name].checked;
			onChange(newItems);
		},
		[onChange, selectModels],
	);
	const handleToggle = React.useCallback(() => toggle(!isCollapsed), [toggle, isCollapsed]);
	return (
		<div className="select-expandable">
			<nav className="select-expandable__sidebar">
				<h6 className="select-expandable__heading" onClick={handleToggle}>
					{title}
					<a className="select-expandable__icon">
						{isCollapsed ? (
							collapsedIconLink ? (
								<img src={collapsedIconLink} alt="collapsed-icon" />
							) : (
								<CollapsedIcon className="svg-primary" />
							)
						) : expandedIconLink ? (
							<img src={expandedIconLink} alt="expanded-icon" />
						) : (
							<ExpandedIcon className="svg-primary" />
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

export default OcExpandableSelect;

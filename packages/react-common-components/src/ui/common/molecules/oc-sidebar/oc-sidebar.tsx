//commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 author: Julia Date: 12.05.21 18:29
import * as React from 'react';
import { noop } from 'lodash-es';
import { SidebarValue } from '../../models/component-basic.model';

import './style.scss';

export interface SidebarItem {
	parent: SidebarValue | Record<string, never>;
	child?: SidebarValue | Record<string, never>;
}

export interface SidebarProps {
	/**
	 * Title of the sidebar.
	 * @type {string}.
	 * Default empty.
	 */
	title?: string;

	/**
	 * Sidebar config, contains array of sidebar list items.
	 */
	sidebarModel: SidebarValue[];

	/**
	 * Path to the custom toggle icon down.
	 * @type {string}.
	 * Default 'assets/angular-common-components/down-arrow.svg'.
	 */
	toggleIconDown?: string;

	/**
	 * Path to the custom toggle icon up.
	 * @type {string}.
	 * Default 'assets/angular-common-components/select-up.svg'.
	 */
	toggleIconUp?: string;

	selectedItems?: SidebarItem[];

	onItemClick?: (item: SidebarItem) => void;
}

export const OcSidebar: React.FC<SidebarProps> = (props) => {
	const {
		title,
		sidebarModel = [],
		toggleIconDown = '../../../../assets/img/select-down.svg',
		toggleIconUp = '../../../../assets/img/select-up.svg',
		selectedItems = [],
		onItemClick = noop,
	} = props;

	const isItemSelected = React.useCallback(
		(type: keyof SidebarItem, id?: string): boolean =>
			selectedItems.map((item) => item[type]).filter((item) => item?.id === id).length > 0,
		[selectedItems],
	);

	return (
		<div className="oc-sidebar">
			<nav className="oc-sidebar__navigation">
				<span className="oc-sidebar__heading">{title}</span>
				<ul className="oc-sidebar__list">
					{sidebarModel &&
						sidebarModel?.map((parent) => (
							<li className="oc-sidebar__list-item" key={parent.id}>
								<div className="oc-sidebar__list-item-expand-line">
									<span
										role="button"
										tabIndex={0}
										className={`oc-sidebar__list-item-text ${
											isItemSelected('parent', parent.id) ? 'font-weight-bold' : ''
										}`}
										onClick={() => onItemClick({ parent })}
									>
										{parent.label}
									</span>
									{parent.expanded
										? parent.values &&
										  parent.values.length > 0 && (
												<div onClick={() => (parent.expanded = false)}>
													<img src={toggleIconUp} alt="sidebar arrow" />
												</div>
										  )
										: parent.values &&
										  parent.values.length > 0 && (
												<div onClick={() => (parent.expanded = true)}>
													<img src={toggleIconDown} alt="sidebar arrow" />
												</div>
										  )}
								</div>
								<ul className="oc-sidebar__sublist">
									{parent.values &&
										parent.values.length > 0 &&
										parent.values.map((child) => (
											<li key={child.id}>
												<span
													role="button"
													tabIndex={0}
													className={`oc-sidebar__list-item-text oc-sidebar__list-item-text_margin ${
														isItemSelected('child', child.id) ? 'font-weight-bold' : ''
													}`}
													onClick={() => onItemClick({ parent, child })}
												>
													{child.label}
												</span>
											</li>
										))}
								</ul>
							</li>
						))}
				</ul>
			</nav>
		</div>
	);
};

export default OcSidebar;

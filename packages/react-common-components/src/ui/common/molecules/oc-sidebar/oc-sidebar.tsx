//commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 author: Julia Date: 12.05.21 18:29
import * as React from 'react';
import { noop } from 'lodash-es';

import { SidebarValue } from '../../models/component-basic.model';

import './style.scss';

export interface SidebarClick {
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

	/**
	 * Base url for the Router links in the sidebar component.
	 * @type {string}.
	 * Default empty.
	 * @example
	 * // returns '/browse/collections/allApps'.
	 */
	baseNavigation?: string;

	selectedCategory?: SidebarClick;

	onClickSidebar?: (item: SidebarClick) => void;

	navigate?: any;
}

export const OcSidebar: React.FC<SidebarProps> = (props) => {
	const {
		title,
		sidebarModel = [],
		baseNavigation,
		toggleIconDown = '../../../../assets/img/select-down.svg',
		toggleIconUp = '../../../../assets/img/select-up.svg',
		onClickSidebar = noop,
		selectedCategory,
		navigate = noop,
	} = props;

	const handleClickSidebar = (
		parentItem: SidebarValue | Record<string, never>,
		childItem?: SidebarValue | Record<string, never>,
		navHref?: string,
	): void => {
		onClickSidebar({ parent: parentItem, child: childItem });
		navigate(navHref);
	};

	return (
		<div className="oc-sidebar">
			<nav className="oc-sidebar__navigation">
				<span className="oc-sidebar__heading">{title}</span>
				<ul className="oc-sidebar__list">
					{sidebarModel &&
						sidebarModel?.map((selectItem) => (
							<li className="oc-sidebar__list-item" key={selectItem.id}>
								<div className="oc-sidebar__list-item-expand-line">
									<span
										role="button"
										tabIndex={0}
										className={`oc-sidebar__list-item-text ${
											selectItem.id === selectedCategory?.parent?.id ? 'font-weight-bold' : ''
										}`}
										onClick={() =>
											handleClickSidebar(selectItem, {}, `${baseNavigation}/${selectItem.id}`)
										}
									>
										{selectItem.label}
									</span>
									{selectItem.expanded
										? selectItem.values &&
										  selectItem.values.length > 0 && (
												<div onClick={() => (selectItem.expanded = false)}>
													<img src={toggleIconUp} alt="sidebar arrow" />
												</div>
										  )
										: selectItem.values &&
										  selectItem.values.length > 0 && (
												<div onClick={() => (selectItem.expanded = true)}>
													<img src={toggleIconDown} alt="sidebar arrow" />
												</div>
										  )}
								</div>
								<ul className="oc-sidebar__sublist">
									{selectItem.values &&
										selectItem.values.length > 0 &&
										selectItem.values.map((subValue) => (
											<li key={subValue.id}>
												<span
													role="button"
													tabIndex={0}
													className={`oc-sidebar__list-item-text oc-sidebar__list-item-text_margin ${
														subValue.id === selectedCategory?.child?.id ? 'font-weight-bold' : ''
													}`}
													onClick={() =>
														handleClickSidebar(
															selectItem,
															subValue,
															`${baseNavigation}/${selectItem.id}/${subValue.id}`,
														)
													}
												>
													{subValue.label}
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

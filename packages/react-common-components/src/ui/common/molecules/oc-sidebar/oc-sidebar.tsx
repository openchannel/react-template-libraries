//commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 author: Julia Date: 12.05.21 18:29
//@eslint-disable-jsx-a11y
import * as React from 'react';
import { Link } from 'react-router-dom';

import { SidebarValue } from '../../models/component-basic.model';

import './style.scss';

export interface SidebarClick {
	parent: any | Record<string, never>;
	child: any | Record<string, never>;
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
}

export const OcSidebar: React.FC<SidebarProps> = (props) => {
	const {
		title,
		sidebarModel = [],
		baseNavigation,
		toggleIconDown = '../../../../assets/img/select-down.svg',
		toggleIconUp = '../../../../assets/img/select-up.svg',
		onClickSidebar = (e) => {
			return undefined;
		},
		selectedCategory,
	} = props;

	const handleClickSidebar = (
		parentItem: SidebarValue | Record<string, never>,
		childItem: SidebarValue | Record<string, never>,
	): void => onClickSidebar({ parent: parentItem, child: childItem });

	return (
		<div className="oc-sidebar">
			<nav className="oc-sidebar__navigation">
				<span className="oc-sidebar__heading">{title}</span>
				<ul className="oc-sidebar__list">
					{sidebarModel &&
						sidebarModel?.map((selectItem, index) => (
							<li className="oc-sidebar__list-item" key={selectItem.label + index}>
								<div className="oc-sidebar__list-item-expand-line">
									{baseNavigation ? (
										<>
											<Link
												className={`oc-sidebar__list-item-text ${
													selectItem.id === selectedCategory?.parent?.id ? 'font-weight-bold' : ''
												}`}
												to={`${baseNavigation}/${selectItem.id}`}
												onClick={() => handleClickSidebar(selectItem, {})}
											>
												{selectItem.label}
											</Link>
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
										</>
									) : (
										<>
											<span
												role="button"
												tabIndex={0}
												className={`oc-sidebar__list-item-text ${
													selectItem.id === selectedCategory?.parent?.id ? 'font-weight-bold' : ''
												}`}
												onClick={() => handleClickSidebar(selectItem, {})}
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
										</>
									)}
								</div>
								<ul className="oc-sidebar__sublist">
									{selectItem.values &&
										selectItem.values.length > 0 &&
										selectItem.values.map((subValue: any, index: number) => (
											<li key={subValue.label + index}>
												{baseNavigation ? (
													<Link
														className={`oc-sidebar__list-item-text oc-sidebar__list-item-text_margin ${
															subValue.id === selectedCategory?.child?.id ? 'font-weight-bold' : ''
														}`}
														to={`${baseNavigation}/${selectItem.id}/${subValue.id}`}
														onClick={() => handleClickSidebar(selectItem, subValue)}
													/>
												) : (
													<span
														role="button"
														tabIndex={0}
														className={`oc-sidebar__list-item-text oc-sidebar__list-item-text_margin ${
															subValue.id === selectedCategory?.child?.id ? 'font-weight-bold' : ''
														}`}
														onClick={() => handleClickSidebar(selectItem, subValue)}
													>
														{subValue.label}
													</span>
												)}
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

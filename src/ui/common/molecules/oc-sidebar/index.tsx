//commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 author: Julia Date: 12.05.21 18:29
import * as React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export interface SidebarProps {
	/**
	 * Title of the sidebar.
	 * @type {string}.
	 * Default empty.
	 */
	title?: string;

	/**
	 * Sidebar config, contains array of sidebar list items.
	 * @type {SidebarValue[]}.
	 */
	sidebarModel: any[];

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

	/**
	 * Toggle function to open and close .
	 */
	toggleSidebar?: any;

	/**
	 * Flag if the sidebar items opened
	 */
	isSidebarToggled?: any;
	onClickSidebar?: any;
}

export const OcSidebar: React.FC<SidebarProps> = (props) => {
	const {
		title,
		sidebarModel = [],
		baseNavigation,
		toggleIconDown,
		toggleIconUp,
		toggleSidebar,
		isSidebarToggled,
		onClickSidebar,
	} = props;

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
											<Link className="oc-sidebar__list-item-text" to="/">
												{selectItem.label}
											</Link>
											{isSidebarToggled ? (
												<img src={toggleIconUp} onClick={() => toggleSidebar(!isSidebarToggled)} />
											) : (
												<img
													src={toggleIconDown}
													onClick={() => toggleSidebar(!isSidebarToggled)}
												/>
											)}
										</>
									) : (
										<>
											<span className="oc-sidebar__list-item-text" onClick={onClickSidebar}>
												{selectItem.label}
											</span>
											{isSidebarToggled ? (
												<img src={toggleIconUp} onClick={() => toggleSidebar(!isSidebarToggled)} />
											) : (
												<img
													src={toggleIconDown}
													onClick={() => toggleSidebar(!isSidebarToggled)}
												/>
											)}
										</>
									)}
								</div>
								<ul className="oc-sidebar__sublist">
									{selectItem.values &&
										selectItem.values.length &&
										selectItem.values.map((subValue: any) => (
											<li>
												{baseNavigation ? (
													<Link
														className="oc-sidebar__list-item-text oc-sidebar__list-item-text_margin"
														to="/"
													/>
												) : (
													<span
														className="oc-sidebar__list-item-text oc-sidebar__list-item-text_margin"
														onClick={onClickSidebar}
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

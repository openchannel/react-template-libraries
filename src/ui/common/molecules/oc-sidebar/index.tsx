//commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 author: Julia Date: 12.05.21 18:29
import * as React from 'react';
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
	 * Emits sidebar model changes and passes to the parent component.
	 */
	onChange?: any;
}

export const OcSidebar: React.FC<SidebarProps> = (props) => {
	const { title, sidebarModel = [], baseNavigation } = props;
	console.log(sidebarModel);

	return (
		<div className="oc-sidebar">
			<nav className="oc-sidebar__navigation">
				<span className="oc-sidebar__heading">{title}</span>
				<ul className="oc-sidebar__list">
					{sidebarModel &&
						sidebarModel?.map((selectItem) => (
							<li className="oc-sidebar__list-item">
								<div className="oc-sidebar__list-item-expand-line">
									{baseNavigation ? (
										<a className="oc-sidebar__list-item-text">{selectItem.label}</a>
									) : (
										<span className="oc-sidebar__list-item-text">{selectItem.label}</span>
									)}
								</div>
								{selectItem.values &&
									selectItem.values.length &&
									selectItem.values.map((subValue: any) => (
										<ul className="oc-sidebar__sublist">
											<li>
												{' '}
												<span className="oc-sidebar__list-item-text oc-sidebar__list-item-text_margin">
													{subValue.label}
												</span>
												<a className="oc-sidebar__list-item-text oc-sidebar__list-item-text_margin">
													{subValue.label}
												</a>
											</li>
										</ul>
									))}
							</li>
						))}
				</ul>
			</nav>
		</div>
	);
};

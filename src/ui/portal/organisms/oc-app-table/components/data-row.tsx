import * as React from 'react';
import get from 'lodash/get';

import { isStorybook, stripHtmlTags, titleCase } from '../../../../../lib';
import { OcDropdownButton } from '../../../../common';
import { AppListMenuAction } from '../../../models';
import { DataRowProps } from '../types';
import { filterOptions, statusColor } from '../utils';

import { DropdownListItem } from './dropdown-list-item';

const lineArrowDownIcon = isStorybook()
	? './img/line-arrow-down.svg'
	: '../../../../../assets/img/line-arrow-down.svg';

const dotsMenuIcon = isStorybook()
	? './img/dots-menu.svg'
	: '../../../../../assets/img/dots-menu.svg';

export const DataRow: React.FC<DataRowProps> = React.memo((props) => {
	const {
		app,
		index = 0,
		isChild = false,
		defaultAppIcon,
		previewTemplate,
		menuUrl,
		menuOptions,
		onMenuClick,
	} = props;

	const handleMenuClick = React.useCallback(
		({ value }) => {
			if (!onMenuClick) return;

			const action: AppListMenuAction = {
				action: value,
				appId: app.appId,
				appVersion: app.version,
				isChild,
			};
			onMenuClick(action);
		},
		[onMenuClick, app.appId, app.version, isChild],
	);

	const statusColorClass = statusColor(app.status.value);
	const status = titleCase(app.status.value);
	const filteredMenuOptions = filterOptions(
		menuOptions,
		app.status.value,
		app.status.modifiedBy,
		previewTemplate,
	);

	return (
		<>
			<tr>
				<td className="oc-table__td_blank" />
				<td className="oc-table__td oc-table__td_flex">
					{isChild && index === 0 && (
						<img
							className="oc-table__app-icon oc-table__app-icon_padded"
							src={lineArrowDownIcon}
							// alt=""
						/>
					)}
					{isChild && index > 0 && (
						<span className="oc-table__text-wrapper oc-table__text-wrapper_blank" />
					)}
					<img
						className="oc-table__app-icon"
						src={get(app, 'customData.icon', defaultAppIcon)}
						// alt=""
					/>
					<div className="oc-table__td-col">
						<h6 className="oc-table__app-name" onClick={() => {}}>
							{app.name}
						</h6>
						<small className="co-table__app-version">v {app.version}</small>
					</div>
				</td>
				<td className="oc-table__td">
					<span className="oc-table__text-wrapper oc-table__summary-text">
						{stripHtmlTags(get(app, 'customData.summary', ''))}
					</span>
				</td>
				<td className="oc-table__td">
					<span className="oc-table__text-wrapper">
						{new Intl.DateTimeFormat('en-US', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
						}).format(new Date(app.created))}
					</span>
				</td>
				<td className="oc-table__td">
					{app.status.reason && (
						<small>
							<span className={`oc-table__text-wrapper oc-table__indicator ${statusColorClass}`} />
							<span className="oc-table__text-wrapper oc-table__text-status">
								{/* add popup with reason content */}
								{app.status.value === 'inDevelopment' ? 'Draft' : status}
							</span>
						</small>
					)}
					{/*	app.status.reason template */}
					{!app.status.reason && (
						<small>
							<span className={`oc-table__text-wrapper oc-table__indicator ${statusColorClass}`} />
							<span className="oc-table__text-wrapper oc-table__text-status">
								{app.status.value === 'inDevelopment' ? 'Draft' : status}
							</span>
						</small>
					)}
				</td>
				<td className="oc-table__td">
					<div className="oc-table__dropdown">
						<OcDropdownButton
							options={filteredMenuOptions}
							onSelect={handleMenuClick}
							listItem={DropdownListItem}
							listProps={{ alignRight: true }}
						>
							<img
								alt="View more"
								className="oc-table__dropdown-dots"
								src={menuUrl || dotsMenuIcon}
							/>
						</OcDropdownButton>
					</div>
				</td>
				<td className="oc-table__td_blank" />
			</tr>
			{app.children &&
				app.children.length > 0 &&
				app.children.map((subApp, index) => (
					<DataRow
						key={subApp.appId}
						isChild
						index={index}
						app={subApp}
						defaultAppIcon={defaultAppIcon}
						previewTemplate={previewTemplate}
						menuUrl={menuUrl}
						menuOptions={menuOptions}
						onMenuClick={onMenuClick}
					/>
				))}
		</>
	);
});

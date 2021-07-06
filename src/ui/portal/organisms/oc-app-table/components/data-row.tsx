import * as React from 'react';
import get from 'lodash/get';

import { isStorybook, stripHtmlTags } from '../../../../../lib';
import { OcDropdownButton } from '../../../../common';
import { AppListMenuAction } from '../../../models';
import { DataRowProps } from '../types';
import { filterOptions } from '../utils';

import { AppStatusPopover } from './app-status-popover';
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

	const handleAppNameClick = () => {
		handleMenuClick({ value: 'EDIT' });
	};

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
							alt="child application"
						/>
					)}
					{isChild && index > 0 && (
						<span className="oc-table__text-wrapper oc-table__text-wrapper_blank" />
					)}
					<img
						className="oc-table__app-icon"
						src={get(app, 'customData.icon', defaultAppIcon)}
						alt={app.name}
					/>
					<div className="oc-table__td-col">
						<span role="button" tabIndex={0} onClick={handleAppNameClick}>
							<h6 className="oc-table__app-name">{app.name}</h6>
						</span>
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
					<AppStatusPopover id={app.appId} status={app.status} />
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
				app.children.map((childApp, index) => (
					<DataRow
						key={childApp.appId}
						isChild
						index={index}
						app={childApp}
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

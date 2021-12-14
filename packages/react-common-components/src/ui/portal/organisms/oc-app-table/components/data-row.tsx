import * as React from 'react';

import { AppListMenuAction } from '../../../models';
import { DataRowProps } from '../types';
import { filterOptions } from '../utils';

import { DropdownListItem } from './dropdown-list-item';

import { getCreateTD, getNameTD, getOptionTD, getStatusTD, getSummaryTD } from './data-row-item';

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
		activeColumns,
		modifyColumns,
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

	const getBodyRow = (val: string) => {
		if (modifyColumns?.[val]) {
			return modifyColumns[val]?.rowCell(app);
		}
		switch (val) {
			case 'left-placeholder':
			case 'right-placeholder':
				return;
			case 'name':
				return getNameTD(app, isChild, index, defaultAppIcon, handleAppNameClick);
			case 'summary':
				return getSummaryTD(app);
			case 'create-date':
				return getCreateTD(app);
			case 'status':
				return getStatusTD(app);
			case 'app-options':
				return getOptionTD(filteredMenuOptions, handleMenuClick, DropdownListItem, menuUrl);

			default:
				return modifyColumns?.[val]?.rowCell(app);
		}
	};
	return (
		<>
			<tr className="app-grid-table__row">
				{activeColumns?.map((val) => (
					<td key={val} className={`app-grid-table__row__cell app-grid-table__row__cell-${val}`}>
						{getBodyRow(val)}
					</td>
				))}
			</tr>
			{app.children &&
				app.children.length > 0 &&
				app.children.map((childApp, index) => (
					<DataRow
						key={childApp.appId + childApp.version}
						isChild
						index={index}
						app={childApp}
						defaultAppIcon={defaultAppIcon}
						previewTemplate={previewTemplate}
						menuUrl={menuUrl}
						menuOptions={menuOptions}
						onMenuClick={onMenuClick}
						activeColumns={activeColumns}
						modifyColumns={modifyColumns}
					/>
				))}
		</>
	);
});

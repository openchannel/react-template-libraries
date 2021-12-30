import * as React from 'react';

import { AppListMenuAction } from '../../../models';
import { DataRowProps } from '../types';

import { getBodyCell } from './data-row-item';

export const DataRow: React.FC<DataRowProps> = React.memo((props) => {
	const {
		app,
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

	return (
		<>
			<tr className="app-grid-table__row">
				{activeColumns?.map((val) => (
					<td key={val} className={`app-grid-table__row__cell app-grid-table__row__cell-${val}`}>
						{getBodyCell(val, props, handleAppNameClick, handleMenuClick)}
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

import * as React from 'react';
import { FullAppData } from '../../../../common/models';
import lineArrowDownIcon from '../../../../../assets/img/line-arrow-down.svg';
import { get } from 'lodash-es';
import { stripHtmlTags } from '../../../../../lib';
import { titleCase } from '../../../../../lib';
import { statusColor } from '../utils';
import OcDropdownButton from '../../../../common/molecules/oc-dropdown/oc-dropdown-button';
import dotsMenuIcon from '../../../../../assets/img/dots-menu.svg';
import { OptionsProps } from '../types';

export const getNameTD = (
	app: FullAppData,
	isChild: boolean,
	index: number,
	defaultAppIcon?: string,
	handleAppNameClick?: () => void,
) => {
	return (
		<div className="app-grid-table__row__cell-name-content">
			{isChild && (
				<img
					className={`app-grid-table__row__cell-name-content-app-child-icon ${
						index > 0 ? 'app-grid-table__row__cell-name-content-hidden' : ''
					}`}
					src={lineArrowDownIcon}
					alt="child application"
				/>
			)}

			<img
				className="app-grid-table__row__cell-name-content-icon"
				src={get(app, 'customData.icon', defaultAppIcon)}
				alt={app.name}
			/>
			<div className="app-grid-table__row__cell-name-content-text">
				<span
					className="app-grid-table__row__cell-name-content-text-title"
					aria-label="Edit application"
					role="button"
					tabIndex={0}
					onClick={handleAppNameClick}
				>
					{app.name}
				</span>
				<span className="app-grid-table__row__cell-name-content-text-version">
					v. {app.version}
				</span>
			</div>
		</div>
	);
};

export const getCreateTD = (app: FullAppData) => {
	return (
		<span className="app-grid-table__row__cell-create-date-text">
			{new Intl.DateTimeFormat('en-US', {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
			}).format(new Date(app.created))}
		</span>
	);
};

export const getSummaryTD = (app: FullAppData) => {
	return (
		<span className="app-grid-table__row__cell-summary-text">
			{stripHtmlTags(get(app, 'customData.summary', ''))}
		</span>
	);
};

export const getStatusTD = (app: FullAppData) => {
	const color = statusColor(app.status.value);
	const value = app.status.value === 'inDevelopment' ? 'Draft' : titleCase(app.status.value);
	return (
		<div className="app-grid-table__row__cell-status-content">
			<div className={`app-grid-table__row__cell-status-content-marker-${color}`}></div>
			<span className="app-grid-table__row__cell-status-content-text">{value}</span>
		</div>
	);
};

export const getOptionTD = (
	filteredMenuOptions: OptionsProps[],
	handleMenuClick: ({ value }: any) => void,
	DropdownListItem: any,
	menuUrl: any,
) => {
	return (
		<div className="app-grid-table__row__cell-app-options-dropdown">
			<OcDropdownButton
				options={filteredMenuOptions}
				onSelect={handleMenuClick}
				listItem={DropdownListItem}
				listProps={{ alignRight: true }}
			>
				<img
					alt="View more"
					className="app-grid-table__row__cell-app-options-dropdown-dots"
					src={menuUrl || dotsMenuIcon}
				/>
			</OcDropdownButton>
		</div>
	);
};

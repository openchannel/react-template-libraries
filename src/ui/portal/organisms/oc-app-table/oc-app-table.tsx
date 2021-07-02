import * as React from 'react';

import ArrowDownIcon from '../../../../assets/img/select-down.svg';
import ArrowUpIcon from '../../../../assets/img/select-up.svg';

import { BlankRow, DataRow, EmptyDataRow } from './components';

import './style.scss';

const SortIcon = ({ ascendingSortIcon, descendingSortIcon }) => {
	if (ascendingSortIcon || descendingSortIcon) {
		return <img className="oc-table__icon-down" alt="" />;
	}

	if (!ascendingSortIcon && !descendingSortIcon) {
		return <ArrowDownIcon />;
	}

	if (!ascendingSortIcon && !descendingSortIcon) {
		return <ArrowUpIcon />;
	}

	return null;
};

export const OcAppTable: React.FC<any> = (props) => {
	const { properties, defaultAppIcon, ascendingSortIcon, descendingSortIcon, onSort } = props;

	const handleSortApps = React.useCallback(
		(e) => {
			if (!onSort) return;

			onSort(e.currentTarget.dataset.sortkey);
		},
		[onSort],
	);

	return (
		<div className="oc-table-container">
			<div className="oc-table-container__overlay" />
			<div className="oc-table-wrapper">
				<table className="oc-table" aria-describedby="App listing table">
					<thead className="oc-table__head">
						<tr>
							<th className="oc-table__th oc-table__placeholder" scope="col" />
							<th
								className="oc-table__th oc-table__name"
								scope="col"
								tabIndex={0}
								data-sortkey="name"
								onClick={handleSortApps}
							>
								Name{' '}
								<SortIcon
									ascendingSortIcon={ascendingSortIcon}
									descendingSortIcon={descendingSortIcon}
								/>
							</th>
							<th className="oc-table__th oc-table__summary" scope="col">
								Summary
							</th>
							<th
								className="oc-table__th oc-table__data"
								scope="col"
								tabIndex={0}
								data-sortkey="data"
								onClick={handleSortApps}
							>
								Created{' '}
								<SortIcon
									ascendingSortIcon={ascendingSortIcon}
									descendingSortIcon={descendingSortIcon}
								/>
							</th>
							<th
								className="oc-table__th oc-table__status"
								scope="col"
								tabIndex={0}
								data-sortkey="status"
								onClick={handleSortApps}
							>
								Status{' '}
								<SortIcon
									ascendingSortIcon={ascendingSortIcon}
									descendingSortIcon={descendingSortIcon}
								/>
							</th>
							<th className="oc-table__th oc-table__action" scope="col" />
							<th className="oc-table__th oc-table__placeholder" scope="col" />
						</tr>
					</thead>
					<tbody>
						{(!properties.data.list || properties.data.list.length == 0) && <EmptyDataRow />}
						{properties.data.list.map((app) => (
							<DataRow
								key={app.appId}
								app={app}
								defaultAppIcon={defaultAppIcon}
								previewTemplate={properties.previewTemplate}
								menuOptions={properties.options}
							/>
						))}
						{properties.data.list.length > 0 && <BlankRow />}
					</tbody>
				</table>
			</div>
		</div>
	);
};

import * as React from 'react';

import { useSortingArray } from '../../../../lib/hooks';
import { FullAppData } from '../../../common/models';

import { BlankRow, DataRow, EmptyDataRow, SortIcon } from './components';
import { OcAppTableProps } from './types';

import './style.scss';

export const OcAppTable: React.FC<OcAppTableProps> = (props) => {
	const {
		properties,
		defaultAppIcon,
		ascendingSortIcon,
		descendingSortIcon,
		onSort,
		menuUrl,
		onMenuClick,
	} = props;

	const {
		state: {
			array,
			sort: { key, orderBy },
		},
		setArray,
		sortArray,
	} = useSortingArray<FullAppData>('name');

	React.useEffect(() => {
		setArray(properties.data.list);
	}, [properties.data.list]);

	const handleSortApps = React.useCallback(
		(e) => {
			const element = e.currentTarget as HTMLElement;
			const key = element.dataset.sortkey || '';
			sortArray({ key });
			onSort(key);
		},
		[onSort, sortArray],
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
									isAscending={key === 'name' && orderBy === 'asc'}
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
								data-sortkey="created"
								onClick={handleSortApps}
							>
								Created{' '}
								<SortIcon
									isAscending={key === 'created' && orderBy === 'asc'}
									ascendingSortIcon={ascendingSortIcon}
									descendingSortIcon={descendingSortIcon}
								/>
							</th>
							<th
								className="oc-table__th oc-table__status"
								scope="col"
								tabIndex={0}
								data-sortkey="status.value"
								onClick={handleSortApps}
							>
								Status{' '}
								<SortIcon
									isAscending={key === 'status.value' && orderBy === 'asc'}
									ascendingSortIcon={ascendingSortIcon}
									descendingSortIcon={descendingSortIcon}
								/>
							</th>
							<th className="oc-table__th oc-table__action" scope="col" />
							<th className="oc-table__th oc-table__placeholder" scope="col" />
						</tr>
					</thead>
					<tbody>
						{(!array || array.length == 0) && <EmptyDataRow />}
						{array.map((app) => (
							<DataRow
								key={app.appId}
								app={app}
								defaultAppIcon={defaultAppIcon}
								previewTemplate={properties.previewTemplate}
								menuUrl={menuUrl}
								menuOptions={properties.options}
								onMenuClick={onMenuClick}
							/>
						))}
						{array.length > 0 && <BlankRow />}
					</tbody>
				</table>
			</div>
		</div>
	);
};

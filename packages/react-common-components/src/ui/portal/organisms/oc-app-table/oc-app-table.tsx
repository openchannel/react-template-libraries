import * as React from 'react';

import { useSortingArray } from '../../../../lib/hooks';
import { FullAppData } from '../../../common/models';

import { BlankRow, DataRow, EmptyDataRow, SortIcon } from './components';
import { OcAppTableProps, ActiveColumns } from './types';
import { getCustomTH, getDefaultTH } from './components/data-row-item';

import './style.scss';

const DEFAULT_COLUMNS = [
	'left-placeholder',
	'name',
	'summary',
	'create-date',
	'status',
	'app-options',
	'right-placeholder',
];

export const OcAppTable: React.FC<OcAppTableProps> = (props) => {
	const {
		properties,
		defaultAppIcon,
		ascendingSortIcon,
		descendingSortIcon,
		onSort,
		menuUrl,
		onMenuClick,
		noAppMessage,
		activeColumns,
		modifyColumns,
	} = props;

	const {
		state: {
			array,
			sort: { key, orderBy },
		},
		setArray,
		sortArray,
	} = useSortingArray<FullAppData>('name');

	const columns = activeColumns || DEFAULT_COLUMNS;

	React.useEffect(() => {
		setArray(properties.data.list);
	}, [properties.data.list]);

	const handleSortApps = React.useCallback(
		(e) => {
			const element = e.currentTarget as HTMLElement;
			const key = element.dataset.sortkey || '';
			sortArray({ key });
			onSort && onSort(key);
		},
		[onSort, sortArray],
	);

	const getSortTH = (val: ActiveColumns, title: string, sortKey: string) => {
		return (
			<th
				className={`app-grid-table__header__cell app-grid-table__header__cell-${val}`}
				scope="col"
				tabIndex={0}
				data-sortkey={sortKey}
				onClick={handleSortApps}
			>
				<span className="app-grid-table__header__cell-status-content-text">{title}&nbsp;</span>
				<SortIcon
					isAscending={key === sortKey && orderBy === 'asc'}
					ascendingSortIcon={ascendingSortIcon}
					descendingSortIcon={descendingSortIcon}
				/>
			</th>
		);
	};

	const getHeaderCell = (val: ActiveColumns) => {
		switch (val) {
			case 'left-placeholder':
			case 'right-placeholder':
			case 'app-options':
				return getDefaultTH(val, null);
			case 'name':
				return getSortTH(val, 'Name', 'name');
			case 'summary':
				return getDefaultTH(val, 'Summary');
			case 'create-date':
				return getSortTH(val, 'Created', 'created');
			case 'status':
				return getSortTH(val, 'Status', 'status.value');

			default:
				return getCustomTH(val, modifyColumns);
		}
	};

	return (
		<div className="app-grid">
			<div className="app-grid-scroller">
				<table className="app-grid-table" aria-describedby="App listing table">
					<thead>
						<tr className="app-grid-table__header">
							{columns?.map((col) => (
								<React.Fragment key={col}>{getHeaderCell(col)}</React.Fragment>
							))}
						</tr>
					</thead>
					<tbody>
						{(!array || array.length == 0) && <EmptyDataRow noAppMessage={noAppMessage} />}
						{array.map((app) => (
							<DataRow
								key={app.appId}
								app={app}
								defaultAppIcon={defaultAppIcon}
								previewTemplate={properties.previewTemplate}
								menuUrl={menuUrl}
								menuOptions={properties.options}
								onMenuClick={onMenuClick}
								activeColumns={columns}
								modifyColumns={modifyColumns}
							/>
						))}
						{array.length > 0 && <BlankRow amount={activeColumns?.length} />}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OcAppTable;

import * as React from 'react';

import { useSortingArray } from '../../../../lib/hooks';
import { FullAppData } from '../../../common/models';

import { BlankRow, DataRow, EmptyDataRow } from './components';
import { OcAppTableProps } from './types';
import { getHeaderCell } from './components/data-row-item';

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
	} = useSortingArray<FullAppData>('');

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

	return (
		<div className="app-grid">
			<div className="app-grid-scroller">
				<table className="app-grid-table" aria-describedby="App listing table">
					<thead>
						<tr className="app-grid-table__header">
							{columns?.map((col) => (
								<React.Fragment key={col}>
									{getHeaderCell(col, props, handleSortApps, key, orderBy)}
								</React.Fragment>
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

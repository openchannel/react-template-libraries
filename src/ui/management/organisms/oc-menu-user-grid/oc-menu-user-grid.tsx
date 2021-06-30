import * as React from 'react';

import { BlankRow, DataRow, EmptyDataRow, HeadColumnCell } from './components';
import { OcMenuUserGridProps } from './types';

import './style.scss';

export const OcMenuUserGrid: React.FC<OcMenuUserGridProps> = (props) => {
	const { properties, sortIcon, onSort, menuUrl, onMenuClick } = props;

	const handleSortUsers = React.useCallback(
		(e) => {
			if (!onSort) return;

			onSort(e.target.dataset.key);
		},
		[onSort],
	);

	return (
		<div className="user-grid-container">
			<div className="user-grid-overlay" />
			<div className="user-grid-wrapper">
				<table aria-describedby="user-management-table" className="user-table">
					<thead className="user-table__head">
						<tr className="user-table__row">
							<HeadColumnCell
								title="Name"
								columnKey="name"
								onClick={handleSortUsers}
								sortIcon={sortIcon}
							/>
							<HeadColumnCell
								title="Email"
								columnKey="email"
								onClick={handleSortUsers}
								sortIcon={sortIcon}
							/>
							<HeadColumnCell
								title="Date Added"
								columnKey="date"
								classKey="data"
								onClick={handleSortUsers}
								sortIcon={sortIcon}
							/>
							<HeadColumnCell
								title="Role"
								columnKey="role"
								onClick={handleSortUsers}
								sortIcon={sortIcon}
							/>
							<th className="user-table__head-status user-table__head-cell" scope="col">
								<div className="user-table__th-row">Status</div>
							</th>
							<th className="user-table__head-action user-table__head-cell" scope="col" />
						</tr>
					</thead>
					<tbody className="user-table__body">
						{(!properties.data.list || properties.data.list.length == 0) && <EmptyDataRow />}
						{properties.data.list.map((user) => (
							<DataRow
								key={user.userId}
								user={user}
								menuUrl={menuUrl}
								dropdownOptions={properties.options}
								onMenuClick={onMenuClick}
							/>
						))}
						{properties.data.list.length > 0 && <BlankRow />}
					</tbody>
				</table>
			</div>
		</div>
	);
};

import * as React from 'react';

import SortIcon from '../../../../../../assets/img/dropdown.svg';

interface HeadColumnCellProps {
	title: string;
	columnKey: string;
	classKey?: string;
	onClick: React.MouseEventHandler;
	sortIcon?: SVGElement;
}

export const HeadColumnCell: React.FC<HeadColumnCellProps> = React.memo(
	({ onClick, title, columnKey, classKey, sortIcon }) => (
		<th className={`user-table__head-cell user-table__head-${classKey || columnKey}`} scope="col">
			<div
				role="button"
				tabIndex={0}
				className="user-table__th-row"
				data-columnkey={columnKey}
				onClick={onClick}
			>
				{title}
				<div className="user-table__head-sort-icon">{sortIcon || <SortIcon />}</div>
			</div>
		</th>
	),
);

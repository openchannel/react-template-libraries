import * as React from 'react';

import { TableProps } from '../types';
import { useChartReducer } from '../hooks';
import DefaultSortIcon from '../../../../../assets/img/dropdown.svg';


const LabelIcon = ({ sortIcon = '', ...props }) => {
	if (!sortIcon) {
		return <DefaultSortIcon {...props} />
	}
	return <img {...props} src={sortIcon} alt="Sort arrow" />
}


export const Table: React.FC<TableProps> = (props) => {
	const { chartData, sortIcon } = props;

	const {
		state: {
			tableData,
			sort: { key, orderBy },
		},
		setTableData,
		sortTableData,
	} = useChartReducer();

	React.useEffect(() => {
		setTableData(chartData);
	}, [chartData])

	const tabularLabelsHeader = React.useMemo(() => {
		return (chartData.periods.find(({ active }) => active) || {}).tabularLabel
	}, [chartData.periods])

	const onSortData = React.useCallback((e) => {
		const key: 'label' | 'value' = e.currentTarget.dataset.sortkey;
		sortTableData({ key });
	}, [])

	return (
		<div className="chart__data-container-tabular">
			<div className="chart__data-container-tabular_scroll">
				<table className="chart__table-view" aria-describedby="char-data-table">
					<thead className="chart__table-view-head">
					<tr className="chart__table-view-row">
						<th scope="col" className="chart__table-view-cell chart__table-view-cell_padding">
							<div
								data-sortkey="label"
								onClick={onSortData}
								className="chart__table-view-heading"
							>
								{tabularLabelsHeader}
								<div className="chart__table-view-heading-sort-icon">
									<LabelIcon
										sortIcon={sortIcon}
										className={key === 'label' && orderBy === 'desc' ? 'chart__table-view-heading-sort-icon_rotated' : ''}
									/>
								</div>
							</div>
						</th>
						<th scope="col" className="chart__table-view-cell">
							<div
								data-sortkey="value"
								onClick={onSortData}
								className="chart__table-view-heading"
							>
								Result
								<div className="chart__table-view-heading-sort-icon">
									<LabelIcon
										sortIcon={sortIcon}
										className={key === 'value' && orderBy === 'desc' ? 'chart__table-view-heading-sort-icon_rotated' : ''}
									/>
								</div>
							</div>
						</th>
					</tr>
					</thead>
					<tbody className="chart__table-view-body">
					{
						tableData.map((item, k) => (
							<tr key={k} className="chart__table-view-body-row">
								<td className="chart__table-view-body-td">
									<p className="chart__table-view-cell chart__table-view-body-cell">
										{item.label}
									</p>
								</td>
								<td className="chart__table-view-body-td">
									<p className="chart__table-view-cell chart__table-view-body-cell">
										{item.value}
									</p>
								</td>
							</tr>
						))
					}
					</tbody>
				</table>
			</div>
		</div>
	)
}

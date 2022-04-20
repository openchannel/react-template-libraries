import * as React from 'react';

export const EmptyDataRow = React.memo(() => (
	<tr className="user-table__row">
		<td className="user-table__row-td oc-text-center last-grid-row" colSpan={8}>
			<span className="user-table__text">No Users Found</span>
		</td>
	</tr>
));

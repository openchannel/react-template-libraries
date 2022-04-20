import * as React from 'react';

export const BlankRow = React.memo(() => (
	<tr className="user-table__row">
		<td className="user-table__row-td user-table__last-grid-row" colSpan={8}>
			<span />
		</td>
	</tr>
));

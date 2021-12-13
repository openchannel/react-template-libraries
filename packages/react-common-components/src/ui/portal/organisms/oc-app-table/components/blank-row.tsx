import * as React from 'react';

export const BlankRow = React.memo(({ amount }: any) => {
	return (
		<tr>
			<td className="app-grid-table__bottom-not-empty-list" colSpan={amount}></td>
		</tr>
	);
});

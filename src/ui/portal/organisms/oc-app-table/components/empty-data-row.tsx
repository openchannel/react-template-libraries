import * as React from 'react';

export const EmptyDataRow = React.memo(() => (
	<tr>
		<td className="oc-table__td oc-text-center" colSpan={7}>
			<span className="oc-table__text-wrapper">No Applications Found</span>
		</td>
	</tr>
));

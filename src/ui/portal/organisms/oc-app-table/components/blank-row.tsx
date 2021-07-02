import * as React from 'react';

export const BlankRow = React.memo(() => (
	<tr>
		<td className="oc-table__td" colSpan={7}>
			<span className="oc-table__text-wrapper" />
		</td>
	</tr>
));

import * as React from 'react';

interface noAppMessageType {
	noAppMessage?: string;
}

export const EmptyDataRow: React.FC<noAppMessageType> = React.memo(
	({ noAppMessage = 'No Applications Found' }) => (
		<tr>
			<td className="app-grid-table__bottom-empty-list" colSpan={7}>
				{noAppMessage}
			</td>
		</tr>
	),
);

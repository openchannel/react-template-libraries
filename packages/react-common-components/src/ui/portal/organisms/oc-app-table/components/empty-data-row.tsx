import * as React from 'react';

interface noAppMessageType {
	noAppMessage?: string;
};

export const EmptyDataRow:React.FC<noAppMessageType> = React.memo(({noAppMessage = 'No Applications Found'}) => (
	<tr>
		<td className="oc-table__td oc-text-center no-app-found" colSpan={7}>
			<span className="oc-table__text-wrapper">{noAppMessage}</span>
		</td>
	</tr>
));

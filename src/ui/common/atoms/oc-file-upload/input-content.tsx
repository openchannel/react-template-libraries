import * as React from 'react';

import './style.scss';

export const InputContent = () => (
	<div className="file-container__placeholder">
		<p className="file-container__placeholder-text">
			Drag & drop file or
			<span className="file-container__placeholder-browse"> Browse File</span>
		</p>
	</div>
);

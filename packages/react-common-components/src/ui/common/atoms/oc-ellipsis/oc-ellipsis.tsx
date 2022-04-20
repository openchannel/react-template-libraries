import * as React from 'react';

import { OcEllipsisProps } from './types';

export const OcEllipsis: React.FC<OcEllipsisProps> = (props) => {
	const { tag, ...rest } = props;

	const ref = React.useRef<HTMLElement>(null);

	React.useLayoutEffect(() => {
		truncate();
		document.addEventListener('resize', truncate);

		return () => {
			document.removeEventListener('resize', truncate);
		};
	}, []);

	const truncate = () => {
		if (!ref.current) {
			return;
		}

		ref.current.innerText = ref.current.innerText.trim();

		// truncate the text and append the ellipsis
		const text = ref.current.innerText.split(' ');

		while (text.length > 0 && ref.current.scrollHeight > ref.current.clientHeight) {
			text.pop();
			ref.current.innerText = `${text.join(' ')}…`;
		}
	};

	return React.createElement(tag, { ...rest, ref });
};

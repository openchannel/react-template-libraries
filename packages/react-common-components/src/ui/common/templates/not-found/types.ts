import * as React from 'react';

export interface NotFoundProps {
	onClick?: React.MouseEventHandler;
	errorImgUrl?: string;
	title?: string;
	description?: string;
	buttonText?: string;
	buttonClassName?: string;
}

import * as React from 'react';

import './label.scss';


export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	/**
	 * Label value. Use text or children prop
	 */
	text?: React.ReactNode;
	/**
	 * Marks the label as required
	 */
	required?: boolean;
	/**
	 * Label value. Use text or children prop
	 */
	children?: React.ReactNode;
}


export const Label: React.FC<LabelProps> = props => {
	const {
		text,
		children,
		required,
		...p
	} = props

	return (
		<label className="oc-form-label" {...p}>
			{text || children}
			{required && <span className="oc-form-label__required">*</span>}
		</label>
	);
};

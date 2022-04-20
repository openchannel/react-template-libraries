// commit 174db3c0e9af41806a274368fae6cebebd2a25e8 Author: Julia Date: 03.03.21, 21:24
// commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 Author: Julia Date: 12.05.21, 18:29
import * as React from 'react';

import { ReactComponent as InfoIcon } from '../../../../assets/img/info.svg';
import OcTooltipComponent from '../../../common/atoms/oc-tooltip';

import './style.scss';

export interface OcTooltipLabelProps {
	/**
	 * Label value. Use text or children prop
	 */
	text?: React.ReactNode;
	/**
	 * Label value. Use text or children prop
	 */
	children?: React.ReactNode;
	/**
	 * Marks the label as required
	 */
	required?: boolean;
	/**
	 * Description for title.
	 * Open small modal panel to the right side with this description text.
	 */
	description?: string;
	/**
	 * Set global classes for label.
	 */
	labelClass?: string;
	/**
	 * Pass an input id to associates a label with an input field.
	 */
	htmlFor?: string;
	/**
	 *  Icon for showing description.
	 */
	infoTitleIconCsv?: string;
}

export const OcTooltipLabel: React.FC<OcTooltipLabelProps> = React.memo((props) => {
	const {
		text,
		children,
		htmlFor,
		labelClass = '',
		required,
		description,
		infoTitleIconCsv,
	} = props;

	return (
		<div className="tooltip-label">
			{/* eslint-disable-next-line jsx-a11y/label-has-for */}
			<label className={`tooltip-label__text ${labelClass}`} htmlFor={htmlFor}>
				{text || children}
				{required && <span className="tooltip-label__required">&nbsp;*</span>}
			</label>
			{description && description.length > 0 && (
				<OcTooltipComponent tooltip={description}>
					<div className="tooltip-label__description">
						{infoTitleIconCsv ? (
							<img src={infoTitleIconCsv} alt="Label description marker" />
						) : (
							<InfoIcon className="tooltip-label__description-icon" />
						)}
					</div>
				</OcTooltipComponent>
			)}
		</div>
	);
});

export default OcTooltipLabel;

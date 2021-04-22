import * as React from 'react';

import { Tooltip } from '../tooltip';
import InfoSvgIcon from '../../../../assets/img/info.svg';
import './styles.scss';


export interface TitleProps {
	/**
	 * title
	 */
	title: string;
	/**
	 * required (optional) - Is the required result data. Show the red marker.
	 * @default false
	 */
	required?: boolean;
	/**
	 * description (optional) - Description for title.
	 * Open small modal panel to the right side with this description text.
	 */
	description?: string;
	/**
	 * infoTitleIconCsv (optional) - link to the icon for showing description.
	 */
	infoTitleIconCsv?: string;
	/**
	 * String with class-list which can be
	 * added to the existed title class-list
	 */
	customClass?: string;
	/**
	 * Style which can be added to the title
	 * Supposed to be the style object
	 */
	customStyle?: React.CSSProperties;
}


export const Title: React.FC<TitleProps> = props => {
	const {
		title,
		description,
		required,
		customClass = '',
		customStyle,
		infoTitleIconCsv,
	} = props

	return (
		<div className="oc-title">
			<h4 className={`oc-title__text ${customClass}`} style={customStyle}>
				{title}
				{required && <strong className="oc-title__required">*</strong>}
			</h4>
			{
				(description && description.length > 0) && (
					<Tooltip tooltip={description}>
						<div className="oc-title__description">
							{infoTitleIconCsv ? <img src={infoTitleIconCsv} alt="Title description marker" /> : <InfoSvgIcon />}
						</div>
					</Tooltip>
				)
			}
		</div>
	)
}

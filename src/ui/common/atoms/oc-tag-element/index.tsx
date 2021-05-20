import * as React from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import DefaultCloseIcon from '../../../../assets/img/close-icon.svg';
import './styles.scss';


export interface OcTagElementProps {
	/**
	 * title - component title.
	 */
	title: string;
	/**
	 * deleteTagImgUrl - path to the SVG icon on the right title side.
	 */
	deleteTagImgUrl?: string;
	/**
	 * Return title by click event on icon.
	 * @param title
	 */
	onIconClick?: (title: string) => void;
}

export const OcTagElement: React.FC<OcTagElementProps> = React.memo((props) => {
	const {
		title,
		deleteTagImgUrl,
		onIconClick,
	} = props;

	const onClick = () => {
		if (!onIconClick) return;

		onIconClick(title);
	};

	return (
		<button className="tag-element">
			<div className="tag-element__text oc-text-wrap oc-text-truncate tag-label">{title}</div>
			{Boolean(onIconClick) && (
				<OverlayTrigger
					placement="top"
					overlay={
						<Tooltip id={`tooltip-${title}`} className="tag-element__tooltip-portal">
							Remove
						</Tooltip>
					}
				>
					<span
						tabIndex={0}
						className="tag-element__close-icon"
						onClick={onClick}
						onKeyDown={onClick}
					>
						{
							deleteTagImgUrl
								? <img src={deleteTagImgUrl} className="tag-element__close-icon-svg" alt={title} />
								: <DefaultCloseIcon className="tag-element__close-icon-svg" />
						}
					</span>
				</OverlayTrigger>
			)}
		</button>
	)
})

import * as React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import DefaultCloseIcon from '../../../../../assets/img/close-icon.svg';

import './style.scss';

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
	const { title, deleteTagImgUrl, onIconClick } = props;

	const onClick = () => {
		if (!onIconClick) return;

		onIconClick(title);
	};

	const onKeyDown = (event: React.KeyboardEvent) => {
		if (!onIconClick) return;

		if (event.key === 'Enter') {
			onIconClick(title);
		}
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
						role="button"
						tabIndex={0}
						className="tag-element__close-icon"
						onClick={onClick}
						onKeyDown={onKeyDown}
					>
						{deleteTagImgUrl ? (
							<img src={deleteTagImgUrl} className="tag-element__close-icon-svg" alt={title} />
						) : (
							<DefaultCloseIcon className="tag-element__close-icon-svg" />
						)}
					</span>
				</OverlayTrigger>
			)}
		</button>
	);
});

import * as React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { ReactComponent as DefaultCloseIcon } from '../../../../assets/img/close-icon.svg';

import './style.scss';

export interface OcTagElementProps {
	/**
	 * String with class-list which can be
	 * added to the existed title class-list
	 */
	customClass?: string;
	/**
	 * title - component title.
	 */
	title: string;
	/**
	 * id - component id.
	 */
	id?: string;
	/**
	 * deleteTagImgUrl - path to the SVG icon on the right title side.
	 */
	deleteTagImgUrl?: string;
	/**
	 * Return title by click event on icon.
	 * @param title
	 */
	onIconClick?: (title: string, id?: string) => void;
}

export const OcTagElement: React.FC<OcTagElementProps> = React.memo((props) => {
	const { customClass, title, id, deleteTagImgUrl, onIconClick } = props;

	const onClick = () => {
		if (!onIconClick) return;

		onIconClick(title, id);
	};

	const onKeyDown = (event: React.KeyboardEvent) => {
		if (!onIconClick) return;

		if (event.key === 'Enter') {
			onIconClick(title, id);
		}
	};

	// clicking on the tag causes the form to be submitted, so prevent this
	const onTagClick = (event: React.SyntheticEvent) => event.preventDefault();

	return (
		<button className={`tag-element ${customClass}`} onClick={onTagClick}>
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
							<DefaultCloseIcon className="tag-element__close-icon-svg fill-close-icon" />
						)}
					</span>
				</OverlayTrigger>
			)}
		</button>
	);
});

export default OcTagElement;

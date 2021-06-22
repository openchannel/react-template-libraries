//commit 9cf9b208d5a753c4fbbff30895ef07d41ffc260e Author: Julia Date: 21.05.21, 19:47
import * as React from 'react';
import { truncateWithHTML } from '../../utils';
import { sanitizeHtml, stripHtmlTags } from '../../../../lib/html-utils';
import './style.scss';

export interface AppDescriptionProps {
	/** Header of the App Description section */
	header?: string;
	/**text description */
	appDescription: string;
	/** Show full description always. Text for expand description will not be shown */
	showFullDescription: boolean;
	/** String with classes that will be applied to the header */
	headerClass?: string;
	/** Show button for switching between long and short description. */
	enableTruncateTextLogic?: boolean;
	/** Limit for description length for showing switch button */
	truncateTextLength?: number;
	/** Text for switch button. Shows when description <= truncateTextLength. */
	showMoreDescriptionText?: string;
	/** Text for switch button. Shows when description >= truncateTextLength. */
	showLessDescriptionText?: string;
	/**If we want a short description without expander */
	shortDescription?: boolean;
}

export const OcAppDescription: React.FC<AppDescriptionProps> = (props) => {
	const {
		appDescription = '',
		header = '',
		headerClass = '',
		enableTruncateTextLogic = true,
		truncateTextLength = 800,
		showMoreDescriptionText = 'Show more',
		showLessDescriptionText = 'Show less',
		shortDescription = false,
		showFullDescription = false,
	} = props;
	const [isFullDescription, toggleDescription] = React.useState(showFullDescription);

	const handleExpand = React.useCallback(() => {
		toggleDescription(!isFullDescription);
	}, [isFullDescription]);

	const tempDescription = sanitizeHtml(stripHtmlTags(appDescription)) || '';
	let tempDescriptionHtml = truncateWithHTML(tempDescription, truncateTextLength);

	if (enableTruncateTextLogic && truncateTextLength < tempDescription.length) {
		tempDescriptionHtml = truncateWithHTML(tempDescription, truncateTextLength);
	}

	return (
		<div className="description">
			<h4 className={`description__heading ${headerClass}`}>{header}</h4>
			<p className="description__text">
				{!isFullDescription && enableTruncateTextLogic ? tempDescriptionHtml : tempDescription}
			</p>
			{!shortDescription && !(truncateTextLength > tempDescription.length) && (
				<span className="description__show-more" onClick={handleExpand}>
					{!isFullDescription ? showMoreDescriptionText : showLessDescriptionText}
				</span>
			)}
		</div>
	);
};

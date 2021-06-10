//commit 9cf9b208d5a753c4fbbff30895ef07d41ffc260e Author: Julia Date: 21.05.21, 19:47
import * as React from 'react';
import './style.scss';

export interface AppDescriptionProps {
	/** Header of the App Description section */
	header?: string;
	/**text description */
	appDescription: string;
	/** Show full description always. Text for expand description will not be shown */
	showFullDescription: boolean;
	/** String with classes that will be applied to the header */
	headerClass: string;
	/** Show button for switching between long and short description. */
	enableTruncateTextLogic?: boolean;
	/** Limit for description length for showing switch button */
	truncateTextLength?: number;
	/** Text for switch button. Shows when description <= truncateTextLength. */
	showMoreDescriptionText?: string;
	/** Text for switch button. Shows when description >= truncateTextLength. */
	showLessDescriptionText?: string;
	/** toggle expand text function */
	toggleDescription?: any;
	/**If we want a short description without expander */
	shortDescription?: boolean;
}

export const OcAppDescription: React.FC<AppDescriptionProps> = (props) => {
	const {
		appDescription = '',
		header = '',
		showFullDescription = false,
		headerClass = '',
		enableTruncateTextLogic = true,
		truncateTextLength = 800,
		showMoreDescriptionText = 'Show more',
		showLessDescriptionText = 'Show less',
		toggleDescription,
		shortDescription = false,
	} = props;

	const handleExpand = () => {
		toggleDescription(!showFullDescription);
	};

	const getTextFromHtml = (html: string): string => {
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = html;
		return tempDiv.textContent || tempDiv.innerText || '';
	};

	const truncateWithHTML = (htmlText: string, truncateTo: number): string => {
		const substrings = htmlText.split(/(<[^>]*>)/g);
		let count = 0;
		const truncated = [];
		for (const substr of substrings) {
			if (!substr.startsWith('<')) {
				if (count > truncateTo) {
					continue;
				} else if (substr.length > truncateTo - count - 1) {
					truncated.push(`${substr.substring(0, truncateTo - count)}...`);
					return truncated.join('');
				} else {
					truncated.push(substr);
				}
				count += substr.length;
			} else {
				truncated.push(substr);
			}
		}
		return truncated.join('');
	};

	const tempDescription = getTextFromHtml(appDescription) || '';
	const truncatedText = truncateWithHTML(tempDescription, truncateTextLength);

	return (
		<div className="description">
			<h4 className={`description__heading ${headerClass}`}>{header}</h4>
			<p className="description__text">
				{!showFullDescription && enableTruncateTextLogic ? truncatedText : tempDescription}
			</p>
			{!shortDescription && (
				<span className="description__show-more" onClick={handleExpand}>
					{!showFullDescription ? showMoreDescriptionText : showLessDescriptionText}
				</span>
			)}
		</div>
	);
};

import * as React from 'react';
import {createNameInitials} from './utils';

import './style.scss';

type InitialsType = 'name' | 'image'

export interface InitialsProps {
	className?: string;
	initialsImageURL: string;
	initialsName: string;
	initialsType?: InitialsType;
	initialsNameCharactersLimit?: number;
}

export const OcInitialsComponent: React.FC<InitialsProps> = (props) => {
	const {
		initialsImageURL,
		initialsName,
		initialsType = 'name',
		initialsNameCharactersLimit = 2
	} = props;

	const mInitialsName = React.useMemo<string>(
		() => createNameInitials(initialsName, initialsNameCharactersLimit),
		[initialsName, initialsNameCharactersLimit]
	);

	const mInitialsType = React.useMemo<InitialsType>(
		() => initialsType === 'image' && initialsImageURL
		|| initialsType == 'name' && !mInitialsName && initialsImageURL
			? 'image'
			: 'name',
		[initialsType, initialsImageURL, mInitialsName]
	);

	return (
		<div className="initials-container">
			{mInitialsType === 'image' &&
			<img className="initials-container__image" src={initialsImageURL} alt="image"/>}
			{mInitialsType === 'name' && (
				<div id="initials-text" className="initials-container__text-container">
					<h4 className="initials-container__text-container-value">{mInitialsName}</h4>
				</div>
			)}
		</div>
	)
}

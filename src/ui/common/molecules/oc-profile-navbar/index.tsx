import * as React from 'react';
import { OcDropdown } from '../../index';
import './style.scss';

export interface ProfileNavbarProps {
	/**Username initials that will be shown in the avatar circle. If not set - avatar circle will not be shown */
	initials?: string;
	/** Name of the user that will be shown at the top near the avatar circle. If not set - username text will not be shown*/
	username?: string;
	/**Role of the user that will be shown at the bottom near the avatar circle. If not set - role text will not be shown */
	role?: string;
	/** internal prop for dropdown functional */
	selected: any;
	/** internal prop for dropdown functional */
	onSelect: any;
	/** default dropdown icon */
	defaultPlaceholderIcon?: React.ReactElement;
	/** icon for clicked state */
	activePlaceholderIcon?: React.ReactElement;
	/** variant of dropdown */
	variant?: 'inline' | 'block' | undefined;
}

export const OcProfileNavbar: React.FC<ProfileNavbarProps> = (props) => {
	const {
		initials,
		username,
		role,
		selected,
		onSelect,
		defaultPlaceholderIcon,
		activePlaceholderIcon,
		variant,
	} = props;

	return (
		<div className="profile-navbar">
			{initials && <div className="profile-navbar__initials">{initials}</div>}
			<div className="profile-navbar__dropdown-container">
				<OcDropdown
					children={
						<div className="profile-navbar__info-container">
							{username && <span className="profile-navbar__username">{username}</span>}
							{role && <span className="profile-navbar__role">{role}</span>}
						</div>
					}
					onSelect={onSelect}
					selected={selected}
					options={[]}
					defaultPlaceholderIcon={defaultPlaceholderIcon}
					activePlaceholderIcon={activePlaceholderIcon}
					variant={variant}
				/>
			</div>
		</div>
	);
};

import * as React from 'react';

import { OcInitialsComponent } from '../../atoms/oc-initials';

export const AppOption: React.FC<any> = ({ innerProps, value }) => {
	return (
		<div className="dropdown-multi-app__search__menu-item" {...innerProps}>
			<div className="dropdown-multi-app__search__menu-item-initials">
				<OcInitialsComponent
					initialsImageURL={value.icon}
					initialsName={value.name}
					initialsNameCharactersLimit={1}
					initialsType="image"
				/>
			</div>
			<div className="dropdown-multi-app__search__menu-item-app">
				<div className="dropdown-multi-app__search__menu-item-app-name">
					<span className="dropdown-multi-app__search__menu-item-app-name-preview">
						App Name :{' '}
					</span>
					<span className="dropdown-multi-app__search__menu-item-app-name-vale">{value.name}</span>
				</div>
				<div className="dropdown-multi-app__search__menu-item-app-data">
					<div className="dropdown-multi-app__search__menu-item-app-data-id">
						<span className="dropdown-multi-app__search__menu-item-app-data-id-preview">Id : </span>
						<span className="dropdown-multi-app__search__menu-item-app-data-id-vale">
							{value.appId}
						</span>
					</div>
					<div className="dropdown-multi-app__search__menu-item-app-data-version">
						<span className="dropdown-multi-app__search__menu-item-app-data-version-preview">
							Version :{' '}
						</span>
						<span className="dropdown-multi-app__search__menu-item-app-data-version-vale">
							{value.version}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AppOption;

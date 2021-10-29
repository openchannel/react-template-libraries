import * as React from 'react';
import Select from 'react-select';
import { InputActionMeta } from 'react-select/src/types';
import { noop } from 'lodash-es';

import { OcTagElement } from '../../atoms';

import AppOption from './app-option';
import useAppsService from './hooks';
import { DropdownMultiAppProps } from './types';

import './style.scss';

const noOptionsMessage = () => null;

export const OcDropdownMultiApp: React.FC<DropdownMultiAppProps> = (props) => {
	const {
		service,
		defaultValue = [],
		value = [],
		onChange = noop,
		placeholder = '',
		customClass,
		onBlur = noop,
	} = props;

	const { apps, loadApps, resetApps, selectedApps, setSelectedApps } = useAppsService(
		service,
		defaultValue,
	);
	const [searchText, setSearchText] = React.useState<string>('');

	// filtering should be remote
	const handleFilterOption = () => true;

	React.useEffect(() => {
		const newSelectedAppsIds = selectedApps.map((sApp) => sApp.value.appId);
		onChange(newSelectedAppsIds);
	}, [selectedApps, onChange]);

	const handleMenuOpen = React.useCallback(() => {
		loadApps(searchText, value);
	}, [loadApps, searchText, value]);

	const handleMenuClose = React.useCallback(() => {
		resetApps();
	}, [resetApps]);

	const handleSearch = React.useCallback(
		(request: string, { action }: InputActionMeta) => {
			if (action === 'set-value' || action === 'input-change') {
				if (action === 'input-change') {
					loadApps(request, value);
				}

				setSearchText(request);
			}
		},
		[loadApps, setSearchText, value],
	);

	const handleOptionSelect = React.useCallback(
		(option) => {
			let newSelectedApps = selectedApps.filter((o) => o.value.appId !== option.value.appId);
			if (selectedApps.length === newSelectedApps.length) {
				newSelectedApps = [...selectedApps, option];
			}

			setSelectedApps(newSelectedApps);
		},
		[selectedApps, setSelectedApps, onChange],
	);

	return (
		<div className={`dropdown-multi-app ${customClass}`}>
			<Select
				className="dropdown-multi-app__search"
				classNamePrefix="dropdown-multi-app__search"
				placeholder={placeholder}
				components={{ Option: AppOption }}
				options={apps}
				value={null}
				inputValue={searchText}
				filterOption={handleFilterOption}
				onMenuOpen={handleMenuOpen}
				onMenuClose={handleMenuClose}
				onInputChange={handleSearch}
				onChange={handleOptionSelect}
				noOptionsMessage={noOptionsMessage}
				onBlur={onBlur}
			/>
			<div className="dropdown-multi-app__tags">
				{(selectedApps || []).map((app) => (
					<OcTagElement
						key={app.value.appId}
						customClass="dropdown-multi-app__tags-item"
						title={app.label}
						onIconClick={() => handleOptionSelect(app)}
					/>
				))}
			</div>
		</div>
	);
};

export default OcDropdownMultiApp;

import * as React from 'react';

import { BaseDropdown } from './base-dropdown';
import { OcDropdownButtonProps } from './types';

import './oc-dropdown-button.scss';

export const OcDropdownButton: React.FC<OcDropdownButtonProps> = (props) => (
	<BaseDropdown {...props} variant="block" />
);

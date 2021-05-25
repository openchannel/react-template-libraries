import * as React from 'react';

import { BaseDropdown, BaseDropdownProps } from './base-dropdown';

import './oc-dropdown.scss';

export type OcDropdownProps = Omit<BaseDropdownProps, 'variant' | 'minDropdownWidth' | 'children'>;

export const OcDropdown: React.FC<OcDropdownProps> = (props) => (
	<BaseDropdown {...props} variant="inline" />
);

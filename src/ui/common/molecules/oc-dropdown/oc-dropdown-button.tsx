import * as React from 'react';

import { BaseDropdown, BaseDropdownProps } from './base-dropdown';
import { ToggleIndicatorProps } from './common/toggle-indicator';
import './oc-dropdown-button.scss';


export type OcDropdownButtonProps = Omit<BaseDropdownProps, 'variant' | 'title'> & ToggleIndicatorProps;

export const OcDropdownButton: React.FC<OcDropdownButtonProps> = (props) => <BaseDropdown {...props} variant="block" />;

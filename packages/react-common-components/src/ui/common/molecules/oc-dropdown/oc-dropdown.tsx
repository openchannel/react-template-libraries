import * as React from 'react';

import { BaseDropdown } from './base-dropdown';
import { OcDropdownProps } from './types';

import './oc-dropdown.scss';

export const OcDropdown: React.FC<OcDropdownProps> = (props) => <BaseDropdown {...props} />;

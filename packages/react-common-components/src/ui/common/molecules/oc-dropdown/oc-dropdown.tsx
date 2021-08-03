import * as React from 'react';

import { BaseDropdown } from './base-dropdown';
import { OcDropdownProps } from './types';

import './oc-dropdown.scss';

const OcDropdown: React.FC<OcDropdownProps> = (props) => <BaseDropdown {...props} />;

export default OcDropdown;

import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { BaseToggleIndicatorProps } from '../../../../packages/react-common-components/src/ui/common';
import { ToggleIndicator } from '../../../../packages/react-common-components/src/ui/common/molecules/oc-dropdown/common/toggle-indicator';


const setUp = (props: BaseToggleIndicatorProps) => shallow(<ToggleIndicator {...props} />);

describe('OcDropdown - toggle indicator component (common dropdown)', () => {
	const component: ShallowWrapper = setUp({
		isOpened: false,
		defaultPlaceholderIcon: React.createElement('span', null, 'default'),
		activePlaceholderIcon: React.createElement('span', null, 'active'),
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render default icon', () => {
		expect(component.contains(<span>default</span>)).toEqual(true);
	});

	it('should render active icon', () => {
		component.setProps({ isOpened: true });

		expect(component.contains(<span>active</span>)).toEqual(true);
	});

	it('should render default when active icon is undefined/null', () => {
		component.setProps({ activePlaceholderIcon: null });

		expect(component.contains(<span>default</span>)).toEqual(true);
	});
});

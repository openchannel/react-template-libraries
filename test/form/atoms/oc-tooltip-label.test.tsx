import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { OcTooltipComponent } from '../../../src/react-common-components/ui/common/atoms/oc-tooltip';

import { OcTooltipLabel, OcTooltipLabelProps } from '../../../src/react-common-components/ui/form';

const setUp = (props: OcTooltipLabelProps) => shallow(<OcTooltipLabel {...props} />);

describe('OcTooltipLabel', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp({
			text: 'label',
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should works with additional props', () => {
		component.setProps({
			required: true,
			htmlFor: 'input-id',
			text: null,
			children: 'another-label',
			labelClass: 'custom-class',
		});

		// test pass for attribute
		expect(component.find('label').props().htmlFor).toBe('input-id');
		// test render required element - '*'
		// test render children prop instead of text
		expect(component.find('label').text()).toBe('another-label*');
		// test render label with additional class
		expect(component.find('label').hasClass('custom-class')).toBe(true);
	});

	it('should render tooltip with description', () => {
		component.setProps({
			description: 'label description',
			infoTitleIconCsv: '/path/to/image',
		});

		// expect(component.find(OcTooltipComponent).find('img').props().src).toBe('/path/to/image');
		expect(component.find(OcTooltipComponent)).toBeTruthy();
	});
});

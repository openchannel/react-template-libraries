import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { RadioProps } from '../../../src/ui/portal';
import { Radio } from '../../../src/ui/portal/organisms/chart/components/radio';


const setUp = (props: RadioProps) => shallow(<Radio {...props} />);

describe('Chart (radio)', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp({
			id: 'option-1',
			label: 'option-1',
			checked: false,
			onChange: jest.fn(),
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should be checked and render "active" class', () => {
		component.setProps({
			checked: true,
		});

		expect(component.hasClass('chart__period-item-active')).toBeTruthy();
	});
});

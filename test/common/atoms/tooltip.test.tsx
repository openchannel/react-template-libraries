import * as React from 'react';
import enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Tooltip, TooltipProps } from '../../../src/ui/common';


enzyme.configure({ adapter: new Adapter() });

const setUp = (props: TooltipProps) => shallow(<Tooltip {...props} />);

describe('Tooltip (common tooltip)', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		const triggerComponent = React.createElement('div', null, 'trigger component')
		component = setUp({
			children: triggerComponent,
			tooltip: 'tooltip value',
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render under trigger element', () => {
		component.setProps({ position: 'bottom' });

		expect(component.prop('placement')).toEqual('bottom');
	});
});

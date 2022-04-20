import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TooltipProps } from '@openchannel/react-common-components/src/ui';
import OcTooltipComponent from '@openchannel/react-common-components/src/ui/common/atoms/oc-tooltip/oc-tooltip';

const setUp = (props: TooltipProps) => shallow(<OcTooltipComponent {...props} />);

describe('Tooltip (common tooltip)', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		const triggerComponent = React.createElement('div', null, 'trigger component');
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

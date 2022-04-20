import {OcDropdownMultiApp, DropdownMultiAppProps, AppsServiceResponse}  from '../../../../src/ui/common/molecules/oc-dropdown-multi-app';
import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';

const setUp = (props: DropdownMultiAppProps) => shallow(<OcDropdownMultiApp {...props} />);

describe('OcDropdownMultiApp', () => {
	let component: ShallowWrapper;

	const onChangeMock = jest.fn();
	const serviceCallMock = () => new Promise<AppsServiceResponse>(resolve => resolve({data: {list: []}}));

	beforeEach(() => {
		component = setUp({
			service: {
				searchInitialMultiApps: serviceCallMock,
				searchMultiApps: serviceCallMock
			},
			onChange: onChangeMock,
			value: [],
			defaultValue: [],
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should works with optional props', () => {
		component.setProps({
			placeholder: 'Select one',
			value: undefined, //using [] by default
		});

		expect(component).toBeTruthy();
	});
});


import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { CheckboxProps } from '@openchannel/react-common-components/src/ui';
import OcCheckboxComponent from '../../../src/ui/common/atoms/oc-checkbox/oc-checkbox';

const defaultCheckboxProps: CheckboxProps = {
	labelText: 'Required Checkbox',
	required: true,
	type: 'checkbox',
	disabled: false,
};

const setUp = (props: CheckboxProps) => shallow(<OcCheckboxComponent {...props} />);

describe('Required Checkbox', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp(defaultCheckboxProps);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain text value', () => {
		const label = component.find('.form-checkbox__label');
		expect(label.text()).toEqual('Required Checkbox*');
	});

	it('Be required and render *', () => {
		const star = component.find('.form-checkbox__required-glyph');
		expect(star).toBeTruthy();
	});

	it('checkbox should be disabled', async () => {
		component.setProps({ disabled: true });
		expect(component.find('input').prop('disabled')).toBeTruthy();
		component.setProps({ disabled: false });
		expect(component.find('input').prop('disabled')).toBeFalsy();
	});
});

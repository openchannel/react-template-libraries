import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TitleProps } from '@openchannel/react-common-components';
import OcTitleComponent from 'packages/react-common-components/src/ui/common/atoms/oc-title';
import OcTooltipComponent from 'packages/react-common-components/src/ui/common/atoms/oc-tooltip';

const defaultComponentProps: TitleProps = {
	title: 'Title',
	description: '',
};

const setUp = (props: TitleProps) => shallow(<OcTitleComponent {...props} />);

describe('Title (common title)', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp(defaultComponentProps);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain text value', () => {
		component.setProps({
			title: 'Test title',
		});

		expect(component.text()).toEqual('Test title');
	});

	it('should contain description value and render Tooltip', () => {
		component.setProps({
			description: 'Test description',
		});

		expect(component.find(OcTooltipComponent)).toBeTruthy();
	});

	it('should render custom Tooltip icon', () => {
		component.setProps({
			description: 'Test description',
			infoTitleIconCsv: '../../src/assets/img/delete.svg',
		});

		expect(component.find('img')).toHaveLength(1);
	});

	it('should contain an additional class', () => {
		component.setProps({
			customClass: 'red-text-color',
		});

		const element = component.find('h4');

		expect(element.hasClass('oc-title__text red-text-color')).toBeTruthy();
	});

	it('should contain an additional style properties', () => {
		component.setProps({
			customStyle: { backgroundColor: 'red' },
		});

		const element = component.find('h4');

		expect(element.props()).toHaveProperty('style', { backgroundColor: 'red' });
	});

	it('should contain a required mark', () => {
		component.setProps({
			required: true,
		});

		const contains = component
			.find('h4')
			.contains(<strong className="oc-title__required">*</strong>);

		expect(contains).toBeTruthy();
	});
});

import * as React from 'react';
// import { shallow, ShallowWrapper } from 'enzyme';
import { shallow } from 'enzyme';
// import { mount } from 'enzyme';
// import { stripHtmlTags } from '../../../../src/lib';

// import { OcAppShortInfo, OcAppShortInfoProps } from '../../../../src/ui/market';
import { OcAppShortInfo } from '../../../../src/ui/market';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { appData } from '../../../../stories/market/molecules/oc-app-short-info.stories';


// const setUp = (props: OcAppShortInfoProps) => shallow(<OcAppShortInfo {...props} />);

const mockExpected = "mock value";
jest.mock("../../../../src/lib", () => ({
	stripHtmlTags: jest.fn(() => mockExpected),
}));

describe('OcAppShortInfo', () => {
	let component: any;

	const clickByAppMock = jest.fn();

	beforeEach(() => {

		component = shallow(<OcAppShortInfo {...{
			app: appData,
			clickByApp: clickByAppMock,
		}} />);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should click on app name and fire app data', () => {
		const name = component.find('.info-card__content-name');

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		name.props().onClick()

		expect(clickByAppMock).toHaveBeenCalledWith(appData);
	});

	// it('should return correct description without html tags', () => {
	// 	const appDescription = component.find('.info-card__content-summary');
	//
	// 	console.log('appDescription', appDescription.text());
	//
	// 	expect(appDescription.text()).toContain('summary summaryr u sure about that?');
	// });


	it('should 2', () => {
		component.setProps({
			app: appData,
			clickByApp: jest.fn(),
			dropdown: React.createElement('span', null, 'custom-dropdown'),
		})

		const wrapper = component.find('.info-card__dropdown.info-card__dropdown_mobile');

		console.log('wrapper', wrapper.text())

		expect(wrapper.text()).toContain('custom-dropdown');
	});

	it('mock stripHtmlTags', () => {
		// expect(useEffect).toHaveBeenCalled()

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const actual = stripHtmlTags();

		console.log('actual', actual)

		expect(actual).toEqual(mockExpected);

	})


});

import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcAppShortInfo, OcAppShortInfoProps } from '../../../../../react-common-components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { appData } from './constants';

const setUp = (props: OcAppShortInfoProps) => shallow(<OcAppShortInfo {...props} />);

describe('OcAppShortInfo', () => {
	let component: ShallowWrapper;

	const clickByAppMock = jest.fn();

	beforeEach(() => {
		component = setUp({
			app: appData,
			clickByApp: clickByAppMock,
		});
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
});

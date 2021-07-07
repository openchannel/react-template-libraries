import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
// @ts-ignore
import { app1, app2 } from '../../../../stories/common/molecules/oc-app-card/mocks';
import { OcAppCard } from '../../../../src/react-common-components/ui/market';

describe('OcAppCard', () => {
	const component = shallow(
		<BrowserRouter>
			<OcAppCard
				appRedirectLink="/"
				app={app1}
			/>
		</BrowserRouter>,
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should show icon', () => {
		const component = mount(
			<BrowserRouter>
				<OcAppCard
					appRedirectLink="/"
					app={app1}
				/>
			</BrowserRouter>,
		);
		expect(component.find('img')).toBeTruthy();
	});

	it('should change props', () => {
		const component = mount(
			<BrowserRouter>
				<OcAppCard
					appRedirectLink="/"
					app={app1}
				/>
			</BrowserRouter>,
		);
		component.setProps({ app: app2 });
		component.setProps({ appRedirectLink: '/home' });

		expect(component.prop('app')).toEqual(app2);
		expect(component.prop('appRedirectLink')).toEqual('/home');
	});
});

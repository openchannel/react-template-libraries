import * as React from 'react';

import { OcNavigationBreadcrumbs } from '../../../../src/ui/common/molecules/oc-navigation-breadcrumbs/oc-navigation-breadcrumbs';
import { mount } from "enzyme";

describe('Navigation Breadcrumbs component', () => {

const component = mount(
	<OcNavigationBreadcrumbs
		pageTitle='My Profile'
		navigateText='Back'
		navigateClick={() => {}}
		buttonText='Invite a member'
		buttonClick={() => {}}/>
);

	it('should contain text My Profile', () => {
		expect(component.prop('pageTitle')).toEqual('My Profile');
	});

	it('should contain text Back', () => {
		expect(component.prop('navigateText')).toEqual('Back');
	});

	it('should contain text Invite a member', () => {
		expect(component.prop('buttonText')).toEqual('Invite a member');
	});

})

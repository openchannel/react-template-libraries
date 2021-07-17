import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { OcAppDescription } from '@openchannel/react-common-components';

describe('OcAppDescription', () => {
	const component = shallow(
		<OcAppDescription
			truncateTextLength={250}
			appDescription={
				'<p> Nulla ut cursus mi. Nullam mi lacus, porttitor a sapien quis, scelerisque vestibulum massa.<br> Phasellus tincidunt est eget fermentum dictum. Morbi consequat sed risus a maximus. <br>Proin aliquam libero eget tellus pharetra posuere. Praesent accumsan ipsum quam. <br> Suspendisse potenti. Maecenas id posuere dui, in semper urna. Sed mattis nec mauris eget tristique. <br>Phasellus id nulla id dolor sagittis placerat. <br>Aliquam posuere, magna sit amet vehicula posuere, elit purus facilisis elit, in lacinia enim diam consequat felis. <br>Nullam scelerisque in elit vitae feugiat. Nunc mattis eros leo, at finibus lacus ornare nec. Nulla facilisi.</p>'
			}
			header="About App"
			showFullDescription={false}
			shortDescription={false}
			headerClass=""
		/>,
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have text', () => {
		const component = mount(
			<OcAppDescription
				truncateTextLength={250}
				appDescription="<p> Nulla ut cursus mi.</p>"
				header="About App"
				showFullDescription={false}
				shortDescription={false}
				headerClass=""
			/>,
		);
		expect(component.prop('appDescription')).toEqual('<p> Nulla ut cursus mi.</p>');
	});

	it('should have exact header', () => {
		const component = mount(
			<OcAppDescription
				truncateTextLength={250}
				appDescription="<p> Nulla ut cursus mi</p>"
				header="About App"
				showFullDescription={false}
				shortDescription={false}
				headerClass=""
			/>,
		);
		component.setProps({ showFullDescription: true });
		component.setProps({ shortDescription: true });
		expect(component.prop('header')).toEqual('About App');
		expect(component.prop('showFullDescription')).toBeTruthy();
		expect(component.prop('shortDescription')).toBeTruthy();
	});
});

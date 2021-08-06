import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import OcRichTextEditorComponent from '../../../src/ui/common/atoms/oc-rich-text-editor/oc-rich-text-editor';

describe('Rich text format text editor', () => {
	const component: ShallowWrapper = shallow(
		<OcRichTextEditorComponent
			placeholderText="Default value"
			value=""
			onChange={undefined}
			initialValue=""
		/>,
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

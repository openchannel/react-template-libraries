import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcTagsProps } from '@openchannel/react-common-components';
import OcTags from '../../../../src/ui/form/molecules/oc-tags/oc-tags';
import OcTagElement from '../../../../src/ui/common/atoms/oc-tag-element/oc-tag-element';
import OcDropboxComponent from '../../../../src/ui/common/atoms/oc-dropbox/oc-dropbox';
import OcButtonComponent from '../../../../src/ui/common/atoms/oc-button/oc-button';

const setUp = (props: OcTagsProps) => shallow(<OcTags {...props} />);

describe('OcTags', () => {
	let component: ShallowWrapper;

	const onChangeMock = jest.fn();

	beforeEach(() => {
		component = setUp({
			availableTags: ['item2'],
			onChange: onChangeMock,
			value: ['item1'],
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
			tagsType: 'number',
			value: undefined, //using [] by default
		});

		expect(component).toBeTruthy();
	});

	it('should add new tag', () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		component.find(OcDropboxComponent).props().onInputChange('new-tag', { action: 'input-change' });

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		component.find(OcButtonComponent).props().onClick();

		expect(onChangeMock).toHaveBeenCalledWith(['item1', 'new-tag']);
	});

	it('should select available tag', () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		component.find(OcDropboxComponent).props().selectItem('item2');

		expect(onChangeMock).toHaveBeenCalledWith(['item1', 'item2']);
	});

	it('should remove selected tag', () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		component.find(OcTagElement).props().onIconClick('item1');

		expect(onChangeMock).toHaveBeenCalledWith([]);
	});
});

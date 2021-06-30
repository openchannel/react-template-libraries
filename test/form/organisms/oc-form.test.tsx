import * as React from 'react';
import { mount } from 'enzyme';

import { OcForm, AppFormModel, OcFormProps } from '../../../src/ui/form';

const formJsonData: AppFormModel = {
	// fields: [
	// 	// {
	// 	// 	"attributes": {
	// 	// 		"ordering": "append",
	// 	// 	},
	// 	// 	"required": null,
	// 	// 	"category": "CUSTOM",
	// 	// 	"defaultValue": null,
	// 	// 	"description": "",
	// 	// 	"id": "test-dynamic-field-array-2",
	// 	// 	"label": "Test Dynamic field array 2",
	// 	// 	"placeholder": undefined,
	// 	// 	"fields": [
	// 			// @ts-ignore
	// 			{
	// 				"attributes": {
	// 					// "maxChars": 10,
	// 					// "minChars": 1,
	// 					// "required": false
	// 				},
	// 				"category": "CUSTOM",
	// 				"defaultValue": 'some value',
	// 				"description": "some description",
	// 				"id": "field1",
	// 				"label": "field1",
	// 				"placeholder": "write some text",
	// 				"type": "text",
	// 			},
	// 		// ],
	// 		// "type": "dynamicFieldArray",
	// 	// },
	// ],
	formId: 'test',
	name: 'test',
	createdDate: 1599982592157,
	fields: [
		// {
		// 	id: 'name',
		// 	label: 'name',
		// 	description: 'test',
		// 	defaultValue: null,
		// 	type: 'text',
		// 	required: null,
		// 	attributes: {
		// 		maxChars: 20,
		// 		required: true,
		// 		minChars: 10,
		// 	},
		// 	options: null,
		// 	// subFieldDefinitions: null,
		// },
		// {
		// 	id: 'role',
		// 	label: 'role',
		// 	description: '',
		// 	defaultValue: 'user',
		// 	type: 'dropdownList',
		// 	required: null,
		// 	attributes: { required: true },
		// 	options: ['admin', 'user', 'test'],
		// 	// subFieldDefinitions: null,
		// },
		// {
		// 	id: 'aboutme',
		// 	label: 'aboutme',
		// 	description: '',
		// 	defaultValue: null,
		// 	type: 'richText',
		// 	required: null,
		// 	attributes: {
		// 		maxChars: 150,
		// 		required: false,
		// 		minChars: 10,
		// 	},
		// 	options: null,
		// 	// subFieldDefinitions: null,
		// },
		// {
		// 	id: 'skills',
		// 	label: 'skills',
		// 	description: 'skills',
		// 	defaultValue: ['angular'],
		// 	type: 'tags',
		// 	required: null,
		// 	attributes: {
		// 		minCount: 1,
		// 		maxCount: 5,
		// 		required: true,
		// 	},
		// 	options: ['angular', 'react', 'react native', 'spring'],
		// 	// subFieldDefinitions: null,
		// },
	],
};

const setUp = (props: OcFormProps) => mount(<OcForm {...props} />);

describe('OcForm', () => {
	let wrapper: any;

	const onSubmitMock = jest.fn();
	const onCancelMock = jest.fn();

	beforeEach(() => {
		wrapper = setUp({
			formJsonData,
			onSubmit: onSubmitMock,
			onCancel: onCancelMock,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should create', () => {
		expect(wrapper).toBeTruthy();
	});

	it('render button group by buttonPosition', () => {
		expect(wrapper.find('.form__button').at(0).parent().is('.form__buttons.form__buttons_justify_start')).toBeTruthy();

		wrapper.setProps({ buttonPosition: 'center' });
		expect(wrapper.find('.form__button').at(0).parent().is('.form__buttons.form__buttons_justify_center')).toBeTruthy();

		// instead of undefined. 'left' if default
		wrapper.setProps({ buttonPosition: 'not-valid-value' });
		expect(wrapper.find('.form__button').at(0).parent().is('.form__buttons.form__buttons_justify_start.form__buttons_direction_row_reverse')).toBeTruthy();
	});

	it('should click cancel button', () => {
		wrapper.find('.form__button').find('button[type="button"]').simulate('click');
		expect(onCancelMock).toHaveBeenCalled();
	});

});

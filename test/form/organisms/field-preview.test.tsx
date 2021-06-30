import * as React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { OcTagElement } from '../../../src/ui/common';
import { PreviewFieldModel, FieldPreview, OcDynamicFieldArray } from '../../../src/ui/form';

const defaultProps = {
	"index": 0,
	"path": "0",
	"staticId": "AdKPzvZcHLrEzAeLGUppp",
	"name": "2-6_YB6TerfKsq1GaZ--JL6",
	"value": '',
	"previousValue": "",
	"isEditing": false,
	"isNew": false,

	fieldValue: null,
	isValidField: false,
	formArrayDFA: null,
	groupFieldIndex: 0,
}

const setUp = (props: PreviewFieldModel) => shallow(<FieldPreview {...props} />);

describe('FieldPreview', () => {
	it('should create', () => {
		const component = setUp({
			"attributes": {
				"ordering": "append",
			},
			"required": null,
			"category": "CUSTOM",
			"defaultValue": null,
			"description": "",
			"id": "test-dynamic-field-array-2",
			"label": "Test Dynamic field array 2",
			"placeholder": undefined,
			"fields": [],
			"type": "dynamicFieldArray",
			...defaultProps,
		});

		expect(component.find(OcDynamicFieldArray)).toBeTruthy();
	});

	it('should render multiselect with selected value', () => {
		const component = setUp({
			attributes: {
				required: true,
				maxCount: 3,
				minCount: 2,
			},
			options: ['One', 'Two', 'Three', 'Five'],
			category: 'CUSTOM',
			defaultValue: [],
			description: undefined,
			id: 'multi-select-test',
			label: 'Multi Select test',
			placeholder: 'select some',
			type: 'multiselectList',

			...defaultProps,
			value: ['One'],
		});

		expect(component.find(OcTagElement).get(0).props.title).toBe('One');
	});

	it('should render rich-text value', () => {
		const component = setUp({
			id: 'about-me',
			label: 'about-me',
			description: '',
			defaultValue: null,
			type: 'richText',
			required: null,
			attributes: {
				maxChars: 150,
				required: true,
				minChars: 10,
			},
			options: null,

			...defaultProps,
			value: '<p>rich text html value</p>',
		});

		expect(component.find('div').html()).toBe('<div><p>rich text html value</p></div>');
	});

	it('should render single image value', () => {
		const component = setUp({
			id: 'single-file',
			label: 'single-file',
			defaultValue: null,
			type: 'singleImage',

			...defaultProps,
			value: '../path/to/image',
		});

		expect(component.find('img').props().src).toBe('../path/to/image');
	});

	it('should render multi image value', () => {
		const component = setUp({
			id: 'single-file',
			label: 'single-file',
			defaultValue: null,
			type: 'multiImage',

			...defaultProps,
			value: ['../path/to/image', '../path/to/second-image'],
		});

		expect(component.find('.array-preview__field-content__image-multi').children()).toHaveLength(2);
	});

	it('should render checkbox value', () => {
		const component = setUp({
			attributes: {
				required: true,
			},
			category: 'CUSTOM',
			defaultValue: true,
			description: '',
			id: 'test-checkbox',
			label: 'Test Checkbox',
			type: 'checkbox',

			...defaultProps,
			value: true,
		});

		expect(component.find('span').text()).toEqual('Yes');
	});

	it('should render color value', () => {
		const component = setUp({
			attributes: {
				required: true,
			},
			category: 'CUSTOM',
			defaultValue: null,
			id: 'test-color-component',
			label: 'Test Color Component',
			placeholder: 'Choose your color',
			type: 'color',

			...defaultProps,
			value: '#f2a1c0',
		});

		expect(component.find('.array-preview__field-content__color').props()?.style?.backgroundColor).toEqual('#f2a1c0');
	});

	it('should render dropdown-list value', () => {
		const component = setUp({
			id: 'role',
			label: 'role',
			description: '',
			defaultValue: 'user',
			type: 'dropdownList',
			options: ['admin', 'user', 'test'],

			...defaultProps,
			value: 'user',
		});

		expect(component.find('.array-preview__field-content__text').text()).toEqual('user');
	});

	it('should render date value', () => {
		const component = setUp({
			category: 'CUSTOM',
			defaultValue: null,
			id: 'test-date-picker',
			label: 'Test Date picker',
			type: 'date',

			...defaultProps,
			value: moment(1623938512563),
		});
		expect(component.find('.array-preview__field-content__text').text()).toBe('Jun 17, 2021');

		component.setProps({
			value: 'Jun 18, 2021',
		})
		expect(component.find('.array-preview__field-content__text').text()).toBe('Jun 18, 2021');
	});

	it('should render date-time value', () => {
		const component = setUp({
			defaultValue: '',
			id: 'test-datetime-picker',
			label: 'Test date-time picker',
			type: 'datetime',

			...defaultProps,
			value: moment(1623938512563),
		});
		expect(component.find('.array-preview__field-content__text').text()).toBe('Jun 17, 2021 17:06');

		component.setProps({
			value: 1602489693553,
		});
		expect(component.find('.array-preview__field-content__text').text()).toBe('Oct 12, 2020 11:10');
	});

	it('should render private single file value', () => {
		const component = setUp({
			id: 'file-upload-1',
			label: 'private single File Upload',
			defaultValue: null,
			type: 'privateSingleFile',

			...defaultProps,
			value: new File(['foo'], 'foo.txt', { type: 'text/plain' }),
		});
		expect(component.find('.array-preview__field-content__file-single-container')).toHaveLength(1);
	});

	it('should render multi private file value', () => {
		const component = setUp({
			id: 'file-upload-2',
			label: 'private multi File Upload',
			defaultValue: null,
			type: 'multiPrivateFile',

			...defaultProps,
			value: [
				new File(['foo'], 'foo.txt', { type: 'text/plain' }),
				new File(['bar'], 'bar.txt', { type: 'text/plain' })
			],
		});
		expect(component.find('.array-preview__field-content__file-multi').children()).toHaveLength(2);
	});

	it('should render multi private file value', () => {
		const component = setUp({
			id: 'unsupported',
			label: 'unsupported',
			defaultValue: null,
			type: 'unsupported',

			...defaultProps,
			value: '<p>value of unsupported field type with html value</p>',
		});
		expect(component.find('.array-preview__field-content__text').text()).toEqual('value of unsupported field type with html value');
	});
});

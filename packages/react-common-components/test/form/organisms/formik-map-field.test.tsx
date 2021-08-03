import { Formik } from 'formik';
import * as React from 'react';
import { mount } from 'enzyme';

import OcInputComponent from 'packages/react-common-components/src/ui/common/atoms/oc-input';
import OcNumberComponent from 'packages/react-common-components/src/ui/common/atoms/oc-number';
import OcPasswordComponent from 'packages/react-common-components/src/ui/common/atoms/oc-password';
import {
	FormikOcFileUploadWrapper,
	FIELD_TYPE,
	OcDynamicFieldArray,
	FormikOcMultiSelectListWrapper,
	FormikOcDatetimePickerWrapper,
	FormikOcVideoUrlWrapper,
	FormikOcTagsWrapper,
	FormikOcColorWrapper,
	FormikOcSelectWrapper,
	FormikRichTextWrapper,
	FormikMapFieldsProps,
	FormikMapFields,
} from '@openchannel/react-common-components';
import OcCheckboxComponent from 'packages/react-common-components/src/ui/common/atoms/oc-checkbox';

const defaultFieldProps = {
	id: 'some-field',
	label: 'some-field',
	description: '',
	defaultValue: null,
	type: 'text',
	required: null,
	attributes: {
		maxChars: 150,
		required: false,
		minChars: 10,
	},
	options: null,
	index: 0,
	path: '0',
	staticId: 'yYayIQhIgpv-7PFK2qK_b',
	name: 'some-field-kEEjoM3qdHJOwaqDmh4GV',
	value: '123123123',
	previousValue: '123123123',
	isEditing: false,
	isNew: false,
};

const setUp = (props: FormikMapFieldsProps) =>
	mount(
		<Formik initialValues={{}} onSubmit={() => {}}>
			<FormikMapFields {...props} />
		</Formik>,
	);

const setUpField = (type: string) =>
	setUp({
		fields: [{ ...defaultFieldProps, type }],
	});

describe('FormikMapFields', () => {
	let component;

	it('should return nothing if fields are empty', () => {
		component = setUp({ fields: [] });
		expect(component.find(FormikMapFields).children().length).toBe(0);
	});

	it('should render the correct component by type', function () {
		expect(setUpField(FIELD_TYPE.RICH_TEXT).find(FormikRichTextWrapper)).toBeTruthy();
		expect(setUpField(FIELD_TYPE.TEXT).find(OcInputComponent)).toBeTruthy();
		expect(setUpField(FIELD_TYPE.NUMBER).find(OcNumberComponent)).toBeTruthy();
		expect(setUpField(FIELD_TYPE.CHECKBOX).find(OcCheckboxComponent)).toBeTruthy();
		expect(setUpField(FIELD_TYPE.EMAIL_ADDRESS).find(OcInputComponent)).toBeTruthy();
		expect(setUpField(FIELD_TYPE.WEBSITE_URL).find(OcInputComponent)).toBeTruthy();
		expect(setUpField(FIELD_TYPE.COLOR).find(FormikOcColorWrapper)).toBeTruthy();
		expect(setUpField(FIELD_TYPE.VIDEO_URL).find(FormikOcVideoUrlWrapper)).toBeTruthy();
		expect(setUpField(FIELD_TYPE.DATE_TIME).find(FormikOcDatetimePickerWrapper)).toBeTruthy();
		expect(
			setUpField(FIELD_TYPE.MULTISELECT_LIST).find(FormikOcMultiSelectListWrapper),
		).toBeTruthy();
		expect(setUpField(FIELD_TYPE.PASSWORD).find(OcPasswordComponent)).toBeTruthy();
		expect(setUpField('some-undefined-type').html()).toEqual('<div>Unsupported field</div>');
	});

	it('should render the oc-select by dropdownList type', function () {
		const component = setUp({
			fields: [
				{
					...defaultFieldProps,
					id: 'first',
					options: ['one', 'two'],
					index: 0,
					type: FIELD_TYPE.DROPDOWN_LIST,
				},
			],
		});
		expect(component.find(FormikOcSelectWrapper)).toBeTruthy();
	});

	it('should render the oc-tags by type', function () {
		expect(setUpField(FIELD_TYPE.TAGS).find(FormikOcTagsWrapper)).toBeTruthy();
		expect(setUpField(FIELD_TYPE.BOOLEAN_TAGS).find(FormikOcTagsWrapper).props().tagsType).toBe(
			'boolean',
		);
		expect(setUpField(FIELD_TYPE.NUMBER_TAGS).find(FormikOcTagsWrapper).props().tagsType).toBe(
			'number',
		);
	});

	it('should render the oc-file-upload', function () {
		expect(setUpField(FIELD_TYPE.SINGLE_FILE).find(FormikOcFileUploadWrapper)).toBeTruthy();
		expect(setUpField(FIELD_TYPE.PRIVATE_SINGLE_FILE).find(FormikOcFileUploadWrapper)).toBeTruthy();
		expect(setUpField(FIELD_TYPE.SINGLE_IMAGE).find(FormikOcFileUploadWrapper)).toBeTruthy();
		expect(setUpField(FIELD_TYPE.MULTI_FILE).find(FormikOcFileUploadWrapper)).toBeTruthy();
		expect(setUpField(FIELD_TYPE.MULTI_PRIVATE_FILE).find(FormikOcFileUploadWrapper)).toBeTruthy();
		expect(setUpField(FIELD_TYPE.MULTI_IMAGE).find(FormikOcFileUploadWrapper)).toBeTruthy();
	});

	it('should render the OcDynamicFieldArray', function () {
		const single = setUp({
			fields: [
				{
					...defaultFieldProps,
					id: 'first',
					fields: [],
					index: 0,
					type: FIELD_TYPE.DYNAMIC_FIELD_ARRAY,
				},
			],
		});
		expect(single.find(OcDynamicFieldArray)).toBeTruthy();

		const double = setUp({
			fields: [
				{
					...defaultFieldProps,
					name: 'first',
					id: 'first',
					index: 0,
					type: FIELD_TYPE.DYNAMIC_FIELD_ARRAY,
				},
				{
					...defaultFieldProps,
					name: 'second',
					id: 'second',
					index: 1,
					type: FIELD_TYPE.DYNAMIC_FIELD_ARRAY,
				},
			],
		});
		expect(double.find(OcDynamicFieldArray).at(1).props().groupFieldIndex).toBe(1);
	});
});

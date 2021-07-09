import { Formik } from 'formik';
import * as React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';

import {
	OcDropboxComponent,
	OcRichTextEditorComponent,
	OcDatetimePicker,
	FormikOcMultiSelectListWrapper,
	FormikOcDatetimePickerWrapper,
	FormikOcVideoUrlWrapper,
	FormikOcTagsWrapper,
	FormikOcSelectWrapper,
	FormikRichTextWrapper,
	FormikOcColorWrapper,
} from '@openchannel/react-common-components';

const setUpWithFormik = (component: any) => mount(
	<Formik initialValues={{}} onSubmit={() => {}}>
		{component}
	</Formik>
);

describe('formik-components', () => {
	const setFieldValueMock = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('FormikOcColorWrapper should set value to formikState', () => {
		const wrapper = setUpWithFormik(
			<FormikOcColorWrapper
				// @ts-ignore
				field={{ value: '', name: 'color' }}
				// @ts-ignore
				form={{ setFieldValue: setFieldValueMock }}
			/>
		);

		wrapper.find('input[name="color"]').at(0).simulate('change', { target: { value: '#a1b2c3' } });
		expect(setFieldValueMock).toHaveBeenCalledWith('color', '#A1B2C3');
	});

	it('FormikRichTextWrapper should set value to formikState', () => {
		const wrapper = setUpWithFormik(
			<FormikRichTextWrapper
				// @ts-ignore
				field={{ value: '', name: 'richEditor' }}
				// @ts-ignore
				form={{ setFieldValue: setFieldValueMock }}
			/>
		);

		wrapper.find(OcRichTextEditorComponent).props().onChange('<p>some html<p/>');
		expect(setFieldValueMock).toHaveBeenCalledWith('richEditor', '<p>some html<p/>');
	});

	it('FormikOcSelectWrapper should set value to formikState', () => {
		const wrapper = setUpWithFormik(
			<FormikOcSelectWrapper
				// @ts-ignore
				field={{ value: [], name: 'select' }}
				// @ts-ignore
				form={{ setFieldValue: setFieldValueMock }}
				options={[ 'two' ]}
				placeholder="Select one"
			/>
		);

		//click on toggle component
		wrapper.find('.select-component__action').simulate('click');
		// select element in list
		wrapper.find('button[name="two"]').simulate('click');
		expect(setFieldValueMock).toHaveBeenCalledWith('select', 'two');
	});

	it('FormikOcTagsWrapper should set value to formikState', () => {
		const wrapper = setUpWithFormik(
			<FormikOcTagsWrapper
				// @ts-ignore
				field={{ value: [], name: 'tags' }}
				// @ts-ignore
				form={{ setFieldValue: setFieldValueMock }}
				options={[ 'tag-1', 'tag-2' ]}
				placeholder="Select tag"
			/>
		);

		wrapper.find(OcDropboxComponent).props().selectItem('tag-2');
		expect(setFieldValueMock).toHaveBeenCalledWith('tags', ['tag-2']);
	});

	it('FormikOcVideoUrlWrapper should set value to formikState', () => {
		const link = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

		const wrapper = setUpWithFormik(
			<FormikOcVideoUrlWrapper
				// @ts-ignore
				field={{ value: '', name: 'video-url' }}
				// @ts-ignore
				form={{ setFieldValue: setFieldValueMock }}
			/>
		);

		wrapper.find('input').simulate('change', { target: { value: link }});
		expect(setFieldValueMock).toHaveBeenCalledWith('video-url', link);
	});

	it('FormikOcDatetimePickerWrapper should set value to formikState', () => {
		const nextValue = moment('22/1/2021');

		const wrapper = setUpWithFormik(
			<FormikOcDatetimePickerWrapper
				// @ts-ignore
				field={{ value: '', name: 'datetime' }}
				// @ts-ignore
				form={{ setFieldValue: setFieldValueMock }}
				type="datetime"
			/>
		);

		wrapper.find(OcDatetimePicker).props().onChange(nextValue);
		expect(setFieldValueMock).toHaveBeenCalledWith('datetime', nextValue);
	});

	it('FormikOcMultiSelectListWrapper should set value to formikState', () => {
		const wrapper = setUpWithFormik(
			<FormikOcMultiSelectListWrapper
				// @ts-ignore
				field={{ value: [ 'one' ], name: 'multi-select' }}
				// @ts-ignore
				form={{ setFieldValue: setFieldValueMock }}
				label="this is placeholder"
				options={[ 'one', 'two', 'three' ]}
			/>
		);

		wrapper.find(OcDropboxComponent).props().selectItem('three');
		expect(setFieldValueMock).toHaveBeenCalledWith('multi-select', [ 'one', 'three' ]);
	});
});

import * as React from 'react';

import { AppFormModel, OcDynamicFieldArray, OcDynamicFieldArrayProps } from '../../../src/react-common-components/ui/form';
// @ts-ignore
import { mountWithFormik } from '../test-utils';

const formJsonData: AppFormModel = {
	formId: 'test',
	name: 'test',
	createdDate: 1599982592157,
	fields: [
		{
			"attributes": {
				"ordering": "append",
				"rowLabel": "field1",
			},
			"required": null,
			"category": "CUSTOM",
			"defaultValue": null,
			"description": "",
			"id": "test-dynamic-field-array",
			"label": "Test Dynamic field array",
			"placeholder": undefined,
			"fields": [
				{
					"attributes": {
						"maxChars": 10,
						"minChars": 1,
						"required": false
					},
					"category": "CUSTOM",
					"defaultValue": null,
					"description": "some description",
					"id": "field1",
					"label": "field1",
					"placeholder": "write some text",
					"type": "text",
					"index": 0,
					"path": "0.fields.0",
					"staticId": "yYayIQhIgpv-7PFK2qK_b",
					"name": "field1-kEEjoM3qdHJOwaqDmh4GV",
					"value": "123123123",
					"previousValue": "123123123",
					"isEditing": true,
					"isNew": false
				},
				{
					"id": "long-text-example",
					"label": "Long Text Example",
					"type": "longText",
					"placeholder": "Write your text here...",
					"category": "CUSTOM",
					"defaultValue": null,
					"attributes": {
						"maxChars": 200,
						"required": false,
						"minChars": 2
					},
					"index": 1,
					"path": "0.fields.1",
					"staticId": "C8eYB71HB2CN8EvQEpEPK",
					"name": "long-text-example-V-_T4y-eg2BkRjbokH9Ho",
					"value": "",
					"previousValue": "",
					"isEditing": true,
					"isNew": false
				},
			],
			"type": "dynamicFieldArray",
			// @ts-ignore
			"index": 0,
			"staticId": "AdKPzvZcHLrEzAeLGUppp",
			"name": "test-dynamic-field-array-6_YB6TerfKsq1GaZ--JL6",
			"value": "",
			"previousValue": "",
			"isEditing": true,
			"isNew": false
		}
	]
}

const setUp = (props: OcDynamicFieldArrayProps) => mountWithFormik(<OcDynamicFieldArray {...props} />);

describe('OcDynamicFieldArray', () => {
	it('should render', () => {
		//@ts-ignore
		const component = setUp({ field: formJsonData!.fields[0], showAddButton: false, groupFieldIndex: 0 });

		expect(component).toBeTruthy();
	});

	it('should render with 1', function () {
		const notEditableFields = {
			...formJsonData,
			fields: [
				{
					//@ts-ignore
					...formJsonData.fields[0],
					isEditing: false,
					//@ts-ignore
					fields: formJsonData.fields[0].fields.map(f => ({ ...f, isEditing: false })),
				},
			],
		};

		//@ts-ignore
		const component = setUp({ field: notEditableFields, showAddButton: false, groupFieldIndex: 0 });

		expect(component).toBeTruthy();
	});

	it('should render with row-label', function () {
		//@ts-ignore
		const component = setUp({ field: formJsonData!.fields[0], showAddButton: false, groupFieldIndex: 0 });

		const field1 = component.find('input');
		field1.simulate('change', { target: { value: 'Hello', id: field1.props().id } });

		expect(component.find('.cards-interface__preview-header-text').text()).toBe('Hello');
	});
});

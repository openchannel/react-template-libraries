import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
	FormikField,
	OcDynamicArrayPreview,
	OcDynamicArrayPreviewProps
} from '@openchannel/react-common-components/src/ui';

const mockFields: FormikField[] = [
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
		"isEditing": false,
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
		"isEditing": false,
		"isNew": false
	},
	{
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
		"index": 2,
		"path": "0.fields.2",
		"staticId": "AdKPzvZcHLrEzAeLGUppp",
		"name": "test-dynamic-field-array-2-6_YB6TerfKsq1GaZ--JL6",
		"value": "",
		"previousValue": "",
		"isEditing": false,
		"isNew": false
	}
]

const setUp = (props: OcDynamicArrayPreviewProps) => shallow(<OcDynamicArrayPreview {...props} />);

describe('OcDynamicArrayPreview', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp({
			fields: mockFields,
			hideLabel: false,
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render with empty fields', () => {
		component = setUp({
			fields: [],
		});

		expect(component.find('.array-preview').children()).toHaveLength(0);
	});

});

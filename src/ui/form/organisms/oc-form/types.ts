// export const fieldTypeValues = [
// 	'richText', 'text', 'longText', 'dropdownList', 'tags', 'singleFile',
// 	'multiple', 'multiImage', 'singleImage', 'privateSingleFile', 'multiPrivateFile', 'number',
// 	'checkbox', 'emailAddress', 'websiteUrl', 'color', 'booleanTags', 'numberTags', 'videoUrl',
// 	'date', 'datetime', 'multiselectList', 'dynamicFieldArray', 'password',
// ]
// export type FieldType = typeof fieldTypeValues;

export type FieldType = 'richText' | 'text' | 'longText' | 'dropdownList' | 'tags' | 'singleFile' |
	'multiple' | 'multiImage' | 'singleImage' | 'privateSingleFile' | 'multiPrivateFile' | 'number' |
	'checkbox' | 'emailAddress' | 'websiteUrl' | 'color' | 'booleanTags' | 'numberTags' | 'videoUrl' |
	'date' | 'datetime' | 'multiselectList' | 'dynamicFieldArray' | 'password';

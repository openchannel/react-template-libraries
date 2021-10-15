export const FIELD_TYPE = {
	TAGS: 'tags',
	BOOLEAN_TAGS: 'booleanTags',
	NUMBER_TAGS: 'numberTags',
	MULTI_IMAGE: 'multiImage',
	SINGLE_IMAGE: 'singleImage',
	SINGLE_FILE: 'singleFile',
	MULTIPLE: 'multiple',
	MULTI_FILE: 'multiFile',
	PRIVATE_SINGLE_FILE: 'privateSingleFile',
	MULTI_PRIVATE_FILE: 'multiPrivateFile',
	TEXT: 'text',
	LONG_TEXT: 'longText',
	RICH_TEXT: 'richText',
	NUMBER: 'number',
	CHECKBOX: 'checkbox',
	EMAIL_ADDRESS: 'emailAddress',
	WEBSITE_URL: 'websiteUrl',
	COLOR: 'color',
	VIDEO_URL: 'videoUrl',
	DATE: 'date',
	DATE_TIME: 'datetime',
	PASSWORD: 'password',
	MULTISELECT_LIST: 'multiselectList',
	DROPDOWN_LIST: 'dropdownList',
	DYNAMIC_FIELD_ARRAY: 'dynamicFieldArray',
	MULTI_APP: 'multiApp'
};

export const errorMessages: Record<string, any> = {
	required: (): string => 'Please fill out this field',
	minlength: ({ requiredLength }: { requiredLength: string | number }): string =>
		`The min number of characters is ${requiredLength}`,
	maxlength: ({ requiredLength }: { requiredLength: string | number }): string =>
		`The max allowed number of characters is ${requiredLength}`,
	minCount: (): string => '',
	maxCount: (): string => '',
	minElementsCount: ({
		requiredCount,
		fieldLabel,
	}: {
		requiredCount: string | number;
		fieldLabel: string;
	}): string => `Minimum ${requiredCount} ${fieldLabel} are required`,
	maxElementsCount: ({
		requiredCount,
		fieldLabel,
	}: {
		requiredCount: string | number;
		fieldLabel: string;
	}): string => `Maximum ${requiredCount} ${fieldLabel} are required`,
	pattern: ({ requiredPattern }: { requiredPattern: string }): string =>
		`The required pattern is: ${requiredPattern}`,
	years: ({ message }: { message: string }): string => message,
	countryCity: ({ message }: { message: string }): string => message,
	uniqueName: ({ message }: { message: string }): string => message,
	telephoneNumbers: ({ message }: { message: string }): string => message,
	telephoneNumber: ({ errorMessages }: { errorMessages: string }): string => errorMessages,
	email: (): string => 'Email seems to be invalid',
	url: (): string => 'Please enter a valid URL',
	appImageFile: (): string => 'Please provide valid png/jpg/jpeg/gif image file',
	appExpiredDate: (): string => 'Please fill valid current or future date',
	whiteSpace: (): string => 'Please fill valid value',
	domain: (): string => 'Please enter a valid domain',
	phoneNumber: ({ message }: { message: string }): string => message,
	confirmPassword: (): string => 'Confirm password does not match to new password',
	serverError: ({ message }: { message: string }): string => message,
	min: ({ min }: { min: string | number }): string => `The minimum possible value is ${min}`,
	max: ({ max }: { max: string | number }): string => `The maximum possible value is ${max}`,
	color: (): string => 'Please enter a valid Color value.',
	booleanTags: ({ fieldTitle }: { fieldTitle: string }): string =>
		`${fieldTitle} can only contain boolean values ('true' or 'false')`,
	numberTags: ({ fieldTitle }: { fieldTitle: string }): string =>
		`${fieldTitle} can only contain numeric values`,
	password: (): string =>
		'Password must contains 1 uppercase, 1 lowercase, 1 digit, 1 special char (one of @#$%!^&) and at least 8 character long',
	customError: (message: string): string => message,
};

# react-common-components

* [react-common-components](#react-common-componentss)
  * [About the library](#about-the-library)
  * [Built with](#built-with)
  * [Dependencies](#dependencies)
  * [Installation](#installation)
  * [Storybook](#storybook)
  * [Development](#development)
  * [Usage](#usage)
  * [Contact](#contact)
  

# About the library

Includes components for portal and market (form builder, form components, file upload, app cards, login, signup, inputs, etc)
* Form components:
  - form builder.
  - input, selects.
  - file upload
  - color picker
  - video url
  - date time picker
  - tags
  - wizard form
  - etc
* Common components:
  - select.
  - button
  - iframe video
  - etc.
* Portal components:
  - charts
  - app tables
* Market components:
  - app cards
  - app tables
* Auth components

## Built With
* [React](https://reactjs.org) v. 17.0.2
* [Typescript](https://www.typescriptlang.org) v. 4.2.4
* [Bootstrap](https://getbootstrap.com) v. 4.6.0
* [Storybook](https://storybook.js.org) v. 6.2.8


## Dependencies
    "@react-bootstrap/react-bootstrap": "1.5.2",
    "bootstrap": "4.6.0",
    "chart.js": "3.3.2",
    "color": "^3.1.3",
    "crypto-js": "^4.1.1",
    "dompurify": "^2.2.8",
    "formik": "^2.2.8",
    "lodash": "^4.17.21",
    "lodash-es": "^4.17.21",
    "moment": "^2.29.1",
    "nanoid": "^3.1.23",
    "react-bootstrap": "^1.5.2",
    "react-cropper": "^2.1.8",
    "react-day-picker": "^7.4.10",
    "react-dropzone": "^11.4.2",
    "react-multi-carousel": "^2.6.3",
    "react-player": "^2.9.0",
    "react-select": "^4.3.1",
    "react-toastify": "^7.0.4",
    "tinymce": "^5.8.1",
    "tslib": "^2.3.0"   

## Installation

Before installation please check **required libs** [README.md](../../README.md#required-libs)

1. Install library `npm i @openchannel/react-common-components`

2. To load TinyMCE when the page or application is loaded, open react.json and add TinyMCE to the global scripts tag.

3. For the File Uploader component should be created a service which extends `FileUploaderService`.
Service must consist two function `fileUploadRequest` and `fileDetailsRequest` which  should return your requests to CAP
   Example of service:
```sh
	uploadToOpenChannel( file, isPrivate, hash ) => {
		return fileService
			.getToken()
			.then(res => fileService.prepareUploadReq(res.data.token, file, isPrivate, hash));
	},
    	prepareUploadReq: async (token, file, isPrivate, hash) => {
		const httpParams = new URLSearchParams();
		if (isPrivate) {
			httpParams.set('isPrivate', `${isPrivate}`);
		}

		if (hash && hash?.length > 0) {
			httpParams.set('hash', hash);
		}

		const marketUrl = await configService.getMarketUrl();

		return api.post(
			`${marketUrl}/${FILES_URL}`,
			{
				body: file,
				headers: {
					'upload-token': `${token}`,
					'Content-Type': 'multipart/form-data',
				},
				params: httpParams,
			},
			{
				noCsrfToken: true,
				ignoreNProgress: true,
			},
		);
	},

```

4. Error messages for all forms. Have default implementation errorMessages.
```
errorMessages.required();
errorMessages.email();
errorMessages.minlength();
errorMessages.maxlength();
errorMessages.minCount();
errorMessages.maxCount();
```
- For the whole list of error methods see `src/ui/form/lib/constants.ts`.

If you want to update error messages follow this example:
```
errorMessages.customError(msg);
```

### Connect library to project
Note: Run commands from the root directory.

1. 'npm i'  
   
2. `npm build components`

3. `cd ./dist/react-common-components`

4. `sudo npm link` Then copy result link.

5. In your react project run: `npm install file:{absolute path to react-common-components}/dist/react-common-components`

6. Import example (ts file):
   import { ComponentOrModel } from '@openchannel/react-common-components/src/lib/common-components';
   
### Running tests
Run `npm run build`

### Package Project
Run `npm run pack:components`

### Publish package version
Run `cd ./dist/react-common-components && npm publish`

### Storybook

* Install npm dependencies

  ``npm i``

* Build Project

  ``npm run build react-common-components --watch``

* Run Storybook

  ``npm run storybook``

Note:
* If you can't start the Storybook. Try to Update its version:
  ``npx sb@latest upgrade``

* If updating the storybook version did not help. Try this:
  ``npm run storybook-update-and-run``

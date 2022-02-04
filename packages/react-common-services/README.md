# react-common-services

* [react-common-services](#react-common-services)
* [Built with](#services-built-with)
* [Dependencies](#services-dependencies)
* [Installation](#services-installation)
* [Development](#services-development)
* [Usage](#services-usage)
* [Contact](#services-contact)
  
### Services Built With
* [react 17.0.2](https://reactjs.org)

## About the library
Store models and services for creating a marketplace instance:
* API services.
  - user authorization.
  - marketplace endpoints.
* Models :
  - request and response models.
* Utils:
  - CSRF interceptor. Syncs CSRF token between pages.
  
## Services Dependencies

    "jwt-decode": "3.1.2",
    "broadcast-channel": "4.0.0",

## Services Installation

1. Install dependencies
Run in the root:

```
yarn add _package_ -W
```

Go to the package directory and write the new dependencies in its own package.json.

Go to the root directory and link the dependency versions to the child package:

```
yarn run link
```

2. Install services `npm i @openchannel/react-common-services`

### Import Applications Versions
Note: Listing app versions returns App Pages based on query and sort criteria.
Add import
```
import { appVersion } from '@openchannel/react-common-services';
```

Example:
```
   await appVersion.getAppsVersions(pageNumber, limit, sort, query );
```

### Import Applications
Note: Get, create, delete, publish, change status of application.
Add import
```
import { apps } from '@openchannel/react-common-services';
```
Example:  
```
apps.getAppById(appId)
apps.deleteApp(appId);
apps.publishAppByVersion(appId, { version, autoApprove: false });
apps.createApp({appName, AppType , AppData});
apps.changeAppStatus(appId, appVersion, appStatus, reason )

```


## Connect library to project by link
Note: Run commands from the root directory.
1. `npm i`
   
2. `npm erun build react-common-services`

3. `cd ./dist/react-common-services`

4. `sudo npm link` Then copy result link.
   * Example:
     * Command Result (sudo npm link):  
    `/usr/local/lib/node_modules/@openchannel/react-common-services -> /home/user/git/react-template-libraries/dist/react-common-services`
      * Copy link: `/home/user/git/react-template-libraries/dist/react-common-services`
5. In your react project run: `npm install file:{absolute path to react-common-services or copied path}/dist/react-common-services`
   * Example:
   `npm install file:/home/user/git/react-template-libraries/dist/react-common-services`


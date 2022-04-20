# Openchannel react template libraries
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=openchannel_react-template-libraries&metric=alert_status&token=a3f70b9be679e9c1591e77fea94cf6c80398416d)](https://sonarcloud.io/dashboard?id=openchannel_react-template-libraries)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=openchannel_react-template-libraries&metric=coverage&token=a3f70b9be679e9c1591e77fea94cf6c80398416d)](https://sonarcloud.io/dashboard?id=openchannel_react-template-libraries)


This project contains react libraries for Openchannel templates.

---
## Required libs
This libs used for react-common-components and react-common-services

* npm 6.15.15
* node 14.18.1
* react 17.0.2
   
Follow these instructions for installing npm & node:
  * Download and install nvm manager. (Helps to set required versions).   
   `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`
  * Install npm and node:  
    `nvm install 10.15.2`
  * Set current node version:  
    `nvm use 10.15.2`
  * Print npm and node versions:  
    `echo npm : $(npm -v), node : $(node -v)`
---

## Documentation (README.md)
* Components: [Readme](./packages/react-common-components/README.md)

* Services: [Readme](./packages/react-common-services/README.md)


### react-common-components
- `npm i`
- `npm run build:components`

Note: this command build and run documentation for components on the http://127.0.0.1:8802

### react-common-services
- `npm i`
- `npm run build:services`

Note: this command build and run documentation for services on the http://127.0.0.1:8801

### Installing the new dependencies

Run in the root:

- `yarn add _package_ -W`

Go to the package directory and write the new dependencies in its own package.json.

Go to the root directory and link the dependency versions to the child package:

- `yarn run link`

### Run storybook

Run in the root:

- `yarn run storybook`

### Build

Run in the root:

- `yarn run build`

All packages will be built using lerna.

---

## Contact
Website: [https://openchannel.io](https://openchannel.io)
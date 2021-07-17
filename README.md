Repo based on [tsdx](https://https://tsdx.io/).

### Installing the new dependencies

Run in the root:

```bash
yarn add _package_ -W
```

Go to the package directory and write the new dependencies in its own package.json.

Go to the root directory and link the dependency versions to the child package:

```bash
yarn run link
```

### Run storybook

Run in the root:

```bash
yarn run storybook
```

### Build

Run in the root:

```bash
yarn run build
```

All packages will be built using lerna.

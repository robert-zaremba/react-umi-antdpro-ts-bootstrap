
# umijs

## controling the build process

+ turning on/off the typescript  typecheck: [fork-ts-checker](https://umijs.org/guide/env-variables.html#fork-ts-checker)

# typescript

+ Ignore typecheck
  add the following comment: // @ts-ignore

# linting

## tslint

+ Disabling rules:
    https://palantir.github.io/tslint/usage/rule-flags/
    eg: // tslint:disable-next-line: no-useless-escape max-line-length

    someCode();  // tslint:disable-line - Disables all rules for the current line


## eslint

+ Disabling rules
    // eslint-disable-next-line import/prefer-default-export


# graphql clients

## Relay

### file uploading

+ https://madeintandem.com/blog/uploading-files-relay-modern/
+ https://github.com/relay-tools/react-relay-network-modern/issues/41
+ https://github.com/relay-tools/react-relay-network-modern
+ https://github.com/facebook/relay/issues/1844

# mohito

[![https://raw.githubusercontent.com/LestaD/mohito/master/mohito.png](https://raw.githubusercontent.com/LestaD/mohito/master/mohito.png)](https://www.npmjs.com/package/mohito)

 [![bitHound Overalll Score](https://www.bithound.io/github/LestaD/mohito/badges/score.svg)](https://www.bithound.io/github/LestaD/mohito)
 [![Dependencies](https://david-dm.org/lestad/mohito.svg)](https://www.npmjs.com/package/mohito)
 [![npm version](https://badge.fury.io/js/mohito.svg)](https://www.npmjs.com/package/mohito)
 [![GitHub tag](https://img.shields.io/github/tag/lestad/mohito.svg)](https://github.com/LestaD/mohito/releases)

## Readme

Simple console utilite to update your NPM dependencies

Now in dev

### info

Get info about single package:

```bash
$ mohito info react
Package: name@1.0.1
  Installed: react@0.13.3 in dependencies

  Get latest versions...ok

  List of versions of <react> is from 0.13.3 to 0.14.0
  current > * 0.13.3
            * 0.14.0-alpha1
            * 0.14.0-alpha2
            * 0.14.0-alpha3
            * 0.14.0-beta1
            * 0.14.0-beta2
            * 0.14.0-beta3
            * 0.14.0-rc1
   latest > * 0.14.0

  Please read <react> docs before update:
  https://github.com/facebook/react/tree/master/npm-react

```

### list

Get list of current dependencies:

```bash
$ mohito list --dev
Package: name@1.0.0
base:
  react@0.13.3
  baobab@1.9.8
  baobab-react@1.9.8
  commander@1.4.1
dev:
  conlog@1.0.4
  winston@2.1.5
```

### updates

Load updates for all dependencies

```bash
$ mohito updates --dev
Package: name@1.0.0
  Load updates...ok
base:
  react@0.13.3         new 0.14.0
  baobab@1.9.8         new 2.0.1
  baobab-react@1.9.8   new 2.0.1
  commander@1.4.1      actual
dev:
  conlog@1.0.4         actual
  winston@2.1.5        new 3.0.2

  Check your application to stability
```

### help

To get help

```bash
$ mohito help

$ mohito --help

$ mohito -h
```


## Roadmap

> Implement before `v1.0`

Need write tests.

commands:



Update all dependencies without confirm (only with `--all` switch):

```bash
$ mohito upgrade --all
Package: name@1.0.0
  Load updates...ok

  Installing <react@0.14.0> ...ok
  Installing <baobab@2.0.1> ...ok
  Installing <baobab-react@2.0.1> ...ok
  Installing <winston@3.0.2> ...ok
base:
  updated  react          0.13.3 -> 0.14.0
  updated  baobab         1.9.8 -> 2.0.1
  updated  baobab-react   1.9.8 -> 2.0.1
     kept  commander            -> 1.4.1
dev:
     kept  conlog               -> 1.0.4
  updated  winston        2.1.5 -> 3.0.2

  Check your application to stability
```


Update only one dependency safe:

> If `--safe` switch not specified, package was upgraded to latest version.

```bash
$ mohito upgrade react --safe
Package: name@1.0.0
  Get latest versions...ok

  Latest versions of <react> is from 0.13.3 to 0.14.4
           * 0.13.3
           * 0.13.4
           * 0.14.0-rc1
           * 0.14.0-rc2
  latest > * 0.14.0

  Input version or press Enter to install latest [0.14.0]:

  # after enter version
  Installing <react@0.14.0> ...ok
> Updated <react> from 0.13.3 to 0.14.0
  Check your application to stability
```


Update one dependency to specified version
> Option `--safe` ignore

```bash
$ mohito upgrade react@0.13.4
  Check version 0.13.4 of <react>...ok
  Installing <react@0.13.4>...ok
> Updated <react> from 0.13.3 to 0.13.4
  Check your application to stability
```

> Implement after `v0.9`

Check each package before upgrade

```bash
$ mohito upgrade --safe
Package: name@1.0.0
  Load updates...ok

> Has update for <react>:
  Latest versions of <react> is from 0.13.3 to 0.14.4
           * 0.13.3
           * 0.13.4
           * 0.14.0-rc1
           * 0.14.0-rc2
  latest > * 0.14.0

  Enter version or press Enter or enter `latest` to install latest version.
  Enter `keep` or `k` to skip current package.
  Version [k/keep/l/latest/<version>]:
  # after enter `latest`
  Installing <react@0.14.0> ...ok
> Updated <react> from 0.13.3 to 0.14.0

> Has update for <baobab>:
  Latest versions of <react> is from 0.13.3 to 0.14.4
           * 0.13.3
           * 0.13.4
           * 0.14.0-rc1
           * 0.14.0-rc2
  latest > * 0.14.0

  Enter version or press Enter or enter `latest` to install latest version.
  Enter `keep` or `k` to skip current package.
  Version [k/keep/l/latest/<version>]:
  # after last installed package

  Check your application to stability
```



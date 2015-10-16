# mohito


## Readme

Simple console utilite to update your NPM dependencies

Now in dev



## Roadmap

commands:

Get list of current dependencies:

```bash
$ mohito # or `mohito list`
  react@0.13.3
  baobab@1.9.8
  baobab-react@1.9.8
  commander@1.4.1
dev
  conlog@1.0.4
  winston@2.1.5
```

Load updates for all dependencies

```bash
$ mohito updates
  Load updates...ok

  react@0.13.3         new 0.14.0
  baobab@1.9.8         new 2.0.1
  baobab-react@1.9.8   new 2.0.1
  commander@1.4.1      actual
dev
  conlog@1.0.4         actual
  winston@2.1.5        new 3.0.2

  Check your application to stability
```

Update all dependencies now

```bash
$ mohito upgrade
  Load updates...ok

  Installing <react@0.14.0> ...ok
  Installing <baobab@2.0.1> ...ok
  Installing <baobab-react@2.0.1> ...ok
  Installing <winston@3.0.2> ...ok

  updated  react          0.13.3 -> 0.14.0
  updated  baobab         1.9.8 -> 2.0.1
  updated  baobab-react   1.9.8 -> 2.0.1
     kept  commander            -> 1.4.1
dev
     kept  conlog               -> 1.0.4
  updated  winston        2.1.5 -> 3.0.2

  Check your application to stability
```

Update only one dependency

```bash
$ mohito upgrade react
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

```bash
$ mohito upgrade react 0.13.4
  Check version 0.13.4 of <react>...ok
  Installing <react@0.13.4>...ok
> Updated <react> from 0.13.3 to 0.13.4
  Check your application to stability
```


Check each package before upgrade

```bash
$ mohito upgrade --safe
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



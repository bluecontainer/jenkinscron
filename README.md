jenkinscron
===========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/jenkinscron.svg)](https://npmjs.org/package/jenkinscron)
[![Downloads/week](https://img.shields.io/npm/dw/jenkinscron.svg)](https://npmjs.org/package/jenkinscron)
[![License](https://img.shields.io/npm/l/jenkinscron.svg)](https://github.com/GitHub/jenkinscron/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g jenkinscron
$ jenkinscron COMMAND
running command...
$ jenkinscron (-v|--version|version)
jenkinscron/0.0.0 darwin-x64 node-v10.11.0
$ jenkinscron --help [COMMAND]
USAGE
  $ jenkinscron COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`jenkinscron hello [FILE]`](#jenkinscron-hello-file)
* [`jenkinscron help [COMMAND]`](#jenkinscron-help-command)
* [`jenkinscron runnow [FILE]`](#jenkinscron-runnow-file)

## `jenkinscron hello [FILE]`

describe the command here

```
USAGE
  $ jenkinscron hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ jenkinscron hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/GitHub/jenkinscron/blob/v0.0.0/src/commands/hello.ts)_

## `jenkinscron help [COMMAND]`

display help for jenkinscron

```
USAGE
  $ jenkinscron help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `jenkinscron runnow [FILE]`

describe the command here

```
USAGE
  $ jenkinscron runnow [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/runnow.ts](https://github.com/GitHub/jenkinscron/blob/v0.0.0/src/commands/runnow.ts)_
<!-- commandsstop -->

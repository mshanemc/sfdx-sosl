# `plugin-streaming`

[![npm version](https://badge.fury.io/js/%40mshanemc%2Fplugin-streaming.svg)](https://badge.fury.io/js/%40mshanemc%2Fplugin-streaming)

Streaming API and push topic management.

# Usage

<!-- usage -->
```sh-session
$ npm install -g @mshanemc/plugin-streaming
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
@mshanemc/plugin-streaming/1.1.7 darwin-x64 node-v13.2.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`sfdx streaming:list [-t <array>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-streaminglist--t-array--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx streaming:pushtopic:create -n <string> -q <string> [-d <integer>] [-f <string>] [-o <array>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-streamingpushtopiccreate--n-string--q-string--d-integer--f-string--o-array--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx streaming:pushtopic:deactivate -n <string> [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-streamingpushtopicdeactivate--n-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx streaming:pushtopic:delete -n <string> [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-streamingpushtopicdelete--n-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx streaming:pushtopic:update -n <string> [-d <integer>] [-f <string>] [-o <array>] [-q <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-streamingpushtopicupdate--n-string--d-integer--f-string--o-array--q-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx streaming:subscribe [-t <string>] [-n <string>] [-r <integer>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-streamingsubscribe--t-string--n-string--r-integer--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx streaming:list [-t <array>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

What kinds of things can I subscribe to?

```
USAGE
  $ sfdx streaming:list [-t <array>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -t, --types=types                                                                 [default: cdc,event,topic] optional
                                                                                    specify which types to query

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx shane:streaming:list

EXAMPLES
  sfdx streaming:list // list everything
  sfdx streaming:list -t cdc,topic // list CDC and PushTopic but not standard and custom PlatformEvents
```

_See code: [src/commands/streaming/list.ts](https://github.com/mshanemc/streaming-sfdx/blob/v1.1.7/src/commands/streaming/list.ts)_

## `sfdx streaming:pushtopic:create -n <string> -q <string> [-d <integer>] [-f <string>] [-o <array>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Create push topics

```
USAGE
  $ sfdx streaming:pushtopic:create -n <string> -q <string> [-d <integer>] [-f <string>] [-o <array>] [-u <string>] 
  [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --description=description                                                     add a description to the push topic

  -f, --notifyforfields=All|Referenced|Select|Where                                 [default: Referenced] Specifies
                                                                                    which fields are evaluated to
                                                                                    generate a notification

  -n, --name=name                                                                   (required) name for the push topic

  -o, --operations=operations                                                       [default:
                                                                                    create,update,delete,undelete] which
                                                                                    operations should produce a
                                                                                    notification

  -q, --query=query                                                                 (required) The SOQL query statement
                                                                                    that determines which record changes
                                                                                    trigger events to be sent to the
                                                                                    channel.

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx shane:streaming:pushtopic:create

EXAMPLES
  sfdx streaming:pushtopic:create -n myTopic -q "select Id,Name from account"
       // creates the push topic
    
  sfdx streaming:pushtopic:create -n myTopic -q "select Id from account" -f All -o create,update
       // creates the push topic and sets operations and watches all fields
```

_See code: [src/commands/streaming/pushtopic/create.ts](https://github.com/mshanemc/streaming-sfdx/blob/v1.1.7/src/commands/streaming/pushtopic/create.ts)_

## `sfdx streaming:pushtopic:deactivate -n <string> [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

deactivate push topics

```
USAGE
  $ sfdx streaming:pushtopic:deactivate -n <string> [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -n, --name=name                                                                   (required) name for the push topic

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx shane:streaming:pushtopic:deactivate

EXAMPLE
  sfdx streaming:pushtopic:deactivate -n myTopic
```

_See code: [src/commands/streaming/pushtopic/deactivate.ts](https://github.com/mshanemc/streaming-sfdx/blob/v1.1.7/src/commands/streaming/pushtopic/deactivate.ts)_

## `sfdx streaming:pushtopic:delete -n <string> [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Delete a push topic

```
USAGE
  $ sfdx streaming:pushtopic:delete -n <string> [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -n, --name=name                                                                   (required) name for the push topic

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx shane:streaming:pushtopic:delete

EXAMPLE
  sfdx streaming:pushtopic:delete -n myTopic
```

_See code: [src/commands/streaming/pushtopic/delete.ts](https://github.com/mshanemc/streaming-sfdx/blob/v1.1.7/src/commands/streaming/pushtopic/delete.ts)_

## `sfdx streaming:pushtopic:update -n <string> [-d <integer>] [-f <string>] [-o <array>] [-q <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Update push topics

```
USAGE
  $ sfdx streaming:pushtopic:update -n <string> [-d <integer>] [-f <string>] [-o <array>] [-q <string>] [-u <string>] 
  [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --description=description                                                     add a description to the push topic

  -f, --notifyforfields=All|Referenced|Select|Where                                 Specifies which fields are evaluated
                                                                                    to generate a notification

  -n, --name=name                                                                   (required) name for the push topic

  -o, --operations=operations                                                       which operations should produce a
                                                                                    notification

  -q, --query=query                                                                 The SOQL query statement that
                                                                                    determines which record changes
                                                                                    trigger events to be sent to the
                                                                                    channel.

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx shane:streaming:pushtopic:update

EXAMPLES
  sfdx streaming:pushtopic:update -n myTopic -q "select Id,Name from account"
       // modifies the push topic
    
  sfdx streaming:pushtopic:update -n myTopic -q "select Id from account" -f All -o create,update
       // modifies the push topic and sets operations and watches all fields
```

_See code: [src/commands/streaming/pushtopic/update.ts](https://github.com/mshanemc/streaming-sfdx/blob/v1.1.7/src/commands/streaming/pushtopic/update.ts)_

## `sfdx streaming:subscribe [-t <string>] [-n <string>] [-r <integer>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

```
USAGE
  $ sfdx streaming:subscribe [-t <string>] [-n <string>] [-r <integer>] [-u <string>] [--apiversion <string>] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -n, --name=name                                                                   name of the topic/event/dataEvent

  -r, --replay=replay                                                               [default: -1] replay Id to begin
                                                                                    from

  -t, --type=event|topic|cdc                                                        [default: event] the type of thing
                                                                                    you want to subscribe to

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx shane:streaming:subscribe

EXAMPLES
  sfdx streaming:subscribe -t cdc -n ChangeEvents   // subscribe to all CDC 
  sfdx streaming:subscribe -t cdc -n AccountChangeEvent   // subscribe to cdc for a standard object 
  sfdx streaming:subscribe -t event -n Something__e   // subscribe to platform event 
  sfdx streaming:subscribe -t event -n Something__e -r 6744   // subscribe to platform event with a replay ID 
  sfdx streaming:subscribe -t topic -n myTopic   // subscribe to a push topic
```

_See code: [src/commands/streaming/subscribe.ts](https://github.com/mshanemc/streaming-sfdx/blob/v1.1.7/src/commands/streaming/subscribe.ts)_
<!-- commandsstop -->

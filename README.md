# `plugin-streaming`

Streaming API and push topic management.

# Usage

<!-- usage -->

```sh-session
$ npm install -g plugin-streaming
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
plugin-streaming/1.1.3 darwin-x64 node-v13.2.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`sfdx streaming:list [-t <array>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-streaminglist--t-array--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx streaming:pushtopic:create -n <string> -q <string> [-d <integer>] [-f <string>] [-o <array>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-streamingpushtopiccreate--n-string--q-string--d-integer--f-string--o-array--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx streaming:pushtopic:deactivate -n <string> [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-streamingpushtopicdeactivate--n-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx streaming:pushtopic:delete -n <string> [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-streamingpushtopicdelete--n-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx streaming:pushtopic:update -n <string> [-d <integer>] [-f <string>] [-o <array>] [-q <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-streamingpushtopicupdate--n-string--d-integer--f-string--o-array--q-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx streaming:subscribe [-t <string>] [-n <string>] [-r <integer>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-streamingsubscribe--t-string--n-string--r-integer--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

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

EXAMPLES
  sfdx streaming:list // list everything
  sfdx streaming:list -t cdc,topic // list CDC and PushTopic but not standard and custom PlatformEvents
```

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

EXAMPLES
  sfdx streaming:pushtopic:upsert -n myTopic -q "select Id,Name from account"
       // creates or modifies the push topic

  sfdx streaming:pushtopic:upsert -n myTopic -q "select Id from account" -f All -o create,update
       // creates or modifies the push topic and sets operations and watches all fields

  sfdx streaming:pushtopic:upsert -n myTopic --deactivate -q "select Id from account"
       // deactivate an existing push topic
```

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

EXAMPLE
  sfdx streaming:pushtopic:deactivate -n myTopic
```

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

EXAMPLE
  sfdx streaming:pushtopic:delete -n myTopic
```

## `sfdx streaming:pushtopic:update -n <string> [-d <integer>] [-f <string>] [-o <array>] [-q <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Upsert push topics

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

EXAMPLES
  sfdx streaming:pushtopic:upsert -n myTopic -q "select Id,Name from account"
       // creates or modifies the push topic

  sfdx streaming:pushtopic:upsert -n myTopic -q "select Id from account" -f All -o create,update
       // creates or modifies the push topic and sets operations and watches all fields

  sfdx streaming:pushtopic:upsert -n myTopic --deactivate -q "select Id from account"
       // deactivate an existing push topic
```

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
```

<!-- commandsstop -->

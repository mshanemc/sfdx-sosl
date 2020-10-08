# `plugin-streaming`

[![npm version](https://badge.fury.io/js/%40mshanemc%2Fsfdx-sosl.svg)](https://badge.fury.io/js/%40mshanemc%2Fsfdx-sosl)

Streaming API and push topic management.

# Usage

Install like this:

`sfdx plugins:install @mshanemc/sfdx-sosl`

Command inventory:

```
$ sfdx sosl --help
```

# Commands

<!-- commands -->
* [`sfdx data:sosl:query -q <string> [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-datasoslquery--q-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx data:sosl:query -q <string> [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Runs a sosl query.  SOSL Reference: https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_sosl_syntax.htm

```
USAGE
  $ sfdx data:sosl:query -q <string> [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -q, --query=query                                                                 (required) SOSL query

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx shane:data:sosl:query
  $ sfdx force:data:sosl:query
  $ sfdx shane:data:search
  $ sfdx force:data:search
  $ sfdx force:data:sosl
  $ sfdx shane:data:sosl

EXAMPLES
  sfdx force:data:sosl:query -q "find {something}"
        
  sfdx force:data:sosl:query -q "find {Jack} returning User(Name), Account(Name),Contact(FirstName,LastName,Department)" 
  -u platformers
  // search across several objects with different results fields on a specified org
```

_See code: [src/commands/data/sosl/query.ts](https://github.com/mshanemc/sfdx-sosl/blob/v1.1.0/src/commands/data/sosl/query.ts)_
<!-- commandsstop -->

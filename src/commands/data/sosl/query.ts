import { flags, SfdxCommand } from '@salesforce/command';
import * as chalk from 'chalk';

export default class SOSLQuery extends SfdxCommand {
    public static description = `Runs a sosl query.  SOSL Reference: https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_sosl_syntax.htm`;

    public static aliases = [
        'shane:data:sosl:query',
        'force:data:sosl:query',
        'shane:data:search',
        'force:data:search',
        'force:data:sosl',
        'shane:data:sosl'
    ];

    public static examples = [
        `sfdx force:data:sosl:query -q "find {something}"
        `,
        `sfdx force:data:sosl:query -q "find {Jack} returning User(Name), Account(Name),Contact(FirstName,LastName,Department)" -u platformers
// search across several objects with different results fields on a specified org
`
    ];

    protected static flagsConfig = {
        query: flags.string({
            char: 'q',
            description: 'SOSL query',
            required: true
        })
    };

    protected static requiresUsername = true;

    public async run(): Promise<any> {
        const conn = this.org.getConnection();
        const result = ((await conn.request({
            url: `${conn.baseUrl()}/search/?q=${encodeURI(this.flags.query)}`
        })) as unknown) as SOSLResponse;

        const types = [...new Set(result.searchRecords.map((row) => row.attributes.type))];

        // iterate the types, one table for each
        for (const objType of types) {
            this.ux.log();
            this.ux.log(chalk.blueBright(objType));
            const fields = [
                ...new Set(...result.searchRecords.filter((row) => row.attributes.type === objType).map((row) => Object.keys(row)))
            ].filter((property) => property !== 'attributes');

            this.ux.table(
                result.searchRecords.filter((row) => row.attributes.type === objType),
                {
                    columns: [
                        {
                            key: 'attributes.url',
                            label: 'ID',
                            get: (row: any) => row.attributes.url.substr(row.attributes.url.lastIndexOf('/') + 1)
                        },
                        ...fields.map((field) => ({ key: field }))
                    ]
                }
            );
            this.ux.log();
        }
        return result;
    }
}

interface SOSLRecord {
    attributes: {
        type: string;
        url: string;
    };
    [key: string]: unknown;
}

interface SOSLResponse {
    searchRecords: SOSLRecord[];
}

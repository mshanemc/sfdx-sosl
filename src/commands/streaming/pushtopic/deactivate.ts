import { flags, SfdxCommand } from '@salesforce/command';
import { singleRecordQuery } from '@mshanemc/plugin-helpers/dist/queries';
import { PushTopic } from '@mshanemc/plugin-helpers/dist/typeDefs';

export default class PushTopicUpsert extends SfdxCommand {
    public static description = 'deactivate push topics';

    public static aliases = ['shane:streaming:pushtopic:deactivate'];

    public static examples = [`sfdx streaming:pushtopic:deactivate -n myTopic`];

    protected static flagsConfig = {
        name: flags.string({
            char: 'n',
            description: 'name for the push topic',
            required: true
        })
    };

    protected static requiresUsername = true;

    public async run(): Promise<any> {
        const conn = this.org.getConnection();
        const existing = ((await singleRecordQuery({
            conn,
            query: `Select Id from PushTopic where Name='${this.flags.name}'`
        })) as unknown) as PushTopic;

        existing.IsActive = false;
        const output = await conn.sobject('PushTopic').update(existing);

        this.ux.log(`Deactivated`);

        return {
            output
        };
    }
}

import { exec, exec2JSON } from '@mshanemc/plugin-helpers';
import testutils = require('@mshanemc/plugin-helpers/dist/testutils');
import fs = require('fs-extra');

const testProjectName = 'testProjectPushTopics';
const pushTopicName = 'myTestTopic';
const pushTopicQuery = `select ApiVersion, Description, IsActive, NotifyForFields, NotifyForOperationCreate, NotifyForOperationDelete, NotifyForOperationUndelete, NotifyForOperationUpdate, NotifyForOperations, Query from PushTopic where Name = '${pushTopicName}'`;
const confirmationQuery = `sfdx force:data:soql:query -q "${pushTopicQuery}" --json`;

describe('push topic tests', () => {
    const getConfirmation = async () => {
        return await exec2JSON(confirmationQuery, { cwd: testProjectName });
    };

    if (!process.env.LOCALONLY) {
        jest.setTimeout(testutils.remoteTimeout);

        beforeAll(async () => {
            await fs.remove(testProjectName);
            await exec(`sfdx force:project:create -n ${testProjectName}`);
            await testutils.orgCreate(testProjectName);
        });

        it('creates a push topic', async () => {
            const commandResult = await exec2JSON(`sfdx streaming:pushtopic:create -n ${pushTopicName} -q "select name,id from account" --json`, {
                cwd: testProjectName
            });
            expect(commandResult).toEqual(
                expect.objectContaining({
                    status: 0
                })
            );

            // verify its creation and expected defaults?
            const confirmResult = await getConfirmation();
            expect(confirmResult.result.records[0].IsActive).toBe(true);
            expect(confirmResult.result.records[0].NotifyForFields).toBe('Referenced');
        });

        it('modifies an existing push topic', async () => {
            const newQuery = 'select Id, Name, AccountNumber from Account';
            const commandResult = await exec2JSON(`sfdx streaming:pushtopic:update -n ${pushTopicName} -q "${newQuery}" --json`, {
                cwd: testProjectName
            });
            expect(commandResult).toEqual(
                expect.objectContaining({
                    status: 0
                })
            );
            const confirmResult = await getConfirmation();
            expect(confirmResult.result.records[0].Query).toBe(newQuery);
        });

        it('deactivates an existing push topic', async () => {
            const commandResult = await exec2JSON(`sfdx streaming:pushtopic:deactivate -n ${pushTopicName} --json`, {
                cwd: testProjectName
            });
            expect(commandResult).toEqual(
                expect.objectContaining({
                    status: 0
                })
            );
            const confirmResult = await getConfirmation();
            expect(confirmResult.result.records[0].IsActive).toBe(false);
        });

        it('deletes an existing push topic', async () => {
            const commandResult = await exec2JSON(`sfdx streaming:pushtopic:delete -n ${pushTopicName} --json`, {
                cwd: testProjectName
            });
            expect(commandResult).toEqual(
                expect.objectContaining({
                    status: 0
                })
            );
            const confirmResult = await getConfirmation();
            expect(confirmResult.result.records.length).toBe(0);
        });

        afterAll(async () => {
            await testutils.orgDelete(testProjectName);
            await fs.remove(testProjectName);
        });
    }
});

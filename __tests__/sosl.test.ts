import { exec, exec2JSON } from '@mshanemc/plugin-helpers';
import testutils = require('@mshanemc/plugin-helpers/dist/testutils');
import fs = require('fs-extra');

const testProjectName = 'testProjectSOSL';

describe('SOSL tests', () => {
    if (!process.env.LOCALONLY) {
        jest.setTimeout(testutils.remoteTimeout);

        beforeAll(async () => {
            await fs.remove(testProjectName);
            await exec(`sfdx force:project:create -n ${testProjectName}`);
            await testutils.orgCreate(testProjectName);
        });

        it('queries across everything', async () => {
            const commandResult = await exec2JSON(`sfdx data:sosl:query -q "find {user}" --json`, {
                cwd: testProjectName
            });
            console.log(JSON.stringify(commandResult.result.searchRecords));
            expect(commandResult).toEqual(
                expect.objectContaining({
                    status: 0
                })
            );
            expect(commandResult.result.searchRecords).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        attributes: expect.objectContaining({
                            type: 'User'
                        })
                    })
                ])
            );
        });

        it('queries with fields', async () => {
            const commandResult = await exec2JSON(`sfdx data:sosl:query -q "find {user} returning User(Name)" --json`, {
                cwd: testProjectName
            });
            expect(commandResult).toEqual(
                expect.objectContaining({
                    status: 0
                })
            );
            expect(commandResult.result.searchRecords).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        attributes: expect.objectContaining({
                            type: 'User'
                        }),
                        Name: expect.anything()
                    })
                ])
            );
        });

        afterAll(async () => {
            await testutils.orgDelete(testProjectName);
            await fs.remove(testProjectName);
        });
    }
});

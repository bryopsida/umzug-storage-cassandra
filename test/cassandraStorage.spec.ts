
import assert from 'assert';
import {CassandraStorage} from '../src/cassandraStorage';
import {Client} from 'cassandra-driver';

const noKeySpacecassandraClient:Client = new Client({
    contactPoints: ['node'],
    localDataCenter: 'dc1'
});

const cassandraClient:Client = new Client({
    contactPoints: ['node'],
    localDataCenter: 'dc1',
    keyspace: 'umzug'
});

before(async ()=>{
    await noKeySpacecassandraClient.execute(`CREATE KEYSPACE IF NOT EXISTS umzug
    WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};`);
    await noKeySpacecassandraClient.execute(`DROP TABLE IF EXISTS umzug.migrations`)
})

describe( 'cassandraStorage', async () => {
    describe('logMigration', async () => {
        it('Should log migrations in the table', async ()=>{
            const storage:CassandraStorage = new CassandraStorage(cassandraClient);
            await storage.logMigration("TEST_MIGRATION");

        })
    });
    describe('unlogMigration', async () => {
        it('Should remove migrations from the table', async ()=>{
            const storage:CassandraStorage = new CassandraStorage(cassandraClient);
            await storage.unlogMigration("TEST_MIGRATION");


        })
    });
    describe('executed', async () => {
        it('Should return all of the migrations', async ()=>{
            const storage:CassandraStorage = new CassandraStorage(cassandraClient);
            const migrations:string[] = await storage.executed();

            // assert none
            assert.strictEqual(migrations.length, 0);
            await storage.logMigration("TEST_MIGRATION");

            // assert present
            assert.strictEqual(migrations.indexOf('TEST_MIGRATION'), 0);

            await storage.unlogMigration("TEST_MIGRATION");

            // assert not present
            assert.strictEqual(migrations.indexOf('TEST_MIGRATION'), -1);

        })
    });
});
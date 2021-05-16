import umzug from 'umzug';
import {Client, mapping} from 'cassandra-driver';



/**
 * Model of the migration log records
 */
interface CassandraMigrationRecord {
    name: string;
    timestamp: number;
}
/**
 * Umzug storage class for apache cassandra
 */
export class CassandraStorage implements umzug.Storage {
    

    private _client: Client;
    private _mapper: mapping.Mapper;
    private _migrationMapper: mapping.ModelMapper<CassandraMigrationRecord>;

      
    /**
     *  Build a object for handling umzsug storage with
     * a cassandra backend
     * @param {Client} cassandraClient 
     */
    constructor(cassandraClient: Client) {
        this._client = cassandraClient;
        this._mapper = new mapping.Mapper(this._client, {
            models: { 
                'Migrations': {
                    tables: ['migrations'],
                    columns: {
                        'name': 'name',
                        'timestamp': 'timestamp'
                    }
                } 
            }
        })
        this._migrationMapper = this._mapper.forModel('Migrations');
    }

    /**
     * Ensure the migration table exists
     */
    private async ensureMigrationTable() {
        await this._client.execute(`CREATE TABLE IF NOT EXISTS migrations ( 
            name text PRIMARY KEY, 
            timestamp bigint );`);
    }
    /**
     * Add a migration ot the migration log in the storage
     * backend
     * @param {string} migrationName name of the migration
     */
    async logMigration(migrationName: string): Promise<void> {
        await this.ensureMigrationTable();
        await this._migrationMapper.insert({
            name: migrationName,
            timestamp: new Date().getTime()
        });
    }

    /**
     * Remove a migration from the migration log in the 
     * storage backend
     * @param {string} migrationName 
     */
    async unlogMigration(migrationName: string): Promise<void> {
        await this.ensureMigrationTable();
        await this._migrationMapper.remove({
            name: migrationName
        });
    }

    /**
     * Return the list of executed migrations 
     * from the migration log
     */
    async executed(): Promise<string[]> {
        await this.ensureMigrationTable();
        return (await this._migrationMapper.findAll()).toArray().map( (record:CassandraMigrationRecord) => {
            return record.name;
        })

    }

}
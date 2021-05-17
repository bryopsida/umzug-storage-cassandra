# umzug-storage-cassandra

## Badges
![Codecov](https://img.shields.io/codecov/c/github/akboyd88/umzug-storage-cassandra?style=for-the-badge)

## Summary

This package implements the umzug storage interface for cassandra. This allows using umzug for cassandra migrations and storing the migration log in cassandra.

## How to use

Install using either npm or yarn, `npm install umzug-storage-cassandra --save` or `yarn add umzug-storage-cassandra --save`.

Once installed you can pass it to umzug like this: 

``` typescript
import {Client} from 'cassandra-driver';
import {CassandraStorage} from 'umzug-storage-cassandra';

const cassandraClient:Client = new Client({
    contactPoints: ['node'],
    localDataCenter: 'dc1',
    keyspace: 'umzug'
});

const cassandraStorage:CassandraStorage = new CassandraStorage({
    client: cassandraClient
})

const umzugOptions = {
  storage: cassandraStorage
}

```

You will need to manage/create the keyspace prior to using this for the migration log. See below for an example of creating the keyspace.

``` typescript
import {Client} from 'cassandra-driver';

const cassandraClient:Client = new Client({
    contactPoints: ['node'],
    localDataCenter: 'dc1'
});

await cassandraClient.execute(`CREATE KEYSPACE IF NOT EXISTS umzug
    WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};`);
```

This library only works the datastax cassandra-driver client.
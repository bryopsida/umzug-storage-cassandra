# umzug-storage-cassandra

## Badges


## Summary

This package implements the umzug storage interface for cassandra. This allows using umzug for cassandra migrations and storing the migration log in cassandra.

## How to use

Install using either npm or yarn, `npm install umzug-storage-cassandra --save` or `yarn add umzug-storage-cassandra --save`.

Once installed you can pass it to umzug like this: 

``` typescript

```

You will need to manage/create the keyspace prior to using this for the migration log. See below for an example of creating the keyspace.

``` typescript

```

This library only works the datastax cassandra-driver client.
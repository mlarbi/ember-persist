# Ember Persistence

This project is just to test some ideas for a specific use case:

An Ember object instance should be able to persist itself to and from a remote data source in a no-fuss fashion.

An ArrayController instance should be able to persist itself as well - especially for reads in the simple case.  
Anything more complex should belong to ember-data.


## Managed and Unmanaged Data

It seems to me that we have two main use cases for data in Ember: managed and un-managed.

Ember-data is for managed data (i.e. with all the finesse of the store, client-side in-memory queries, etc).  

What I am looking at  here is unmanaged data.  Read, use, discard.  Create object, populate, save, discard.  
None of the store and querying stuff. This is for the simple case where the heavy lifting provided by Ember Data is "too much".


## Persistent Object and Persisters
This is motivated by the Bridge design pattern.

Every object that can be persisted is derived from Ember.PersistenObject which is derived from Ember.Object.

A persistent object has a simple interface that mimics CRUD (create, read, update, delete) operations.

So the idea is:
* create an instance of the class
* set data members,
* call persistCreate() to save it.  Or persistRead() after setting its key and it pulls it from the remote data source.

The CRUD operations are handled by the Persister object.  Persisters have a simple interface too:

doCreate, doRead, doUpdate, doDelete.

A Persistent object can specify which persister it wants to use or simply use the default (a jQuery persister).

Different persister types (say for SOAP, Script, etc.) can be created without affecting the PersistentObject instances that depend on them. 


##Example Usage:
``` javascript
Ember.Person = Ember.PersistentObject.extend({
	//only properties listed here are persisted.  All others are ignored.
	persistentProperties: ['surname', 'firstname', 'student', 'faculty'],
});

var mlarbi = Ember.Person.create({
	firstname: 'Michael',
	surname: 'Larbi',
	student: false,
	faculty: true,
	test1: 'Test data - ignore',
	val1: 123	
});
```
mlarbi.persistCreate();

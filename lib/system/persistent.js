
Ember.PersistentObject = Ember.Object.extend({
	
	//object id for single key objects - for read and drop operations
	id: null,
	
	// to be set by persister typically
	status: null,
	
	//to be provided by derived classes
	restURL:  null,
	
	//list of persistent properties in the object.  Only these properties will be persisted remotely or updated on reads
	persistentProperties: null,
	
	//object that handles actual persistence.  See Ember.jQueryPersister for an example.  
	//object should be able to be persisted to different datasources depending on persister object in use
	//persister could be jquery, jsonp, soap, etc.
	persister: null,
	
	//additional parameters provided for read operations
	readParamList: function(){
		return null;
	},

	//persistent hash that is extracted for 
	hash: function(){
		var ret = {};
		var pproperties = this.get('persistentProperties');
		if (pproperties && pproperties.length>0){
			for (var i=0; i <pproperties.length; i++){
				ret[pproperties[i]] = this.get(pproperties[i]);
			}
		}
		return ret;
	}.property(),
		
	//CRUD operations ... delegated to persister
	persistRead: function(){
		var persister = this._getPersister();
		if (persister) persister.doRead(this);
	},
	
	persistCreate: function(timeout){
		var persister = this._getPersister();
		if (persister) persister.doCreate(this);
	},

	persistUpdate: function(){
		var persister = this._getPersister();
		if (persister) persister.doUpdate(this);
	},

	persistDrop: function(){
		var persister = this._getPersister();
		if (persister) persister.doDrop(this);
	},

	_getPersister: function(){
		var persister = this.get('persister');
		if (!persister){
			persister = Ember.jQueryPersister.create();
			this.set('persister', persister);
		}
		
		return persister;
	},

	//methods called by persister after its finished its op
	_created:function(response){
		this.postCreate(response);
	},
	
	_read:function(response){
		var pproperties = this.get('persistentProperties');
		if (pproperties && pproperties.length>0){
			for (var i=0; i <pproperties.length; i++){
				this.set([pproperties[i]], response[pproperties[i]));
			}
		}

		this.postRead(response);
	},
	
	_updated:function(response){
		this.postUpdate(response);
	},
	
	_deleted:function(response){
		this.postUpdate(response);
	},
	
	//post CRUD calls - for the benefit of derived classes
	postCreate: function(response){},
	
	postRead: function(response){},
	
	postUpdate: function(response){},
	
	postDrop: function(response){}

});


Ember.Person = Ember.PersistentObject.extend({
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

mlarbi.persistCreate();

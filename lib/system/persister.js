

Ember.jQueryPersister = Ember.Object.extend({
	doCreate: function(obj){
		if (obj && obj.get('restURL')) {
			$.ajax({
				type:	'POST',
				url:	obj.get('restURL'),
				data:	obj.get('hash'),
				dataType: 'json',
				success:function(response) {
					obj._create(response);
				}
			});
		}
	},
	
	doRead: function(obj){
		if (obj && obj.get('restURL')) {
			var idparam = obj.get('id')?'&id='+obj.get('id'):''; 
			var readParamList = obj.readParamList();
			var readParams = readParamList?'&'+readParamList: '';
			
			var url = obj.get('restURL') + idparam + readParams;
			$.ajax({
				type:	'GET',
				url:	url,
				data:	obj.get('hash'),
				dataType: 'json',
				success:function(response) {
					obj._read(response);
				}
			});
		}
	},
	
	doUpdate: function(obj){
		if (obj && obj.get('restURL')) {
			$.ajax({
				type:	'PUT',
				url:	obj.get('restURL'),
				data:	obj.get('hash'),
				dataType: 'json',
				success:function(response) {
					obj._update(response);
				}
			});
		}
	},
	
	doDrop: function(obj){
		if (obj && obj.get('restURL')) {
			var idparam = obj.get('id')?'&id='+obj.get('id'):''; 
			var readParamList = obj.readParamList();
			var readParams = readParamList?'&'+readParamList: '';
			
			var url = obj.get('restURL') + idparam + readParams;
			$.ajax({
				type:	'DELETE',
				url:	url,
				data:	obj.get('hash'),
				dataType: 'json',
				success:function(response) {
					obj._read(response);
				}
			});
		}
	},
});

Ember.ScriptPersister = Ember.Object.extend({
	doRead: function(obj){},
	doCreate: function(obj){},
	doUpdate: function(obj){},
	doDrop: function(obj){},
});

Ember.JSONPPPersister = Ember.Object.extend({
	doRead: function(obj){},
	doCreate: function(obj){},
	doUpdate: function(obj){},
	doDrop: function(obj){},
});

Ember.SOAPPersister = Ember.Object.extend({
	doRead: function(obj){},
	doCreate: function(obj){},
	doUpdate: function(obj){},
	doDrop: function(obj){},
});


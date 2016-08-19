ko.observableHashtable = function (initialValues) {
    initialValues = initialValues || {};

    if (typeof initialValues != 'object') 
		throw new Error("The argument passed when initializing an observable hashtable must be an object, or null, or undefined.");

    var result = ko.observable({});
    ko.utils.setPrototypeOfOrExtend(result, ko.observableHashtable['fn']);
	return result;
};

ko.observableHashtable['fn'] = {

	'add': function(key, value) {
		let ht = this.peek();
		let changeOccured = false;

		changeOccured = (!ht.hasOwnProperty(key) || ht[key] !== value);
		
		if(changeOccured) {
			ht[key] = value;
			this.valueHasMutated();
		}
	},

	'clear': function () {
		let ht = this.peek();
		let hasKeys = !this._isEmtpyObject();

		if(hasKeys) this.valueWillMutate();

		for(let key in ht) {
			if (ht.hasOwnProperty(key)) {
				delete ht[key];
			}  
		}
		this.valueHasMutated();
	},

	'containsKey': function(key) {
		let ht = this.peek();
		return ht.hasOwnProperty(key);
	},

    'remove': function (key) {
        let ht = this.peek();
		let removedValue = null;

		if(ht.hasOwnProperty(key)) {
			removedValue = ht[key];
			delete ht[key];
			this.valueHasMutated();
		}
        return removedValue;
    },

	'destroy': function (key) {
		var ht = this.peek();

		if(ht.hasOwnProperty(key)) {
			ht[key]["_destroy"] = true;
			this.valueHasMutated();
		}

		this.valueHasMutated();
	},

	'destroyAll': function (arrayOfValues) {
		let ht = this.peek();
		let hasKeys = !this._isEmtpyObject();

		if(hasKeys) this.valueWillMutate();

		for(let key in ht) {
			if (ht.hasOwnProperty(key)) {
				ht[key]["_destroy"] = true;
			}  
		}
		this.valueHasMutated();
	},

	// Returns an array of key names from hashtable
	'keys': function() {
		let ht = this.peek();

		let getObjectKeys = Object.keys || function(o) {
		   if (o !== Object(o))
			  throw new TypeError('Object.keys called on non-object');
		   var ret=[],p;
		   for(p in o) if(Object.prototype.hasOwnProperty.call(o,p)) ret.push(p);
		   return ret;
		}

		return getObjectKeys(ht);
	},

	'values': function() {
		let ht = this.peek();
		let keys = this.keys();

		let values = [];
		for(let k of keys) values.push(ht[k]);

		return values;
	},

	'_isEmptyObject': function() {
		let ht = this.peek();
		let isEmpty = false;

		let getPropertyNames = Object.getOwnPropertyNames || function(obj) {
		  let propNames = [];
		  for (var propName in obj) {
			if(obj.hasOwnProperty(propName)) {
			  propNames.push(propName);
			}
		  }
		  return propNames;
		}  

		return getPropertyNames(ht).length === 0; 
	}
};

// Note that for browsers that don't support proto assignment, the
// inheritance chain is created manually in the ko.observableArray constructor
if (ko.utils.canSetPrototype) {
    ko.utils.setPrototypeOf(ko.observableHashtable['fn'], ko.observable['fn']);
}

ko.exportSymbol('observableHashtable', ko.observableHashtable);

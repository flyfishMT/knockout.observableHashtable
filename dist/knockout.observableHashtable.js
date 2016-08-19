'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

ko.observableHashtable = function (initialValues) {
	initialValues = initialValues || {};

	if ((typeof initialValues === 'undefined' ? 'undefined' : _typeof(initialValues)) != 'object') throw new Error("The argument passed when initializing an observable hashtable must be an object, or null, or undefined.");

	var result = ko.observable({});
	ko.utils.setPrototypeOfOrExtend(result, ko.observableHashtable['fn']);
	return result;
};

ko.observableHashtable['fn'] = {

	'add': function add(key, value) {
		var ht = this.peek();
		var changeOccured = false;

		changeOccured = !ht.hasOwnProperty(key) || ht[key] !== value;

		if (changeOccured) {
			ht[key] = value;
			this.valueHasMutated();
		}
	},

	'clear': function clear() {
		var ht = this.peek();
		var hasKeys = !this._isEmtpyObject();

		if (hasKeys) this.valueWillMutate();

		for (var key in ht) {
			if (ht.hasOwnProperty(key)) {
				delete ht[key];
			}
		}
		this.valueHasMutated();
	},

	'containsKey': function containsKey(key) {
		var ht = this.peek();
		return ht.hasOwnProperty(key);
	},

	'remove': function remove(key) {
		var ht = this.peek();
		var removedValue = null;

		if (ht.hasOwnProperty(key)) {
			removedValue = ht[key];
			delete ht[key];
			this.valueHasMutated();
		}
		return removedValue;
	},

	'destroy': function destroy(key) {
		var ht = this.peek();

		if (ht.hasOwnProperty(key)) {
			ht[key]["_destroy"] = true;
			this.valueHasMutated();
		}

		this.valueHasMutated();
	},

	'destroyAll': function destroyAll(arrayOfValues) {
		var ht = this.peek();
		var hasKeys = !this._isEmtpyObject();

		if (hasKeys) this.valueWillMutate();

		for (var key in ht) {
			if (ht.hasOwnProperty(key)) {
				ht[key]["_destroy"] = true;
			}
		}
		this.valueHasMutated();
	},

	// Returns an array of key names from hashtable
	'keys': function keys() {
		var ht = this.peek();

		var getObjectKeys = Object.keys || function (o) {
			if (o !== Object(o)) throw new TypeError('Object.keys called on non-object');
			var ret = [],
			    p;
			for (p in o) {
				if (Object.prototype.hasOwnProperty.call(o, p)) ret.push(p);
			}return ret;
		};

		return getObjectKeys(ht);
	},

	'values': function values() {
		var ht = this.peek();
		var keys = this.keys();

		var values = [];
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var k = _step.value;
				values.push(ht[k]);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return values;
	},

	'_isEmptyObject': function _isEmptyObject() {
		var ht = this.peek();
		var isEmpty = false;

		var getPropertyNames = Object.getOwnPropertyNames || function (obj) {
			var propNames = [];
			for (var propName in obj) {
				if (obj.hasOwnProperty(propName)) {
					propNames.push(propName);
				}
			}
			return propNames;
		};

		return getPropertyNames(ht).length === 0;
	}
};

// Note that for browsers that don't support proto assignment, the
// inheritance chain is created manually in the ko.observableArray constructor
if (ko.utils.canSetPrototype) {
	ko.utils.setPrototypeOf(ko.observableHashtable['fn'], ko.observable['fn']);
}

ko.exportSymbol('observableHashtable', ko.observableHashtable);
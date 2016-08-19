// Type definitions for knockout.observableHashtable.js
/// <reference path="../knockout/index.d.ts" />
interface KnockoutObservableHashtableFunctions<K, V> {

    add(key: K, value: V);
	clear();
	containsKey(key: K);
    remove(key: K);
	destroy(key: K);
	destroyAll();
	keys(): K[];
	values(): V[];

}
interface KnockoutObservableHashtable<K,V> extends  KnockoutObservable<Object>, KnockoutObservableHashtableFunctions<K,V> {
    //extend(requestedExtenders: { [key: string]: any; }): KnockoutObservableArray<T>;
}

interface KnockoutObservableHashtableStatic {

	fn: KnockoutObservableHashtableFunctions<any, any>
	<K, V>(): KnockoutObservableHashtable<K,V>;
}

interface KnockoutStatic {
    observableHashtable: KnockoutObservableHashtableStatic;
}

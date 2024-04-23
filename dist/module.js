/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/flexsearch/dist/module/async.js":
/*!******************************************************!*\
  !*** ./node_modules/flexsearch/dist/module/async.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type.js */ "./node_modules/flexsearch/dist/module/type.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common.js */ "./node_modules/flexsearch/dist/module/common.js");

//import { promise as Promise } from "./polyfill.js";


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(prototype) {

    register(prototype, "add");
    register(prototype, "append");
    register(prototype, "search");
    register(prototype, "update");
    register(prototype, "remove");
}

function register(prototype, key) {

    prototype[key + "Async"] = function () {

        /** @type {IndexInterface|DocumentInterface} */
        const self = this,
              args = /*[].slice.call*/arguments,
              arg = args[args.length - 1];

        let callback;

        if ((0,_common_js__WEBPACK_IMPORTED_MODULE_1__.is_function)(arg)) {

            callback = arg;
            delete args[args.length - 1];
        }

        const promise = new Promise(function (resolve) {

            setTimeout(function () {

                self.async = !0;
                const res = self[key].apply(self, args);
                self.async = !1;
                resolve(res);
            });
        });

        if (callback) {

            promise.then(callback);
            return this;
        } else {

            return promise;
        }
    };
}

/***/ }),

/***/ "./node_modules/flexsearch/dist/module/cache.js":
/*!******************************************************!*\
  !*** ./node_modules/flexsearch/dist/module/cache.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   searchCache: () => (/* binding */ searchCache)
/* harmony export */ });
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type.js */ "./node_modules/flexsearch/dist/module/type.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common.js */ "./node_modules/flexsearch/dist/module/common.js");



/**
 * @param {boolean|number=} limit
 * @constructor
 */

function CacheClass(limit) {

    /** @private */
    this.limit = !0 !== limit && limit;

    /** @private */
    this.cache = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.create_object)();

    /** @private */
    this.queue = [];

    //this.clear();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CacheClass);

/**
 * @param {string|Object} query
 * @param {number|Object=} limit
 * @param {Object=} options
 * @this {IndexInterface}
 * @returns {Array<number|string>}
 */

function searchCache(query, limit, options) {

    if ((0,_common_js__WEBPACK_IMPORTED_MODULE_1__.is_object)(query)) {

        query = query.query;
    }

    let cache = this.cache.get(query);

    if (!cache) {

        cache = this.search(query, limit, options);
        this.cache.set(query, cache);
    }

    return cache;
}

// CacheClass.prototype.clear = function(){
//
//     /** @private */
//     this.cache = create_object();
//
//     /** @private */
//     this.queue = [];
// };

CacheClass.prototype.set = function (key, value) {

    if (!this.cache[key]) {

        // it is just a shame that native function array.shift() performs so bad

        // const length = this.queue.length;
        //
        // this.queue[length] = key;
        //
        // if(length === this.limit){
        //
        //     delete this.cache[this.queue.shift()];
        // }

        // the same bad performance

        // this.queue.unshift(key);
        //
        // if(this.queue.length === this.limit){
        //
        //     this.queue.pop();
        // }

        // fast implementation variant

        // let length = this.queue.length;
        //
        // if(length === this.limit){
        //
        //     length--;
        //
        //     delete this.cache[this.queue[0]];
        //
        //     for(let x = 0; x < length; x++){
        //
        //         this.queue[x] = this.queue[x + 1];
        //     }
        // }
        //
        // this.queue[length] = key;

        // current fastest implementation variant
        // theoretically that should not perform better compared to the example above

        let length = this.queue.length;

        if (length === this.limit) {

            delete this.cache[this.queue[length - 1]];
        } else {

            length++;
        }

        for (let x = length - 1; 0 < x; x--) {

            this.queue[x] = this.queue[x - 1];
        }

        this.queue[0] = key;
    }

    this.cache[key] = value;
};

CacheClass.prototype.get = function (key) {

    const cache = this.cache[key];

    if (this.limit && cache) {

        // probably the indexOf() method performs faster when matched content is on front (left-to-right)
        // using lastIndexOf() does not help, it performs almost slower

        const pos = this.queue.indexOf(key);

        // if(pos < this.queue.length - 1){
        //
        //     const tmp = this.queue[pos];
        //     this.queue[pos] = this.queue[pos + 1];
        //     this.queue[pos + 1] = tmp;
        // }

        if (pos) {

            const tmp = this.queue[pos - 1];
            this.queue[pos - 1] = this.queue[pos];
            this.queue[pos] = tmp;
        }
    }

    return cache;
};

CacheClass.prototype.del = function (id) {

    for (let i = 0, item, key; i < this.queue.length; i++) {

        key = this.queue[i];
        item = this.cache[key];

        if (item.includes(id)) {

            this.queue.splice(i--, 1);
            delete this.cache[key];
        }
    }
};

/***/ }),

/***/ "./node_modules/flexsearch/dist/module/common.js":
/*!*******************************************************!*\
  !*** ./node_modules/flexsearch/dist/module/common.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   concat: () => (/* binding */ concat),
/* harmony export */   create_arrays: () => (/* binding */ create_arrays),
/* harmony export */   create_object: () => (/* binding */ create_object),
/* harmony export */   create_object_array: () => (/* binding */ create_object_array),
/* harmony export */   get_keys: () => (/* binding */ get_keys),
/* harmony export */   is_array: () => (/* binding */ is_array),
/* harmony export */   is_function: () => (/* binding */ is_function),
/* harmony export */   is_object: () => (/* binding */ is_object),
/* harmony export */   is_string: () => (/* binding */ is_string),
/* harmony export */   parse_option: () => (/* binding */ parse_option),
/* harmony export */   sort_by_length_down: () => (/* binding */ sort_by_length_down)
/* harmony export */ });
function parse_option(value, default_value) {

    return "undefined" != typeof value ? value : default_value;
}

/**
 * @param {!number} count
 * @returns {Array<Object>}
 */

function create_object_array(count) {

    const array = Array(count);

    for (let i = 0; i < count; i++) {

        array[i] = create_object();
    }

    return array;
}

function create_arrays(count) {

    const array = Array(count);

    for (let i = 0; i < count; i++) {

        array[i] = [];
    }

    return array;
}

/**
 * @param {!Object} obj
 * @returns {Array<string>}
 */

function get_keys(obj) {

    return Object.keys(obj);
}

function create_object() {

    return Object.create(null);
}

function concat(arrays) {

    return [].concat.apply([], arrays);
}

function sort_by_length_down(a, b) {

    return b.length - a.length;
}

function is_array(val) {

    return val.constructor === Array;
}

function is_string(val) {

    return "string" == typeof val;
}

function is_object(val) {

    return "object" == typeof val;
}

function is_function(val) {

    return "function" == typeof val;
}

/***/ }),

/***/ "./node_modules/flexsearch/dist/module/document.js":
/*!*********************************************************!*\
  !*** ./node_modules/flexsearch/dist/module/document.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/flexsearch/dist/module/index.js");
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type.js */ "./node_modules/flexsearch/dist/module/type.js");
/* harmony import */ var _cache_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cache.js */ "./node_modules/flexsearch/dist/module/cache.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common.js */ "./node_modules/flexsearch/dist/module/common.js");
/* harmony import */ var _async_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./async.js */ "./node_modules/flexsearch/dist/module/async.js");
/* harmony import */ var _intersect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./intersect.js */ "./node_modules/flexsearch/dist/module/intersect.js");
/* harmony import */ var _serialize_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./serialize.js */ "./node_modules/flexsearch/dist/module/serialize.js");
/* harmony import */ var _worker_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./worker/index.js */ "./node_modules/flexsearch/dist/module/worker/index.js");
/**!
 * FlexSearch.js
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */










/**
 * @constructor
 * @implements {DocumentInterface}
 * @param {Object=} options
 * @return {Document}
 */

function Document(options) {

    if (!(this instanceof Document)) {

        return new Document(options);
    }

    const document = options.document || options.doc || options;
    let opt;

    this.tree = [];
    this.field = [];
    this.marker = [];
    this.register = (0,_common_js__WEBPACK_IMPORTED_MODULE_3__.create_object)();
    this.key = (opt = document.key || document.id) && parse_tree(opt, this.marker) || "id";
    this.fastupdate = (0,_common_js__WEBPACK_IMPORTED_MODULE_3__.parse_option)(options.fastupdate, /* append: */ /* skip update: */ /* skip_update: */!0);

    this.storetree = (opt = document.store) && !0 !== opt && [];
    this.store = opt && (0,_common_js__WEBPACK_IMPORTED_MODULE_3__.create_object)();


    // TODO case-insensitive tags

    this.tag = (opt = document.tag) && parse_tree(opt, this.marker);
    this.tagindex = opt && (0,_common_js__WEBPACK_IMPORTED_MODULE_3__.create_object)();


    this.cache = (opt = options.cache) && new _cache_js__WEBPACK_IMPORTED_MODULE_2__["default"](opt);

    // do not apply cache again for the indexes

    options.cache = !1;


    this.worker = options.worker;


    // this switch is used by recall of promise callbacks

    this.async = !1;

    /** @export */
    this.index = parse_descriptor.call(this, options, document);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Document);

/**
 * @this Document
 */

function parse_descriptor(options, document) {

    const index = (0,_common_js__WEBPACK_IMPORTED_MODULE_3__.create_object)();
    let field = document.index || document.field || document;

    if ((0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_string)(field)) {

        field = [field];
    }

    for (let i = 0, key, opt; i < field.length; i++) {

        key = field[i];

        if (!(0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_string)(key)) {

            opt = key;
            key = key.field;
        }

        opt = (0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_object)(opt) ? Object.assign({}, options, opt) : options;

        if (this.worker) {

            index[key] = new _worker_index_js__WEBPACK_IMPORTED_MODULE_7__["default"](opt);

            if (!index[key].worker) {

                this.worker = !1;
            }
        }

        if (!this.worker) {

            index[key] = new _index_js__WEBPACK_IMPORTED_MODULE_0__["default"](opt, this.register);
        }

        this.tree[i] = parse_tree(key, this.marker);
        this.field[i] = key;
    }

    if (this.storetree) {

        let store = document.store;

        if ((0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_string)(store)) {

            store = [store];
        }

        for (let i = 0; i < store.length; i++) {

            this.storetree[i] = parse_tree(store[i], this.marker);
        }
    }

    return index;
}

function parse_tree(key, marker) {

    const tree = key.split(":");
    let count = 0;

    for (let i = 0; i < tree.length; i++) {

        key = tree[i];

        if (0 <= key.indexOf("[]")) {

            key = key.substring(0, key.length - 2);

            if (key) {

                marker[count] = !0;
            }
        }

        if (key) {

            tree[count++] = key;
        }
    }

    if (count < tree.length) {

        tree.length = count;
    }

    return 1 < count ? tree : tree[0];
}

// TODO support generic function created from string when tree depth > 1

function parse_simple(obj, tree) {

    if ((0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_string)(tree)) {

        obj = obj[tree];
    } else {

        for (let i = 0; obj && i < tree.length; i++) {

            obj = obj[tree[i]];
        }
    }

    return obj;
}

// TODO support generic function created from string when tree depth > 1

function store_value(obj, store, tree, pos, key) {

    obj = obj[key];

    // reached target field

    if (pos === tree.length - 1) {

        // store target value

        store[key] = obj;
    } else if (obj) {

        if ((0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_array)(obj)) {

            store = store[key] = Array(obj.length);

            for (let i = 0; i < obj.length; i++) {

                // do not increase pos (an array is not a field)
                store_value(obj, store, tree, pos, i);
            }
        } else {

            store = store[key] || (store[key] = (0,_common_js__WEBPACK_IMPORTED_MODULE_3__.create_object)());
            key = tree[++pos];

            store_value(obj, store, tree, pos, key);
        }
    }
}

function add_index(obj, tree, marker, pos, index, id, key, _append) {

    obj = obj[key];

    if (obj) {

        // reached target field

        if (pos === tree.length - 1) {

            // handle target value

            if ((0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_array)(obj)) {

                // append array contents so each entry gets a new scoring context

                if (marker[pos]) {

                    for (let i = 0; i < obj.length; i++) {

                        index.add(id, obj[i], !0, !0);
                    }

                    return;
                }

                // or join array contents and use one scoring context

                obj = obj.join(" ");
            }

            index.add(id, obj, _append, !0);
        } else {

            if ((0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_array)(obj)) {

                for (let i = 0; i < obj.length; i++) {

                    // do not increase index, an array is not a field

                    add_index(obj, tree, marker, pos, index, id, i, _append);
                }
            } else {

                key = tree[++pos];

                add_index(obj, tree, marker, pos, index, id, key, _append);
            }
        }
    }
}

/**
 *
 * @param id
 * @param content
 * @param {boolean=} _append
 * @returns {Document|Promise}
 */

Document.prototype.add = function (id, content, _append) {

    if ((0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_object)(id)) {

        content = id;
        id = parse_simple(content, this.key);
    }

    if (content && (id || 0 === id)) {

        if (!_append && this.register[id]) {

            return this.update(id, content);
        }

        for (let i = 0, tree, field; i < this.field.length; i++) {

            field = this.field[i];
            tree = this.tree[i];

            if ((0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_string)(tree)) {

                tree = [tree];
            }

            add_index(content, tree, this.marker, 0, this.index[field], id, tree[0], _append);
        }

        if (this.tag) {
            let tag = parse_simple(content, this.tag),
                dupes = (0,_common_js__WEBPACK_IMPORTED_MODULE_3__.create_object)();


            if ((0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_string)(tag)) {

                tag = [tag];
            }

            for (let i = 0, key, arr; i < tag.length; i++) {

                key = tag[i];

                if (!dupes[key]) {

                    dupes[key] = 1;
                    arr = this.tagindex[key] || (this.tagindex[key] = []);

                    if (!_append || !arr.includes(id)) {

                        arr[arr.length] = id;

                        // add a reference to the register for fast updates

                        if (this.fastupdate) {

                            const tmp = this.register[id] || (this.register[id] = []);
                            tmp[tmp.length] = arr;
                        }
                    }
                }
            }
        }

        // TODO: how to handle store when appending contents?

        if (this.store && (!_append || !this.store[id])) {

            let store;

            if (this.storetree) {

                store = (0,_common_js__WEBPACK_IMPORTED_MODULE_3__.create_object)();

                for (let i = 0, tree; i < this.storetree.length; i++) {

                    tree = this.storetree[i];

                    if ((0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_string)(tree)) {

                        store[tree] = content[tree];
                    } else {

                        store_value(content, store, tree, 0, tree[0]);
                    }
                }
            }

            this.store[id] = store || content;
        }
    }

    return this;
};

Document.prototype.append = function (id, content) {

    return this.add(id, content, !0);
};

Document.prototype.update = function (id, content) {

    return this.remove(id).add(id, content);
};

Document.prototype.remove = function (id) {

    if ((0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_object)(id)) {

        id = parse_simple(id, this.key);
    }

    if (this.register[id]) {

        for (let i = 0; i < this.field.length; i++) {

            // workers does not share the register

            this.index[this.field[i]].remove(id, !this.worker);

            if (this.fastupdate) {

                // when fastupdate was enabled all ids are removed

                break;
            }
        }

        if (this.tag) {

            // when fastupdate was enabled all ids are already removed

            if (!this.fastupdate) {

                for (let key in this.tagindex) {
                    const tag = this.tagindex[key],
                          pos = tag.indexOf(id);


                    if (-1 !== pos) {

                        if (1 < tag.length) {

                            tag.splice(pos, 1);
                        } else {

                            delete this.tagindex[key];
                        }
                    }
                }
            }
        }

        if (this.store) {

            delete this.store[id];
        }

        delete this.register[id];
    }

    return this;
};

/**
 * @param {!string|Object} query
 * @param {number|Object=} limit
 * @param {Object=} options
 * @param {Array<Array>=} _resolve For internal use only.
 * @returns {Promise|Array}
 */

Document.prototype.search = function (query, limit, options, _resolve) {

    if (!options) {

        if (!limit && (0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_object)(query)) {

            options = /** @type {Object} */query;
            query = "";
        } else if ((0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_object)(limit)) {

            options = /** @type {Object} */limit;
            limit = 0;
        }
    }

    let result = [],
        result_field = [],
        pluck,
        enrich,
        field,
        tag,
        bool,
        offset,
        count = 0;


    if (options) {

        if ((0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_array)(options)) {

            field = options;
            options = null;
        } else {

            query = options.query || query;
            pluck = options.pluck;
            field = pluck || options.index || options.field /*|| (is_string(options) && [options])*/;
            tag = options.tag;
            enrich = this.store && options.enrich;
            bool = "and" === options.bool;
            limit = options.limit || limit || 100;
            offset = options.offset || 0;

            if (tag) {

                if ((0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_string)(tag)) {

                    tag = [tag];
                }

                // when tags is used and no query was set,
                // then just return the tag indexes

                if (!query) {

                    for (let i = 0, res; i < tag.length; i++) {

                        res = get_tag.call(this, tag[i], limit, offset, enrich);

                        if (res) {

                            result[result.length] = res;
                            count++;
                        }
                    }

                    return count ? result : [];
                }
            }

            if ((0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_string)(field)) {

                field = [field];
            }
        }
    }

    field || (field = this.field);
    bool = bool && (1 < field.length || tag && 1 < tag.length);

    const promises = !_resolve && (this.worker || this.async) && [];

    // TODO solve this in one loop below

    for (let i = 0, res, key, len; i < field.length; i++) {

        let field_options;

        key = field[i];

        if (!(0,_common_js__WEBPACK_IMPORTED_MODULE_3__.is_string)(key)) {

            field_options = key;
            key = field_options.field;
            query = field_options.query || query;
            limit = field_options.limit || limit;
            enrich = field_options.enrich || enrich;
        }

        if (promises) {

            promises[i] = this.index[key].searchAsync(query, limit, field_options || options);

            // just collect and continue

            continue;
        } else if (_resolve) {

            res = _resolve[i];
        } else {

            // inherit options also when search? it is just for laziness, Object.assign() has a cost

            res = this.index[key].search(query, limit, field_options || options);
        }

        len = res && res.length;

        if (tag && len) {

            const arr = [];
            let count = 0;

            if (bool) {

                // prepare for intersection

                arr[0] = [res];
            }

            for (let y = 0, key, res; y < tag.length; y++) {

                key = tag[y];
                res = this.tagindex[key];
                len = res && res.length;

                if (len) {

                    count++;
                    arr[arr.length] = bool ? [res] : res;
                }
            }

            if (count) {

                if (bool) {

                    res = (0,_intersect_js__WEBPACK_IMPORTED_MODULE_5__.intersect)(arr, limit || 100, offset || 0);
                } else {

                    res = (0,_intersect_js__WEBPACK_IMPORTED_MODULE_5__.intersect_union)(res, arr);
                }

                len = res.length;
            }
        }

        if (len) {

            result_field[count] = key;
            result[count++] = res;
        } else if (bool) {

            return [];
        }
    }

    if (promises) {

        const self = this;

        // anyone knows a better workaround of optionally having async promises?
        // the promise.all() needs to be wrapped into additional promise,
        // otherwise the recursive callback wouldn't run before return

        return new Promise(function (resolve) {

            Promise.all(promises).then(function (result) {

                resolve(self.search(query, limit, options, result));
            });
        });
    }

    if (!count) {

        // fast path "not found"

        return [];
    }

    if (pluck && (!enrich || !this.store)) {

        // fast path optimization

        return result[0];
    }

    for (let i = 0, res; i < result_field.length; i++) {

        res = result[i];

        if (res.length) {

            if (enrich) {

                res = apply_enrich.call(this, res);
            }
        }

        if (pluck) {

            return res;
        }

        result[i] = {

            field: result_field[i],
            result: res
        };
    }

    return result;
};

/**
 * @this Document
 */

function get_tag(key, limit, offset) {
    let res = this.tagindex[key],
        len = res && res.length - offset;
}

/**
 * @this Document
 */

function apply_enrich(res) {

    const arr = Array(res.length);

    for (let x = 0, id; x < res.length; x++) {

        id = res[x];

        arr[x] = {

            id: id,
            doc: this.store[id]
        };
    }

    return arr;
}

Document.prototype.contain = function (id) {

    return !!this.register[id];
};

Document.prototype.get = function (id) {

    return this.store[id];
};

Document.prototype.set = function (id, data) {

    this.store[id] = data;
    return this;
};


Document.prototype.searchCache = _cache_js__WEBPACK_IMPORTED_MODULE_2__.searchCache;


Document.prototype.export = _serialize_js__WEBPACK_IMPORTED_MODULE_6__.exportDocument;
Document.prototype.import = _serialize_js__WEBPACK_IMPORTED_MODULE_6__.importDocument;


(0,_async_js__WEBPACK_IMPORTED_MODULE_4__["default"])(Document.prototype);

/***/ }),

/***/ "./node_modules/flexsearch/dist/module/global.js":
/*!*******************************************************!*\
  !*** ./node_modules/flexsearch/dist/module/global.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   global_charset: () => (/* binding */ global_charset),
/* harmony export */   global_lang: () => (/* binding */ global_lang),
/* harmony export */   registerCharset: () => (/* binding */ registerCharset),
/* harmony export */   registerLanguage: () => (/* binding */ registerLanguage)
/* harmony export */ });
const global_lang = {};
const global_charset = {};

/**
 * @param {!string} name
 * @param {Object} charset
 */

function registerCharset(name, charset) {

  global_charset[name] = charset;
}

/**
 * @param {!string} name
 * @param {Object} lang
 */

function registerLanguage(name, lang) {

  global_lang[name] = lang;
}

/***/ }),

/***/ "./node_modules/flexsearch/dist/module/index.js":
/*!******************************************************!*\
  !*** ./node_modules/flexsearch/dist/module/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type.js */ "./node_modules/flexsearch/dist/module/type.js");
/* harmony import */ var _lang_latin_default_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lang/latin/default.js */ "./node_modules/flexsearch/dist/module/lang/latin/default.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common.js */ "./node_modules/flexsearch/dist/module/common.js");
/* harmony import */ var _lang_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lang.js */ "./node_modules/flexsearch/dist/module/lang.js");
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./global.js */ "./node_modules/flexsearch/dist/module/global.js");
/* harmony import */ var _async_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./async.js */ "./node_modules/flexsearch/dist/module/async.js");
/* harmony import */ var _intersect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./intersect.js */ "./node_modules/flexsearch/dist/module/intersect.js");
/* harmony import */ var _cache_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cache.js */ "./node_modules/flexsearch/dist/module/cache.js");
/* harmony import */ var _preset_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preset.js */ "./node_modules/flexsearch/dist/module/preset.js");
/* harmony import */ var _serialize_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./serialize.js */ "./node_modules/flexsearch/dist/module/serialize.js");
/**!
 * FlexSearch.js
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */












/**
 * @constructor
 * @implements IndexInterface
 * @param {Object=} options
 * @param {Object=} _register
 * @return {Index}
 */

function Index(options, _register) {

    if (!(this instanceof Index)) {

        return new Index(options);
    }

    let charset, lang, tmp;

    if (options) {

        options = (0,_preset_js__WEBPACK_IMPORTED_MODULE_8__["default"])(options);


        charset = options.charset;
        lang = options.lang;

        if ((0,_common_js__WEBPACK_IMPORTED_MODULE_2__.is_string)(charset)) {

            if (-1 === charset.indexOf(":")) {

                charset += ":default";
            }

            charset = _global_js__WEBPACK_IMPORTED_MODULE_4__.global_charset[charset];
        }

        if ((0,_common_js__WEBPACK_IMPORTED_MODULE_2__.is_string)(lang)) {

            lang = _global_js__WEBPACK_IMPORTED_MODULE_4__.global_lang[lang];
        }
    } else {

        options = {};
    }

    let resolution,
        optimize,
        context = options.context || {};

    this.encode = options.encode || charset && charset.encode || _lang_latin_default_js__WEBPACK_IMPORTED_MODULE_1__.encode;
    this.register = _register || (0,_common_js__WEBPACK_IMPORTED_MODULE_2__.create_object)();
    this.resolution = resolution = options.resolution || 9;
    this.tokenize = tmp = charset && charset.tokenize || options.tokenize || "strict";
    this.depth = "strict" === tmp && context.depth;
    this.bidirectional = (0,_common_js__WEBPACK_IMPORTED_MODULE_2__.parse_option)(context.bidirectional, /* append: */ /* skip update: */ /* skip_update: */!0);
    this.optimize = optimize = (0,_common_js__WEBPACK_IMPORTED_MODULE_2__.parse_option)(options.optimize, !0);
    this.fastupdate = (0,_common_js__WEBPACK_IMPORTED_MODULE_2__.parse_option)(options.fastupdate, !0);
    this.minlength = options.minlength || 1;
    this.boost = options.boost;

    // when not using the memory strategy the score array should not pre-allocated to its full length

    this.map = optimize ? (0,_common_js__WEBPACK_IMPORTED_MODULE_2__.create_object_array)(resolution) : (0,_common_js__WEBPACK_IMPORTED_MODULE_2__.create_object)();
    this.resolution_ctx = resolution = context.resolution || 1;
    this.ctx = optimize ? (0,_common_js__WEBPACK_IMPORTED_MODULE_2__.create_object_array)(resolution) : (0,_common_js__WEBPACK_IMPORTED_MODULE_2__.create_object)();
    this.rtl = charset && charset.rtl || options.rtl;
    this.matcher = (tmp = options.matcher || lang && lang.matcher) && (0,_lang_js__WEBPACK_IMPORTED_MODULE_3__.init_stemmer_or_matcher)(tmp, !1);
    this.stemmer = (tmp = options.stemmer || lang && lang.stemmer) && (0,_lang_js__WEBPACK_IMPORTED_MODULE_3__.init_stemmer_or_matcher)(tmp, !0);
    this.filter = (tmp = options.filter || lang && lang.filter) && (0,_lang_js__WEBPACK_IMPORTED_MODULE_3__.init_filter)(tmp);

    this.cache = (tmp = options.cache) && new _cache_js__WEBPACK_IMPORTED_MODULE_7__["default"](tmp);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Index);

//Index.prototype.pipeline = pipeline;

/**
 * @param {!number|string} id
 * @param {!string} content
 */

Index.prototype.append = function (id, content) {

    return this.add(id, content, !0);
};

// TODO:
// string + number as text
// boolean, null, undefined as ?

/**
 * @param {!number|string} id
 * @param {!string} content
 * @param {boolean=} _append
 * @param {boolean=} _skip_update
 */

Index.prototype.add = function (id, content, _append, _skip_update) {

    if (content && (id || 0 === id)) {

        if (!_skip_update && !_append && this.register[id]) {

            return this.update(id, content);
        }

        content = this.encode("" + content);
        const length = content.length;

        if (length) {

            // check context dupes to skip all contextual redundancy along a document

            const dupes_ctx = (0,_common_js__WEBPACK_IMPORTED_MODULE_2__.create_object)(),
                  dupes = (0,_common_js__WEBPACK_IMPORTED_MODULE_2__.create_object)(),
                  depth = this.depth,
                  resolution = this.resolution;


            for (let i = 0; i < length; i++) {
                let term = content[this.rtl ? length - 1 - i : i],
                    term_length = term.length;


                // skip dupes will break the context chain

                if (term && term_length >= this.minlength && (depth || !dupes[term])) {
                    let score = get_score(resolution, length, i),
                        token = "";


                    switch (this.tokenize) {

                        case "full":

                            if (2 < term_length) {

                                for (let x = 0; x < term_length; x++) {

                                    for (let y = term_length; y > x; y--) {

                                        if (y - x >= this.minlength) {

                                            const partial_score = get_score(resolution, length, i, term_length, x);
                                            token = term.substring(x, y);
                                            this.push_index(dupes, token, partial_score, id, _append);
                                        }
                                    }
                                }

                                break;
                            }

                        // fallthrough to next case when term length < 3

                        case "reverse":

                            // skip last round (this token exist already in "forward")

                            if (1 < term_length) {

                                for (let x = term_length - 1; 0 < x; x--) {

                                    token = term[x] + token;

                                    if (token.length >= this.minlength) {

                                        const partial_score = get_score(resolution, length, i, term_length, x);
                                        this.push_index(dupes, token, partial_score, id, _append);
                                    }
                                }

                                token = "";
                            }

                        // fallthrough to next case to apply forward also

                        case "forward":

                            if (1 < term_length) {

                                for (let x = 0; x < term_length; x++) {

                                    token += term[x];

                                    if (token.length >= this.minlength) {

                                        this.push_index(dupes, token, score, id, _append);
                                    }
                                }

                                break;
                            }

                        // fallthrough to next case when token has a length of 1

                        default:
                            // case "strict":

                            if (this.boost) {

                                score = Math.min(0 | score / this.boost(content, term, i), resolution - 1);
                            }

                            this.push_index(dupes, term, score, id, _append);

                            // context is just supported by tokenizer "strict"

                            if (depth) {

                                if (1 < length && i < length - 1) {

                                    // check inner dupes to skip repeating words in the current context

                                    const dupes_inner = (0,_common_js__WEBPACK_IMPORTED_MODULE_2__.create_object)(),
                                          resolution = this.resolution_ctx,
                                          keyword = term,
                                          size = Math.min(depth + 1, length - i);


                                    dupes_inner[keyword] = 1;

                                    for (let x = 1; x < size; x++) {

                                        term = content[this.rtl ? length - 1 - i - x : i + x];

                                        if (term && term.length >= this.minlength && !dupes_inner[term]) {

                                            dupes_inner[term] = 1;

                                            const context_score = get_score(resolution + (length / 2 > resolution ? 0 : 1), length, i, size - 1, x - 1),
                                                  swap = this.bidirectional && term > keyword;

                                            this.push_index(dupes_ctx, swap ? keyword : term, context_score, id, _append, swap ? term : keyword);
                                        }
                                    }
                                }
                            }
                    }
                }
            }

            this.fastupdate || (this.register[id] = 1);
        }
    }

    return this;
};

/**
 * @param {number} resolution
 * @param {number} length
 * @param {number} i
 * @param {number=} term_length
 * @param {number=} x
 * @returns {number}
 */

function get_score(resolution, length, i, term_length, x) {

    // console.log("resolution", resolution);
    // console.log("length", length);
    // console.log("term_length", term_length);
    // console.log("i", i);
    // console.log("x", x);
    // console.log((resolution - 1) / (length + (term_length || 0)) * (i + (x || 0)) + 1);

    // the first resolution slot is reserved for the best match,
    // when a query matches the first word(s).

    // also to stretch score to the whole range of resolution, the
    // calculation is shift by one and cut the floating point.
    // this needs the resolution "1" to be handled additionally.

    // do not stretch the resolution more than the term length will
    // improve performance and memory, also it improves scoring in
    // most cases between a short document and a long document

    return i && 1 < resolution ? length + (term_length || 0) <= resolution ? i + (x || 0) : 0 | (resolution - 1) / (length + (term_length || 0)) * (i + (x || 0)) + 1 : 0;
}

/**
 * @private
 * @param dupes
 * @param value
 * @param score
 * @param id
 * @param {boolean=} append
 * @param {string=} keyword
 */

Index.prototype.push_index = function (dupes, value, score, id, append, keyword) {

    let arr = keyword ? this.ctx : this.map;

    if (!dupes[value] || keyword && !dupes[value][keyword]) {

        if (this.optimize) {

            arr = arr[score];
        }

        if (keyword) {

            dupes = dupes[value] || (dupes[value] = (0,_common_js__WEBPACK_IMPORTED_MODULE_2__.create_object)());
            dupes[keyword] = 1;

            arr = arr[keyword] || (arr[keyword] = (0,_common_js__WEBPACK_IMPORTED_MODULE_2__.create_object)());
        } else {

            dupes[value] = 1;
        }

        arr = arr[value] || (arr[value] = []);

        if (!this.optimize) {

            arr = arr[score] || (arr[score] = []);
        }

        if (!append || !arr.includes(id)) {

            arr[arr.length] = id;

            // add a reference to the register for fast updates

            if (this.fastupdate) {

                const tmp = this.register[id] || (this.register[id] = []);
                tmp[tmp.length] = arr;
            }
        }
    }
};

/**
 * @param {string|Object} query
 * @param {number|Object=} limit
 * @param {Object=} options
 * @returns {Array<number|string>}
 */

Index.prototype.search = function (query, limit, options) {

    if (!options) {

        if (!limit && (0,_common_js__WEBPACK_IMPORTED_MODULE_2__.is_object)(query)) {

            options = /** @type {Object} */query;
            query = options.query;
        } else if ((0,_common_js__WEBPACK_IMPORTED_MODULE_2__.is_object)(limit)) {

            options = /** @type {Object} */limit;
        }
    }

    let result = [],
        length,
        context,
        suggest,
        offset = 0;


    if (options) {

        query = options.query || query;
        limit = options.limit;
        offset = options.offset || 0;
        context = options.context;
        suggest = options.suggest;
    }

    if (query) {

        query = /** @type {Array} */this.encode("" + query);
        length = query.length;

        // TODO: solve this in one single loop below

        if (1 < length) {
            const dupes = (0,_common_js__WEBPACK_IMPORTED_MODULE_2__.create_object)(),
                  query_new = [];


            for (let i = 0, count = 0, term; i < length; i++) {

                term = query[i];

                if (term && term.length >= this.minlength && !dupes[term]) {

                    // this fast path can just apply when not in memory-optimized mode

                    if (!this.optimize && !suggest && !this.map[term]) {

                        // fast path "not found"

                        return result;
                    } else {

                        query_new[count++] = term;
                        dupes[term] = 1;
                    }
                }
            }

            query = query_new;
            length = query.length;
        }
    }

    if (!length) {

        return result;
    }

    limit || (limit = 100);

    let depth = this.depth && 1 < length && !1 !== context,
        index = 0,
        keyword;


    if (depth) {

        keyword = query[0];
        index = 1;
    } else {

        if (1 < length) {

            query.sort(_common_js__WEBPACK_IMPORTED_MODULE_2__.sort_by_length_down);
        }
    }

    for (let arr, term; index < length; index++) {

        term = query[index];

        // console.log(keyword);
        // console.log(term);
        // console.log("");

        if (depth) {

            arr = this.add_result(result, suggest, limit, offset, 2 === length, term, keyword);

            // console.log(arr);
            // console.log(result);

            // when suggestion enabled just forward keyword if term was found
            // as long as the result is empty forward the pointer also

            if (!suggest || !1 !== arr || !result.length) {

                keyword = term;
            }
        } else {

            arr = this.add_result(result, suggest, limit, offset, 1 === length, term);
        }

        if (arr) {

            return (/** @type {Array<number|string>} */arr
            );
        }

        // apply suggestions on last loop or fallback

        if (suggest && index == length - 1) {

            let length = result.length;

            if (!length) {

                if (depth) {

                    // fallback to non-contextual search when no result was found

                    depth = 0;
                    index = -1;

                    continue;
                }

                return result;
            } else if (1 === length) {

                // fast path optimization

                return single_result(result[0], limit, offset);
            }
        }
    }

    return (0,_intersect_js__WEBPACK_IMPORTED_MODULE_6__.intersect)(result, limit, offset, suggest);
};

/**
 * Returns an array when the result is done (to stop the process immediately),
 * returns false when suggestions is enabled and no result was found,
 * or returns nothing when a set was pushed successfully to the results
 *
 * @private
 * @param {Array} result
 * @param {Array} suggest
 * @param {number} limit
 * @param {number} offset
 * @param {boolean} single_term
 * @param {string} term
 * @param {string=} keyword
 * @return {Array<Array<string|number>>|boolean|undefined}
 */

Index.prototype.add_result = function (result, suggest, limit, offset, single_term, term, keyword) {
    let word_arr = [],
        arr = keyword ? this.ctx : this.map;


    if (!this.optimize) {

        arr = get_array(arr, term, keyword, this.bidirectional);
    }

    if (arr) {

        let count = 0;
        const arr_len = Math.min(arr.length, keyword ? this.resolution_ctx : this.resolution);

        // relevance:
        for (let x = 0, size = 0, tmp, len; x < arr_len; x++) {

            tmp = arr[x];

            if (tmp) {

                if (this.optimize) {

                    tmp = get_array(tmp, term, keyword, this.bidirectional);
                }

                if (offset) {

                    if (tmp && single_term) {

                        len = tmp.length;

                        if (len <= offset) {

                            offset -= len;
                            tmp = null;
                        } else {

                            tmp = tmp.slice(offset);
                            offset = 0;
                        }
                    }
                }

                if (tmp) {

                    // keep score (sparse array):
                    //word_arr[x] = tmp;

                    // simplified score order:
                    word_arr[count++] = tmp;

                    if (single_term) {

                        size += tmp.length;

                        if (size >= limit) {

                            // fast path optimization

                            break;
                        }
                    }
                }
            }
        }

        if (count) {

            if (single_term) {

                // fast path optimization
                // offset was already applied at this point

                return single_result(word_arr, limit, 0);
            }

            result[result.length] = word_arr;
            return;
        }
    }

    // return an empty array will stop the loop,
    // to prevent stop when using suggestions return a false value

    return !suggest && word_arr;
};

function single_result(result, limit, offset) {

    if (1 === result.length) {

        result = result[0];
    } else {

        result = (0,_common_js__WEBPACK_IMPORTED_MODULE_2__.concat)(result);
    }

    return offset || result.length > limit ? result.slice(offset, offset + limit) : result;
}

function get_array(arr, term, keyword, bidirectional) {

    if (keyword) {

        // the frequency of the starting letter is slightly less
        // on the last half of the alphabet (m-z) in almost every latin language,
        // so we sort downwards (https://en.wikipedia.org/wiki/Letter_frequency)

        const swap = bidirectional && term > keyword;

        arr = arr[swap ? term : keyword];
        arr = arr && arr[swap ? keyword : term];
    } else {

        arr = arr[term];
    }

    return arr;
}

Index.prototype.contain = function (id) {

    return !!this.register[id];
};

Index.prototype.update = function (id, content) {

    return this.remove(id).add(id, content);
};

/**
 * @param {boolean=} _skip_deletion
 */

Index.prototype.remove = function (id, _skip_deletion) {

    const refs = this.register[id];

    if (refs) {

        if (this.fastupdate) {

            // fast updates performs really fast but did not fully cleanup the key entries

            for (let i = 0, tmp; i < refs.length; i++) {

                tmp = refs[i];
                tmp.splice(tmp.indexOf(id), 1);
            }
        } else {

            remove_index(this.map, id, this.resolution, this.optimize);

            if (this.depth) {

                remove_index(this.ctx, id, this.resolution_ctx, this.optimize);
            }
        }

        _skip_deletion || delete this.register[id];

        if (this.cache) {

            this.cache.del(id);
        }
    }

    return this;
};

/**
 * @param map
 * @param id
 * @param res
 * @param optimize
 * @param {number=} resolution
 * @return {number}
 */

function remove_index(map, id, res, optimize, resolution) {

    let count = 0;

    if ((0,_common_js__WEBPACK_IMPORTED_MODULE_2__.is_array)(map)) {

        // the first array is the score array in both strategies

        if (!resolution) {

            resolution = Math.min(map.length, res);

            for (let x = 0, arr; x < resolution; x++) {

                arr = map[x];

                if (arr) {

                    count = remove_index(arr, id, res, optimize, resolution);

                    if (!optimize && !count) {

                        // when not memory optimized the score index should removed

                        delete map[x];
                    }
                }
            }
        } else {

            const pos = map.indexOf(id);

            if (-1 !== pos) {

                // fast path, when length is 1 or lower then the whole field gets deleted

                if (1 < map.length) {

                    map.splice(pos, 1);
                    count++;
                }
            } else {

                count++;
            }
        }
    } else {

        for (let key in map) {

            count = remove_index(map[key], id, res, optimize, resolution);

            if (!count) {

                delete map[key];
            }
        }
    }

    return count;
}

Index.prototype.searchCache = _cache_js__WEBPACK_IMPORTED_MODULE_7__.searchCache;


Index.prototype.export = _serialize_js__WEBPACK_IMPORTED_MODULE_9__.exportIndex;
Index.prototype.import = _serialize_js__WEBPACK_IMPORTED_MODULE_9__.importIndex;


(0,_async_js__WEBPACK_IMPORTED_MODULE_5__["default"])(Index.prototype);

/***/ }),

/***/ "./node_modules/flexsearch/dist/module/intersect.js":
/*!**********************************************************!*\
  !*** ./node_modules/flexsearch/dist/module/intersect.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   intersect: () => (/* binding */ intersect),
/* harmony export */   intersect_union: () => (/* binding */ intersect_union)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/flexsearch/dist/module/common.js");


/**
 * Implementation based on Array.includes() provides better performance,
 * but it needs at least one word in the query which is less frequent.
 * Also on large indexes it does not scale well performance-wise.
 * This strategy also lacks of suggestion capabilities (matching & sorting).
 *
 * @param arrays
 * @param limit
 * @param offset
 * @param {boolean|Array=} suggest
 * @returns {Array}
 */

// export function intersect(arrays, limit, offset, suggest) {
//
//     const length = arrays.length;
//     let result = [];
//     let check;
//
//     // determine shortest array and collect results
//     // from the sparse relevance arrays
//
//     let smallest_size;
//     let smallest_arr;
//     let smallest_index;
//
//     for(let x = 0; x < length; x++){
//
//         const arr = arrays[x];
//         const len = arr.length;
//
//         let size = 0;
//
//         for(let y = 0, tmp; y < len; y++){
//
//             tmp = arr[y];
//
//             if(tmp){
//
//                 size += tmp.length;
//             }
//         }
//
//         if(!smallest_size || (size < smallest_size)){
//
//             smallest_size = size;
//             smallest_arr = arr;
//             smallest_index = x;
//         }
//     }
//
//     smallest_arr = smallest_arr.length === 1 ?
//
//         smallest_arr[0]
//     :
//         concat(smallest_arr);
//
//     if(suggest){
//
//         suggest = [smallest_arr];
//         check = create_object();
//     }
//
//     let size = 0;
//     let steps = 0;
//
//     // process terms in reversed order often results in better performance.
//     // the outer loop must be the words array, using the
//     // smallest array here disables the "fast fail" optimization.
//
//     for(let x = length - 1; x >= 0; x--){
//
//         if(x !== smallest_index){
//
//             steps++;
//
//             const word_arr = arrays[x];
//             const word_arr_len = word_arr.length;
//             const new_arr = [];
//
//             let count = 0;
//
//             for(let z = 0, id; z < smallest_arr.length; z++){
//
//                 id = smallest_arr[z];
//
//                 let found;
//
//                 // process relevance in forward order (direction is
//                 // important for adding IDs during the last round)
//
//                 for(let y = 0; y < word_arr_len; y++){
//
//                     const arr = word_arr[y];
//
//                     if(arr.length){
//
//                         found = arr.includes(id);
//
//                         if(found){
//
//                             // check if in last round
//
//                             if(steps === length - 1){
//
//                                 if(offset){
//
//                                     offset--;
//                                 }
//                                 else{
//
//                                     result[size++] = id;
//
//                                     if(size === limit){
//
//                                         // fast path "end reached"
//
//                                         return result;
//                                     }
//                                 }
//
//                                 if(suggest){
//
//                                     check[id] = 1;
//                                 }
//                             }
//
//                             break;
//                         }
//                     }
//                 }
//
//                 if(found){
//
//                     new_arr[count++] = id;
//                 }
//             }
//
//             if(suggest){
//
//                 suggest[steps] = new_arr;
//             }
//             else if(!count){
//
//                 return [];
//             }
//
//             smallest_arr = new_arr;
//         }
//     }
//
//     if(suggest){
//
//         // needs to iterate in reverse direction
//
//         for(let x = suggest.length - 1, arr, len; x >= 0; x--){
//
//             arr = suggest[x];
//             len = arr && arr.length;
//
//             if(len){
//
//                 for(let y = 0, id; y < len; y++){
//
//                     id = arr[y];
//
//                     if(!check[id]){
//
//                         check[id] = 1;
//
//                         if(offset){
//
//                             offset--;
//                         }
//                         else{
//
//                             result[size++] = id;
//
//                             if(size === limit){
//
//                                 // fast path "end reached"
//
//                                 return result;
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
//
//     return result;
// }

/**
 * Implementation based on Object[key] provides better suggestions
 * capabilities and has less performance scaling issues on large indexes.
 *
 * @param arrays
 * @param limit
 * @param offset
 * @param {boolean|Array=} suggest
 * @returns {Array}
 */

function intersect(arrays, limit, offset, suggest) {

    const length = arrays.length;
    let result = [],
        check,
        check_suggest,
        size = 0;


    if (suggest) {

        suggest = [];
    }

    // process terms in reversed order often has advantage for the fast path "end reached".
    // also a reversed order prioritize the order of words from a query.

    for (let x = length - 1; 0 <= x; x--) {
        const word_arr = arrays[x],
              word_arr_len = word_arr.length,
              check_new = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.create_object)();


        let found = !check;

        // process relevance in forward order (direction is
        // important for adding IDs during the last round)

        for (let y = 0; y < word_arr_len; y++) {
            const arr = word_arr[y],
                  arr_len = arr.length;


            if (arr_len) {

                // loop through IDs

                for (let z = 0, check_idx, id; z < arr_len; z++) {

                    id = arr[z];

                    if (check) {

                        if (check[id]) {

                            // check if in last round

                            if (!x) {

                                if (offset) {

                                    offset--;
                                } else {

                                    result[size++] = id;

                                    if (size === limit) {

                                        // fast path "end reached"

                                        return result;
                                    }
                                }
                            }

                            if (x || suggest) {

                                check_new[id] = 1;
                            }

                            found = /* append: */ /* skip update: */ /* skip_update: */!0;
                        }

                        if (suggest) {

                            check_idx = (check_suggest[id] || 0) + 1;
                            check_suggest[id] = check_idx;

                            // do not adding IDs which are already included in the result (saves one loop)
                            // the first intersection match has the check index 2, so shift by -2

                            if (check_idx < length) {

                                const tmp = suggest[check_idx - 2] || (suggest[check_idx - 2] = []);
                                tmp[tmp.length] = id;
                            }
                        }
                    } else {

                        // pre-fill in first round

                        check_new[id] = 1;
                    }
                }
            }
        }

        if (suggest) {

            // re-use the first pre-filled check for suggestions

            check || (check_suggest = check_new);
        } else if (!found) {

            return [];
        }

        check = check_new;
    }

    if (suggest) {

        // needs to iterate in reverse direction

        for (let x = suggest.length - 1, arr, len; 0 <= x; x--) {

            arr = suggest[x];
            len = arr.length;

            for (let y = 0, id; y < len; y++) {

                id = arr[y];

                if (!check[id]) {

                    if (offset) {

                        offset--;
                    } else {

                        result[size++] = id;

                        if (size === limit) {

                            // fast path "end reached"

                            return result;
                        }
                    }

                    check[id] = 1;
                }
            }
        }
    }

    return result;
}

/**
 * @param mandatory
 * @param arrays
 * @returns {Array}
 */

function intersect_union(mandatory, arrays) {
    const check = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.create_object)(),
          union = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.create_object)(),
          result = [];


    for (let x = 0; x < mandatory.length; x++) {

        check[mandatory[x]] = 1;
    }

    for (let x = 0, arr; x < arrays.length; x++) {

        arr = arrays[x];

        for (let y = 0, id; y < arr.length; y++) {

            id = arr[y];

            if (check[id]) {

                if (!union[id]) {

                    union[id] = 1;
                    result[result.length] = id;
                }
            }
        }
    }

    return result;
}

/***/ }),

/***/ "./node_modules/flexsearch/dist/module/lang.js":
/*!*****************************************************!*\
  !*** ./node_modules/flexsearch/dist/module/lang.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   collapse: () => (/* binding */ collapse),
/* harmony export */   filter: () => (/* binding */ filter),
/* harmony export */   init_filter: () => (/* binding */ init_filter),
/* harmony export */   init_stemmer_or_matcher: () => (/* binding */ init_stemmer_or_matcher),
/* harmony export */   normalize: () => (/* binding */ normalize),
/* harmony export */   pipeline: () => (/* binding */ pipeline),
/* harmony export */   regex: () => (/* binding */ regex),
/* harmony export */   regex_whitespace: () => (/* binding */ regex_whitespace),
/* harmony export */   replace: () => (/* binding */ replace)
/* harmony export */ });
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type.js */ "./node_modules/flexsearch/dist/module/type.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common.js */ "./node_modules/flexsearch/dist/module/common.js");



/**
 * @param {!string} str
 * @param {boolean|Array<string|RegExp>=} normalize
 * @param {boolean|string|RegExp=} split
 * @param {boolean=} _collapse
 * @returns {string|Array<string>}
 * @this IndexInterface
 */

function pipeline(str, normalize, split, _collapse) {

    if (str) {

        if (normalize) {

            str = replace(str, /** @type {Array<string|RegExp>} */normalize);
        }

        if (this.matcher) {

            str = replace(str, this.matcher);
        }

        if (this.stemmer && 1 < str.length) {

            str = replace(str, this.stemmer);
        }

        if (_collapse && 1 < str.length) {

            str = collapse(str);
        }

        if (split || "" === split) {

            const words = str.split( /** @type {string|RegExp} */split);

            return this.filter ? filter(words, this.filter) : words;
        }
    }

    return str;
}

// TODO improve normalize + remove non-delimited chars like in "I'm" + split on whitespace+

const regex_whitespace = /[\p{Z}\p{S}\p{P}\p{C}]+/u;
// https://github.com/nextapps-de/flexsearch/pull/414
//export const regex_whitespace = /[\s\xA0\u2000-\u200B\u2028\u2029\u3000\ufeff!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/
const regex_normalize = /[\u0300-\u036f]/g;

function normalize(str) {

    if (str.normalize) {

        str = str.normalize("NFD").replace(regex_normalize, "");
    }

    return str;
}

/**
 * @param {!string} str
 * @param {boolean|Array<string|RegExp>=} normalize
 * @param {boolean|string|RegExp=} split
 * @param {boolean=} _collapse
 * @returns {string|Array<string>}
 */

// FlexSearch.prototype.pipeline = function(str, normalize, split, _collapse){
//
//     if(str){
//
//         if(normalize && str){
//
//             str = replace(str, /** @type {Array<string|RegExp>} */ (normalize));
//         }
//
//         if(str && this.matcher){
//
//             str = replace(str, this.matcher);
//         }
//
//         if(this.stemmer && str.length > 1){
//
//             str = replace(str, this.stemmer);
//         }
//
//         if(_collapse && str.length > 1){
//
//             str = collapse(str);
//         }
//
//         if(str){
//
//             if(split || (split === "")){
//
//                 const words = str.split(/** @type {string|RegExp} */ (split));
//
//                 return this.filter ? filter(words, this.filter) : words;
//             }
//         }
//     }
//
//     return str;
// };

// export function pipeline(str, normalize, matcher, stemmer, split, _filter, _collapse){
//
//     if(str){
//
//         if(normalize && str){
//
//             str = replace(str, normalize);
//         }
//
//         if(matcher && str){
//
//             str = replace(str, matcher);
//         }
//
//         if(stemmer && str.length > 1){
//
//             str = replace(str, stemmer);
//         }
//
//         if(_collapse && str.length > 1){
//
//             str = collapse(str);
//         }
//
//         if(str){
//
//             if(split !== false){
//
//                 str = str.split(split);
//
//                 if(_filter){
//
//                     str = filter(str, _filter);
//                 }
//             }
//         }
//     }
//
//     return str;
// }


/**
 * @param {Array<string>} words
 * @returns {Object<string, string>}
 */

function init_filter(words) {

    const filter = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.create_object)();

    for (let i = 0, length = words.length; i < length; i++) {

        filter[words[i]] = 1;
    }

    return filter;
}

/**
 * @param {!Object<string, string>} obj
 * @param {boolean} is_stemmer
 * @returns {Array}
 */

function init_stemmer_or_matcher(obj, is_stemmer) {
    const keys = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.get_keys)(obj),
          length = keys.length,
          final = [];


    let removal = "",
        count = 0;

    for (let i = 0, key, tmp; i < length; i++) {

        key = keys[i];
        tmp = obj[key];

        if (tmp) {

            final[count++] = regex(is_stemmer ? "(?!\\b)" + key + "(\\b|_)" : key);
            final[count++] = tmp;
        } else {

            removal += (removal ? "|" : "") + key;
        }
    }

    if (removal) {

        final[count++] = regex(is_stemmer ? "(?!\\b)(" + removal + ")(\\b|_)" : "(" + removal + ")");
        final[count] = "";
    }

    return final;
}

/**
 * @param {!string} str
 * @param {Array} regexp
 * @returns {string}
 */

function replace(str, regexp) {

    for (let i = 0, len = regexp.length; i < len; i += 2) {

        str = str.replace(regexp[i], regexp[i + 1]);

        if (!str) {

            break;
        }
    }

    return str;
}

/**
 * @param {!string} str
 * @returns {RegExp}
 */

function regex(str) {

    return new RegExp(str, "g");
}

/**
 * Regex: replace(/(?:(\w)(?:\1)*)/g, "$1")
 * @param {!string} string
 * @returns {string}
 */

function collapse(string) {

    let final = "",
        prev = "";

    for (let i = 0, len = string.length, char; i < len; i++) {

        if ((char = string[i]) !== prev) {

            final += prev = char;
        }
    }

    return final;
}

// TODO using fast-swap
function filter(words, map) {
    const length = words.length,
          filtered = [];


    for (let i = 0, count = 0; i < length; i++) {

        const word = words[i];

        if (word && !map[word]) {

            filtered[count++] = word;
        }
    }

    return filtered;
}

// const chars = {a:1, e:1, i:1, o:1, u:1, y:1};
//
// function collapse_repeating_chars(string){
//
//     let collapsed_string = "",
//         char_prev = "",
//         char_next = "";
//
//     for(let i = 0; i < string.length; i++){
//
//         const char = string[i];
//
//         if(char !== char_prev){
//
//             if(i && (char === "h")){
//
//                 if((chars[char_prev] && chars[char_next]) || (char_prev === " ")){
//
//                     collapsed_string += char;
//                 }
//             }
//             else{
//
//                 collapsed_string += char;
//             }
//         }
//
//         char_next = (
//
//             (i === (string.length - 1)) ?
//
//                 ""
//             :
//                 string[i + 1]
//         );
//
//         char_prev = char;
//     }
//
//     return collapsed_string;
// }

/***/ }),

/***/ "./node_modules/flexsearch/dist/module/lang/latin/default.js":
/*!*******************************************************************!*\
  !*** ./node_modules/flexsearch/dist/module/lang/latin/default.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   encode: () => (/* binding */ encode),
/* harmony export */   rtl: () => (/* binding */ rtl),
/* harmony export */   tokenize: () => (/* binding */ tokenize)
/* harmony export */ });
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../type.js */ "./node_modules/flexsearch/dist/module/type.js");
/* harmony import */ var _lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lang.js */ "./node_modules/flexsearch/dist/module/lang.js");



const rtl = /* normalize: */
/* collapse: */ /* normalize: */ /* collapse: */ /* normalize: */ /* collapse: */
/* normalize: */
/* collapse: */!1;
const tokenize = "";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    encode: encode,
    rtl: !1,
    tokenize: ""

    /**
     * @param {string|number} str
     * @this IndexInterface
     */

});function encode(str) {

    return _lang_js__WEBPACK_IMPORTED_MODULE_1__.pipeline.call(this,
    /* string: */("" + str).toLowerCase(), !1, /* split: */_lang_js__WEBPACK_IMPORTED_MODULE_1__.regex_whitespace, !1);
}

/***/ }),

/***/ "./node_modules/flexsearch/dist/module/preset.js":
/*!*******************************************************!*\
  !*** ./node_modules/flexsearch/dist/module/preset.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ apply_preset)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/flexsearch/dist/module/common.js");



/**
 * @enum {Object}
 * @const
 */

const preset = {

    memory: {
        charset: "latin:extra",
        //tokenize: "strict",
        resolution: 3,
        //threshold: 0,
        minlength: 4,
        fastupdate: /* normalize: */ /* collapse: */ /* normalize: */ /* collapse: */ /* normalize: */ /* collapse: */ /* normalize: */
        /* collapse: */
        /* collapse: */!1
    },

    performance: {
        //charset: "latin",
        //tokenize: "strict",
        resolution: 3,
        minlength: 3,
        //fastupdate: true,
        optimize: !1, //fastupdate: true,
        context: {
            depth: 2, resolution: 1
            //bidirectional: false
        }
    },

    match: {
        charset: "latin:extra",
        tokenize: "reverse"
        //resolution: 9,
        //threshold: 0
    },

    score: {
        charset: "latin:advanced",
        //tokenize: "strict",
        resolution: 20,
        minlength: 3,
        context: {
            depth: 3,
            resolution: 9
            //bidirectional: true
        }
    },

    default: {
        // charset: "latin:default",
        // tokenize: "strict",
        // resolution: 3,
        // threshold: 0,
        // depth: 3
    }

    // "fast": {
    //     //charset: "latin",
    //     //tokenize: "strict",
    //     threshold: 8,
    //     resolution: 9,
    //     depth: 1
    // }
};

function apply_preset(options) {

    if ((0,_common_js__WEBPACK_IMPORTED_MODULE_0__.is_string)(options)) {

        options = preset[options];
    } else {

        const preset = options.preset;

        if (preset) {

            options = Object.assign({}, preset[preset], /** @type {Object} */options);
        }
    }

    return options;
}

/***/ }),

/***/ "./node_modules/flexsearch/dist/module/serialize.js":
/*!**********************************************************!*\
  !*** ./node_modules/flexsearch/dist/module/serialize.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   exportDocument: () => (/* binding */ exportDocument),
/* harmony export */   exportIndex: () => (/* binding */ exportIndex),
/* harmony export */   importDocument: () => (/* binding */ importDocument),
/* harmony export */   importIndex: () => (/* binding */ importIndex)
/* harmony export */ });
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type.js */ "./node_modules/flexsearch/dist/module/type.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common.js */ "./node_modules/flexsearch/dist/module/common.js");
// TODO return promises instead of inner await




function async(callback, self, field, key, index_doc, index, data, on_done) {

    setTimeout(function () {

        const res = callback(field ? field + "." + key : key, JSON.stringify(data));

        // await isn't supported by ES5

        if (res && res.then) {

            res.then(function () {

                self.export(callback, self, field, index_doc, index + 1, on_done);
            });
        } else {

            self.export(callback, self, field, index_doc, index + 1, on_done);
        }
    });
}

/**
 * @this IndexInterface
 */

function exportIndex(callback, self, field, index_doc, index, on_done) {

    let return_value = /* append: */ /* skip update: */ /* skip_update: */ /* skip post-processing: */!0;
    if ('undefined' == typeof on_done) {
        return_value = new Promise(resolve => {
            on_done = resolve;
        });
    }

    let key, data;

    switch (index || (index = 0)) {

        case 0:

            key = "reg";

            // fastupdate isn't supported by export

            if (this.fastupdate) {

                data = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.create_object)();

                for (let key in this.register) {

                    data[key] = 1;
                }
            } else {

                data = this.register;
            }

            break;

        case 1:

            key = "cfg";
            data = {
                doc: 0,
                opt: this.optimize ? 1 : 0
            };

            break;

        case 2:

            key = "map";
            data = this.map;
            break;

        case 3:

            key = "ctx";
            data = this.ctx;
            break;

        default:

            if ('undefined' == typeof field && on_done) {

                on_done();
            }

            return;
    }

    async(callback, self || this, field, key, index_doc, index, data, on_done);

    return return_value;
}

/**
 * @this IndexInterface
 */

function importIndex(key, data) {

    if (!data) {

        return;
    }

    if ((0,_common_js__WEBPACK_IMPORTED_MODULE_1__.is_string)(data)) {

        data = JSON.parse(data);
    }

    switch (key) {

        case "cfg":

            this.optimize = !!data.opt;
            break;

        case "reg":

            // fastupdate isn't supported by import

            this.fastupdate = /* normalize: */ /* collapse: */ /* normalize: */ /* collapse: */ /* normalize: */ /* collapse: */ /* normalize: */ /* collapse: */ /* collapse: */!1;
            this.register = data;
            break;

        case "map":

            this.map = data;
            break;

        case "ctx":

            this.ctx = data;
            break;
    }
}

/**
 * @this DocumentInterface
 */

function exportDocument(callback, self, field, index_doc, index, on_done) {

    let return_value;
    if ('undefined' == typeof on_done) {
        return_value = new Promise(resolve => {
            on_done = resolve;
        });
    }

    index || (index = 0);
    index_doc || (index_doc = 0);

    if (index_doc < this.field.length) {
        const field = this.field[index_doc],
              idx = this.index[field];


        self = this;

        setTimeout(function () {

            if (!idx.export(callback, self, index ? field /*.replace(":", "-")*/ : "", index_doc, index++, on_done)) {

                index_doc++;
                index = 1;

                self.export(callback, self, field, index_doc, index, on_done);
            }
        });
    } else {

        let key, data;

        switch (index) {

            case 1:

                key = "tag";
                data = this.tagindex;
                field = null;
                break;

            case 2:

                key = "store";
                data = this.store;
                field = null;
                break;

            // case 3:
            //
            //     key = "reg";
            //     data = this.register;
            //     break;

            default:

                on_done();
                return;
        }

        async(callback, this, field, key, index_doc, index, data, on_done);
    }

    return return_value;
}

/**
 * @this DocumentInterface
 */

function importDocument(key, data) {

    if (!data) {

        return;
    }

    if ((0,_common_js__WEBPACK_IMPORTED_MODULE_1__.is_string)(data)) {

        data = JSON.parse(data);
    }

    switch (key) {

        case "tag":

            this.tagindex = data;
            break;

        case "reg":

            // fastupdate isn't supported by import

            this.fastupdate = !1;
            this.register = data;

            for (let i = 0, index; i < this.field.length; i++) {

                index = this.index[this.field[i]];
                index.register = data;
                index.fastupdate = !1;
            }

            break;

        case "store":

            this.store = data;
            break;

        default:

            key = key.split(".");
            const field = key[0];
            key = key[1];

            if (field && key) {

                this.index[field].import(key, data);
            }
    }
}

/***/ }),

/***/ "./node_modules/flexsearch/dist/module/type.js":
/*!*****************************************************!*\
  !*** ./node_modules/flexsearch/dist/module/type.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DocumentInterface: () => (/* binding */ DocumentInterface),
/* harmony export */   IndexInterface: () => (/* binding */ IndexInterface)
/* harmony export */ });
/**
 * @interface
 */

function IndexInterface() {

  this.cache = null;
  this.matcher = null;
  this.stemmer = null;
  this.filter = null;
}

/**
 * @param {!string} str
 * @param {boolean|Array<string|RegExp>=} normalize
 * @param {boolean|string|RegExp=} split
 * @param {boolean=} collapse
 * @returns {string|Array<string>}
 */

//IndexInterface.prototype.pipeline;

/**
 * @param {!number|string} id
 * @param {!string} content
 */

IndexInterface.prototype.add;

/**
 * @param {!number|string} id
 * @param {!string} content
 */

IndexInterface.prototype.append;

/**
 * @param {!string|Object} query
 * @param {number|Object=} limit
 * @param {Object=} options
 * @returns {Array<number|string>}
 */

IndexInterface.prototype.search;

/**
 * @param {!number|string} id
 * @param {!string} content
 */

IndexInterface.prototype.update;

/**
 * @param {!number|string} id
 */

IndexInterface.prototype.remove;

/**
 * @interface
 */

function DocumentInterface() {

  this.field = null;

  /** @type IndexInterface */
  this.index = null;
}

/***/ }),

/***/ "./node_modules/flexsearch/dist/module/worker/handler.js":
/*!***************************************************************!*\
  !*** ./node_modules/flexsearch/dist/module/worker/handler.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ "./node_modules/flexsearch/dist/module/index.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(data) {

            data = data.data;

            /** @type Index */
            const index = self._index,
                  args = data.args,
                  task = data.task;


            switch (task) {

                        case "init":
                                    const options = data.options || {},
                                          factory = data.factory,
                                          encode = options.encode;


                                    options.cache = /* normalize: */ /* collapse: */ /* normalize: */

                                    /* collapse: */ /* normalize: */ /* collapse: */ /* normalize: */ /* collapse: */ /* collapse: */!1;

                                    if (encode && 0 === encode.indexOf("function")) {
                                                options.encode = Function("return " + encode)();
                                    }

                                    if (factory) {

                                                // export the FlexSearch global payload to "self"
                                                Function("return " + factory)()(self);

                                                /** @type Index */
                                                self._index = new self.FlexSearch.Index(options);

                                                // destroy the exported payload
                                                delete self.FlexSearch;
                                    } else {

                                                self._index = new _index_js__WEBPACK_IMPORTED_MODULE_0__["default"](options);
                                    }

                                    break;

                        default:
                                    const id = data.id,
                                          message = index[task].apply(index, args);

                                    postMessage("search" === task ? { id: id, msg: message } : { id: id });
            }
}

/***/ }),

/***/ "./node_modules/flexsearch/dist/module/worker/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/flexsearch/dist/module/worker/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common.js */ "./node_modules/flexsearch/dist/module/common.js");
/* harmony import */ var _handler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handler.js */ "./node_modules/flexsearch/dist/module/worker/handler.js");
//import { promise as Promise } from "../polyfill.js";



let pid = 0;

/**
 * @param {Object=} options
 * @constructor
 */

function WorkerIndex(options) {

    if (!(this instanceof WorkerIndex)) {

        return new WorkerIndex(options);
    }

    let opt;

    if (options) {

        if ((0,_common_js__WEBPACK_IMPORTED_MODULE_0__.is_function)(opt = options.encode)) {

            options.encode = opt.toString();
        }
    } else {

        options = {};
    }

    // the factory is the outer wrapper from the build
    // we use "self" as a trap for node.js

    let factory = (self || window)._factory;

    if (factory) {

        factory = factory.toString();
    }

    const is_node_js = "undefined" == typeof window && self.exports,
          _self = this;

    this.worker = create(factory, is_node_js, options.worker);
    this.resolver = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.create_object)();

    if (!this.worker) {

        return;
    }

    if (is_node_js) {

        this.worker.on("message", function (msg) {

            _self.resolver[msg.id](msg.msg);
            delete _self.resolver[msg.id];
        });
    } else {

        this.worker.onmessage = function (msg) {

            msg = msg.data;
            _self.resolver[msg.id](msg.msg);
            delete _self.resolver[msg.id];
        };
    }

    this.worker.postMessage({

        task: "init",
        factory: factory,
        options: options
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WorkerIndex);

register("add");
register("append");
register("search");
register("update");
register("remove");

function register(key) {

    WorkerIndex.prototype[key] = WorkerIndex.prototype[key + "Async"] = function () {
        const self = this,
              args = [].slice.call(arguments),
              arg = args[args.length - 1];

        let callback;

        if ((0,_common_js__WEBPACK_IMPORTED_MODULE_0__.is_function)(arg)) {

            callback = arg;
            args.splice(args.length - 1, 1);
        }

        const promise = new Promise(function (resolve) {

            setTimeout(function () {

                self.resolver[++pid] = resolve;
                self.worker.postMessage({

                    task: key,
                    id: pid,
                    args: args
                });
            });
        });

        if (callback) {

            promise.then(callback);
            return this;
        } else {

            return promise;
        }
    };
}

function create(factory, is_node_js, worker_path) {

    let worker;

    try {

        worker = is_node_js ? eval('new (require("worker_threads")["Worker"])(__dirname + "/node/node.js")') : factory ? new Worker(URL.createObjectURL(new Blob(["onmessage=" + _handler_js__WEBPACK_IMPORTED_MODULE_1__["default"].toString()], { type: "text/javascript" }))) : new Worker((0,_common_js__WEBPACK_IMPORTED_MODULE_0__.is_string)(worker_path) ? worker_path : "worker/worker.js", { type: "module" });
    } catch (e) {}

    return worker;
}

/***/ }),

/***/ "./src/app/app.ts":
/*!************************!*\
  !*** ./src/app/app.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppConfig: () => (/* binding */ AppConfig)
/* harmony export */ });
/* harmony import */ var _search_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../search/service */ "./src/search/service.ts");
/* harmony import */ var _search_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../search/app */ "./src/search/app.ts");


class AppConfig extends Application {
    constructor() {
        super({});
        this.searchButtonHTML = `
    <a class='character-search-icon-button'><i class="fa-solid fa-fw fa-search"></i></a>
  `;
        this.searchService = new _search_service__WEBPACK_IMPORTED_MODULE_0__.SearchService(this.log);
    }
    log(...args) {
        console.log('CharacterSearch |', ...args);
    }
    static get defaultOptions() {
        const defaults = super.defaultOptions;
        const overrides = {
            id: this.appId,
            title: 'Character Search',
            character: null,
        };
        const mergedOptions = foundry.utils.mergeObject(defaults, overrides);
        return mergedOptions;
    }
    onSheetRender(html, actor) {
        const characterDetails = html.find(`h4.window-title`);
        characterDetails.append(this.searchButtonHTML);
        this.log('Loading character', actor);
        this.searchService.loadCharacter(actor);
        html.on('click', '.character-search-icon-button', (_) => {
            const newWindow = new _search_app__WEBPACK_IMPORTED_MODULE_1__.SearchAppConfig(actor, this.searchService, this.log);
            newWindow.render(true, { character: actor });
        });
    }
}
AppConfig.appId = 'foundry-pathfinder-character-search';


/***/ }),

/***/ "./src/search/app.ts":
/*!***************************!*\
  !*** ./src/search/app.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchAppConfig: () => (/* binding */ SearchAppConfig)
/* harmony export */ });
class SearchAppConfig extends FormApplication {
    constructor(character, searchService, log) {
        super({});
        this.query = '';
        this.searchService = searchService;
        this.log = log;
        this.character = character;
    }
    static get defaultOptions() {
        const defaults = super.defaultOptions;
        const overrides = {
            height: 600,
            width: 600,
            id: this.searchAppId,
            template: `modules/${this.searchAppId}/templates/search-window.hbs`,
            title: 'Character Search',
            submitOnChange: true,
            closeOnSubmit: false,
        };
        const mergedOptions = foundry.utils.mergeObject(defaults, overrides);
        return mergedOptions;
    }
    async _updateObject(event) {
        if (event.type == "submit") {
            this.query = event.target[0].value;
            this.render();
        }
    }
    async getData() {
        const searchResults = this.searchService
            .searchCharacter(this.character.actor._id, this.query)
            .sort((a, b) => a.order - b.order)
            .map(async (result) => {
            return {
                ...result,
                enrichedDescription: await TextEditor.enrichHTML(result.doc.description),
            };
        });
        this.log('get data', searchResults);
        return {
            character: this.character,
            results: await Promise.all(searchResults),
        };
    }
    activateListeners(html) {
        html.on('click', '.character-search-result .title', (event) => {
            // Get the clicked element
            const title = $(event.target);
            // Find the sibling description div and toggle the 'open' class
            title.siblings('.description').toggleClass('open');
        });
    }
}
SearchAppConfig.searchAppId = 'foundry-pathfinder-character-search';


/***/ }),

/***/ "./src/search/service.ts":
/*!*******************************!*\
  !*** ./src/search/service.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchService: () => (/* binding */ SearchService)
/* harmony export */ });
/* harmony import */ var flexsearch_dist_module_document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flexsearch/dist/module/document */ "./node_modules/flexsearch/dist/module/document.js");

class SearchService {
    constructor(logger) {
        this.indexes = {};
        this.log = logger;
    }
    loadCharacter(character) {
        this.indexes[character.actor._id] = new flexsearch_dist_module_document__WEBPACK_IMPORTED_MODULE_0__["default"]({
            document: {
                id: 'id',
                tag: 'type',
                index: ['title', 'description'],
                store: true
            }
        });
        character.items.map((item) => {
            this.indexes[character.actor._id].add({
                id: item._id,
                type: item.type,
                title: item.name,
                description: this.extractTextFromItem(item)
            });
        });
    }
    extractTextFromItem(item) {
        var _a, _b;
        const parser = new DOMParser();
        let description = ((_b = (_a = item === null || item === void 0 ? void 0 : item.system) === null || _a === void 0 ? void 0 : _a.description) === null || _b === void 0 ? void 0 : _b.value) || '';
        if (description) {
            const doc = parser.parseFromString('<body>' + description + '</body>', 'text/html');
            description = doc.body.innerText;
        }
        if (!description) {
            this.log('No description found for item', item);
        }
        return description;
    }
    searchCharacter(characterId, query) {
        if (!this.indexes[characterId]) {
            this.log('No index found for character', characterId);
            return [];
        }
        const results = this.indexes[characterId].search(query, { enrich: true });
        this.log('Search results', results);
        return this.flattenSearchResults(results);
    }
    flattenSearchResults(results) {
        const flattenedSearchResults = [];
        results.map((resultByField) => {
            resultByField.result.map((searchResult) => {
                const existingResult = flattenedSearchResults.find((result) => result.id === searchResult.id);
                if (existingResult) {
                    if (!existingResult.fields.includes(resultByField.field)) {
                        existingResult.fields.push(resultByField.field);
                    }
                }
                else {
                    flattenedSearchResults.push({
                        id: searchResult.id,
                        fields: [resultByField.field],
                        order: resultByField.field === 'title' ? 0 : 1,
                        doc: searchResult.doc
                    });
                }
            });
        });
        return flattenedSearchResults;
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app */ "./src/app/app.ts");

let app;
Hooks.once('init', () => {
    app = new _app_app__WEBPACK_IMPORTED_MODULE_0__.AppConfig();
});
Hooks.on('renderCharacterSheetPF2e', (_, html, data) => {
    app.onSheetRender(html, data);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDdEIsR0FBRyxHQUFHLElBQUksK0NBQVMsRUFBRSxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBRUgsS0FBSyxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDdEQsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL25vZGVfbW9kdWxlcy9mbGV4c2VhcmNoL2Rpc3QvbW9kdWxlL2FzeW5jLmpzIiwid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoLy4vbm9kZV9tb2R1bGVzL2ZsZXhzZWFyY2gvZGlzdC9tb2R1bGUvY2FjaGUuanMiLCJ3ZWJwYWNrOi8vZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gvLi9ub2RlX21vZHVsZXMvZmxleHNlYXJjaC9kaXN0L21vZHVsZS9jb21tb24uanMiLCJ3ZWJwYWNrOi8vZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gvLi9ub2RlX21vZHVsZXMvZmxleHNlYXJjaC9kaXN0L21vZHVsZS9kb2N1bWVudC5qcyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL25vZGVfbW9kdWxlcy9mbGV4c2VhcmNoL2Rpc3QvbW9kdWxlL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL25vZGVfbW9kdWxlcy9mbGV4c2VhcmNoL2Rpc3QvbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoLy4vbm9kZV9tb2R1bGVzL2ZsZXhzZWFyY2gvZGlzdC9tb2R1bGUvaW50ZXJzZWN0LmpzIiwid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoLy4vbm9kZV9tb2R1bGVzL2ZsZXhzZWFyY2gvZGlzdC9tb2R1bGUvbGFuZy5qcyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL25vZGVfbW9kdWxlcy9mbGV4c2VhcmNoL2Rpc3QvbW9kdWxlL2xhbmcvbGF0aW4vZGVmYXVsdC5qcyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL25vZGVfbW9kdWxlcy9mbGV4c2VhcmNoL2Rpc3QvbW9kdWxlL3ByZXNldC5qcyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL25vZGVfbW9kdWxlcy9mbGV4c2VhcmNoL2Rpc3QvbW9kdWxlL3NlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL25vZGVfbW9kdWxlcy9mbGV4c2VhcmNoL2Rpc3QvbW9kdWxlL3R5cGUuanMiLCJ3ZWJwYWNrOi8vZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gvLi9ub2RlX21vZHVsZXMvZmxleHNlYXJjaC9kaXN0L21vZHVsZS93b3JrZXIvaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL25vZGVfbW9kdWxlcy9mbGV4c2VhcmNoL2Rpc3QvbW9kdWxlL3dvcmtlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL3NyYy9hcHAvYXBwLnRzIiwid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoLy4vc3JjL3NlYXJjaC9hcHAudHMiLCJ3ZWJwYWNrOi8vZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gvLi9zcmMvc2VhcmNoL3NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmRleEludGVyZmFjZSwgRG9jdW1lbnRJbnRlcmZhY2UgfSBmcm9tIFwiLi90eXBlLmpzXCI7XG4vL2ltcG9ydCB7IHByb21pc2UgYXMgUHJvbWlzZSB9IGZyb20gXCIuL3BvbHlmaWxsLmpzXCI7XG5pbXBvcnQgeyBpc19mdW5jdGlvbiwgaXNfb2JqZWN0LCBpc19zdHJpbmcgfSBmcm9tIFwiLi9jb21tb24uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3RvdHlwZSkge1xuXG4gICAgcmVnaXN0ZXIocHJvdG90eXBlLCBcImFkZFwiKTtcbiAgICByZWdpc3Rlcihwcm90b3R5cGUsIFwiYXBwZW5kXCIpO1xuICAgIHJlZ2lzdGVyKHByb3RvdHlwZSwgXCJzZWFyY2hcIik7XG4gICAgcmVnaXN0ZXIocHJvdG90eXBlLCBcInVwZGF0ZVwiKTtcbiAgICByZWdpc3Rlcihwcm90b3R5cGUsIFwicmVtb3ZlXCIpO1xufVxuXG5mdW5jdGlvbiByZWdpc3Rlcihwcm90b3R5cGUsIGtleSkge1xuXG4gICAgcHJvdG90eXBlW2tleSArIFwiQXN5bmNcIl0gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmRleEludGVyZmFjZXxEb2N1bWVudEludGVyZmFjZX0gKi9cbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICAgIGFyZ3MgPSAvKltdLnNsaWNlLmNhbGwqL2FyZ3VtZW50cyxcbiAgICAgICAgICAgICAgYXJnID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIGxldCBjYWxsYmFjaztcblxuICAgICAgICBpZiAoaXNfZnVuY3Rpb24oYXJnKSkge1xuXG4gICAgICAgICAgICBjYWxsYmFjayA9IGFyZztcbiAgICAgICAgICAgIGRlbGV0ZSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBzZWxmLmFzeW5jID0gITA7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzID0gc2VsZltrZXldLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHNlbGYuYXN5bmMgPSAhMTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG5cbiAgICAgICAgICAgIHByb21pc2UudGhlbihjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgIH1cbiAgICB9O1xufSIsImltcG9ydCB7IEluZGV4SW50ZXJmYWNlLCBEb2N1bWVudEludGVyZmFjZSB9IGZyb20gXCIuL3R5cGUuanNcIjtcbmltcG9ydCB7IGNyZWF0ZV9vYmplY3QsIGlzX29iamVjdCB9IGZyb20gXCIuL2NvbW1vbi5qc1wiO1xuXG4vKipcclxuICogQHBhcmFtIHtib29sZWFufG51bWJlcj19IGxpbWl0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cblxuZnVuY3Rpb24gQ2FjaGVDbGFzcyhsaW1pdCkge1xuXG4gICAgLyoqIEBwcml2YXRlICovXG4gICAgdGhpcy5saW1pdCA9ICEwICE9PSBsaW1pdCAmJiBsaW1pdDtcblxuICAgIC8qKiBAcHJpdmF0ZSAqL1xuICAgIHRoaXMuY2FjaGUgPSBjcmVhdGVfb2JqZWN0KCk7XG5cbiAgICAvKiogQHByaXZhdGUgKi9cbiAgICB0aGlzLnF1ZXVlID0gW107XG5cbiAgICAvL3RoaXMuY2xlYXIoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FjaGVDbGFzcztcblxuLyoqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gcXVlcnlcclxuICogQHBhcmFtIHtudW1iZXJ8T2JqZWN0PX0gbGltaXRcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEB0aGlzIHtJbmRleEludGVyZmFjZX1cclxuICogQHJldHVybnMge0FycmF5PG51bWJlcnxzdHJpbmc+fVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaENhY2hlKHF1ZXJ5LCBsaW1pdCwgb3B0aW9ucykge1xuXG4gICAgaWYgKGlzX29iamVjdChxdWVyeSkpIHtcblxuICAgICAgICBxdWVyeSA9IHF1ZXJ5LnF1ZXJ5O1xuICAgIH1cblxuICAgIGxldCBjYWNoZSA9IHRoaXMuY2FjaGUuZ2V0KHF1ZXJ5KTtcblxuICAgIGlmICghY2FjaGUpIHtcblxuICAgICAgICBjYWNoZSA9IHRoaXMuc2VhcmNoKHF1ZXJ5LCBsaW1pdCwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY2FjaGUuc2V0KHF1ZXJ5LCBjYWNoZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhY2hlO1xufVxuXG4vLyBDYWNoZUNsYXNzLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XG4vL1xuLy8gICAgIC8qKiBAcHJpdmF0ZSAqL1xuLy8gICAgIHRoaXMuY2FjaGUgPSBjcmVhdGVfb2JqZWN0KCk7XG4vL1xuLy8gICAgIC8qKiBAcHJpdmF0ZSAqL1xuLy8gICAgIHRoaXMucXVldWUgPSBbXTtcbi8vIH07XG5cbkNhY2hlQ2xhc3MucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cbiAgICBpZiAoIXRoaXMuY2FjaGVba2V5XSkge1xuXG4gICAgICAgIC8vIGl0IGlzIGp1c3QgYSBzaGFtZSB0aGF0IG5hdGl2ZSBmdW5jdGlvbiBhcnJheS5zaGlmdCgpIHBlcmZvcm1zIHNvIGJhZFxuXG4gICAgICAgIC8vIGNvbnN0IGxlbmd0aCA9IHRoaXMucXVldWUubGVuZ3RoO1xuICAgICAgICAvL1xuICAgICAgICAvLyB0aGlzLnF1ZXVlW2xlbmd0aF0gPSBrZXk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGlmKGxlbmd0aCA9PT0gdGhpcy5saW1pdCl7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICBkZWxldGUgdGhpcy5jYWNoZVt0aGlzLnF1ZXVlLnNoaWZ0KCldO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gdGhlIHNhbWUgYmFkIHBlcmZvcm1hbmNlXG5cbiAgICAgICAgLy8gdGhpcy5xdWV1ZS51bnNoaWZ0KGtleSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGlmKHRoaXMucXVldWUubGVuZ3RoID09PSB0aGlzLmxpbWl0KXtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIHRoaXMucXVldWUucG9wKCk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyBmYXN0IGltcGxlbWVudGF0aW9uIHZhcmlhbnRcblxuICAgICAgICAvLyBsZXQgbGVuZ3RoID0gdGhpcy5xdWV1ZS5sZW5ndGg7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGlmKGxlbmd0aCA9PT0gdGhpcy5saW1pdCl7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICBsZW5ndGgtLTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIGRlbGV0ZSB0aGlzLmNhY2hlW3RoaXMucXVldWVbMF1dO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgZm9yKGxldCB4ID0gMDsgeCA8IGxlbmd0aDsgeCsrKXtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgICB0aGlzLnF1ZXVlW3hdID0gdGhpcy5xdWV1ZVt4ICsgMV07XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gdGhpcy5xdWV1ZVtsZW5ndGhdID0ga2V5O1xuXG4gICAgICAgIC8vIGN1cnJlbnQgZmFzdGVzdCBpbXBsZW1lbnRhdGlvbiB2YXJpYW50XG4gICAgICAgIC8vIHRoZW9yZXRpY2FsbHkgdGhhdCBzaG91bGQgbm90IHBlcmZvcm0gYmV0dGVyIGNvbXBhcmVkIHRvIHRoZSBleGFtcGxlIGFib3ZlXG5cbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMucXVldWUubGVuZ3RoO1xuXG4gICAgICAgIGlmIChsZW5ndGggPT09IHRoaXMubGltaXQpIHtcblxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2FjaGVbdGhpcy5xdWV1ZVtsZW5ndGggLSAxXV07XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGxlbmd0aCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgeCA9IGxlbmd0aCAtIDE7IDAgPCB4OyB4LS0pIHtcblxuICAgICAgICAgICAgdGhpcy5xdWV1ZVt4XSA9IHRoaXMucXVldWVbeCAtIDFdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5xdWV1ZVswXSA9IGtleTtcbiAgICB9XG5cbiAgICB0aGlzLmNhY2hlW2tleV0gPSB2YWx1ZTtcbn07XG5cbkNhY2hlQ2xhc3MucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcblxuICAgIGNvbnN0IGNhY2hlID0gdGhpcy5jYWNoZVtrZXldO1xuXG4gICAgaWYgKHRoaXMubGltaXQgJiYgY2FjaGUpIHtcblxuICAgICAgICAvLyBwcm9iYWJseSB0aGUgaW5kZXhPZigpIG1ldGhvZCBwZXJmb3JtcyBmYXN0ZXIgd2hlbiBtYXRjaGVkIGNvbnRlbnQgaXMgb24gZnJvbnQgKGxlZnQtdG8tcmlnaHQpXG4gICAgICAgIC8vIHVzaW5nIGxhc3RJbmRleE9mKCkgZG9lcyBub3QgaGVscCwgaXQgcGVyZm9ybXMgYWxtb3N0IHNsb3dlclxuXG4gICAgICAgIGNvbnN0IHBvcyA9IHRoaXMucXVldWUuaW5kZXhPZihrZXkpO1xuXG4gICAgICAgIC8vIGlmKHBvcyA8IHRoaXMucXVldWUubGVuZ3RoIC0gMSl7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICBjb25zdCB0bXAgPSB0aGlzLnF1ZXVlW3Bvc107XG4gICAgICAgIC8vICAgICB0aGlzLnF1ZXVlW3Bvc10gPSB0aGlzLnF1ZXVlW3BvcyArIDFdO1xuICAgICAgICAvLyAgICAgdGhpcy5xdWV1ZVtwb3MgKyAxXSA9IHRtcDtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGlmIChwb3MpIHtcblxuICAgICAgICAgICAgY29uc3QgdG1wID0gdGhpcy5xdWV1ZVtwb3MgLSAxXTtcbiAgICAgICAgICAgIHRoaXMucXVldWVbcG9zIC0gMV0gPSB0aGlzLnF1ZXVlW3Bvc107XG4gICAgICAgICAgICB0aGlzLnF1ZXVlW3Bvc10gPSB0bXA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2FjaGU7XG59O1xuXG5DYWNoZUNsYXNzLnByb3RvdHlwZS5kZWwgPSBmdW5jdGlvbiAoaWQpIHtcblxuICAgIGZvciAobGV0IGkgPSAwLCBpdGVtLCBrZXk7IGkgPCB0aGlzLnF1ZXVlLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAga2V5ID0gdGhpcy5xdWV1ZVtpXTtcbiAgICAgICAgaXRlbSA9IHRoaXMuY2FjaGVba2V5XTtcblxuICAgICAgICBpZiAoaXRlbS5pbmNsdWRlcyhpZCkpIHtcblxuICAgICAgICAgICAgdGhpcy5xdWV1ZS5zcGxpY2UoaS0tLCAxKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlW2tleV07XG4gICAgICAgIH1cbiAgICB9XG59OyIsImV4cG9ydCBmdW5jdGlvbiBwYXJzZV9vcHRpb24odmFsdWUsIGRlZmF1bHRfdmFsdWUpIHtcblxuICAgIHJldHVybiBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiB2YWx1ZSA/IHZhbHVlIDogZGVmYXVsdF92YWx1ZTtcbn1cblxuLyoqXHJcbiAqIEBwYXJhbSB7IW51bWJlcn0gY291bnRcclxuICogQHJldHVybnMge0FycmF5PE9iamVjdD59XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlX29iamVjdF9hcnJheShjb3VudCkge1xuXG4gICAgY29uc3QgYXJyYXkgPSBBcnJheShjb3VudCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcblxuICAgICAgICBhcnJheVtpXSA9IGNyZWF0ZV9vYmplY3QoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVfYXJyYXlzKGNvdW50KSB7XG5cbiAgICBjb25zdCBhcnJheSA9IEFycmF5KGNvdW50KTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuXG4gICAgICAgIGFycmF5W2ldID0gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcclxuICogQHBhcmFtIHshT2JqZWN0fSBvYmpcclxuICogQHJldHVybnMge0FycmF5PHN0cmluZz59XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0X2tleXMob2JqKSB7XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV9vYmplY3QoKSB7XG5cbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdChhcnJheXMpIHtcblxuICAgIHJldHVybiBbXS5jb25jYXQuYXBwbHkoW10sIGFycmF5cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0X2J5X2xlbmd0aF9kb3duKGEsIGIpIHtcblxuICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNfYXJyYXkodmFsKSB7XG5cbiAgICByZXR1cm4gdmFsLmNvbnN0cnVjdG9yID09PSBBcnJheTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzX3N0cmluZyh2YWwpIHtcblxuICAgIHJldHVybiBcInN0cmluZ1wiID09IHR5cGVvZiB2YWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc19vYmplY3QodmFsKSB7XG5cbiAgICByZXR1cm4gXCJvYmplY3RcIiA9PSB0eXBlb2YgdmFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNfZnVuY3Rpb24odmFsKSB7XG5cbiAgICByZXR1cm4gXCJmdW5jdGlvblwiID09IHR5cGVvZiB2YWw7XG59IiwiLyoqIVxyXG4gKiBGbGV4U2VhcmNoLmpzXHJcbiAqIEF1dGhvciBhbmQgQ29weXJpZ2h0OiBUaG9tYXMgV2lsa2VybGluZ1xyXG4gKiBMaWNlbmNlOiBBcGFjaGUtMi4wXHJcbiAqIEhvc3RlZCBieSBOZXh0YXBwcyBHbWJIXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9uZXh0YXBwcy1kZS9mbGV4c2VhcmNoXHJcbiAqL1xuXG5pbXBvcnQgSW5kZXggZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCB7IERvY3VtZW50SW50ZXJmYWNlIH0gZnJvbSBcIi4vdHlwZS5qc1wiO1xuaW1wb3J0IENhY2hlLCB7IHNlYXJjaENhY2hlIH0gZnJvbSBcIi4vY2FjaGUuanNcIjtcbmltcG9ydCB7IGNyZWF0ZV9vYmplY3QsIGlzX2FycmF5LCBpc19zdHJpbmcsIGlzX29iamVjdCwgcGFyc2Vfb3B0aW9uLCBnZXRfa2V5cyB9IGZyb20gXCIuL2NvbW1vbi5qc1wiO1xuaW1wb3J0IGFwcGx5X2FzeW5jIGZyb20gXCIuL2FzeW5jLmpzXCI7XG5pbXBvcnQgeyBpbnRlcnNlY3QsIGludGVyc2VjdF91bmlvbiB9IGZyb20gXCIuL2ludGVyc2VjdC5qc1wiO1xuaW1wb3J0IHsgZXhwb3J0RG9jdW1lbnQsIGltcG9ydERvY3VtZW50IH0gZnJvbSBcIi4vc2VyaWFsaXplLmpzXCI7XG5pbXBvcnQgV29ya2VySW5kZXggZnJvbSBcIi4vd29ya2VyL2luZGV4LmpzXCI7XG5cbi8qKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQGltcGxlbWVudHMge0RvY3VtZW50SW50ZXJmYWNlfVxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQHJldHVybiB7RG9jdW1lbnR9XHJcbiAqL1xuXG5mdW5jdGlvbiBEb2N1bWVudChvcHRpb25zKSB7XG5cbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRG9jdW1lbnQpKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBEb2N1bWVudChvcHRpb25zKTtcbiAgICB9XG5cbiAgICBjb25zdCBkb2N1bWVudCA9IG9wdGlvbnMuZG9jdW1lbnQgfHwgb3B0aW9ucy5kb2MgfHwgb3B0aW9ucztcbiAgICBsZXQgb3B0O1xuXG4gICAgdGhpcy50cmVlID0gW107XG4gICAgdGhpcy5maWVsZCA9IFtdO1xuICAgIHRoaXMubWFya2VyID0gW107XG4gICAgdGhpcy5yZWdpc3RlciA9IGNyZWF0ZV9vYmplY3QoKTtcbiAgICB0aGlzLmtleSA9IChvcHQgPSBkb2N1bWVudC5rZXkgfHwgZG9jdW1lbnQuaWQpICYmIHBhcnNlX3RyZWUob3B0LCB0aGlzLm1hcmtlcikgfHwgXCJpZFwiO1xuICAgIHRoaXMuZmFzdHVwZGF0ZSA9IHBhcnNlX29wdGlvbihvcHRpb25zLmZhc3R1cGRhdGUsIC8qIGFwcGVuZDogKi8gLyogc2tpcCB1cGRhdGU6ICovIC8qIHNraXBfdXBkYXRlOiAqLyEwKTtcblxuICAgIHRoaXMuc3RvcmV0cmVlID0gKG9wdCA9IGRvY3VtZW50LnN0b3JlKSAmJiAhMCAhPT0gb3B0ICYmIFtdO1xuICAgIHRoaXMuc3RvcmUgPSBvcHQgJiYgY3JlYXRlX29iamVjdCgpO1xuXG5cbiAgICAvLyBUT0RPIGNhc2UtaW5zZW5zaXRpdmUgdGFnc1xuXG4gICAgdGhpcy50YWcgPSAob3B0ID0gZG9jdW1lbnQudGFnKSAmJiBwYXJzZV90cmVlKG9wdCwgdGhpcy5tYXJrZXIpO1xuICAgIHRoaXMudGFnaW5kZXggPSBvcHQgJiYgY3JlYXRlX29iamVjdCgpO1xuXG5cbiAgICB0aGlzLmNhY2hlID0gKG9wdCA9IG9wdGlvbnMuY2FjaGUpICYmIG5ldyBDYWNoZShvcHQpO1xuXG4gICAgLy8gZG8gbm90IGFwcGx5IGNhY2hlIGFnYWluIGZvciB0aGUgaW5kZXhlc1xuXG4gICAgb3B0aW9ucy5jYWNoZSA9ICExO1xuXG5cbiAgICB0aGlzLndvcmtlciA9IG9wdGlvbnMud29ya2VyO1xuXG5cbiAgICAvLyB0aGlzIHN3aXRjaCBpcyB1c2VkIGJ5IHJlY2FsbCBvZiBwcm9taXNlIGNhbGxiYWNrc1xuXG4gICAgdGhpcy5hc3luYyA9ICExO1xuXG4gICAgLyoqIEBleHBvcnQgKi9cbiAgICB0aGlzLmluZGV4ID0gcGFyc2VfZGVzY3JpcHRvci5jYWxsKHRoaXMsIG9wdGlvbnMsIGRvY3VtZW50KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgRG9jdW1lbnQ7XG5cbi8qKlxyXG4gKiBAdGhpcyBEb2N1bWVudFxyXG4gKi9cblxuZnVuY3Rpb24gcGFyc2VfZGVzY3JpcHRvcihvcHRpb25zLCBkb2N1bWVudCkge1xuXG4gICAgY29uc3QgaW5kZXggPSBjcmVhdGVfb2JqZWN0KCk7XG4gICAgbGV0IGZpZWxkID0gZG9jdW1lbnQuaW5kZXggfHwgZG9jdW1lbnQuZmllbGQgfHwgZG9jdW1lbnQ7XG5cbiAgICBpZiAoaXNfc3RyaW5nKGZpZWxkKSkge1xuXG4gICAgICAgIGZpZWxkID0gW2ZpZWxkXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMCwga2V5LCBvcHQ7IGkgPCBmaWVsZC5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGtleSA9IGZpZWxkW2ldO1xuXG4gICAgICAgIGlmICghaXNfc3RyaW5nKGtleSkpIHtcblxuICAgICAgICAgICAgb3B0ID0ga2V5O1xuICAgICAgICAgICAga2V5ID0ga2V5LmZpZWxkO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0ID0gaXNfb2JqZWN0KG9wdCkgPyBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCBvcHQpIDogb3B0aW9ucztcblxuICAgICAgICBpZiAodGhpcy53b3JrZXIpIHtcblxuICAgICAgICAgICAgaW5kZXhba2V5XSA9IG5ldyBXb3JrZXJJbmRleChvcHQpO1xuXG4gICAgICAgICAgICBpZiAoIWluZGV4W2tleV0ud29ya2VyKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLndvcmtlciA9ICExO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLndvcmtlcikge1xuXG4gICAgICAgICAgICBpbmRleFtrZXldID0gbmV3IEluZGV4KG9wdCwgdGhpcy5yZWdpc3Rlcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyZWVbaV0gPSBwYXJzZV90cmVlKGtleSwgdGhpcy5tYXJrZXIpO1xuICAgICAgICB0aGlzLmZpZWxkW2ldID0ga2V5O1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0b3JldHJlZSkge1xuXG4gICAgICAgIGxldCBzdG9yZSA9IGRvY3VtZW50LnN0b3JlO1xuXG4gICAgICAgIGlmIChpc19zdHJpbmcoc3RvcmUpKSB7XG5cbiAgICAgICAgICAgIHN0b3JlID0gW3N0b3JlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcmUubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgdGhpcy5zdG9yZXRyZWVbaV0gPSBwYXJzZV90cmVlKHN0b3JlW2ldLCB0aGlzLm1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIHBhcnNlX3RyZWUoa2V5LCBtYXJrZXIpIHtcblxuICAgIGNvbnN0IHRyZWUgPSBrZXkuc3BsaXQoXCI6XCIpO1xuICAgIGxldCBjb3VudCA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyZWUubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBrZXkgPSB0cmVlW2ldO1xuXG4gICAgICAgIGlmICgwIDw9IGtleS5pbmRleE9mKFwiW11cIikpIHtcblxuICAgICAgICAgICAga2V5ID0ga2V5LnN1YnN0cmluZygwLCBrZXkubGVuZ3RoIC0gMik7XG5cbiAgICAgICAgICAgIGlmIChrZXkpIHtcblxuICAgICAgICAgICAgICAgIG1hcmtlcltjb3VudF0gPSAhMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkpIHtcblxuICAgICAgICAgICAgdHJlZVtjb3VudCsrXSA9IGtleTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb3VudCA8IHRyZWUubGVuZ3RoKSB7XG5cbiAgICAgICAgdHJlZS5sZW5ndGggPSBjb3VudDtcbiAgICB9XG5cbiAgICByZXR1cm4gMSA8IGNvdW50ID8gdHJlZSA6IHRyZWVbMF07XG59XG5cbi8vIFRPRE8gc3VwcG9ydCBnZW5lcmljIGZ1bmN0aW9uIGNyZWF0ZWQgZnJvbSBzdHJpbmcgd2hlbiB0cmVlIGRlcHRoID4gMVxuXG5mdW5jdGlvbiBwYXJzZV9zaW1wbGUob2JqLCB0cmVlKSB7XG5cbiAgICBpZiAoaXNfc3RyaW5nKHRyZWUpKSB7XG5cbiAgICAgICAgb2JqID0gb2JqW3RyZWVdO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IG9iaiAmJiBpIDwgdHJlZS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBvYmogPSBvYmpbdHJlZVtpXV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufVxuXG4vLyBUT0RPIHN1cHBvcnQgZ2VuZXJpYyBmdW5jdGlvbiBjcmVhdGVkIGZyb20gc3RyaW5nIHdoZW4gdHJlZSBkZXB0aCA+IDFcblxuZnVuY3Rpb24gc3RvcmVfdmFsdWUob2JqLCBzdG9yZSwgdHJlZSwgcG9zLCBrZXkpIHtcblxuICAgIG9iaiA9IG9ialtrZXldO1xuXG4gICAgLy8gcmVhY2hlZCB0YXJnZXQgZmllbGRcblxuICAgIGlmIChwb3MgPT09IHRyZWUubGVuZ3RoIC0gMSkge1xuXG4gICAgICAgIC8vIHN0b3JlIHRhcmdldCB2YWx1ZVxuXG4gICAgICAgIHN0b3JlW2tleV0gPSBvYmo7XG4gICAgfSBlbHNlIGlmIChvYmopIHtcblxuICAgICAgICBpZiAoaXNfYXJyYXkob2JqKSkge1xuXG4gICAgICAgICAgICBzdG9yZSA9IHN0b3JlW2tleV0gPSBBcnJheShvYmoubGVuZ3RoKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBpbmNyZWFzZSBwb3MgKGFuIGFycmF5IGlzIG5vdCBhIGZpZWxkKVxuICAgICAgICAgICAgICAgIHN0b3JlX3ZhbHVlKG9iaiwgc3RvcmUsIHRyZWUsIHBvcywgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHN0b3JlID0gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IGNyZWF0ZV9vYmplY3QoKSk7XG4gICAgICAgICAgICBrZXkgPSB0cmVlWysrcG9zXTtcblxuICAgICAgICAgICAgc3RvcmVfdmFsdWUob2JqLCBzdG9yZSwgdHJlZSwgcG9zLCBrZXkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRfaW5kZXgob2JqLCB0cmVlLCBtYXJrZXIsIHBvcywgaW5kZXgsIGlkLCBrZXksIF9hcHBlbmQpIHtcblxuICAgIG9iaiA9IG9ialtrZXldO1xuXG4gICAgaWYgKG9iaikge1xuXG4gICAgICAgIC8vIHJlYWNoZWQgdGFyZ2V0IGZpZWxkXG5cbiAgICAgICAgaWYgKHBvcyA9PT0gdHJlZS5sZW5ndGggLSAxKSB7XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSB0YXJnZXQgdmFsdWVcblxuICAgICAgICAgICAgaWYgKGlzX2FycmF5KG9iaikpIHtcblxuICAgICAgICAgICAgICAgIC8vIGFwcGVuZCBhcnJheSBjb250ZW50cyBzbyBlYWNoIGVudHJ5IGdldHMgYSBuZXcgc2NvcmluZyBjb250ZXh0XG5cbiAgICAgICAgICAgICAgICBpZiAobWFya2VyW3Bvc10pIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleC5hZGQoaWQsIG9ialtpXSwgITAsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBvciBqb2luIGFycmF5IGNvbnRlbnRzIGFuZCB1c2Ugb25lIHNjb3JpbmcgY29udGV4dFxuXG4gICAgICAgICAgICAgICAgb2JqID0gb2JqLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbmRleC5hZGQoaWQsIG9iaiwgX2FwcGVuZCwgITApO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoaXNfYXJyYXkob2JqKSkge1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBkbyBub3QgaW5jcmVhc2UgaW5kZXgsIGFuIGFycmF5IGlzIG5vdCBhIGZpZWxkXG5cbiAgICAgICAgICAgICAgICAgICAgYWRkX2luZGV4KG9iaiwgdHJlZSwgbWFya2VyLCBwb3MsIGluZGV4LCBpZCwgaSwgX2FwcGVuZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGtleSA9IHRyZWVbKytwb3NdO1xuXG4gICAgICAgICAgICAgICAgYWRkX2luZGV4KG9iaiwgdHJlZSwgbWFya2VyLCBwb3MsIGluZGV4LCBpZCwga2V5LCBfYXBwZW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBpZFxyXG4gKiBAcGFyYW0gY29udGVudFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBfYXBwZW5kXHJcbiAqIEByZXR1cm5zIHtEb2N1bWVudHxQcm9taXNlfVxyXG4gKi9cblxuRG9jdW1lbnQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChpZCwgY29udGVudCwgX2FwcGVuZCkge1xuXG4gICAgaWYgKGlzX29iamVjdChpZCkpIHtcblxuICAgICAgICBjb250ZW50ID0gaWQ7XG4gICAgICAgIGlkID0gcGFyc2Vfc2ltcGxlKGNvbnRlbnQsIHRoaXMua2V5KTtcbiAgICB9XG5cbiAgICBpZiAoY29udGVudCAmJiAoaWQgfHwgMCA9PT0gaWQpKSB7XG5cbiAgICAgICAgaWYgKCFfYXBwZW5kICYmIHRoaXMucmVnaXN0ZXJbaWRdKSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZShpZCwgY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgdHJlZSwgZmllbGQ7IGkgPCB0aGlzLmZpZWxkLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGZpZWxkID0gdGhpcy5maWVsZFtpXTtcbiAgICAgICAgICAgIHRyZWUgPSB0aGlzLnRyZWVbaV07XG5cbiAgICAgICAgICAgIGlmIChpc19zdHJpbmcodHJlZSkpIHtcblxuICAgICAgICAgICAgICAgIHRyZWUgPSBbdHJlZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFkZF9pbmRleChjb250ZW50LCB0cmVlLCB0aGlzLm1hcmtlciwgMCwgdGhpcy5pbmRleFtmaWVsZF0sIGlkLCB0cmVlWzBdLCBfYXBwZW5kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRhZykge1xuICAgICAgICAgICAgbGV0IHRhZyA9IHBhcnNlX3NpbXBsZShjb250ZW50LCB0aGlzLnRhZyksXG4gICAgICAgICAgICAgICAgZHVwZXMgPSBjcmVhdGVfb2JqZWN0KCk7XG5cblxuICAgICAgICAgICAgaWYgKGlzX3N0cmluZyh0YWcpKSB7XG5cbiAgICAgICAgICAgICAgICB0YWcgPSBbdGFnXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGtleSwgYXJyOyBpIDwgdGFnLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBrZXkgPSB0YWdbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAoIWR1cGVzW2tleV0pIHtcblxuICAgICAgICAgICAgICAgICAgICBkdXBlc1trZXldID0gMTtcbiAgICAgICAgICAgICAgICAgICAgYXJyID0gdGhpcy50YWdpbmRleFtrZXldIHx8ICh0aGlzLnRhZ2luZGV4W2tleV0gPSBbXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfYXBwZW5kIHx8ICFhcnIuaW5jbHVkZXMoaWQpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFyclthcnIubGVuZ3RoXSA9IGlkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgYSByZWZlcmVuY2UgdG8gdGhlIHJlZ2lzdGVyIGZvciBmYXN0IHVwZGF0ZXNcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmFzdHVwZGF0ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG1wID0gdGhpcy5yZWdpc3RlcltpZF0gfHwgKHRoaXMucmVnaXN0ZXJbaWRdID0gW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcFt0bXAubGVuZ3RoXSA9IGFycjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE86IGhvdyB0byBoYW5kbGUgc3RvcmUgd2hlbiBhcHBlbmRpbmcgY29udGVudHM/XG5cbiAgICAgICAgaWYgKHRoaXMuc3RvcmUgJiYgKCFfYXBwZW5kIHx8ICF0aGlzLnN0b3JlW2lkXSkpIHtcblxuICAgICAgICAgICAgbGV0IHN0b3JlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zdG9yZXRyZWUpIHtcblxuICAgICAgICAgICAgICAgIHN0b3JlID0gY3JlYXRlX29iamVjdCgpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIHRyZWU7IGkgPCB0aGlzLnN0b3JldHJlZS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIHRyZWUgPSB0aGlzLnN0b3JldHJlZVtpXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNfc3RyaW5nKHRyZWUpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlW3RyZWVdID0gY29udGVudFt0cmVlXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmVfdmFsdWUoY29udGVudCwgc3RvcmUsIHRyZWUsIDAsIHRyZWVbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN0b3JlW2lkXSA9IHN0b3JlIHx8IGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbkRvY3VtZW50LnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiAoaWQsIGNvbnRlbnQpIHtcblxuICAgIHJldHVybiB0aGlzLmFkZChpZCwgY29udGVudCwgITApO1xufTtcblxuRG9jdW1lbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChpZCwgY29udGVudCkge1xuXG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlKGlkKS5hZGQoaWQsIGNvbnRlbnQpO1xufTtcblxuRG9jdW1lbnQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpZCkge1xuXG4gICAgaWYgKGlzX29iamVjdChpZCkpIHtcblxuICAgICAgICBpZCA9IHBhcnNlX3NpbXBsZShpZCwgdGhpcy5rZXkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlZ2lzdGVyW2lkXSkge1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5maWVsZC5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAvLyB3b3JrZXJzIGRvZXMgbm90IHNoYXJlIHRoZSByZWdpc3RlclxuXG4gICAgICAgICAgICB0aGlzLmluZGV4W3RoaXMuZmllbGRbaV1dLnJlbW92ZShpZCwgIXRoaXMud29ya2VyKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZmFzdHVwZGF0ZSkge1xuXG4gICAgICAgICAgICAgICAgLy8gd2hlbiBmYXN0dXBkYXRlIHdhcyBlbmFibGVkIGFsbCBpZHMgYXJlIHJlbW92ZWRcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGFnKSB7XG5cbiAgICAgICAgICAgIC8vIHdoZW4gZmFzdHVwZGF0ZSB3YXMgZW5hYmxlZCBhbGwgaWRzIGFyZSBhbHJlYWR5IHJlbW92ZWRcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmZhc3R1cGRhdGUpIHtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnRhZ2luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZyA9IHRoaXMudGFnaW5kZXhba2V5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gdGFnLmluZGV4T2YoaWQpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKC0xICE9PSBwb3MpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDEgPCB0YWcubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcuc3BsaWNlKHBvcywgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMudGFnaW5kZXhba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN0b3JlKSB7XG5cbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnN0b3JlW2lkXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSB0aGlzLnJlZ2lzdGVyW2lkXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxyXG4gKiBAcGFyYW0geyFzdHJpbmd8T2JqZWN0fSBxdWVyeVxyXG4gKiBAcGFyYW0ge251bWJlcnxPYmplY3Q9fSBsaW1pdFxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQHBhcmFtIHtBcnJheTxBcnJheT49fSBfcmVzb2x2ZSBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlfEFycmF5fVxyXG4gKi9cblxuRG9jdW1lbnQucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChxdWVyeSwgbGltaXQsIG9wdGlvbnMsIF9yZXNvbHZlKSB7XG5cbiAgICBpZiAoIW9wdGlvbnMpIHtcblxuICAgICAgICBpZiAoIWxpbWl0ICYmIGlzX29iamVjdChxdWVyeSkpIHtcblxuICAgICAgICAgICAgb3B0aW9ucyA9IC8qKiBAdHlwZSB7T2JqZWN0fSAqL3F1ZXJ5O1xuICAgICAgICAgICAgcXVlcnkgPSBcIlwiO1xuICAgICAgICB9IGVsc2UgaWYgKGlzX29iamVjdChsaW1pdCkpIHtcblxuICAgICAgICAgICAgb3B0aW9ucyA9IC8qKiBAdHlwZSB7T2JqZWN0fSAqL2xpbWl0O1xuICAgICAgICAgICAgbGltaXQgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IFtdLFxuICAgICAgICByZXN1bHRfZmllbGQgPSBbXSxcbiAgICAgICAgcGx1Y2ssXG4gICAgICAgIGVucmljaCxcbiAgICAgICAgZmllbGQsXG4gICAgICAgIHRhZyxcbiAgICAgICAgYm9vbCxcbiAgICAgICAgb2Zmc2V0LFxuICAgICAgICBjb3VudCA9IDA7XG5cblxuICAgIGlmIChvcHRpb25zKSB7XG5cbiAgICAgICAgaWYgKGlzX2FycmF5KG9wdGlvbnMpKSB7XG5cbiAgICAgICAgICAgIGZpZWxkID0gb3B0aW9ucztcbiAgICAgICAgICAgIG9wdGlvbnMgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBxdWVyeSA9IG9wdGlvbnMucXVlcnkgfHwgcXVlcnk7XG4gICAgICAgICAgICBwbHVjayA9IG9wdGlvbnMucGx1Y2s7XG4gICAgICAgICAgICBmaWVsZCA9IHBsdWNrIHx8IG9wdGlvbnMuaW5kZXggfHwgb3B0aW9ucy5maWVsZCAvKnx8IChpc19zdHJpbmcob3B0aW9ucykgJiYgW29wdGlvbnNdKSovO1xuICAgICAgICAgICAgdGFnID0gb3B0aW9ucy50YWc7XG4gICAgICAgICAgICBlbnJpY2ggPSB0aGlzLnN0b3JlICYmIG9wdGlvbnMuZW5yaWNoO1xuICAgICAgICAgICAgYm9vbCA9IFwiYW5kXCIgPT09IG9wdGlvbnMuYm9vbDtcbiAgICAgICAgICAgIGxpbWl0ID0gb3B0aW9ucy5saW1pdCB8fCBsaW1pdCB8fCAxMDA7XG4gICAgICAgICAgICBvZmZzZXQgPSBvcHRpb25zLm9mZnNldCB8fCAwO1xuXG4gICAgICAgICAgICBpZiAodGFnKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNfc3RyaW5nKHRhZykpIHtcblxuICAgICAgICAgICAgICAgICAgICB0YWcgPSBbdGFnXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB3aGVuIHRhZ3MgaXMgdXNlZCBhbmQgbm8gcXVlcnkgd2FzIHNldCxcbiAgICAgICAgICAgICAgICAvLyB0aGVuIGp1c3QgcmV0dXJuIHRoZSB0YWcgaW5kZXhlc1xuXG4gICAgICAgICAgICAgICAgaWYgKCFxdWVyeSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCByZXM7IGkgPCB0YWcubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gZ2V0X3RhZy5jYWxsKHRoaXMsIHRhZ1tpXSwgbGltaXQsIG9mZnNldCwgZW5yaWNoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291bnQgPyByZXN1bHQgOiBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc19zdHJpbmcoZmllbGQpKSB7XG5cbiAgICAgICAgICAgICAgICBmaWVsZCA9IFtmaWVsZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaWVsZCB8fCAoZmllbGQgPSB0aGlzLmZpZWxkKTtcbiAgICBib29sID0gYm9vbCAmJiAoMSA8IGZpZWxkLmxlbmd0aCB8fCB0YWcgJiYgMSA8IHRhZy5sZW5ndGgpO1xuXG4gICAgY29uc3QgcHJvbWlzZXMgPSAhX3Jlc29sdmUgJiYgKHRoaXMud29ya2VyIHx8IHRoaXMuYXN5bmMpICYmIFtdO1xuXG4gICAgLy8gVE9ETyBzb2x2ZSB0aGlzIGluIG9uZSBsb29wIGJlbG93XG5cbiAgICBmb3IgKGxldCBpID0gMCwgcmVzLCBrZXksIGxlbjsgaSA8IGZpZWxkLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgbGV0IGZpZWxkX29wdGlvbnM7XG5cbiAgICAgICAga2V5ID0gZmllbGRbaV07XG5cbiAgICAgICAgaWYgKCFpc19zdHJpbmcoa2V5KSkge1xuXG4gICAgICAgICAgICBmaWVsZF9vcHRpb25zID0ga2V5O1xuICAgICAgICAgICAga2V5ID0gZmllbGRfb3B0aW9ucy5maWVsZDtcbiAgICAgICAgICAgIHF1ZXJ5ID0gZmllbGRfb3B0aW9ucy5xdWVyeSB8fCBxdWVyeTtcbiAgICAgICAgICAgIGxpbWl0ID0gZmllbGRfb3B0aW9ucy5saW1pdCB8fCBsaW1pdDtcbiAgICAgICAgICAgIGVucmljaCA9IGZpZWxkX29wdGlvbnMuZW5yaWNoIHx8IGVucmljaDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9taXNlcykge1xuXG4gICAgICAgICAgICBwcm9taXNlc1tpXSA9IHRoaXMuaW5kZXhba2V5XS5zZWFyY2hBc3luYyhxdWVyeSwgbGltaXQsIGZpZWxkX29wdGlvbnMgfHwgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIC8vIGp1c3QgY29sbGVjdCBhbmQgY29udGludWVcblxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSBpZiAoX3Jlc29sdmUpIHtcblxuICAgICAgICAgICAgcmVzID0gX3Jlc29sdmVbaV07XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIGluaGVyaXQgb3B0aW9ucyBhbHNvIHdoZW4gc2VhcmNoPyBpdCBpcyBqdXN0IGZvciBsYXppbmVzcywgT2JqZWN0LmFzc2lnbigpIGhhcyBhIGNvc3RcblxuICAgICAgICAgICAgcmVzID0gdGhpcy5pbmRleFtrZXldLnNlYXJjaChxdWVyeSwgbGltaXQsIGZpZWxkX29wdGlvbnMgfHwgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZW4gPSByZXMgJiYgcmVzLmxlbmd0aDtcblxuICAgICAgICBpZiAodGFnICYmIGxlbikge1xuXG4gICAgICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG5cbiAgICAgICAgICAgIGlmIChib29sKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBwcmVwYXJlIGZvciBpbnRlcnNlY3Rpb25cblxuICAgICAgICAgICAgICAgIGFyclswXSA9IFtyZXNdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMCwga2V5LCByZXM7IHkgPCB0YWcubGVuZ3RoOyB5KyspIHtcblxuICAgICAgICAgICAgICAgIGtleSA9IHRhZ1t5XTtcbiAgICAgICAgICAgICAgICByZXMgPSB0aGlzLnRhZ2luZGV4W2tleV07XG4gICAgICAgICAgICAgICAgbGVuID0gcmVzICYmIHJlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBpZiAobGVuKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgYXJyW2Fyci5sZW5ndGhdID0gYm9vbCA/IFtyZXNdIDogcmVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvdW50KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoYm9vbCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IGludGVyc2VjdChhcnIsIGxpbWl0IHx8IDEwMCwgb2Zmc2V0IHx8IDApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzID0gaW50ZXJzZWN0X3VuaW9uKHJlcywgYXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZW4gPSByZXMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxlbikge1xuXG4gICAgICAgICAgICByZXN1bHRfZmllbGRbY291bnRdID0ga2V5O1xuICAgICAgICAgICAgcmVzdWx0W2NvdW50KytdID0gcmVzO1xuICAgICAgICB9IGVsc2UgaWYgKGJvb2wpIHtcblxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb21pc2VzKSB7XG5cbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgLy8gYW55b25lIGtub3dzIGEgYmV0dGVyIHdvcmthcm91bmQgb2Ygb3B0aW9uYWxseSBoYXZpbmcgYXN5bmMgcHJvbWlzZXM/XG4gICAgICAgIC8vIHRoZSBwcm9taXNlLmFsbCgpIG5lZWRzIHRvIGJlIHdyYXBwZWQgaW50byBhZGRpdGlvbmFsIHByb21pc2UsXG4gICAgICAgIC8vIG90aGVyd2lzZSB0aGUgcmVjdXJzaXZlIGNhbGxiYWNrIHdvdWxkbid0IHJ1biBiZWZvcmUgcmV0dXJuXG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cbiAgICAgICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUoc2VsZi5zZWFyY2gocXVlcnksIGxpbWl0LCBvcHRpb25zLCByZXN1bHQpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIWNvdW50KSB7XG5cbiAgICAgICAgLy8gZmFzdCBwYXRoIFwibm90IGZvdW5kXCJcblxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgaWYgKHBsdWNrICYmICghZW5yaWNoIHx8ICF0aGlzLnN0b3JlKSkge1xuXG4gICAgICAgIC8vIGZhc3QgcGF0aCBvcHRpbWl6YXRpb25cblxuICAgICAgICByZXR1cm4gcmVzdWx0WzBdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwLCByZXM7IGkgPCByZXN1bHRfZmllbGQubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICByZXMgPSByZXN1bHRbaV07XG5cbiAgICAgICAgaWYgKHJlcy5sZW5ndGgpIHtcblxuICAgICAgICAgICAgaWYgKGVucmljaCkge1xuXG4gICAgICAgICAgICAgICAgcmVzID0gYXBwbHlfZW5yaWNoLmNhbGwodGhpcywgcmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwbHVjaykge1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0W2ldID0ge1xuXG4gICAgICAgICAgICBmaWVsZDogcmVzdWx0X2ZpZWxkW2ldLFxuICAgICAgICAgICAgcmVzdWx0OiByZXNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXHJcbiAqIEB0aGlzIERvY3VtZW50XHJcbiAqL1xuXG5mdW5jdGlvbiBnZXRfdGFnKGtleSwgbGltaXQsIG9mZnNldCkge1xuICAgIGxldCByZXMgPSB0aGlzLnRhZ2luZGV4W2tleV0sXG4gICAgICAgIGxlbiA9IHJlcyAmJiByZXMubGVuZ3RoIC0gb2Zmc2V0O1xufVxuXG4vKipcclxuICogQHRoaXMgRG9jdW1lbnRcclxuICovXG5cbmZ1bmN0aW9uIGFwcGx5X2VucmljaChyZXMpIHtcblxuICAgIGNvbnN0IGFyciA9IEFycmF5KHJlcy5sZW5ndGgpO1xuXG4gICAgZm9yIChsZXQgeCA9IDAsIGlkOyB4IDwgcmVzLmxlbmd0aDsgeCsrKSB7XG5cbiAgICAgICAgaWQgPSByZXNbeF07XG5cbiAgICAgICAgYXJyW3hdID0ge1xuXG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBkb2M6IHRoaXMuc3RvcmVbaWRdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjtcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLmNvbnRhaW4gPSBmdW5jdGlvbiAoaWQpIHtcblxuICAgIHJldHVybiAhIXRoaXMucmVnaXN0ZXJbaWRdO1xufTtcblxuRG9jdW1lbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpZCkge1xuXG4gICAgcmV0dXJuIHRoaXMuc3RvcmVbaWRdO1xufTtcblxuRG9jdW1lbnQucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChpZCwgZGF0YSkge1xuXG4gICAgdGhpcy5zdG9yZVtpZF0gPSBkYXRhO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuXG5Eb2N1bWVudC5wcm90b3R5cGUuc2VhcmNoQ2FjaGUgPSBzZWFyY2hDYWNoZTtcblxuXG5Eb2N1bWVudC5wcm90b3R5cGUuZXhwb3J0ID0gZXhwb3J0RG9jdW1lbnQ7XG5Eb2N1bWVudC5wcm90b3R5cGUuaW1wb3J0ID0gaW1wb3J0RG9jdW1lbnQ7XG5cblxuYXBwbHlfYXN5bmMoRG9jdW1lbnQucHJvdG90eXBlKTsiLCJleHBvcnQgY29uc3QgZ2xvYmFsX2xhbmcgPSB7fTtcbmV4cG9ydCBjb25zdCBnbG9iYWxfY2hhcnNldCA9IHt9O1xuXG4vKipcclxuICogQHBhcmFtIHshc3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjaGFyc2V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDaGFyc2V0KG5hbWUsIGNoYXJzZXQpIHtcblxuICBnbG9iYWxfY2hhcnNldFtuYW1lXSA9IGNoYXJzZXQ7XG59XG5cbi8qKlxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IG5hbWVcclxuICogQHBhcmFtIHtPYmplY3R9IGxhbmdcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlckxhbmd1YWdlKG5hbWUsIGxhbmcpIHtcblxuICBnbG9iYWxfbGFuZ1tuYW1lXSA9IGxhbmc7XG59IiwiLyoqIVxyXG4gKiBGbGV4U2VhcmNoLmpzXHJcbiAqIEF1dGhvciBhbmQgQ29weXJpZ2h0OiBUaG9tYXMgV2lsa2VybGluZ1xyXG4gKiBMaWNlbmNlOiBBcGFjaGUtMi4wXHJcbiAqIEhvc3RlZCBieSBOZXh0YXBwcyBHbWJIXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9uZXh0YXBwcy1kZS9mbGV4c2VhcmNoXHJcbiAqL1xuXG5pbXBvcnQgeyBJbmRleEludGVyZmFjZSB9IGZyb20gXCIuL3R5cGUuanNcIjtcbmltcG9ydCB7IGVuY29kZSBhcyBkZWZhdWx0X2VuY29kZXIgfSBmcm9tIFwiLi9sYW5nL2xhdGluL2RlZmF1bHQuanNcIjtcbmltcG9ydCB7IGNyZWF0ZV9vYmplY3QsIGNyZWF0ZV9vYmplY3RfYXJyYXksIGNvbmNhdCwgc29ydF9ieV9sZW5ndGhfZG93biwgaXNfYXJyYXksIGlzX3N0cmluZywgaXNfb2JqZWN0LCBwYXJzZV9vcHRpb24gfSBmcm9tIFwiLi9jb21tb24uanNcIjtcbmltcG9ydCB7IHBpcGVsaW5lLCBpbml0X3N0ZW1tZXJfb3JfbWF0Y2hlciwgaW5pdF9maWx0ZXIgfSBmcm9tIFwiLi9sYW5nLmpzXCI7XG5pbXBvcnQgeyBnbG9iYWxfbGFuZywgZ2xvYmFsX2NoYXJzZXQgfSBmcm9tIFwiLi9nbG9iYWwuanNcIjtcbmltcG9ydCBhcHBseV9hc3luYyBmcm9tIFwiLi9hc3luYy5qc1wiO1xuaW1wb3J0IHsgaW50ZXJzZWN0IH0gZnJvbSBcIi4vaW50ZXJzZWN0LmpzXCI7XG5pbXBvcnQgQ2FjaGUsIHsgc2VhcmNoQ2FjaGUgfSBmcm9tIFwiLi9jYWNoZS5qc1wiO1xuaW1wb3J0IGFwcGx5X3ByZXNldCBmcm9tIFwiLi9wcmVzZXQuanNcIjtcbmltcG9ydCB7IGV4cG9ydEluZGV4LCBpbXBvcnRJbmRleCB9IGZyb20gXCIuL3NlcmlhbGl6ZS5qc1wiO1xuXG4vKipcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBpbXBsZW1lbnRzIEluZGV4SW50ZXJmYWNlXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAcGFyYW0ge09iamVjdD19IF9yZWdpc3RlclxyXG4gKiBAcmV0dXJuIHtJbmRleH1cclxuICovXG5cbmZ1bmN0aW9uIEluZGV4KG9wdGlvbnMsIF9yZWdpc3Rlcikge1xuXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEluZGV4KSkge1xuXG4gICAgICAgIHJldHVybiBuZXcgSW5kZXgob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgbGV0IGNoYXJzZXQsIGxhbmcsIHRtcDtcblxuICAgIGlmIChvcHRpb25zKSB7XG5cbiAgICAgICAgb3B0aW9ucyA9IGFwcGx5X3ByZXNldChvcHRpb25zKTtcblxuXG4gICAgICAgIGNoYXJzZXQgPSBvcHRpb25zLmNoYXJzZXQ7XG4gICAgICAgIGxhbmcgPSBvcHRpb25zLmxhbmc7XG5cbiAgICAgICAgaWYgKGlzX3N0cmluZyhjaGFyc2V0KSkge1xuXG4gICAgICAgICAgICBpZiAoLTEgPT09IGNoYXJzZXQuaW5kZXhPZihcIjpcIikpIHtcblxuICAgICAgICAgICAgICAgIGNoYXJzZXQgKz0gXCI6ZGVmYXVsdFwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjaGFyc2V0ID0gZ2xvYmFsX2NoYXJzZXRbY2hhcnNldF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNfc3RyaW5nKGxhbmcpKSB7XG5cbiAgICAgICAgICAgIGxhbmcgPSBnbG9iYWxfbGFuZ1tsYW5nXTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIGxldCByZXNvbHV0aW9uLFxuICAgICAgICBvcHRpbWl6ZSxcbiAgICAgICAgY29udGV4dCA9IG9wdGlvbnMuY29udGV4dCB8fCB7fTtcblxuICAgIHRoaXMuZW5jb2RlID0gb3B0aW9ucy5lbmNvZGUgfHwgY2hhcnNldCAmJiBjaGFyc2V0LmVuY29kZSB8fCBkZWZhdWx0X2VuY29kZXI7XG4gICAgdGhpcy5yZWdpc3RlciA9IF9yZWdpc3RlciB8fCBjcmVhdGVfb2JqZWN0KCk7XG4gICAgdGhpcy5yZXNvbHV0aW9uID0gcmVzb2x1dGlvbiA9IG9wdGlvbnMucmVzb2x1dGlvbiB8fCA5O1xuICAgIHRoaXMudG9rZW5pemUgPSB0bXAgPSBjaGFyc2V0ICYmIGNoYXJzZXQudG9rZW5pemUgfHwgb3B0aW9ucy50b2tlbml6ZSB8fCBcInN0cmljdFwiO1xuICAgIHRoaXMuZGVwdGggPSBcInN0cmljdFwiID09PSB0bXAgJiYgY29udGV4dC5kZXB0aDtcbiAgICB0aGlzLmJpZGlyZWN0aW9uYWwgPSBwYXJzZV9vcHRpb24oY29udGV4dC5iaWRpcmVjdGlvbmFsLCAvKiBhcHBlbmQ6ICovIC8qIHNraXAgdXBkYXRlOiAqLyAvKiBza2lwX3VwZGF0ZTogKi8hMCk7XG4gICAgdGhpcy5vcHRpbWl6ZSA9IG9wdGltaXplID0gcGFyc2Vfb3B0aW9uKG9wdGlvbnMub3B0aW1pemUsICEwKTtcbiAgICB0aGlzLmZhc3R1cGRhdGUgPSBwYXJzZV9vcHRpb24ob3B0aW9ucy5mYXN0dXBkYXRlLCAhMCk7XG4gICAgdGhpcy5taW5sZW5ndGggPSBvcHRpb25zLm1pbmxlbmd0aCB8fCAxO1xuICAgIHRoaXMuYm9vc3QgPSBvcHRpb25zLmJvb3N0O1xuXG4gICAgLy8gd2hlbiBub3QgdXNpbmcgdGhlIG1lbW9yeSBzdHJhdGVneSB0aGUgc2NvcmUgYXJyYXkgc2hvdWxkIG5vdCBwcmUtYWxsb2NhdGVkIHRvIGl0cyBmdWxsIGxlbmd0aFxuXG4gICAgdGhpcy5tYXAgPSBvcHRpbWl6ZSA/IGNyZWF0ZV9vYmplY3RfYXJyYXkocmVzb2x1dGlvbikgOiBjcmVhdGVfb2JqZWN0KCk7XG4gICAgdGhpcy5yZXNvbHV0aW9uX2N0eCA9IHJlc29sdXRpb24gPSBjb250ZXh0LnJlc29sdXRpb24gfHwgMTtcbiAgICB0aGlzLmN0eCA9IG9wdGltaXplID8gY3JlYXRlX29iamVjdF9hcnJheShyZXNvbHV0aW9uKSA6IGNyZWF0ZV9vYmplY3QoKTtcbiAgICB0aGlzLnJ0bCA9IGNoYXJzZXQgJiYgY2hhcnNldC5ydGwgfHwgb3B0aW9ucy5ydGw7XG4gICAgdGhpcy5tYXRjaGVyID0gKHRtcCA9IG9wdGlvbnMubWF0Y2hlciB8fCBsYW5nICYmIGxhbmcubWF0Y2hlcikgJiYgaW5pdF9zdGVtbWVyX29yX21hdGNoZXIodG1wLCAhMSk7XG4gICAgdGhpcy5zdGVtbWVyID0gKHRtcCA9IG9wdGlvbnMuc3RlbW1lciB8fCBsYW5nICYmIGxhbmcuc3RlbW1lcikgJiYgaW5pdF9zdGVtbWVyX29yX21hdGNoZXIodG1wLCAhMCk7XG4gICAgdGhpcy5maWx0ZXIgPSAodG1wID0gb3B0aW9ucy5maWx0ZXIgfHwgbGFuZyAmJiBsYW5nLmZpbHRlcikgJiYgaW5pdF9maWx0ZXIodG1wKTtcblxuICAgIHRoaXMuY2FjaGUgPSAodG1wID0gb3B0aW9ucy5jYWNoZSkgJiYgbmV3IENhY2hlKHRtcCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEluZGV4O1xuXG4vL0luZGV4LnByb3RvdHlwZS5waXBlbGluZSA9IHBpcGVsaW5lO1xuXG4vKipcclxuICogQHBhcmFtIHshbnVtYmVyfHN0cmluZ30gaWRcclxuICogQHBhcmFtIHshc3RyaW5nfSBjb250ZW50XHJcbiAqL1xuXG5JbmRleC5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKGlkLCBjb250ZW50KSB7XG5cbiAgICByZXR1cm4gdGhpcy5hZGQoaWQsIGNvbnRlbnQsICEwKTtcbn07XG5cbi8vIFRPRE86XG4vLyBzdHJpbmcgKyBudW1iZXIgYXMgdGV4dFxuLy8gYm9vbGVhbiwgbnVsbCwgdW5kZWZpbmVkIGFzID9cblxuLyoqXHJcbiAqIEBwYXJhbSB7IW51bWJlcnxzdHJpbmd9IGlkXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gY29udGVudFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBfYXBwZW5kXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IF9za2lwX3VwZGF0ZVxyXG4gKi9cblxuSW5kZXgucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChpZCwgY29udGVudCwgX2FwcGVuZCwgX3NraXBfdXBkYXRlKSB7XG5cbiAgICBpZiAoY29udGVudCAmJiAoaWQgfHwgMCA9PT0gaWQpKSB7XG5cbiAgICAgICAgaWYgKCFfc2tpcF91cGRhdGUgJiYgIV9hcHBlbmQgJiYgdGhpcy5yZWdpc3RlcltpZF0pIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKGlkLCBjb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRlbnQgPSB0aGlzLmVuY29kZShcIlwiICsgY29udGVudCk7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGNvbnRlbnQubGVuZ3RoO1xuXG4gICAgICAgIGlmIChsZW5ndGgpIHtcblxuICAgICAgICAgICAgLy8gY2hlY2sgY29udGV4dCBkdXBlcyB0byBza2lwIGFsbCBjb250ZXh0dWFsIHJlZHVuZGFuY3kgYWxvbmcgYSBkb2N1bWVudFxuXG4gICAgICAgICAgICBjb25zdCBkdXBlc19jdHggPSBjcmVhdGVfb2JqZWN0KCksXG4gICAgICAgICAgICAgICAgICBkdXBlcyA9IGNyZWF0ZV9vYmplY3QoKSxcbiAgICAgICAgICAgICAgICAgIGRlcHRoID0gdGhpcy5kZXB0aCxcbiAgICAgICAgICAgICAgICAgIHJlc29sdXRpb24gPSB0aGlzLnJlc29sdXRpb247XG5cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB0ZXJtID0gY29udGVudFt0aGlzLnJ0bCA/IGxlbmd0aCAtIDEgLSBpIDogaV0sXG4gICAgICAgICAgICAgICAgICAgIHRlcm1fbGVuZ3RoID0gdGVybS5sZW5ndGg7XG5cblxuICAgICAgICAgICAgICAgIC8vIHNraXAgZHVwZXMgd2lsbCBicmVhayB0aGUgY29udGV4dCBjaGFpblxuXG4gICAgICAgICAgICAgICAgaWYgKHRlcm0gJiYgdGVybV9sZW5ndGggPj0gdGhpcy5taW5sZW5ndGggJiYgKGRlcHRoIHx8ICFkdXBlc1t0ZXJtXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gZ2V0X3Njb3JlKHJlc29sdXRpb24sIGxlbmd0aCwgaSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IFwiXCI7XG5cblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMudG9rZW5pemUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZ1bGxcIjpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgyIDwgdGVybV9sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRlcm1fbGVuZ3RoOyB4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeSA9IHRlcm1fbGVuZ3RoOyB5ID4geDsgeS0tKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeSAtIHggPj0gdGhpcy5taW5sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0aWFsX3Njb3JlID0gZ2V0X3Njb3JlKHJlc29sdXRpb24sIGxlbmd0aCwgaSwgdGVybV9sZW5ndGgsIHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHRlcm0uc3Vic3RyaW5nKHgsIHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1c2hfaW5kZXgoZHVwZXMsIHRva2VuLCBwYXJ0aWFsX3Njb3JlLCBpZCwgX2FwcGVuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmYWxsdGhyb3VnaCB0byBuZXh0IGNhc2Ugd2hlbiB0ZXJtIGxlbmd0aCA8IDNcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJldmVyc2VcIjpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNraXAgbGFzdCByb3VuZCAodGhpcyB0b2tlbiBleGlzdCBhbHJlYWR5IGluIFwiZm9yd2FyZFwiKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDEgPCB0ZXJtX2xlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSB0ZXJtX2xlbmd0aCAtIDE7IDAgPCB4OyB4LS0pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSB0ZXJtW3hdICsgdG9rZW47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi5sZW5ndGggPj0gdGhpcy5taW5sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRpYWxfc2NvcmUgPSBnZXRfc2NvcmUocmVzb2x1dGlvbiwgbGVuZ3RoLCBpLCB0ZXJtX2xlbmd0aCwgeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoX2luZGV4KGR1cGVzLCB0b2tlbiwgcGFydGlhbF9zY29yZSwgaWQsIF9hcHBlbmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFsbHRocm91Z2ggdG8gbmV4dCBjYXNlIHRvIGFwcGx5IGZvcndhcmQgYWxzb1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZm9yd2FyZFwiOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDEgPCB0ZXJtX2xlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGVybV9sZW5ndGg7IHgrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiArPSB0ZXJtW3hdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4ubGVuZ3RoID49IHRoaXMubWlubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1c2hfaW5kZXgoZHVwZXMsIHRva2VuLCBzY29yZSwgaWQsIF9hcHBlbmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmYWxsdGhyb3VnaCB0byBuZXh0IGNhc2Ugd2hlbiB0b2tlbiBoYXMgYSBsZW5ndGggb2YgMVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhc2UgXCJzdHJpY3RcIjpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJvb3N0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSBNYXRoLm1pbigwIHwgc2NvcmUgLyB0aGlzLmJvb3N0KGNvbnRlbnQsIHRlcm0sIGkpLCByZXNvbHV0aW9uIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoX2luZGV4KGR1cGVzLCB0ZXJtLCBzY29yZSwgaWQsIF9hcHBlbmQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29udGV4dCBpcyBqdXN0IHN1cHBvcnRlZCBieSB0b2tlbml6ZXIgXCJzdHJpY3RcIlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDEgPCBsZW5ndGggJiYgaSA8IGxlbmd0aCAtIDEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgaW5uZXIgZHVwZXMgdG8gc2tpcCByZXBlYXRpbmcgd29yZHMgaW4gdGhlIGN1cnJlbnQgY29udGV4dFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkdXBlc19pbm5lciA9IGNyZWF0ZV9vYmplY3QoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdXRpb24gPSB0aGlzLnJlc29sdXRpb25fY3R4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5d29yZCA9IHRlcm0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplID0gTWF0aC5taW4oZGVwdGggKyAxLCBsZW5ndGggLSBpKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXBlc19pbm5lcltrZXl3b3JkXSA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSAxOyB4IDwgc2l6ZTsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJtID0gY29udGVudFt0aGlzLnJ0bCA/IGxlbmd0aCAtIDEgLSBpIC0geCA6IGkgKyB4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXJtICYmIHRlcm0ubGVuZ3RoID49IHRoaXMubWlubGVuZ3RoICYmICFkdXBlc19pbm5lclt0ZXJtXSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cGVzX2lubmVyW3Rlcm1dID0gMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZXh0X3Njb3JlID0gZ2V0X3Njb3JlKHJlc29sdXRpb24gKyAobGVuZ3RoIC8gMiA+IHJlc29sdXRpb24gPyAwIDogMSksIGxlbmd0aCwgaSwgc2l6ZSAtIDEsIHggLSAxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dhcCA9IHRoaXMuYmlkaXJlY3Rpb25hbCAmJiB0ZXJtID4ga2V5d29yZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1c2hfaW5kZXgoZHVwZXNfY3R4LCBzd2FwID8ga2V5d29yZCA6IHRlcm0sIGNvbnRleHRfc2NvcmUsIGlkLCBfYXBwZW5kLCBzd2FwID8gdGVybSA6IGtleXdvcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5mYXN0dXBkYXRlIHx8ICh0aGlzLnJlZ2lzdGVyW2lkXSA9IDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcclxuICogQHBhcmFtIHtudW1iZXJ9IHJlc29sdXRpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxyXG4gKiBAcGFyYW0ge251bWJlcn0gaVxyXG4gKiBAcGFyYW0ge251bWJlcj19IHRlcm1fbGVuZ3RoXHJcbiAqIEBwYXJhbSB7bnVtYmVyPX0geFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cblxuZnVuY3Rpb24gZ2V0X3Njb3JlKHJlc29sdXRpb24sIGxlbmd0aCwgaSwgdGVybV9sZW5ndGgsIHgpIHtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwicmVzb2x1dGlvblwiLCByZXNvbHV0aW9uKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcImxlbmd0aFwiLCBsZW5ndGgpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwidGVybV9sZW5ndGhcIiwgdGVybV9sZW5ndGgpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiaVwiLCBpKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcInhcIiwgeCk7XG4gICAgLy8gY29uc29sZS5sb2coKHJlc29sdXRpb24gLSAxKSAvIChsZW5ndGggKyAodGVybV9sZW5ndGggfHwgMCkpICogKGkgKyAoeCB8fCAwKSkgKyAxKTtcblxuICAgIC8vIHRoZSBmaXJzdCByZXNvbHV0aW9uIHNsb3QgaXMgcmVzZXJ2ZWQgZm9yIHRoZSBiZXN0IG1hdGNoLFxuICAgIC8vIHdoZW4gYSBxdWVyeSBtYXRjaGVzIHRoZSBmaXJzdCB3b3JkKHMpLlxuXG4gICAgLy8gYWxzbyB0byBzdHJldGNoIHNjb3JlIHRvIHRoZSB3aG9sZSByYW5nZSBvZiByZXNvbHV0aW9uLCB0aGVcbiAgICAvLyBjYWxjdWxhdGlvbiBpcyBzaGlmdCBieSBvbmUgYW5kIGN1dCB0aGUgZmxvYXRpbmcgcG9pbnQuXG4gICAgLy8gdGhpcyBuZWVkcyB0aGUgcmVzb2x1dGlvbiBcIjFcIiB0byBiZSBoYW5kbGVkIGFkZGl0aW9uYWxseS5cblxuICAgIC8vIGRvIG5vdCBzdHJldGNoIHRoZSByZXNvbHV0aW9uIG1vcmUgdGhhbiB0aGUgdGVybSBsZW5ndGggd2lsbFxuICAgIC8vIGltcHJvdmUgcGVyZm9ybWFuY2UgYW5kIG1lbW9yeSwgYWxzbyBpdCBpbXByb3ZlcyBzY29yaW5nIGluXG4gICAgLy8gbW9zdCBjYXNlcyBiZXR3ZWVuIGEgc2hvcnQgZG9jdW1lbnQgYW5kIGEgbG9uZyBkb2N1bWVudFxuXG4gICAgcmV0dXJuIGkgJiYgMSA8IHJlc29sdXRpb24gPyBsZW5ndGggKyAodGVybV9sZW5ndGggfHwgMCkgPD0gcmVzb2x1dGlvbiA/IGkgKyAoeCB8fCAwKSA6IDAgfCAocmVzb2x1dGlvbiAtIDEpIC8gKGxlbmd0aCArICh0ZXJtX2xlbmd0aCB8fCAwKSkgKiAoaSArICh4IHx8IDApKSArIDEgOiAwO1xufVxuXG4vKipcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIGR1cGVzXHJcbiAqIEBwYXJhbSB2YWx1ZVxyXG4gKiBAcGFyYW0gc2NvcmVcclxuICogQHBhcmFtIGlkXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGFwcGVuZFxyXG4gKiBAcGFyYW0ge3N0cmluZz19IGtleXdvcmRcclxuICovXG5cbkluZGV4LnByb3RvdHlwZS5wdXNoX2luZGV4ID0gZnVuY3Rpb24gKGR1cGVzLCB2YWx1ZSwgc2NvcmUsIGlkLCBhcHBlbmQsIGtleXdvcmQpIHtcblxuICAgIGxldCBhcnIgPSBrZXl3b3JkID8gdGhpcy5jdHggOiB0aGlzLm1hcDtcblxuICAgIGlmICghZHVwZXNbdmFsdWVdIHx8IGtleXdvcmQgJiYgIWR1cGVzW3ZhbHVlXVtrZXl3b3JkXSkge1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGltaXplKSB7XG5cbiAgICAgICAgICAgIGFyciA9IGFycltzY29yZV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5d29yZCkge1xuXG4gICAgICAgICAgICBkdXBlcyA9IGR1cGVzW3ZhbHVlXSB8fCAoZHVwZXNbdmFsdWVdID0gY3JlYXRlX29iamVjdCgpKTtcbiAgICAgICAgICAgIGR1cGVzW2tleXdvcmRdID0gMTtcblxuICAgICAgICAgICAgYXJyID0gYXJyW2tleXdvcmRdIHx8IChhcnJba2V5d29yZF0gPSBjcmVhdGVfb2JqZWN0KCkpO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBkdXBlc1t2YWx1ZV0gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJyID0gYXJyW3ZhbHVlXSB8fCAoYXJyW3ZhbHVlXSA9IFtdKTtcblxuICAgICAgICBpZiAoIXRoaXMub3B0aW1pemUpIHtcblxuICAgICAgICAgICAgYXJyID0gYXJyW3Njb3JlXSB8fCAoYXJyW3Njb3JlXSA9IFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghYXBwZW5kIHx8ICFhcnIuaW5jbHVkZXMoaWQpKSB7XG5cbiAgICAgICAgICAgIGFyclthcnIubGVuZ3RoXSA9IGlkO1xuXG4gICAgICAgICAgICAvLyBhZGQgYSByZWZlcmVuY2UgdG8gdGhlIHJlZ2lzdGVyIGZvciBmYXN0IHVwZGF0ZXNcblxuICAgICAgICAgICAgaWYgKHRoaXMuZmFzdHVwZGF0ZSkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdG1wID0gdGhpcy5yZWdpc3RlcltpZF0gfHwgKHRoaXMucmVnaXN0ZXJbaWRdID0gW10pO1xuICAgICAgICAgICAgICAgIHRtcFt0bXAubGVuZ3RoXSA9IGFycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IHF1ZXJ5XHJcbiAqIEBwYXJhbSB7bnVtYmVyfE9iamVjdD19IGxpbWl0XHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAcmV0dXJucyB7QXJyYXk8bnVtYmVyfHN0cmluZz59XHJcbiAqL1xuXG5JbmRleC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKHF1ZXJ5LCBsaW1pdCwgb3B0aW9ucykge1xuXG4gICAgaWYgKCFvcHRpb25zKSB7XG5cbiAgICAgICAgaWYgKCFsaW1pdCAmJiBpc19vYmplY3QocXVlcnkpKSB7XG5cbiAgICAgICAgICAgIG9wdGlvbnMgPSAvKiogQHR5cGUge09iamVjdH0gKi9xdWVyeTtcbiAgICAgICAgICAgIHF1ZXJ5ID0gb3B0aW9ucy5xdWVyeTtcbiAgICAgICAgfSBlbHNlIGlmIChpc19vYmplY3QobGltaXQpKSB7XG5cbiAgICAgICAgICAgIG9wdGlvbnMgPSAvKiogQHR5cGUge09iamVjdH0gKi9saW1pdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSBbXSxcbiAgICAgICAgbGVuZ3RoLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBzdWdnZXN0LFxuICAgICAgICBvZmZzZXQgPSAwO1xuXG5cbiAgICBpZiAob3B0aW9ucykge1xuXG4gICAgICAgIHF1ZXJ5ID0gb3B0aW9ucy5xdWVyeSB8fCBxdWVyeTtcbiAgICAgICAgbGltaXQgPSBvcHRpb25zLmxpbWl0O1xuICAgICAgICBvZmZzZXQgPSBvcHRpb25zLm9mZnNldCB8fCAwO1xuICAgICAgICBjb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0O1xuICAgICAgICBzdWdnZXN0ID0gb3B0aW9ucy5zdWdnZXN0O1xuICAgIH1cblxuICAgIGlmIChxdWVyeSkge1xuXG4gICAgICAgIHF1ZXJ5ID0gLyoqIEB0eXBlIHtBcnJheX0gKi90aGlzLmVuY29kZShcIlwiICsgcXVlcnkpO1xuICAgICAgICBsZW5ndGggPSBxdWVyeS5sZW5ndGg7XG5cbiAgICAgICAgLy8gVE9ETzogc29sdmUgdGhpcyBpbiBvbmUgc2luZ2xlIGxvb3AgYmVsb3dcblxuICAgICAgICBpZiAoMSA8IGxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgZHVwZXMgPSBjcmVhdGVfb2JqZWN0KCksXG4gICAgICAgICAgICAgICAgICBxdWVyeV9uZXcgPSBbXTtcblxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgY291bnQgPSAwLCB0ZXJtOyBpIDwgbGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHRlcm0gPSBxdWVyeVtpXTtcblxuICAgICAgICAgICAgICAgIGlmICh0ZXJtICYmIHRlcm0ubGVuZ3RoID49IHRoaXMubWlubGVuZ3RoICYmICFkdXBlc1t0ZXJtXSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgZmFzdCBwYXRoIGNhbiBqdXN0IGFwcGx5IHdoZW4gbm90IGluIG1lbW9yeS1vcHRpbWl6ZWQgbW9kZVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRpbWl6ZSAmJiAhc3VnZ2VzdCAmJiAhdGhpcy5tYXBbdGVybV0pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFzdCBwYXRoIFwibm90IGZvdW5kXCJcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlfbmV3W2NvdW50KytdID0gdGVybTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cGVzW3Rlcm1dID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcXVlcnkgPSBxdWVyeV9uZXc7XG4gICAgICAgICAgICBsZW5ndGggPSBxdWVyeS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWxlbmd0aCkge1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgbGltaXQgfHwgKGxpbWl0ID0gMTAwKTtcblxuICAgIGxldCBkZXB0aCA9IHRoaXMuZGVwdGggJiYgMSA8IGxlbmd0aCAmJiAhMSAhPT0gY29udGV4dCxcbiAgICAgICAgaW5kZXggPSAwLFxuICAgICAgICBrZXl3b3JkO1xuXG5cbiAgICBpZiAoZGVwdGgpIHtcblxuICAgICAgICBrZXl3b3JkID0gcXVlcnlbMF07XG4gICAgICAgIGluZGV4ID0gMTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGlmICgxIDwgbGVuZ3RoKSB7XG5cbiAgICAgICAgICAgIHF1ZXJ5LnNvcnQoc29ydF9ieV9sZW5ndGhfZG93bik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBhcnIsIHRlcm07IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG5cbiAgICAgICAgdGVybSA9IHF1ZXJ5W2luZGV4XTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhrZXl3b3JkKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGVybSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiXCIpO1xuXG4gICAgICAgIGlmIChkZXB0aCkge1xuXG4gICAgICAgICAgICBhcnIgPSB0aGlzLmFkZF9yZXN1bHQocmVzdWx0LCBzdWdnZXN0LCBsaW1pdCwgb2Zmc2V0LCAyID09PSBsZW5ndGgsIHRlcm0sIGtleXdvcmQpO1xuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhcnIpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcblxuICAgICAgICAgICAgLy8gd2hlbiBzdWdnZXN0aW9uIGVuYWJsZWQganVzdCBmb3J3YXJkIGtleXdvcmQgaWYgdGVybSB3YXMgZm91bmRcbiAgICAgICAgICAgIC8vIGFzIGxvbmcgYXMgdGhlIHJlc3VsdCBpcyBlbXB0eSBmb3J3YXJkIHRoZSBwb2ludGVyIGFsc29cblxuICAgICAgICAgICAgaWYgKCFzdWdnZXN0IHx8ICExICE9PSBhcnIgfHwgIXJlc3VsdC5sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgIGtleXdvcmQgPSB0ZXJtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBhcnIgPSB0aGlzLmFkZF9yZXN1bHQocmVzdWx0LCBzdWdnZXN0LCBsaW1pdCwgb2Zmc2V0LCAxID09PSBsZW5ndGgsIHRlcm0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFycikge1xuXG4gICAgICAgICAgICByZXR1cm4gKC8qKiBAdHlwZSB7QXJyYXk8bnVtYmVyfHN0cmluZz59ICovYXJyXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXBwbHkgc3VnZ2VzdGlvbnMgb24gbGFzdCBsb29wIG9yIGZhbGxiYWNrXG5cbiAgICAgICAgaWYgKHN1Z2dlc3QgJiYgaW5kZXggPT0gbGVuZ3RoIC0gMSkge1xuXG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKCFsZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgIGlmIChkZXB0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGZhbGxiYWNrIHRvIG5vbi1jb250ZXh0dWFsIHNlYXJjaCB3aGVuIG5vIHJlc3VsdCB3YXMgZm91bmRcblxuICAgICAgICAgICAgICAgICAgICBkZXB0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gLTE7XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoMSA9PT0gbGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBmYXN0IHBhdGggb3B0aW1pemF0aW9uXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2luZ2xlX3Jlc3VsdChyZXN1bHRbMF0sIGxpbWl0LCBvZmZzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVyc2VjdChyZXN1bHQsIGxpbWl0LCBvZmZzZXQsIHN1Z2dlc3QpO1xufTtcblxuLyoqXHJcbiAqIFJldHVybnMgYW4gYXJyYXkgd2hlbiB0aGUgcmVzdWx0IGlzIGRvbmUgKHRvIHN0b3AgdGhlIHByb2Nlc3MgaW1tZWRpYXRlbHkpLFxyXG4gKiByZXR1cm5zIGZhbHNlIHdoZW4gc3VnZ2VzdGlvbnMgaXMgZW5hYmxlZCBhbmQgbm8gcmVzdWx0IHdhcyBmb3VuZCxcclxuICogb3IgcmV0dXJucyBub3RoaW5nIHdoZW4gYSBzZXQgd2FzIHB1c2hlZCBzdWNjZXNzZnVsbHkgdG8gdGhlIHJlc3VsdHNcclxuICpcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHtBcnJheX0gcmVzdWx0XHJcbiAqIEBwYXJhbSB7QXJyYXl9IHN1Z2dlc3RcclxuICogQHBhcmFtIHtudW1iZXJ9IGxpbWl0XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcclxuICogQHBhcmFtIHtib29sZWFufSBzaW5nbGVfdGVybVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGVybVxyXG4gKiBAcGFyYW0ge3N0cmluZz19IGtleXdvcmRcclxuICogQHJldHVybiB7QXJyYXk8QXJyYXk8c3RyaW5nfG51bWJlcj4+fGJvb2xlYW58dW5kZWZpbmVkfVxyXG4gKi9cblxuSW5kZXgucHJvdG90eXBlLmFkZF9yZXN1bHQgPSBmdW5jdGlvbiAocmVzdWx0LCBzdWdnZXN0LCBsaW1pdCwgb2Zmc2V0LCBzaW5nbGVfdGVybSwgdGVybSwga2V5d29yZCkge1xuICAgIGxldCB3b3JkX2FyciA9IFtdLFxuICAgICAgICBhcnIgPSBrZXl3b3JkID8gdGhpcy5jdHggOiB0aGlzLm1hcDtcblxuXG4gICAgaWYgKCF0aGlzLm9wdGltaXplKSB7XG5cbiAgICAgICAgYXJyID0gZ2V0X2FycmF5KGFyciwgdGVybSwga2V5d29yZCwgdGhpcy5iaWRpcmVjdGlvbmFsKTtcbiAgICB9XG5cbiAgICBpZiAoYXJyKSB7XG5cbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgY29uc3QgYXJyX2xlbiA9IE1hdGgubWluKGFyci5sZW5ndGgsIGtleXdvcmQgPyB0aGlzLnJlc29sdXRpb25fY3R4IDogdGhpcy5yZXNvbHV0aW9uKTtcblxuICAgICAgICAvLyByZWxldmFuY2U6XG4gICAgICAgIGZvciAobGV0IHggPSAwLCBzaXplID0gMCwgdG1wLCBsZW47IHggPCBhcnJfbGVuOyB4KyspIHtcblxuICAgICAgICAgICAgdG1wID0gYXJyW3hdO1xuXG4gICAgICAgICAgICBpZiAodG1wKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpbWl6ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IGdldF9hcnJheSh0bXAsIHRlcm0sIGtleXdvcmQsIHRoaXMuYmlkaXJlY3Rpb25hbCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG9mZnNldCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0bXAgJiYgc2luZ2xlX3Rlcm0pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gdG1wLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlbiA8PSBvZmZzZXQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCAtPSBsZW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSB0bXAuc2xpY2Uob2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRtcCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGtlZXAgc2NvcmUgKHNwYXJzZSBhcnJheSk6XG4gICAgICAgICAgICAgICAgICAgIC8vd29yZF9hcnJbeF0gPSB0bXA7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc2ltcGxpZmllZCBzY29yZSBvcmRlcjpcbiAgICAgICAgICAgICAgICAgICAgd29yZF9hcnJbY291bnQrK10gPSB0bXA7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpbmdsZV90ZXJtKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgKz0gdG1wLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpemUgPj0gbGltaXQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhc3QgcGF0aCBvcHRpbWl6YXRpb25cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvdW50KSB7XG5cbiAgICAgICAgICAgIGlmIChzaW5nbGVfdGVybSkge1xuXG4gICAgICAgICAgICAgICAgLy8gZmFzdCBwYXRoIG9wdGltaXphdGlvblxuICAgICAgICAgICAgICAgIC8vIG9mZnNldCB3YXMgYWxyZWFkeSBhcHBsaWVkIGF0IHRoaXMgcG9pbnRcblxuICAgICAgICAgICAgICAgIHJldHVybiBzaW5nbGVfcmVzdWx0KHdvcmRfYXJyLCBsaW1pdCwgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHdvcmRfYXJyO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIGFuIGVtcHR5IGFycmF5IHdpbGwgc3RvcCB0aGUgbG9vcCxcbiAgICAvLyB0byBwcmV2ZW50IHN0b3Agd2hlbiB1c2luZyBzdWdnZXN0aW9ucyByZXR1cm4gYSBmYWxzZSB2YWx1ZVxuXG4gICAgcmV0dXJuICFzdWdnZXN0ICYmIHdvcmRfYXJyO1xufTtcblxuZnVuY3Rpb24gc2luZ2xlX3Jlc3VsdChyZXN1bHQsIGxpbWl0LCBvZmZzZXQpIHtcblxuICAgIGlmICgxID09PSByZXN1bHQubGVuZ3RoKSB7XG5cbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0WzBdO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgcmVzdWx0ID0gY29uY2F0KHJlc3VsdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldCB8fCByZXN1bHQubGVuZ3RoID4gbGltaXQgPyByZXN1bHQuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBsaW1pdCkgOiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGdldF9hcnJheShhcnIsIHRlcm0sIGtleXdvcmQsIGJpZGlyZWN0aW9uYWwpIHtcblxuICAgIGlmIChrZXl3b3JkKSB7XG5cbiAgICAgICAgLy8gdGhlIGZyZXF1ZW5jeSBvZiB0aGUgc3RhcnRpbmcgbGV0dGVyIGlzIHNsaWdodGx5IGxlc3NcbiAgICAgICAgLy8gb24gdGhlIGxhc3QgaGFsZiBvZiB0aGUgYWxwaGFiZXQgKG0teikgaW4gYWxtb3N0IGV2ZXJ5IGxhdGluIGxhbmd1YWdlLFxuICAgICAgICAvLyBzbyB3ZSBzb3J0IGRvd253YXJkcyAoaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGV0dGVyX2ZyZXF1ZW5jeSlcblxuICAgICAgICBjb25zdCBzd2FwID0gYmlkaXJlY3Rpb25hbCAmJiB0ZXJtID4ga2V5d29yZDtcblxuICAgICAgICBhcnIgPSBhcnJbc3dhcCA/IHRlcm0gOiBrZXl3b3JkXTtcbiAgICAgICAgYXJyID0gYXJyICYmIGFycltzd2FwID8ga2V5d29yZCA6IHRlcm1dO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgYXJyID0gYXJyW3Rlcm1dO1xuICAgIH1cblxuICAgIHJldHVybiBhcnI7XG59XG5cbkluZGV4LnByb3RvdHlwZS5jb250YWluID0gZnVuY3Rpb24gKGlkKSB7XG5cbiAgICByZXR1cm4gISF0aGlzLnJlZ2lzdGVyW2lkXTtcbn07XG5cbkluZGV4LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoaWQsIGNvbnRlbnQpIHtcblxuICAgIHJldHVybiB0aGlzLnJlbW92ZShpZCkuYWRkKGlkLCBjb250ZW50KTtcbn07XG5cbi8qKlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBfc2tpcF9kZWxldGlvblxyXG4gKi9cblxuSW5kZXgucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpZCwgX3NraXBfZGVsZXRpb24pIHtcblxuICAgIGNvbnN0IHJlZnMgPSB0aGlzLnJlZ2lzdGVyW2lkXTtcblxuICAgIGlmIChyZWZzKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZmFzdHVwZGF0ZSkge1xuXG4gICAgICAgICAgICAvLyBmYXN0IHVwZGF0ZXMgcGVyZm9ybXMgcmVhbGx5IGZhc3QgYnV0IGRpZCBub3QgZnVsbHkgY2xlYW51cCB0aGUga2V5IGVudHJpZXNcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIHRtcDsgaSA8IHJlZnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHRtcCA9IHJlZnNbaV07XG4gICAgICAgICAgICAgICAgdG1wLnNwbGljZSh0bXAuaW5kZXhPZihpZCksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZW1vdmVfaW5kZXgodGhpcy5tYXAsIGlkLCB0aGlzLnJlc29sdXRpb24sIHRoaXMub3B0aW1pemUpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kZXB0aCkge1xuXG4gICAgICAgICAgICAgICAgcmVtb3ZlX2luZGV4KHRoaXMuY3R4LCBpZCwgdGhpcy5yZXNvbHV0aW9uX2N0eCwgdGhpcy5vcHRpbWl6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfc2tpcF9kZWxldGlvbiB8fCBkZWxldGUgdGhpcy5yZWdpc3RlcltpZF07XG5cbiAgICAgICAgaWYgKHRoaXMuY2FjaGUpIHtcblxuICAgICAgICAgICAgdGhpcy5jYWNoZS5kZWwoaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcclxuICogQHBhcmFtIG1hcFxyXG4gKiBAcGFyYW0gaWRcclxuICogQHBhcmFtIHJlc1xyXG4gKiBAcGFyYW0gb3B0aW1pemVcclxuICogQHBhcmFtIHtudW1iZXI9fSByZXNvbHV0aW9uXHJcbiAqIEByZXR1cm4ge251bWJlcn1cclxuICovXG5cbmZ1bmN0aW9uIHJlbW92ZV9pbmRleChtYXAsIGlkLCByZXMsIG9wdGltaXplLCByZXNvbHV0aW9uKSB7XG5cbiAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgaWYgKGlzX2FycmF5KG1hcCkpIHtcblxuICAgICAgICAvLyB0aGUgZmlyc3QgYXJyYXkgaXMgdGhlIHNjb3JlIGFycmF5IGluIGJvdGggc3RyYXRlZ2llc1xuXG4gICAgICAgIGlmICghcmVzb2x1dGlvbikge1xuXG4gICAgICAgICAgICByZXNvbHV0aW9uID0gTWF0aC5taW4obWFwLmxlbmd0aCwgcmVzKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDAsIGFycjsgeCA8IHJlc29sdXRpb247IHgrKykge1xuXG4gICAgICAgICAgICAgICAgYXJyID0gbWFwW3hdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFycikge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ID0gcmVtb3ZlX2luZGV4KGFyciwgaWQsIHJlcywgb3B0aW1pemUsIHJlc29sdXRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW1pemUgJiYgIWNvdW50KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gbm90IG1lbW9yeSBvcHRpbWl6ZWQgdGhlIHNjb3JlIGluZGV4IHNob3VsZCByZW1vdmVkXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBtYXBbeF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IG1hcC5pbmRleE9mKGlkKTtcblxuICAgICAgICAgICAgaWYgKC0xICE9PSBwb3MpIHtcblxuICAgICAgICAgICAgICAgIC8vIGZhc3QgcGF0aCwgd2hlbiBsZW5ndGggaXMgMSBvciBsb3dlciB0aGVuIHRoZSB3aG9sZSBmaWVsZCBnZXRzIGRlbGV0ZWRcblxuICAgICAgICAgICAgICAgIGlmICgxIDwgbWFwLmxlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgIG1hcC5zcGxpY2UocG9zLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIG1hcCkge1xuXG4gICAgICAgICAgICBjb3VudCA9IHJlbW92ZV9pbmRleChtYXBba2V5XSwgaWQsIHJlcywgb3B0aW1pemUsIHJlc29sdXRpb24pO1xuXG4gICAgICAgICAgICBpZiAoIWNvdW50KSB7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgbWFwW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY291bnQ7XG59XG5cbkluZGV4LnByb3RvdHlwZS5zZWFyY2hDYWNoZSA9IHNlYXJjaENhY2hlO1xuXG5cbkluZGV4LnByb3RvdHlwZS5leHBvcnQgPSBleHBvcnRJbmRleDtcbkluZGV4LnByb3RvdHlwZS5pbXBvcnQgPSBpbXBvcnRJbmRleDtcblxuXG5hcHBseV9hc3luYyhJbmRleC5wcm90b3R5cGUpOyIsImltcG9ydCB7IGNyZWF0ZV9vYmplY3QsIGNvbmNhdCB9IGZyb20gXCIuL2NvbW1vbi5qc1wiO1xuXG4vKipcclxuICogSW1wbGVtZW50YXRpb24gYmFzZWQgb24gQXJyYXkuaW5jbHVkZXMoKSBwcm92aWRlcyBiZXR0ZXIgcGVyZm9ybWFuY2UsXHJcbiAqIGJ1dCBpdCBuZWVkcyBhdCBsZWFzdCBvbmUgd29yZCBpbiB0aGUgcXVlcnkgd2hpY2ggaXMgbGVzcyBmcmVxdWVudC5cclxuICogQWxzbyBvbiBsYXJnZSBpbmRleGVzIGl0IGRvZXMgbm90IHNjYWxlIHdlbGwgcGVyZm9ybWFuY2Utd2lzZS5cclxuICogVGhpcyBzdHJhdGVneSBhbHNvIGxhY2tzIG9mIHN1Z2dlc3Rpb24gY2FwYWJpbGl0aWVzIChtYXRjaGluZyAmIHNvcnRpbmcpLlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXlzXHJcbiAqIEBwYXJhbSBsaW1pdFxyXG4gKiBAcGFyYW0gb2Zmc2V0XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbnxBcnJheT19IHN1Z2dlc3RcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKi9cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGludGVyc2VjdChhcnJheXMsIGxpbWl0LCBvZmZzZXQsIHN1Z2dlc3QpIHtcbi8vXG4vLyAgICAgY29uc3QgbGVuZ3RoID0gYXJyYXlzLmxlbmd0aDtcbi8vICAgICBsZXQgcmVzdWx0ID0gW107XG4vLyAgICAgbGV0IGNoZWNrO1xuLy9cbi8vICAgICAvLyBkZXRlcm1pbmUgc2hvcnRlc3QgYXJyYXkgYW5kIGNvbGxlY3QgcmVzdWx0c1xuLy8gICAgIC8vIGZyb20gdGhlIHNwYXJzZSByZWxldmFuY2UgYXJyYXlzXG4vL1xuLy8gICAgIGxldCBzbWFsbGVzdF9zaXplO1xuLy8gICAgIGxldCBzbWFsbGVzdF9hcnI7XG4vLyAgICAgbGV0IHNtYWxsZXN0X2luZGV4O1xuLy9cbi8vICAgICBmb3IobGV0IHggPSAwOyB4IDwgbGVuZ3RoOyB4Kyspe1xuLy9cbi8vICAgICAgICAgY29uc3QgYXJyID0gYXJyYXlzW3hdO1xuLy8gICAgICAgICBjb25zdCBsZW4gPSBhcnIubGVuZ3RoO1xuLy9cbi8vICAgICAgICAgbGV0IHNpemUgPSAwO1xuLy9cbi8vICAgICAgICAgZm9yKGxldCB5ID0gMCwgdG1wOyB5IDwgbGVuOyB5Kyspe1xuLy9cbi8vICAgICAgICAgICAgIHRtcCA9IGFyclt5XTtcbi8vXG4vLyAgICAgICAgICAgICBpZih0bXApe1xuLy9cbi8vICAgICAgICAgICAgICAgICBzaXplICs9IHRtcC5sZW5ndGg7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgIGlmKCFzbWFsbGVzdF9zaXplIHx8IChzaXplIDwgc21hbGxlc3Rfc2l6ZSkpe1xuLy9cbi8vICAgICAgICAgICAgIHNtYWxsZXN0X3NpemUgPSBzaXplO1xuLy8gICAgICAgICAgICAgc21hbGxlc3RfYXJyID0gYXJyO1xuLy8gICAgICAgICAgICAgc21hbGxlc3RfaW5kZXggPSB4O1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy9cbi8vICAgICBzbWFsbGVzdF9hcnIgPSBzbWFsbGVzdF9hcnIubGVuZ3RoID09PSAxID9cbi8vXG4vLyAgICAgICAgIHNtYWxsZXN0X2FyclswXVxuLy8gICAgIDpcbi8vICAgICAgICAgY29uY2F0KHNtYWxsZXN0X2Fycik7XG4vL1xuLy8gICAgIGlmKHN1Z2dlc3Qpe1xuLy9cbi8vICAgICAgICAgc3VnZ2VzdCA9IFtzbWFsbGVzdF9hcnJdO1xuLy8gICAgICAgICBjaGVjayA9IGNyZWF0ZV9vYmplY3QoKTtcbi8vICAgICB9XG4vL1xuLy8gICAgIGxldCBzaXplID0gMDtcbi8vICAgICBsZXQgc3RlcHMgPSAwO1xuLy9cbi8vICAgICAvLyBwcm9jZXNzIHRlcm1zIGluIHJldmVyc2VkIG9yZGVyIG9mdGVuIHJlc3VsdHMgaW4gYmV0dGVyIHBlcmZvcm1hbmNlLlxuLy8gICAgIC8vIHRoZSBvdXRlciBsb29wIG11c3QgYmUgdGhlIHdvcmRzIGFycmF5LCB1c2luZyB0aGVcbi8vICAgICAvLyBzbWFsbGVzdCBhcnJheSBoZXJlIGRpc2FibGVzIHRoZSBcImZhc3QgZmFpbFwiIG9wdGltaXphdGlvbi5cbi8vXG4vLyAgICAgZm9yKGxldCB4ID0gbGVuZ3RoIC0gMTsgeCA+PSAwOyB4LS0pe1xuLy9cbi8vICAgICAgICAgaWYoeCAhPT0gc21hbGxlc3RfaW5kZXgpe1xuLy9cbi8vICAgICAgICAgICAgIHN0ZXBzKys7XG4vL1xuLy8gICAgICAgICAgICAgY29uc3Qgd29yZF9hcnIgPSBhcnJheXNbeF07XG4vLyAgICAgICAgICAgICBjb25zdCB3b3JkX2Fycl9sZW4gPSB3b3JkX2Fyci5sZW5ndGg7XG4vLyAgICAgICAgICAgICBjb25zdCBuZXdfYXJyID0gW107XG4vL1xuLy8gICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcbi8vXG4vLyAgICAgICAgICAgICBmb3IobGV0IHogPSAwLCBpZDsgeiA8IHNtYWxsZXN0X2Fyci5sZW5ndGg7IHorKyl7XG4vL1xuLy8gICAgICAgICAgICAgICAgIGlkID0gc21hbGxlc3RfYXJyW3pdO1xuLy9cbi8vICAgICAgICAgICAgICAgICBsZXQgZm91bmQ7XG4vL1xuLy8gICAgICAgICAgICAgICAgIC8vIHByb2Nlc3MgcmVsZXZhbmNlIGluIGZvcndhcmQgb3JkZXIgKGRpcmVjdGlvbiBpc1xuLy8gICAgICAgICAgICAgICAgIC8vIGltcG9ydGFudCBmb3IgYWRkaW5nIElEcyBkdXJpbmcgdGhlIGxhc3Qgcm91bmQpXG4vL1xuLy8gICAgICAgICAgICAgICAgIGZvcihsZXQgeSA9IDA7IHkgPCB3b3JkX2Fycl9sZW47IHkrKyl7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnIgPSB3b3JkX2Fyclt5XTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmKGFyci5sZW5ndGgpe1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gYXJyLmluY2x1ZGVzKGlkKTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBpZihmb3VuZCl7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGluIGxhc3Qgcm91bmRcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3RlcHMgPT09IGxlbmd0aCAtIDEpe1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYob2Zmc2V0KXtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQtLTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtzaXplKytdID0gaWQ7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2l6ZSA9PT0gbGltaXQpe1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmYXN0IHBhdGggXCJlbmQgcmVhY2hlZFwiXG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHN1Z2dlc3Qpe1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrW2lkXSA9IDE7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgICAgICBpZihmb3VuZCl7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICBuZXdfYXJyW2NvdW50KytdID0gaWQ7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgIGlmKHN1Z2dlc3Qpe1xuLy9cbi8vICAgICAgICAgICAgICAgICBzdWdnZXN0W3N0ZXBzXSA9IG5ld19hcnI7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBlbHNlIGlmKCFjb3VudCl7XG4vL1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbi8vICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICBzbWFsbGVzdF9hcnIgPSBuZXdfYXJyO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy9cbi8vICAgICBpZihzdWdnZXN0KXtcbi8vXG4vLyAgICAgICAgIC8vIG5lZWRzIHRvIGl0ZXJhdGUgaW4gcmV2ZXJzZSBkaXJlY3Rpb25cbi8vXG4vLyAgICAgICAgIGZvcihsZXQgeCA9IHN1Z2dlc3QubGVuZ3RoIC0gMSwgYXJyLCBsZW47IHggPj0gMDsgeC0tKXtcbi8vXG4vLyAgICAgICAgICAgICBhcnIgPSBzdWdnZXN0W3hdO1xuLy8gICAgICAgICAgICAgbGVuID0gYXJyICYmIGFyci5sZW5ndGg7XG4vL1xuLy8gICAgICAgICAgICAgaWYobGVuKXtcbi8vXG4vLyAgICAgICAgICAgICAgICAgZm9yKGxldCB5ID0gMCwgaWQ7IHkgPCBsZW47IHkrKyl7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICBpZCA9IGFyclt5XTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmKCFjaGVja1tpZF0pe1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrW2lkXSA9IDE7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYob2Zmc2V0KXtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0LS07XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbc2l6ZSsrXSA9IGlkO1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzaXplID09PSBsaW1pdCl7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmYXN0IHBhdGggXCJlbmQgcmVhY2hlZFwiXG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vXG4vLyAgICAgcmV0dXJuIHJlc3VsdDtcbi8vIH1cblxuLyoqXHJcbiAqIEltcGxlbWVudGF0aW9uIGJhc2VkIG9uIE9iamVjdFtrZXldIHByb3ZpZGVzIGJldHRlciBzdWdnZXN0aW9uc1xyXG4gKiBjYXBhYmlsaXRpZXMgYW5kIGhhcyBsZXNzIHBlcmZvcm1hbmNlIHNjYWxpbmcgaXNzdWVzIG9uIGxhcmdlIGluZGV4ZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcnJheXNcclxuICogQHBhcmFtIGxpbWl0XHJcbiAqIEBwYXJhbSBvZmZzZXRcclxuICogQHBhcmFtIHtib29sZWFufEFycmF5PX0gc3VnZ2VzdFxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJzZWN0KGFycmF5cywgbGltaXQsIG9mZnNldCwgc3VnZ2VzdCkge1xuXG4gICAgY29uc3QgbGVuZ3RoID0gYXJyYXlzLmxlbmd0aDtcbiAgICBsZXQgcmVzdWx0ID0gW10sXG4gICAgICAgIGNoZWNrLFxuICAgICAgICBjaGVja19zdWdnZXN0LFxuICAgICAgICBzaXplID0gMDtcblxuXG4gICAgaWYgKHN1Z2dlc3QpIHtcblxuICAgICAgICBzdWdnZXN0ID0gW107XG4gICAgfVxuXG4gICAgLy8gcHJvY2VzcyB0ZXJtcyBpbiByZXZlcnNlZCBvcmRlciBvZnRlbiBoYXMgYWR2YW50YWdlIGZvciB0aGUgZmFzdCBwYXRoIFwiZW5kIHJlYWNoZWRcIi5cbiAgICAvLyBhbHNvIGEgcmV2ZXJzZWQgb3JkZXIgcHJpb3JpdGl6ZSB0aGUgb3JkZXIgb2Ygd29yZHMgZnJvbSBhIHF1ZXJ5LlxuXG4gICAgZm9yIChsZXQgeCA9IGxlbmd0aCAtIDE7IDAgPD0geDsgeC0tKSB7XG4gICAgICAgIGNvbnN0IHdvcmRfYXJyID0gYXJyYXlzW3hdLFxuICAgICAgICAgICAgICB3b3JkX2Fycl9sZW4gPSB3b3JkX2Fyci5sZW5ndGgsXG4gICAgICAgICAgICAgIGNoZWNrX25ldyA9IGNyZWF0ZV9vYmplY3QoKTtcblxuXG4gICAgICAgIGxldCBmb3VuZCA9ICFjaGVjaztcblxuICAgICAgICAvLyBwcm9jZXNzIHJlbGV2YW5jZSBpbiBmb3J3YXJkIG9yZGVyIChkaXJlY3Rpb24gaXNcbiAgICAgICAgLy8gaW1wb3J0YW50IGZvciBhZGRpbmcgSURzIGR1cmluZyB0aGUgbGFzdCByb3VuZClcblxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHdvcmRfYXJyX2xlbjsgeSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhcnIgPSB3b3JkX2Fyclt5XSxcbiAgICAgICAgICAgICAgICAgIGFycl9sZW4gPSBhcnIubGVuZ3RoO1xuXG5cbiAgICAgICAgICAgIGlmIChhcnJfbGVuKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggSURzXG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCB6ID0gMCwgY2hlY2tfaWR4LCBpZDsgeiA8IGFycl9sZW47IHorKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlkID0gYXJyW3pdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGVjaykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tbaWRdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBpbiBsYXN0IHJvdW5kXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbc2l6ZSsrXSA9IGlkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2l6ZSA9PT0gbGltaXQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhc3QgcGF0aCBcImVuZCByZWFjaGVkXCJcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeCB8fCBzdWdnZXN0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tfbmV3W2lkXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSAvKiBhcHBlbmQ6ICovIC8qIHNraXAgdXBkYXRlOiAqLyAvKiBza2lwX3VwZGF0ZTogKi8hMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1Z2dlc3QpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrX2lkeCA9IChjaGVja19zdWdnZXN0W2lkXSB8fCAwKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tfc3VnZ2VzdFtpZF0gPSBjaGVja19pZHg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkbyBub3QgYWRkaW5nIElEcyB3aGljaCBhcmUgYWxyZWFkeSBpbmNsdWRlZCBpbiB0aGUgcmVzdWx0IChzYXZlcyBvbmUgbG9vcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgZmlyc3QgaW50ZXJzZWN0aW9uIG1hdGNoIGhhcyB0aGUgY2hlY2sgaW5kZXggMiwgc28gc2hpZnQgYnkgLTJcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja19pZHggPCBsZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBzdWdnZXN0W2NoZWNrX2lkeCAtIDJdIHx8IChzdWdnZXN0W2NoZWNrX2lkeCAtIDJdID0gW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXBbdG1wLmxlbmd0aF0gPSBpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByZS1maWxsIGluIGZpcnN0IHJvdW5kXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrX25ld1tpZF0gPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN1Z2dlc3QpIHtcblxuICAgICAgICAgICAgLy8gcmUtdXNlIHRoZSBmaXJzdCBwcmUtZmlsbGVkIGNoZWNrIGZvciBzdWdnZXN0aW9uc1xuXG4gICAgICAgICAgICBjaGVjayB8fCAoY2hlY2tfc3VnZ2VzdCA9IGNoZWNrX25ldyk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWZvdW5kKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrID0gY2hlY2tfbmV3O1xuICAgIH1cblxuICAgIGlmIChzdWdnZXN0KSB7XG5cbiAgICAgICAgLy8gbmVlZHMgdG8gaXRlcmF0ZSBpbiByZXZlcnNlIGRpcmVjdGlvblxuXG4gICAgICAgIGZvciAobGV0IHggPSBzdWdnZXN0Lmxlbmd0aCAtIDEsIGFyciwgbGVuOyAwIDw9IHg7IHgtLSkge1xuXG4gICAgICAgICAgICBhcnIgPSBzdWdnZXN0W3hdO1xuICAgICAgICAgICAgbGVuID0gYXJyLmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDAsIGlkOyB5IDwgbGVuOyB5KyspIHtcblxuICAgICAgICAgICAgICAgIGlkID0gYXJyW3ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFjaGVja1tpZF0pIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldC0tO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbc2l6ZSsrXSA9IGlkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2l6ZSA9PT0gbGltaXQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhc3QgcGF0aCBcImVuZCByZWFjaGVkXCJcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjaGVja1tpZF0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxyXG4gKiBAcGFyYW0gbWFuZGF0b3J5XHJcbiAqIEBwYXJhbSBhcnJheXNcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGludGVyc2VjdF91bmlvbihtYW5kYXRvcnksIGFycmF5cykge1xuICAgIGNvbnN0IGNoZWNrID0gY3JlYXRlX29iamVjdCgpLFxuICAgICAgICAgIHVuaW9uID0gY3JlYXRlX29iamVjdCgpLFxuICAgICAgICAgIHJlc3VsdCA9IFtdO1xuXG5cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IG1hbmRhdG9yeS5sZW5ndGg7IHgrKykge1xuXG4gICAgICAgIGNoZWNrW21hbmRhdG9yeVt4XV0gPSAxO1xuICAgIH1cblxuICAgIGZvciAobGV0IHggPSAwLCBhcnI7IHggPCBhcnJheXMubGVuZ3RoOyB4KyspIHtcblxuICAgICAgICBhcnIgPSBhcnJheXNbeF07XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDAsIGlkOyB5IDwgYXJyLmxlbmd0aDsgeSsrKSB7XG5cbiAgICAgICAgICAgIGlkID0gYXJyW3ldO1xuXG4gICAgICAgICAgICBpZiAoY2hlY2tbaWRdKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXVuaW9uW2lkXSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHVuaW9uW2lkXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IGlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiaW1wb3J0IHsgSW5kZXhJbnRlcmZhY2UgfSBmcm9tIFwiLi90eXBlLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVfb2JqZWN0LCBnZXRfa2V5cyB9IGZyb20gXCIuL2NvbW1vbi5qc1wiO1xuXG4vKipcclxuICogQHBhcmFtIHshc3RyaW5nfSBzdHJcclxuICogQHBhcmFtIHtib29sZWFufEFycmF5PHN0cmluZ3xSZWdFeHA+PX0gbm9ybWFsaXplXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbnxzdHJpbmd8UmVnRXhwPX0gc3BsaXRcclxuICogQHBhcmFtIHtib29sZWFuPX0gX2NvbGxhcHNlXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd8QXJyYXk8c3RyaW5nPn1cclxuICogQHRoaXMgSW5kZXhJbnRlcmZhY2VcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBwaXBlbGluZShzdHIsIG5vcm1hbGl6ZSwgc3BsaXQsIF9jb2xsYXBzZSkge1xuXG4gICAgaWYgKHN0cikge1xuXG4gICAgICAgIGlmIChub3JtYWxpemUpIHtcblxuICAgICAgICAgICAgc3RyID0gcmVwbGFjZShzdHIsIC8qKiBAdHlwZSB7QXJyYXk8c3RyaW5nfFJlZ0V4cD59ICovbm9ybWFsaXplKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1hdGNoZXIpIHtcblxuICAgICAgICAgICAgc3RyID0gcmVwbGFjZShzdHIsIHRoaXMubWF0Y2hlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdGVtbWVyICYmIDEgPCBzdHIubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgIHN0ciA9IHJlcGxhY2Uoc3RyLCB0aGlzLnN0ZW1tZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9jb2xsYXBzZSAmJiAxIDwgc3RyLmxlbmd0aCkge1xuXG4gICAgICAgICAgICBzdHIgPSBjb2xsYXBzZShzdHIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNwbGl0IHx8IFwiXCIgPT09IHNwbGl0KSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHdvcmRzID0gc3RyLnNwbGl0KCAvKiogQHR5cGUge3N0cmluZ3xSZWdFeHB9ICovc3BsaXQpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIgPyBmaWx0ZXIod29yZHMsIHRoaXMuZmlsdGVyKSA6IHdvcmRzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cjtcbn1cblxuLy8gVE9ETyBpbXByb3ZlIG5vcm1hbGl6ZSArIHJlbW92ZSBub24tZGVsaW1pdGVkIGNoYXJzIGxpa2UgaW4gXCJJJ21cIiArIHNwbGl0IG9uIHdoaXRlc3BhY2UrXG5cbmV4cG9ydCBjb25zdCByZWdleF93aGl0ZXNwYWNlID0gL1tcXHB7Wn1cXHB7U31cXHB7UH1cXHB7Q31dKy91O1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL25leHRhcHBzLWRlL2ZsZXhzZWFyY2gvcHVsbC80MTRcbi8vZXhwb3J0IGNvbnN0IHJlZ2V4X3doaXRlc3BhY2UgPSAvW1xcc1xceEEwXFx1MjAwMC1cXHUyMDBCXFx1MjAyOFxcdTIwMjlcXHUzMDAwXFx1ZmVmZiFcIiMkJSYnKCkqKyxcXC0uLzo7PD0+P0BbXFxcXFxcXV5fYHt8fX5dL1xuY29uc3QgcmVnZXhfbm9ybWFsaXplID0gL1tcXHUwMzAwLVxcdTAzNmZdL2c7XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemUoc3RyKSB7XG5cbiAgICBpZiAoc3RyLm5vcm1hbGl6ZSkge1xuXG4gICAgICAgIHN0ciA9IHN0ci5ub3JtYWxpemUoXCJORkRcIikucmVwbGFjZShyZWdleF9ub3JtYWxpemUsIFwiXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBzdHI7XG59XG5cbi8qKlxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IHN0clxyXG4gKiBAcGFyYW0ge2Jvb2xlYW58QXJyYXk8c3RyaW5nfFJlZ0V4cD49fSBub3JtYWxpemVcclxuICogQHBhcmFtIHtib29sZWFufHN0cmluZ3xSZWdFeHA9fSBzcGxpdFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBfY29sbGFwc2VcclxuICogQHJldHVybnMge3N0cmluZ3xBcnJheTxzdHJpbmc+fVxyXG4gKi9cblxuLy8gRmxleFNlYXJjaC5wcm90b3R5cGUucGlwZWxpbmUgPSBmdW5jdGlvbihzdHIsIG5vcm1hbGl6ZSwgc3BsaXQsIF9jb2xsYXBzZSl7XG4vL1xuLy8gICAgIGlmKHN0cil7XG4vL1xuLy8gICAgICAgICBpZihub3JtYWxpemUgJiYgc3RyKXtcbi8vXG4vLyAgICAgICAgICAgICBzdHIgPSByZXBsYWNlKHN0ciwgLyoqIEB0eXBlIHtBcnJheTxzdHJpbmd8UmVnRXhwPn0gKi8gKG5vcm1hbGl6ZSkpO1xuLy8gICAgICAgICB9XG4vL1xuLy8gICAgICAgICBpZihzdHIgJiYgdGhpcy5tYXRjaGVyKXtcbi8vXG4vLyAgICAgICAgICAgICBzdHIgPSByZXBsYWNlKHN0ciwgdGhpcy5tYXRjaGVyKTtcbi8vICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgaWYodGhpcy5zdGVtbWVyICYmIHN0ci5sZW5ndGggPiAxKXtcbi8vXG4vLyAgICAgICAgICAgICBzdHIgPSByZXBsYWNlKHN0ciwgdGhpcy5zdGVtbWVyKTtcbi8vICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgaWYoX2NvbGxhcHNlICYmIHN0ci5sZW5ndGggPiAxKXtcbi8vXG4vLyAgICAgICAgICAgICBzdHIgPSBjb2xsYXBzZShzdHIpO1xuLy8gICAgICAgICB9XG4vL1xuLy8gICAgICAgICBpZihzdHIpe1xuLy9cbi8vICAgICAgICAgICAgIGlmKHNwbGl0IHx8IChzcGxpdCA9PT0gXCJcIikpe1xuLy9cbi8vICAgICAgICAgICAgICAgICBjb25zdCB3b3JkcyA9IHN0ci5zcGxpdCgvKiogQHR5cGUge3N0cmluZ3xSZWdFeHB9ICovIChzcGxpdCkpO1xuLy9cbi8vICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIgPyBmaWx0ZXIod29yZHMsIHRoaXMuZmlsdGVyKSA6IHdvcmRzO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy9cbi8vICAgICByZXR1cm4gc3RyO1xuLy8gfTtcblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHBpcGVsaW5lKHN0ciwgbm9ybWFsaXplLCBtYXRjaGVyLCBzdGVtbWVyLCBzcGxpdCwgX2ZpbHRlciwgX2NvbGxhcHNlKXtcbi8vXG4vLyAgICAgaWYoc3RyKXtcbi8vXG4vLyAgICAgICAgIGlmKG5vcm1hbGl6ZSAmJiBzdHIpe1xuLy9cbi8vICAgICAgICAgICAgIHN0ciA9IHJlcGxhY2Uoc3RyLCBub3JtYWxpemUpO1xuLy8gICAgICAgICB9XG4vL1xuLy8gICAgICAgICBpZihtYXRjaGVyICYmIHN0cil7XG4vL1xuLy8gICAgICAgICAgICAgc3RyID0gcmVwbGFjZShzdHIsIG1hdGNoZXIpO1xuLy8gICAgICAgICB9XG4vL1xuLy8gICAgICAgICBpZihzdGVtbWVyICYmIHN0ci5sZW5ndGggPiAxKXtcbi8vXG4vLyAgICAgICAgICAgICBzdHIgPSByZXBsYWNlKHN0ciwgc3RlbW1lcik7XG4vLyAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgIGlmKF9jb2xsYXBzZSAmJiBzdHIubGVuZ3RoID4gMSl7XG4vL1xuLy8gICAgICAgICAgICAgc3RyID0gY29sbGFwc2Uoc3RyKTtcbi8vICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgaWYoc3RyKXtcbi8vXG4vLyAgICAgICAgICAgICBpZihzcGxpdCAhPT0gZmFsc2Upe1xuLy9cbi8vICAgICAgICAgICAgICAgICBzdHIgPSBzdHIuc3BsaXQoc3BsaXQpO1xuLy9cbi8vICAgICAgICAgICAgICAgICBpZihfZmlsdGVyKXtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgIHN0ciA9IGZpbHRlcihzdHIsIF9maWx0ZXIpO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vXG4vLyAgICAgcmV0dXJuIHN0cjtcbi8vIH1cblxuXG4vKipcclxuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSB3b3Jkc1xyXG4gKiBAcmV0dXJucyB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn1cclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0X2ZpbHRlcih3b3Jkcykge1xuXG4gICAgY29uc3QgZmlsdGVyID0gY3JlYXRlX29iamVjdCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IHdvcmRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgZmlsdGVyW3dvcmRzW2ldXSA9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbHRlcjtcbn1cblxuLyoqXHJcbiAqIEBwYXJhbSB7IU9iamVjdDxzdHJpbmcsIHN0cmluZz59IG9ialxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzX3N0ZW1tZXJcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRfc3RlbW1lcl9vcl9tYXRjaGVyKG9iaiwgaXNfc3RlbW1lcikge1xuICAgIGNvbnN0IGtleXMgPSBnZXRfa2V5cyhvYmopLFxuICAgICAgICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoLFxuICAgICAgICAgIGZpbmFsID0gW107XG5cblxuICAgIGxldCByZW1vdmFsID0gXCJcIixcbiAgICAgICAgY291bnQgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGtleSwgdG1wOyBpIDwgbGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICB0bXAgPSBvYmpba2V5XTtcblxuICAgICAgICBpZiAodG1wKSB7XG5cbiAgICAgICAgICAgIGZpbmFsW2NvdW50KytdID0gcmVnZXgoaXNfc3RlbW1lciA/IFwiKD8hXFxcXGIpXCIgKyBrZXkgKyBcIihcXFxcYnxfKVwiIDoga2V5KTtcbiAgICAgICAgICAgIGZpbmFsW2NvdW50KytdID0gdG1wO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZW1vdmFsICs9IChyZW1vdmFsID8gXCJ8XCIgOiBcIlwiKSArIGtleTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW1vdmFsKSB7XG5cbiAgICAgICAgZmluYWxbY291bnQrK10gPSByZWdleChpc19zdGVtbWVyID8gXCIoPyFcXFxcYikoXCIgKyByZW1vdmFsICsgXCIpKFxcXFxifF8pXCIgOiBcIihcIiArIHJlbW92YWwgKyBcIilcIik7XG4gICAgICAgIGZpbmFsW2NvdW50XSA9IFwiXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbmFsO1xufVxuXG4vKipcclxuICogQHBhcmFtIHshc3RyaW5nfSBzdHJcclxuICogQHBhcmFtIHtBcnJheX0gcmVnZXhwXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShzdHIsIHJlZ2V4cCkge1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHJlZ2V4cC5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMikge1xuXG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKHJlZ2V4cFtpXSwgcmVnZXhwW2kgKyAxXSk7XG5cbiAgICAgICAgaWYgKCFzdHIpIHtcblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RyO1xufVxuXG4vKipcclxuICogQHBhcmFtIHshc3RyaW5nfSBzdHJcclxuICogQHJldHVybnMge1JlZ0V4cH1cclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByZWdleChzdHIpIHtcblxuICAgIHJldHVybiBuZXcgUmVnRXhwKHN0ciwgXCJnXCIpO1xufVxuXG4vKipcclxuICogUmVnZXg6IHJlcGxhY2UoLyg/OihcXHcpKD86XFwxKSopL2csIFwiJDFcIilcclxuICogQHBhcmFtIHshc3RyaW5nfSBzdHJpbmdcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsYXBzZShzdHJpbmcpIHtcblxuICAgIGxldCBmaW5hbCA9IFwiXCIsXG4gICAgICAgIHByZXYgPSBcIlwiO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHN0cmluZy5sZW5ndGgsIGNoYXI7IGkgPCBsZW47IGkrKykge1xuXG4gICAgICAgIGlmICgoY2hhciA9IHN0cmluZ1tpXSkgIT09IHByZXYpIHtcblxuICAgICAgICAgICAgZmluYWwgKz0gcHJldiA9IGNoYXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmluYWw7XG59XG5cbi8vIFRPRE8gdXNpbmcgZmFzdC1zd2FwXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyKHdvcmRzLCBtYXApIHtcbiAgICBjb25zdCBsZW5ndGggPSB3b3Jkcy5sZW5ndGgsXG4gICAgICAgICAgZmlsdGVyZWQgPSBbXTtcblxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGNvdW50ID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgY29uc3Qgd29yZCA9IHdvcmRzW2ldO1xuXG4gICAgICAgIGlmICh3b3JkICYmICFtYXBbd29yZF0pIHtcblxuICAgICAgICAgICAgZmlsdGVyZWRbY291bnQrK10gPSB3b3JkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbHRlcmVkO1xufVxuXG4vLyBjb25zdCBjaGFycyA9IHthOjEsIGU6MSwgaToxLCBvOjEsIHU6MSwgeToxfTtcbi8vXG4vLyBmdW5jdGlvbiBjb2xsYXBzZV9yZXBlYXRpbmdfY2hhcnMoc3RyaW5nKXtcbi8vXG4vLyAgICAgbGV0IGNvbGxhcHNlZF9zdHJpbmcgPSBcIlwiLFxuLy8gICAgICAgICBjaGFyX3ByZXYgPSBcIlwiLFxuLy8gICAgICAgICBjaGFyX25leHQgPSBcIlwiO1xuLy9cbi8vICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgaSsrKXtcbi8vXG4vLyAgICAgICAgIGNvbnN0IGNoYXIgPSBzdHJpbmdbaV07XG4vL1xuLy8gICAgICAgICBpZihjaGFyICE9PSBjaGFyX3ByZXYpe1xuLy9cbi8vICAgICAgICAgICAgIGlmKGkgJiYgKGNoYXIgPT09IFwiaFwiKSl7XG4vL1xuLy8gICAgICAgICAgICAgICAgIGlmKChjaGFyc1tjaGFyX3ByZXZdICYmIGNoYXJzW2NoYXJfbmV4dF0pIHx8IChjaGFyX3ByZXYgPT09IFwiIFwiKSl7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICBjb2xsYXBzZWRfc3RyaW5nICs9IGNoYXI7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgZWxzZXtcbi8vXG4vLyAgICAgICAgICAgICAgICAgY29sbGFwc2VkX3N0cmluZyArPSBjaGFyO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vL1xuLy8gICAgICAgICBjaGFyX25leHQgPSAoXG4vL1xuLy8gICAgICAgICAgICAgKGkgPT09IChzdHJpbmcubGVuZ3RoIC0gMSkpID9cbi8vXG4vLyAgICAgICAgICAgICAgICAgXCJcIlxuLy8gICAgICAgICAgICAgOlxuLy8gICAgICAgICAgICAgICAgIHN0cmluZ1tpICsgMV1cbi8vICAgICAgICAgKTtcbi8vXG4vLyAgICAgICAgIGNoYXJfcHJldiA9IGNoYXI7XG4vLyAgICAgfVxuLy9cbi8vICAgICByZXR1cm4gY29sbGFwc2VkX3N0cmluZztcbi8vIH0iLCJpbXBvcnQgeyBJbmRleEludGVyZmFjZSB9IGZyb20gXCIuLi8uLi90eXBlLmpzXCI7XG5pbXBvcnQgeyBwaXBlbGluZSwgbm9ybWFsaXplLCByZWdleF93aGl0ZXNwYWNlIH0gZnJvbSBcIi4uLy4uL2xhbmcuanNcIjtcblxuZXhwb3J0IGNvbnN0IHJ0bCA9IC8qIG5vcm1hbGl6ZTogKi9cbi8qIGNvbGxhcHNlOiAqLyAvKiBub3JtYWxpemU6ICovIC8qIGNvbGxhcHNlOiAqLyAvKiBub3JtYWxpemU6ICovIC8qIGNvbGxhcHNlOiAqL1xuLyogbm9ybWFsaXplOiAqL1xuLyogY29sbGFwc2U6ICovITE7XG5leHBvcnQgY29uc3QgdG9rZW5pemUgPSBcIlwiO1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVuY29kZTogZW5jb2RlLFxuICAgIHJ0bDogITEsXG4gICAgdG9rZW5pemU6IFwiXCJcblxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBzdHJcclxuICAgICAqIEB0aGlzIEluZGV4SW50ZXJmYWNlXHJcbiAgICAgKi9cblxufTtleHBvcnQgZnVuY3Rpb24gZW5jb2RlKHN0cikge1xuXG4gICAgcmV0dXJuIHBpcGVsaW5lLmNhbGwodGhpcyxcbiAgICAvKiBzdHJpbmc6ICovKFwiXCIgKyBzdHIpLnRvTG93ZXJDYXNlKCksICExLCAvKiBzcGxpdDogKi9yZWdleF93aGl0ZXNwYWNlLCAhMSk7XG59IiwiXG5pbXBvcnQgeyBpc19zdHJpbmcgfSBmcm9tIFwiLi9jb21tb24uanNcIjtcblxuLyoqXHJcbiAqIEBlbnVtIHtPYmplY3R9XHJcbiAqIEBjb25zdFxyXG4gKi9cblxuY29uc3QgcHJlc2V0ID0ge1xuXG4gICAgbWVtb3J5OiB7XG4gICAgICAgIGNoYXJzZXQ6IFwibGF0aW46ZXh0cmFcIixcbiAgICAgICAgLy90b2tlbml6ZTogXCJzdHJpY3RcIixcbiAgICAgICAgcmVzb2x1dGlvbjogMyxcbiAgICAgICAgLy90aHJlc2hvbGQ6IDAsXG4gICAgICAgIG1pbmxlbmd0aDogNCxcbiAgICAgICAgZmFzdHVwZGF0ZTogLyogbm9ybWFsaXplOiAqLyAvKiBjb2xsYXBzZTogKi8gLyogbm9ybWFsaXplOiAqLyAvKiBjb2xsYXBzZTogKi8gLyogbm9ybWFsaXplOiAqLyAvKiBjb2xsYXBzZTogKi8gLyogbm9ybWFsaXplOiAqL1xuICAgICAgICAvKiBjb2xsYXBzZTogKi9cbiAgICAgICAgLyogY29sbGFwc2U6ICovITFcbiAgICB9LFxuXG4gICAgcGVyZm9ybWFuY2U6IHtcbiAgICAgICAgLy9jaGFyc2V0OiBcImxhdGluXCIsXG4gICAgICAgIC8vdG9rZW5pemU6IFwic3RyaWN0XCIsXG4gICAgICAgIHJlc29sdXRpb246IDMsXG4gICAgICAgIG1pbmxlbmd0aDogMyxcbiAgICAgICAgLy9mYXN0dXBkYXRlOiB0cnVlLFxuICAgICAgICBvcHRpbWl6ZTogITEsIC8vZmFzdHVwZGF0ZTogdHJ1ZSxcbiAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgZGVwdGg6IDIsIHJlc29sdXRpb246IDFcbiAgICAgICAgICAgIC8vYmlkaXJlY3Rpb25hbDogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBtYXRjaDoge1xuICAgICAgICBjaGFyc2V0OiBcImxhdGluOmV4dHJhXCIsXG4gICAgICAgIHRva2VuaXplOiBcInJldmVyc2VcIlxuICAgICAgICAvL3Jlc29sdXRpb246IDksXG4gICAgICAgIC8vdGhyZXNob2xkOiAwXG4gICAgfSxcblxuICAgIHNjb3JlOiB7XG4gICAgICAgIGNoYXJzZXQ6IFwibGF0aW46YWR2YW5jZWRcIixcbiAgICAgICAgLy90b2tlbml6ZTogXCJzdHJpY3RcIixcbiAgICAgICAgcmVzb2x1dGlvbjogMjAsXG4gICAgICAgIG1pbmxlbmd0aDogMyxcbiAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgZGVwdGg6IDMsXG4gICAgICAgICAgICByZXNvbHV0aW9uOiA5XG4gICAgICAgICAgICAvL2JpZGlyZWN0aW9uYWw6IHRydWVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkZWZhdWx0OiB7XG4gICAgICAgIC8vIGNoYXJzZXQ6IFwibGF0aW46ZGVmYXVsdFwiLFxuICAgICAgICAvLyB0b2tlbml6ZTogXCJzdHJpY3RcIixcbiAgICAgICAgLy8gcmVzb2x1dGlvbjogMyxcbiAgICAgICAgLy8gdGhyZXNob2xkOiAwLFxuICAgICAgICAvLyBkZXB0aDogM1xuICAgIH1cblxuICAgIC8vIFwiZmFzdFwiOiB7XG4gICAgLy8gICAgIC8vY2hhcnNldDogXCJsYXRpblwiLFxuICAgIC8vICAgICAvL3Rva2VuaXplOiBcInN0cmljdFwiLFxuICAgIC8vICAgICB0aHJlc2hvbGQ6IDgsXG4gICAgLy8gICAgIHJlc29sdXRpb246IDksXG4gICAgLy8gICAgIGRlcHRoOiAxXG4gICAgLy8gfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXBwbHlfcHJlc2V0KG9wdGlvbnMpIHtcblxuICAgIGlmIChpc19zdHJpbmcob3B0aW9ucykpIHtcblxuICAgICAgICBvcHRpb25zID0gcHJlc2V0W29wdGlvbnNdO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgY29uc3QgcHJlc2V0ID0gb3B0aW9ucy5wcmVzZXQ7XG5cbiAgICAgICAgaWYgKHByZXNldCkge1xuXG4gICAgICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcHJlc2V0W3ByZXNldF0sIC8qKiBAdHlwZSB7T2JqZWN0fSAqL29wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG59IiwiLy8gVE9ETyByZXR1cm4gcHJvbWlzZXMgaW5zdGVhZCBvZiBpbm5lciBhd2FpdFxuXG5pbXBvcnQgeyBJbmRleEludGVyZmFjZSwgRG9jdW1lbnRJbnRlcmZhY2UgfSBmcm9tIFwiLi90eXBlLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVfb2JqZWN0LCBpc19zdHJpbmcgfSBmcm9tIFwiLi9jb21tb24uanNcIjtcblxuZnVuY3Rpb24gYXN5bmMoY2FsbGJhY2ssIHNlbGYsIGZpZWxkLCBrZXksIGluZGV4X2RvYywgaW5kZXgsIGRhdGEsIG9uX2RvbmUpIHtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHJlcyA9IGNhbGxiYWNrKGZpZWxkID8gZmllbGQgKyBcIi5cIiArIGtleSA6IGtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXG4gICAgICAgIC8vIGF3YWl0IGlzbid0IHN1cHBvcnRlZCBieSBFUzVcblxuICAgICAgICBpZiAocmVzICYmIHJlcy50aGVuKSB7XG5cbiAgICAgICAgICAgIHJlcy50aGVuKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIHNlbGYuZXhwb3J0KGNhbGxiYWNrLCBzZWxmLCBmaWVsZCwgaW5kZXhfZG9jLCBpbmRleCArIDEsIG9uX2RvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHNlbGYuZXhwb3J0KGNhbGxiYWNrLCBzZWxmLCBmaWVsZCwgaW5kZXhfZG9jLCBpbmRleCArIDEsIG9uX2RvbmUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8qKlxyXG4gKiBAdGhpcyBJbmRleEludGVyZmFjZVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydEluZGV4KGNhbGxiYWNrLCBzZWxmLCBmaWVsZCwgaW5kZXhfZG9jLCBpbmRleCwgb25fZG9uZSkge1xuXG4gICAgbGV0IHJldHVybl92YWx1ZSA9IC8qIGFwcGVuZDogKi8gLyogc2tpcCB1cGRhdGU6ICovIC8qIHNraXBfdXBkYXRlOiAqLyAvKiBza2lwIHBvc3QtcHJvY2Vzc2luZzogKi8hMDtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgPT0gdHlwZW9mIG9uX2RvbmUpIHtcbiAgICAgICAgcmV0dXJuX3ZhbHVlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBvbl9kb25lID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGV0IGtleSwgZGF0YTtcblxuICAgIHN3aXRjaCAoaW5kZXggfHwgKGluZGV4ID0gMCkpIHtcblxuICAgICAgICBjYXNlIDA6XG5cbiAgICAgICAgICAgIGtleSA9IFwicmVnXCI7XG5cbiAgICAgICAgICAgIC8vIGZhc3R1cGRhdGUgaXNuJ3Qgc3VwcG9ydGVkIGJ5IGV4cG9ydFxuXG4gICAgICAgICAgICBpZiAodGhpcy5mYXN0dXBkYXRlKSB7XG5cbiAgICAgICAgICAgICAgICBkYXRhID0gY3JlYXRlX29iamVjdCgpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMucmVnaXN0ZXIpIHtcblxuICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5yZWdpc3RlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAxOlxuXG4gICAgICAgICAgICBrZXkgPSBcImNmZ1wiO1xuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBkb2M6IDAsXG4gICAgICAgICAgICAgICAgb3B0OiB0aGlzLm9wdGltaXplID8gMSA6IDBcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjpcblxuICAgICAgICAgICAga2V5ID0gXCJtYXBcIjtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLm1hcDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzpcblxuICAgICAgICAgICAga2V5ID0gXCJjdHhcIjtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmN0eDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICAgIGlmICgndW5kZWZpbmVkJyA9PSB0eXBlb2YgZmllbGQgJiYgb25fZG9uZSkge1xuXG4gICAgICAgICAgICAgICAgb25fZG9uZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXN5bmMoY2FsbGJhY2ssIHNlbGYgfHwgdGhpcywgZmllbGQsIGtleSwgaW5kZXhfZG9jLCBpbmRleCwgZGF0YSwgb25fZG9uZSk7XG5cbiAgICByZXR1cm4gcmV0dXJuX3ZhbHVlO1xufVxuXG4vKipcclxuICogQHRoaXMgSW5kZXhJbnRlcmZhY2VcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbXBvcnRJbmRleChrZXksIGRhdGEpIHtcblxuICAgIGlmICghZGF0YSkge1xuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNfc3RyaW5nKGRhdGEpKSB7XG5cbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgfVxuXG4gICAgc3dpdGNoIChrZXkpIHtcblxuICAgICAgICBjYXNlIFwiY2ZnXCI6XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW1pemUgPSAhIWRhdGEub3B0O1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInJlZ1wiOlxuXG4gICAgICAgICAgICAvLyBmYXN0dXBkYXRlIGlzbid0IHN1cHBvcnRlZCBieSBpbXBvcnRcblxuICAgICAgICAgICAgdGhpcy5mYXN0dXBkYXRlID0gLyogbm9ybWFsaXplOiAqLyAvKiBjb2xsYXBzZTogKi8gLyogbm9ybWFsaXplOiAqLyAvKiBjb2xsYXBzZTogKi8gLyogbm9ybWFsaXplOiAqLyAvKiBjb2xsYXBzZTogKi8gLyogbm9ybWFsaXplOiAqLyAvKiBjb2xsYXBzZTogKi8gLyogY29sbGFwc2U6ICovITE7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyID0gZGF0YTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJtYXBcIjpcblxuICAgICAgICAgICAgdGhpcy5tYXAgPSBkYXRhO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcImN0eFwiOlxuXG4gICAgICAgICAgICB0aGlzLmN0eCA9IGRhdGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG5cbi8qKlxyXG4gKiBAdGhpcyBEb2N1bWVudEludGVyZmFjZVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydERvY3VtZW50KGNhbGxiYWNrLCBzZWxmLCBmaWVsZCwgaW5kZXhfZG9jLCBpbmRleCwgb25fZG9uZSkge1xuXG4gICAgbGV0IHJldHVybl92YWx1ZTtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgPT0gdHlwZW9mIG9uX2RvbmUpIHtcbiAgICAgICAgcmV0dXJuX3ZhbHVlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBvbl9kb25lID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5kZXggfHwgKGluZGV4ID0gMCk7XG4gICAgaW5kZXhfZG9jIHx8IChpbmRleF9kb2MgPSAwKTtcblxuICAgIGlmIChpbmRleF9kb2MgPCB0aGlzLmZpZWxkLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRbaW5kZXhfZG9jXSxcbiAgICAgICAgICAgICAgaWR4ID0gdGhpcy5pbmRleFtmaWVsZF07XG5cblxuICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKCFpZHguZXhwb3J0KGNhbGxiYWNrLCBzZWxmLCBpbmRleCA/IGZpZWxkIC8qLnJlcGxhY2UoXCI6XCIsIFwiLVwiKSovIDogXCJcIiwgaW5kZXhfZG9jLCBpbmRleCsrLCBvbl9kb25lKSkge1xuXG4gICAgICAgICAgICAgICAgaW5kZXhfZG9jKys7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAxO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5leHBvcnQoY2FsbGJhY2ssIHNlbGYsIGZpZWxkLCBpbmRleF9kb2MsIGluZGV4LCBvbl9kb25lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcblxuICAgICAgICBsZXQga2V5LCBkYXRhO1xuXG4gICAgICAgIHN3aXRjaCAoaW5kZXgpIHtcblxuICAgICAgICAgICAgY2FzZSAxOlxuXG4gICAgICAgICAgICAgICAga2V5ID0gXCJ0YWdcIjtcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy50YWdpbmRleDtcbiAgICAgICAgICAgICAgICBmaWVsZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMjpcblxuICAgICAgICAgICAgICAgIGtleSA9IFwic3RvcmVcIjtcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5zdG9yZTtcbiAgICAgICAgICAgICAgICBmaWVsZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIGNhc2UgMzpcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgICAga2V5ID0gXCJyZWdcIjtcbiAgICAgICAgICAgIC8vICAgICBkYXRhID0gdGhpcy5yZWdpc3RlcjtcbiAgICAgICAgICAgIC8vICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgICAgICAgIG9uX2RvbmUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBhc3luYyhjYWxsYmFjaywgdGhpcywgZmllbGQsIGtleSwgaW5kZXhfZG9jLCBpbmRleCwgZGF0YSwgb25fZG9uZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldHVybl92YWx1ZTtcbn1cblxuLyoqXHJcbiAqIEB0aGlzIERvY3VtZW50SW50ZXJmYWNlXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW1wb3J0RG9jdW1lbnQoa2V5LCBkYXRhKSB7XG5cbiAgICBpZiAoIWRhdGEpIHtcblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzX3N0cmluZyhkYXRhKSkge1xuXG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgIH1cblxuICAgIHN3aXRjaCAoa2V5KSB7XG5cbiAgICAgICAgY2FzZSBcInRhZ1wiOlxuXG4gICAgICAgICAgICB0aGlzLnRhZ2luZGV4ID0gZGF0YTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJyZWdcIjpcblxuICAgICAgICAgICAgLy8gZmFzdHVwZGF0ZSBpc24ndCBzdXBwb3J0ZWQgYnkgaW1wb3J0XG5cbiAgICAgICAgICAgIHRoaXMuZmFzdHVwZGF0ZSA9ICExO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlciA9IGRhdGE7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBpbmRleDsgaSA8IHRoaXMuZmllbGQubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIGluZGV4ID0gdGhpcy5pbmRleFt0aGlzLmZpZWxkW2ldXTtcbiAgICAgICAgICAgICAgICBpbmRleC5yZWdpc3RlciA9IGRhdGE7XG4gICAgICAgICAgICAgICAgaW5kZXguZmFzdHVwZGF0ZSA9ICExO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwic3RvcmVcIjpcblxuICAgICAgICAgICAgdGhpcy5zdG9yZSA9IGRhdGE7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgICBrZXkgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgICAgICAgICAgY29uc3QgZmllbGQgPSBrZXlbMF07XG4gICAgICAgICAgICBrZXkgPSBrZXlbMV07XG5cbiAgICAgICAgICAgIGlmIChmaWVsZCAmJiBrZXkpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhbZmllbGRdLmltcG9ydChrZXksIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgIH1cbn0iLCIvKipcclxuICogQGludGVyZmFjZVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIEluZGV4SW50ZXJmYWNlKCkge1xuXG4gIHRoaXMuY2FjaGUgPSBudWxsO1xuICB0aGlzLm1hdGNoZXIgPSBudWxsO1xuICB0aGlzLnN0ZW1tZXIgPSBudWxsO1xuICB0aGlzLmZpbHRlciA9IG51bGw7XG59XG5cbi8qKlxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IHN0clxyXG4gKiBAcGFyYW0ge2Jvb2xlYW58QXJyYXk8c3RyaW5nfFJlZ0V4cD49fSBub3JtYWxpemVcclxuICogQHBhcmFtIHtib29sZWFufHN0cmluZ3xSZWdFeHA9fSBzcGxpdFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBjb2xsYXBzZVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfEFycmF5PHN0cmluZz59XHJcbiAqL1xuXG4vL0luZGV4SW50ZXJmYWNlLnByb3RvdHlwZS5waXBlbGluZTtcblxuLyoqXHJcbiAqIEBwYXJhbSB7IW51bWJlcnxzdHJpbmd9IGlkXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gY29udGVudFxyXG4gKi9cblxuSW5kZXhJbnRlcmZhY2UucHJvdG90eXBlLmFkZDtcblxuLyoqXHJcbiAqIEBwYXJhbSB7IW51bWJlcnxzdHJpbmd9IGlkXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gY29udGVudFxyXG4gKi9cblxuSW5kZXhJbnRlcmZhY2UucHJvdG90eXBlLmFwcGVuZDtcblxuLyoqXHJcbiAqIEBwYXJhbSB7IXN0cmluZ3xPYmplY3R9IHF1ZXJ5XHJcbiAqIEBwYXJhbSB7bnVtYmVyfE9iamVjdD19IGxpbWl0XHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAcmV0dXJucyB7QXJyYXk8bnVtYmVyfHN0cmluZz59XHJcbiAqL1xuXG5JbmRleEludGVyZmFjZS5wcm90b3R5cGUuc2VhcmNoO1xuXG4vKipcclxuICogQHBhcmFtIHshbnVtYmVyfHN0cmluZ30gaWRcclxuICogQHBhcmFtIHshc3RyaW5nfSBjb250ZW50XHJcbiAqL1xuXG5JbmRleEludGVyZmFjZS5wcm90b3R5cGUudXBkYXRlO1xuXG4vKipcclxuICogQHBhcmFtIHshbnVtYmVyfHN0cmluZ30gaWRcclxuICovXG5cbkluZGV4SW50ZXJmYWNlLnByb3RvdHlwZS5yZW1vdmU7XG5cbi8qKlxyXG4gKiBAaW50ZXJmYWNlXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gRG9jdW1lbnRJbnRlcmZhY2UoKSB7XG5cbiAgdGhpcy5maWVsZCA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIEluZGV4SW50ZXJmYWNlICovXG4gIHRoaXMuaW5kZXggPSBudWxsO1xufSIsImltcG9ydCBJbmRleCBmcm9tIFwiLi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgZGF0YSA9IGRhdGEuZGF0YTtcblxuICAgICAgICAgICAgLyoqIEB0eXBlIEluZGV4ICovXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHNlbGYuX2luZGV4LFxuICAgICAgICAgICAgICAgICAgYXJncyA9IGRhdGEuYXJncyxcbiAgICAgICAgICAgICAgICAgIHRhc2sgPSBkYXRhLnRhc2s7XG5cblxuICAgICAgICAgICAgc3dpdGNoICh0YXNrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpbml0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0gZGF0YS5vcHRpb25zIHx8IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjdG9yeSA9IGRhdGEuZmFjdG9yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuY29kZSA9IG9wdGlvbnMuZW5jb2RlO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY2FjaGUgPSAvKiBub3JtYWxpemU6ICovIC8qIGNvbGxhcHNlOiAqLyAvKiBub3JtYWxpemU6ICovXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIGNvbGxhcHNlOiAqLyAvKiBub3JtYWxpemU6ICovIC8qIGNvbGxhcHNlOiAqLyAvKiBub3JtYWxpemU6ICovIC8qIGNvbGxhcHNlOiAqLyAvKiBjb2xsYXBzZTogKi8hMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVuY29kZSAmJiAwID09PSBlbmNvZGUuaW5kZXhPZihcImZ1bmN0aW9uXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmVuY29kZSA9IEZ1bmN0aW9uKFwicmV0dXJuIFwiICsgZW5jb2RlKSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmFjdG9yeSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBleHBvcnQgdGhlIEZsZXhTZWFyY2ggZ2xvYmFsIHBheWxvYWQgdG8gXCJzZWxmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZ1bmN0aW9uKFwicmV0dXJuIFwiICsgZmFjdG9yeSkoKShzZWxmKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqIEB0eXBlIEluZGV4ICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9pbmRleCA9IG5ldyBzZWxmLkZsZXhTZWFyY2guSW5kZXgob3B0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlc3Ryb3kgdGhlIGV4cG9ydGVkIHBheWxvYWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzZWxmLkZsZXhTZWFyY2g7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9pbmRleCA9IG5ldyBJbmRleChvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZCA9IGRhdGEuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gaW5kZXhbdGFza10uYXBwbHkoaW5kZXgsIGFyZ3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZShcInNlYXJjaFwiID09PSB0YXNrID8geyBpZDogaWQsIG1zZzogbWVzc2FnZSB9IDogeyBpZDogaWQgfSk7XG4gICAgICAgICAgICB9XG59IiwiLy9pbXBvcnQgeyBwcm9taXNlIGFzIFByb21pc2UgfSBmcm9tIFwiLi4vcG9seWZpbGwuanNcIjtcbmltcG9ydCB7IGNyZWF0ZV9vYmplY3QsIGlzX2Z1bmN0aW9uLCBpc19vYmplY3QsIGlzX3N0cmluZyB9IGZyb20gXCIuLi9jb21tb24uanNcIjtcbmltcG9ydCBoYW5kbGVyIGZyb20gXCIuL2hhbmRsZXIuanNcIjtcblxubGV0IHBpZCA9IDA7XG5cbi8qKlxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xuXG5mdW5jdGlvbiBXb3JrZXJJbmRleChvcHRpb25zKSB7XG5cbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgV29ya2VySW5kZXgpKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBXb3JrZXJJbmRleChvcHRpb25zKTtcbiAgICB9XG5cbiAgICBsZXQgb3B0O1xuXG4gICAgaWYgKG9wdGlvbnMpIHtcblxuICAgICAgICBpZiAoaXNfZnVuY3Rpb24ob3B0ID0gb3B0aW9ucy5lbmNvZGUpKSB7XG5cbiAgICAgICAgICAgIG9wdGlvbnMuZW5jb2RlID0gb3B0LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICAvLyB0aGUgZmFjdG9yeSBpcyB0aGUgb3V0ZXIgd3JhcHBlciBmcm9tIHRoZSBidWlsZFxuICAgIC8vIHdlIHVzZSBcInNlbGZcIiBhcyBhIHRyYXAgZm9yIG5vZGUuanNcblxuICAgIGxldCBmYWN0b3J5ID0gKHNlbGYgfHwgd2luZG93KS5fZmFjdG9yeTtcblxuICAgIGlmIChmYWN0b3J5KSB7XG5cbiAgICAgICAgZmFjdG9yeSA9IGZhY3RvcnkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc19ub2RlX2pzID0gXCJ1bmRlZmluZWRcIiA9PSB0eXBlb2Ygd2luZG93ICYmIHNlbGYuZXhwb3J0cyxcbiAgICAgICAgICBfc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLndvcmtlciA9IGNyZWF0ZShmYWN0b3J5LCBpc19ub2RlX2pzLCBvcHRpb25zLndvcmtlcik7XG4gICAgdGhpcy5yZXNvbHZlciA9IGNyZWF0ZV9vYmplY3QoKTtcblxuICAgIGlmICghdGhpcy53b3JrZXIpIHtcblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzX25vZGVfanMpIHtcblxuICAgICAgICB0aGlzLndvcmtlci5vbihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24gKG1zZykge1xuXG4gICAgICAgICAgICBfc2VsZi5yZXNvbHZlclttc2cuaWRdKG1zZy5tc2cpO1xuICAgICAgICAgICAgZGVsZXRlIF9zZWxmLnJlc29sdmVyW21zZy5pZF07XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgdGhpcy53b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24gKG1zZykge1xuXG4gICAgICAgICAgICBtc2cgPSBtc2cuZGF0YTtcbiAgICAgICAgICAgIF9zZWxmLnJlc29sdmVyW21zZy5pZF0obXNnLm1zZyk7XG4gICAgICAgICAgICBkZWxldGUgX3NlbGYucmVzb2x2ZXJbbXNnLmlkXTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLndvcmtlci5wb3N0TWVzc2FnZSh7XG5cbiAgICAgICAgdGFzazogXCJpbml0XCIsXG4gICAgICAgIGZhY3Rvcnk6IGZhY3RvcnksXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgV29ya2VySW5kZXg7XG5cbnJlZ2lzdGVyKFwiYWRkXCIpO1xucmVnaXN0ZXIoXCJhcHBlbmRcIik7XG5yZWdpc3RlcihcInNlYXJjaFwiKTtcbnJlZ2lzdGVyKFwidXBkYXRlXCIpO1xucmVnaXN0ZXIoXCJyZW1vdmVcIik7XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyKGtleSkge1xuXG4gICAgV29ya2VySW5kZXgucHJvdG90eXBlW2tleV0gPSBXb3JrZXJJbmRleC5wcm90b3R5cGVba2V5ICsgXCJBc3luY1wiXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICAgIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgICAgICAgICAgIGFyZyA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcblxuICAgICAgICBsZXQgY2FsbGJhY2s7XG5cbiAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGFyZykpIHtcblxuICAgICAgICAgICAgY2FsbGJhY2sgPSBhcmc7XG4gICAgICAgICAgICBhcmdzLnNwbGljZShhcmdzLmxlbmd0aCAtIDEsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgc2VsZi5yZXNvbHZlclsrK3BpZF0gPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgIHNlbGYud29ya2VyLnBvc3RNZXNzYWdlKHtcblxuICAgICAgICAgICAgICAgICAgICB0YXNrOiBrZXksXG4gICAgICAgICAgICAgICAgICAgIGlkOiBwaWQsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IGFyZ3NcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcblxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZShmYWN0b3J5LCBpc19ub2RlX2pzLCB3b3JrZXJfcGF0aCkge1xuXG4gICAgbGV0IHdvcmtlcjtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgd29ya2VyID0gaXNfbm9kZV9qcyA/IGV2YWwoJ25ldyAocmVxdWlyZShcIndvcmtlcl90aHJlYWRzXCIpW1wiV29ya2VyXCJdKShfX2Rpcm5hbWUgKyBcIi9ub2RlL25vZGUuanNcIiknKSA6IGZhY3RvcnkgPyBuZXcgV29ya2VyKFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW1wib25tZXNzYWdlPVwiICsgaGFuZGxlci50b1N0cmluZygpXSwgeyB0eXBlOiBcInRleHQvamF2YXNjcmlwdFwiIH0pKSkgOiBuZXcgV29ya2VyKGlzX3N0cmluZyh3b3JrZXJfcGF0aCkgPyB3b3JrZXJfcGF0aCA6IFwid29ya2VyL3dvcmtlci5qc1wiLCB7IHR5cGU6IFwibW9kdWxlXCIgfSk7XG4gICAgfSBjYXRjaCAoZSkge31cblxuICAgIHJldHVybiB3b3JrZXI7XG59IiwiaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gXCIuLi9zZWFyY2gvc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTZWFyY2hBcHBDb25maWcgfSBmcm9tIFwiLi4vc2VhcmNoL2FwcFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgTG9nRm4gPSAoLi4uYXJnczogYW55W10pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwQ29uZmlnIGV4dGVuZHMgQXBwbGljYXRpb24ge1xyXG4gIHN0YXRpYyBhcHBJZCA9ICdmb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaCc7XHJcbiAgcHVibGljIHNlYXJjaEJ1dHRvbkhUTUwgPSAgYFxyXG4gICAgPGEgY2xhc3M9J2NoYXJhY3Rlci1zZWFyY2gtaWNvbi1idXR0b24nPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtZncgZmEtc2VhcmNoXCI+PC9pPjwvYT5cclxuICBgO1xyXG5cclxuICBwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoe30pO1xyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlID0gbmV3IFNlYXJjaFNlcnZpY2UodGhpcy5sb2cpO1xyXG4gIH1cclxuICBcclxuXHJcbiAgcHJpdmF0ZSBsb2coLi4uYXJnczogYW55W10pIHtcclxuICAgIGNvbnNvbGUubG9nKCdDaGFyYWN0ZXJTZWFyY2ggfCcsIC4uLmFyZ3MpO1xyXG4gIH1cclxuXHJcblx0c3RhdGljIGdldCBkZWZhdWx0T3B0aW9ucygpIHtcclxuICAgIGNvbnN0IGRlZmF1bHRzID0gc3VwZXIuZGVmYXVsdE9wdGlvbnM7XHJcbiAgXHJcbiAgICBjb25zdCBvdmVycmlkZXMgPSB7XHJcbiAgICAgIGlkOiB0aGlzLmFwcElkLFxyXG4gICAgICB0aXRsZTogJ0NoYXJhY3RlciBTZWFyY2gnLFxyXG4gICAgICBjaGFyYWN0ZXI6IG51bGwsXHJcbiAgICB9O1xyXG4gIFxyXG4gICAgY29uc3QgbWVyZ2VkT3B0aW9ucyA9IGZvdW5kcnkudXRpbHMubWVyZ2VPYmplY3QoZGVmYXVsdHMsIG92ZXJyaWRlcyk7XHJcbiAgICBcclxuICAgIHJldHVybiBtZXJnZWRPcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uU2hlZXRSZW5kZXIoaHRtbDogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgYWN0b3I6IGFueSkge1xyXG4gICAgY29uc3QgY2hhcmFjdGVyRGV0YWlscyA9IGh0bWwuZmluZChgaDQud2luZG93LXRpdGxlYCk7XHJcbiAgICBjaGFyYWN0ZXJEZXRhaWxzLmFwcGVuZCh0aGlzLnNlYXJjaEJ1dHRvbkhUTUwpO1xyXG4gICAgdGhpcy5sb2coJ0xvYWRpbmcgY2hhcmFjdGVyJywgYWN0b3IpO1xyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLmxvYWRDaGFyYWN0ZXIoYWN0b3IpO1xyXG4gIFxyXG4gICAgaHRtbC5vbignY2xpY2snLCAnLmNoYXJhY3Rlci1zZWFyY2gtaWNvbi1idXR0b24nLCAoXykgPT4ge1xyXG4gICAgICBjb25zdCBuZXdXaW5kb3cgPSBuZXcgU2VhcmNoQXBwQ29uZmlnKGFjdG9yLCB0aGlzLnNlYXJjaFNlcnZpY2UsIHRoaXMubG9nKTtcclxuICAgICAgbmV3V2luZG93LnJlbmRlcih0cnVlLCB7Y2hhcmFjdGVyOiBhY3Rvcn0gYXMgdW5rbm93biBhcyBGb3JtQXBwbGljYXRpb25PcHRpb25zKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZVwiO1xyXG5pbXBvcnQgeyBMb2dGbiB9IGZyb20gXCIuLi9hcHAvYXBwXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VhcmNoQXBwQ29uZmlnIGV4dGVuZHMgRm9ybUFwcGxpY2F0aW9uIHtcclxuICBzdGF0aWMgc2VhcmNoQXBwSWQgPSAnZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gnO1xyXG5cclxuICBwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2U7XHJcblx0cHJpdmF0ZSBsb2c6IExvZ0ZuO1xyXG5cdHByaXZhdGUgY2hhcmFjdGVyO1xyXG5cdHByaXZhdGUgcXVlcnkgPSAnJztcclxuXHJcbiAgY29uc3RydWN0b3IoY2hhcmFjdGVyLCBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLCBsb2c6IExvZ0ZuKSB7XHJcbiAgICBzdXBlcih7fSk7XHJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBzZWFyY2hTZXJ2aWNlO1xyXG5cdFx0dGhpcy5sb2cgPSBsb2c7XHJcblx0XHR0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcjtcclxuXHR9XHJcblxyXG5cclxuXHRzdGF0aWMgZ2V0IGRlZmF1bHRPcHRpb25zKCkge1xyXG4gICAgY29uc3QgZGVmYXVsdHMgPSBzdXBlci5kZWZhdWx0T3B0aW9ucztcclxuICBcclxuICAgIGNvbnN0IG92ZXJyaWRlcyA9IHtcclxuICAgICAgaGVpZ2h0OiA2MDAsXHJcblx0XHRcdHdpZHRoOiA2MDAsXHJcbiAgICAgIGlkOiB0aGlzLnNlYXJjaEFwcElkLFxyXG4gICAgICB0ZW1wbGF0ZTogYG1vZHVsZXMvJHt0aGlzLnNlYXJjaEFwcElkfS90ZW1wbGF0ZXMvc2VhcmNoLXdpbmRvdy5oYnNgLFxyXG4gICAgICB0aXRsZTogJ0NoYXJhY3RlciBTZWFyY2gnLFxyXG4gICAgICBzdWJtaXRPbkNoYW5nZTogdHJ1ZSxcclxuICAgICAgY2xvc2VPblN1Ym1pdDogZmFsc2UsXHJcbiAgICB9O1xyXG4gIFxyXG4gICAgY29uc3QgbWVyZ2VkT3B0aW9ucyA9IGZvdW5kcnkudXRpbHMubWVyZ2VPYmplY3QoZGVmYXVsdHMsIG92ZXJyaWRlcyk7XHJcbiAgICBcclxuICAgIHJldHVybiBtZXJnZWRPcHRpb25zO1xyXG4gIH1cclxuXHJcblx0cHJvdGVjdGVkIGFzeW5jIF91cGRhdGVPYmplY3QoZXZlbnQpOiBQcm9taXNlPHZvaWQ+IHtcclxuXHRcdGlmIChldmVudC50eXBlID09XCJzdWJtaXRcIikge1xyXG5cdFx0XHR0aGlzLnF1ZXJ5ID0gZXZlbnQudGFyZ2V0WzBdLnZhbHVlO1xyXG5cdFx0XHR0aGlzLnJlbmRlcigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgZ2V0RGF0YSgpOiBQcm9taXNlPEZvcm1BcHBsaWNhdGlvbi5EYXRhPG9iamVjdCwgRm9ybUFwcGxpY2F0aW9uT3B0aW9ucz4+IHtcclxuXHRcdGNvbnN0IHNlYXJjaFJlc3VsdHMgPSB0aGlzLnNlYXJjaFNlcnZpY2VcclxuXHRcdFx0LnNlYXJjaENoYXJhY3Rlcih0aGlzLmNoYXJhY3Rlci5hY3Rvci5faWQsIHRoaXMucXVlcnkpXHJcblx0XHRcdC5zb3J0KChhLCBiKSA9PiBhLm9yZGVyIC0gYi5vcmRlcilcclxuXHRcdFx0Lm1hcChhc3luYyAocmVzdWx0KSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdC4uLnJlc3VsdCxcclxuXHRcdFx0XHRcdGVucmljaGVkRGVzY3JpcHRpb246IGF3YWl0IFRleHRFZGl0b3IuZW5yaWNoSFRNTChyZXN1bHQuZG9jLmRlc2NyaXB0aW9uKSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9KTtcclxuXHRcdHRoaXMubG9nKCdnZXQgZGF0YScsIHNlYXJjaFJlc3VsdHMpO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Y2hhcmFjdGVyOiB0aGlzLmNoYXJhY3RlcixcclxuXHRcdFx0cmVzdWx0czogYXdhaXQgUHJvbWlzZS5hbGwoc2VhcmNoUmVzdWx0cyksXHJcblx0XHR9IGFzIHVua25vd24gYXMgRm9ybUFwcGxpY2F0aW9uLkRhdGE8b2JqZWN0LCBGb3JtQXBwbGljYXRpb25PcHRpb25zPjtcclxuXHR9XHJcblxyXG5cdGFjdGl2YXRlTGlzdGVuZXJzKGh0bWw6IEpRdWVyeTxIVE1MRWxlbWVudD4pOiB2b2lkIHtcclxuXHJcblx0XHRodG1sLm9uKCdjbGljaycsICcuY2hhcmFjdGVyLXNlYXJjaC1yZXN1bHQgLnRpdGxlJywgKGV2ZW50KSA9PiB7XHJcblx0XHRcdFx0Ly8gR2V0IHRoZSBjbGlja2VkIGVsZW1lbnRcclxuXHRcdFx0XHRjb25zdCB0aXRsZSA9ICQoZXZlbnQudGFyZ2V0KTtcclxuXHJcblx0XHRcdFx0Ly8gRmluZCB0aGUgc2libGluZyBkZXNjcmlwdGlvbiBkaXYgYW5kIHRvZ2dsZSB0aGUgJ29wZW4nIGNsYXNzXHJcblx0XHRcdFx0dGl0bGUuc2libGluZ3MoJy5kZXNjcmlwdGlvbicpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG59IiwiaW1wb3J0IERvY3VtZW50IGZyb20gJ2ZsZXhzZWFyY2gvZGlzdC9tb2R1bGUvZG9jdW1lbnQnO1xyXG5pbXBvcnQgeyBMb2dGbiB9IGZyb20gJy4uL2FwcC9hcHAnO1xyXG5cclxuZXhwb3J0IHR5cGUgU2VhcmNoUmVzdWx0ID0ge1xyXG5cdGlkOiBzdHJpbmc7XHJcblx0ZmllbGRzOiBzdHJpbmdbXTtcclxuXHRvcmRlcjogbnVtYmVyO1xyXG5cdGRvYzoge1xyXG5cdFx0aWQ6IHN0cmluZztcclxuXHRcdHR5cGU6IHN0cmluZztcclxuXHRcdHRpdGxlOiBzdHJpbmc7XHJcblx0XHRkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG5cdH1cclxufVxyXG5cclxudHlwZSBSYXdTZWFyY2hSZXN1bHQgPSB7XHJcblx0ZmllbGQ6IHN0cmluZztcclxuXHRyZXN1bHQ6IHtcclxuXHRcdGlkOiBzdHJpbmc7XHJcblx0XHRkb2M6IHtcclxuXHRcdFx0aWQ6IHN0cmluZztcclxuXHRcdFx0dHlwZTogc3RyaW5nO1xyXG5cdFx0XHR0aXRsZTogc3RyaW5nO1xyXG5cdFx0XHRkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG5cdFx0fVxyXG5cdH1bXVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VydmljZSB7XHJcblx0cHVibGljIGluZGV4ZXM6IFJlY29yZDxzdHJpbmcsIERvY3VtZW50PjtcclxuXHRwcml2YXRlIGxvZzogTG9nRm47XHJcblxyXG5cdGNvbnN0cnVjdG9yKGxvZ2dlcjogTG9nRm4pIHtcclxuXHRcdHRoaXMuaW5kZXhlcyA9IHt9O1xyXG5cdFx0dGhpcy5sb2cgPSBsb2dnZXI7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBsb2FkQ2hhcmFjdGVyKGNoYXJhY3Rlcik6IHZvaWQge1xyXG5cclxuXHRcdHRoaXMuaW5kZXhlc1tjaGFyYWN0ZXIuYWN0b3IuX2lkXSA9IG5ldyBEb2N1bWVudCh7XHJcblx0XHRcdGRvY3VtZW50OiB7XHJcblx0XHRcdFx0aWQ6ICdpZCcsXHJcblx0XHRcdFx0dGFnOiAndHlwZScsXHJcblx0XHRcdFx0aW5kZXg6IFsndGl0bGUnLCAnZGVzY3JpcHRpb24nXSxcclxuXHRcdFx0XHRzdG9yZTogdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRcclxuXHRcdGNoYXJhY3Rlci5pdGVtcy5tYXAoKGl0ZW0pID0+IHtcclxuXHRcdFx0dGhpcy5pbmRleGVzW2NoYXJhY3Rlci5hY3Rvci5faWRdLmFkZCh7XHJcblx0XHRcdFx0aWQ6IGl0ZW0uX2lkLFxyXG5cdFx0XHRcdHR5cGU6IGl0ZW0udHlwZSxcclxuXHRcdFx0XHR0aXRsZTogaXRlbS5uYW1lLFxyXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiB0aGlzLmV4dHJhY3RUZXh0RnJvbUl0ZW0oaXRlbSlcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZXh0cmFjdFRleHRGcm9tSXRlbShpdGVtOiBhbnkpOiBzdHJpbmcge1xyXG5cdFx0Y29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xyXG5cclxuXHRcdGxldCBkZXNjcmlwdGlvbiA9IGl0ZW0/LnN5c3RlbT8uZGVzY3JpcHRpb24/LnZhbHVlIHx8ICcnO1xyXG5cdFx0XHRcdFxyXG5cdFx0aWYgKGRlc2NyaXB0aW9uKSB7XHJcblx0XHRcdGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoJzxib2R5PicrZGVzY3JpcHRpb24rJzwvYm9keT4nLCAndGV4dC9odG1sJyk7XHJcblx0XHRcdGRlc2NyaXB0aW9uID0gZG9jLmJvZHkuaW5uZXJUZXh0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghZGVzY3JpcHRpb24pIHtcclxuXHRcdFx0dGhpcy5sb2coJ05vIGRlc2NyaXB0aW9uIGZvdW5kIGZvciBpdGVtJywgaXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGRlc2NyaXB0aW9uO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNlYXJjaENoYXJhY3RlcihjaGFyYWN0ZXJJZDogc3RyaW5nLCBxdWVyeTogc3RyaW5nKTogU2VhcmNoUmVzdWx0W10ge1xyXG5cdFx0aWYgKCF0aGlzLmluZGV4ZXNbY2hhcmFjdGVySWRdKSB7XHJcblx0XHRcdHRoaXMubG9nKCdObyBpbmRleCBmb3VuZCBmb3IgY2hhcmFjdGVyJywgY2hhcmFjdGVySWQpO1xyXG5cdFx0XHRyZXR1cm4gW107XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgcmVzdWx0cyA9IHRoaXMuaW5kZXhlc1tjaGFyYWN0ZXJJZF0uc2VhcmNoKHF1ZXJ5LCB7ZW5yaWNoOiB0cnVlfSk7XHJcblxyXG5cdFx0dGhpcy5sb2coJ1NlYXJjaCByZXN1bHRzJywgcmVzdWx0cyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuZmxhdHRlblNlYXJjaFJlc3VsdHMocmVzdWx0cyk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGZsYXR0ZW5TZWFyY2hSZXN1bHRzKHJlc3VsdHM6IFJhd1NlYXJjaFJlc3VsdFtdKTogU2VhcmNoUmVzdWx0W10ge1xyXG5cdFx0Y29uc3QgZmxhdHRlbmVkU2VhcmNoUmVzdWx0czogU2VhcmNoUmVzdWx0W10gPSBbXTtcclxuXHJcblx0XHRyZXN1bHRzLm1hcCgocmVzdWx0QnlGaWVsZCkgPT4ge1xyXG5cdFx0XHRyZXN1bHRCeUZpZWxkLnJlc3VsdC5tYXAoKHNlYXJjaFJlc3VsdCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGV4aXN0aW5nUmVzdWx0ID0gZmxhdHRlbmVkU2VhcmNoUmVzdWx0cy5maW5kKChyZXN1bHQpID0+IHJlc3VsdC5pZCA9PT0gc2VhcmNoUmVzdWx0LmlkKTtcclxuXHRcdFx0XHRpZiAoZXhpc3RpbmdSZXN1bHQpIHtcclxuXHRcdFx0XHRcdGlmICghZXhpc3RpbmdSZXN1bHQuZmllbGRzLmluY2x1ZGVzKHJlc3VsdEJ5RmllbGQuZmllbGQpKSB7XHJcblx0XHRcdFx0XHRcdGV4aXN0aW5nUmVzdWx0LmZpZWxkcy5wdXNoKHJlc3VsdEJ5RmllbGQuZmllbGQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRmbGF0dGVuZWRTZWFyY2hSZXN1bHRzLnB1c2goe1xyXG5cdFx0XHRcdFx0XHRpZDogc2VhcmNoUmVzdWx0LmlkLFxyXG5cdFx0XHRcdFx0XHRmaWVsZHM6IFtyZXN1bHRCeUZpZWxkLmZpZWxkXSxcclxuXHRcdFx0XHRcdFx0b3JkZXI6IHJlc3VsdEJ5RmllbGQuZmllbGQgPT09ICd0aXRsZSc/IDA6IDEsXHJcblx0XHRcdFx0XHRcdGRvYzogc2VhcmNoUmVzdWx0LmRvY1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBmbGF0dGVuZWRTZWFyY2hSZXN1bHRzO1xyXG5cdH1cclxuXHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEFwcENvbmZpZyB9IGZyb20gJy4vYXBwL2FwcCc7XHJcblxyXG5sZXQgYXBwOiBhbnk7XHJcblxyXG5Ib29rcy5vbmNlKCdpbml0JywgKCkgPT4ge1xyXG4gIGFwcCA9IG5ldyBBcHBDb25maWcoKTtcclxufSk7XHJcblxyXG5Ib29rcy5vbigncmVuZGVyQ2hhcmFjdGVyU2hlZXRQRjJlJywgKF8sIGh0bWwsIGRhdGEpID0+IHtcclxuXHRhcHAub25TaGVldFJlbmRlcihodG1sLCBkYXRhKTtcclxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
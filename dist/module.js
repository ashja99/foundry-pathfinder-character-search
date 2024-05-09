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

/***/ "./src/search/flexsearch.ts":
/*!**********************************!*\
  !*** ./src/search/flexsearch.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Flexsearch)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/search/types.ts");
/* harmony import */ var flexsearch_dist_module_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flexsearch/dist/module/document */ "./node_modules/flexsearch/dist/module/document.js");


function flattenSearchResults(results) {
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
class FlexsearchIndex {
    constructor(logger) {
        this.logger = logger;
        this.index = new flexsearch_dist_module_document__WEBPACK_IMPORTED_MODULE_1__["default"]({
            document: {
                id: 'id',
                tag: 'type',
                index: ['title', 'description'],
                store: true
            },
            tokenize: 'strict',
            context: true,
            language: 'en',
        });
    }
    add({ id, type, title, description }) {
        this.index.add({
            id,
            type,
            title,
            description
        });
    }
    search(query) {
        const results = this.index.search(query, { enrich: true });
        if (!results)
            this.logger('No search results found for query', query);
        return flattenSearchResults(results);
    }
}
class Flexsearch extends _types__WEBPACK_IMPORTED_MODULE_0__.SearchProvider {
    newIndex() {
        return new FlexsearchIndex(this.logger);
    }
}


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
/* harmony import */ var _flexsearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flexsearch */ "./src/search/flexsearch.ts");

class SearchService {
    constructor(logger) {
        this.indexes = {};
        this.log = logger;
        // Update this line to use a difference search provider
        this.searchProvider = new _flexsearch__WEBPACK_IMPORTED_MODULE_0__["default"]({ logger });
    }
    loadCharacter(character) {
        this.indexes[character.actor._id] = this.searchProvider.newIndex();
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
        const results = this.indexes[characterId].search(query);
        this.log('Search results', results);
        return results;
    }
}


/***/ }),

/***/ "./src/search/types.ts":
/*!*****************************!*\
  !*** ./src/search/types.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchProvider: () => (/* binding */ SearchProvider)
/* harmony export */ });
class SearchProvider {
    constructor({ logger }) {
        this.logger = logger;
    }
    ;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDO0FBRUgsS0FBSyxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDdEQsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL25vZGVfbW9kdWxlcy9mbGV4c2VhcmNoL2Rpc3QvbW9kdWxlL2FzeW5jLmpzIiwid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoLy4vbm9kZV9tb2R1bGVzL2ZsZXhzZWFyY2gvZGlzdC9tb2R1bGUvY2FjaGUuanMiLCJ3ZWJwYWNrOi8vZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gvLi9ub2RlX21vZHVsZXMvZmxleHNlYXJjaC9kaXN0L21vZHVsZS9jb21tb24uanMiLCJ3ZWJwYWNrOi8vZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gvLi9ub2RlX21vZHVsZXMvZmxleHNlYXJjaC9kaXN0L21vZHVsZS9kb2N1bWVudC5qcyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL25vZGVfbW9kdWxlcy9mbGV4c2VhcmNoL2Rpc3QvbW9kdWxlL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL25vZGVfbW9kdWxlcy9mbGV4c2VhcmNoL2Rpc3QvbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoLy4vbm9kZV9tb2R1bGVzL2ZsZXhzZWFyY2gvZGlzdC9tb2R1bGUvaW50ZXJzZWN0LmpzIiwid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoLy4vbm9kZV9tb2R1bGVzL2ZsZXhzZWFyY2gvZGlzdC9tb2R1bGUvbGFuZy5qcyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL25vZGVfbW9kdWxlcy9mbGV4c2VhcmNoL2Rpc3QvbW9kdWxlL2xhbmcvbGF0aW4vZGVmYXVsdC5qcyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL25vZGVfbW9kdWxlcy9mbGV4c2VhcmNoL2Rpc3QvbW9kdWxlL3ByZXNldC5qcyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL25vZGVfbW9kdWxlcy9mbGV4c2VhcmNoL2Rpc3QvbW9kdWxlL3NlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL25vZGVfbW9kdWxlcy9mbGV4c2VhcmNoL2Rpc3QvbW9kdWxlL3R5cGUuanMiLCJ3ZWJwYWNrOi8vZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gvLi9ub2RlX21vZHVsZXMvZmxleHNlYXJjaC9kaXN0L21vZHVsZS93b3JrZXIvaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL25vZGVfbW9kdWxlcy9mbGV4c2VhcmNoL2Rpc3QvbW9kdWxlL3dvcmtlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC8uL3NyYy9hcHAvYXBwLnRzIiwid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoLy4vc3JjL3NlYXJjaC9hcHAudHMiLCJ3ZWJwYWNrOi8vZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gvLi9zcmMvc2VhcmNoL2ZsZXhzZWFyY2gudHMiLCJ3ZWJwYWNrOi8vZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gvLi9zcmMvc2VhcmNoL3NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gvLi9zcmMvc2VhcmNoL3R5cGVzLnRzIiwid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5kZXhJbnRlcmZhY2UsIERvY3VtZW50SW50ZXJmYWNlIH0gZnJvbSBcIi4vdHlwZS5qc1wiO1xuLy9pbXBvcnQgeyBwcm9taXNlIGFzIFByb21pc2UgfSBmcm9tIFwiLi9wb2x5ZmlsbC5qc1wiO1xuaW1wb3J0IHsgaXNfZnVuY3Rpb24sIGlzX29iamVjdCwgaXNfc3RyaW5nIH0gZnJvbSBcIi4vY29tbW9uLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm90b3R5cGUpIHtcblxuICAgIHJlZ2lzdGVyKHByb3RvdHlwZSwgXCJhZGRcIik7XG4gICAgcmVnaXN0ZXIocHJvdG90eXBlLCBcImFwcGVuZFwiKTtcbiAgICByZWdpc3Rlcihwcm90b3R5cGUsIFwic2VhcmNoXCIpO1xuICAgIHJlZ2lzdGVyKHByb3RvdHlwZSwgXCJ1cGRhdGVcIik7XG4gICAgcmVnaXN0ZXIocHJvdG90eXBlLCBcInJlbW92ZVwiKTtcbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXIocHJvdG90eXBlLCBrZXkpIHtcblxuICAgIHByb3RvdHlwZVtrZXkgKyBcIkFzeW5jXCJdID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5kZXhJbnRlcmZhY2V8RG9jdW1lbnRJbnRlcmZhY2V9ICovXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgICBhcmdzID0gLypbXS5zbGljZS5jYWxsKi9hcmd1bWVudHMsXG4gICAgICAgICAgICAgIGFyZyA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcblxuICAgICAgICBsZXQgY2FsbGJhY2s7XG5cbiAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGFyZykpIHtcblxuICAgICAgICAgICAgY2FsbGJhY2sgPSBhcmc7XG4gICAgICAgICAgICBkZWxldGUgYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgc2VsZi5hc3luYyA9ICEwO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHNlbGZba2V5XS5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgICAgICAgICBzZWxmLmFzeW5jID0gITE7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oY2FsbGJhY2spO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICB9XG4gICAgfTtcbn0iLCJpbXBvcnQgeyBJbmRleEludGVyZmFjZSwgRG9jdW1lbnRJbnRlcmZhY2UgfSBmcm9tIFwiLi90eXBlLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVfb2JqZWN0LCBpc19vYmplY3QgfSBmcm9tIFwiLi9jb21tb24uanNcIjtcblxuLyoqXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbnxudW1iZXI9fSBsaW1pdFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXG5cbmZ1bmN0aW9uIENhY2hlQ2xhc3MobGltaXQpIHtcblxuICAgIC8qKiBAcHJpdmF0ZSAqL1xuICAgIHRoaXMubGltaXQgPSAhMCAhPT0gbGltaXQgJiYgbGltaXQ7XG5cbiAgICAvKiogQHByaXZhdGUgKi9cbiAgICB0aGlzLmNhY2hlID0gY3JlYXRlX29iamVjdCgpO1xuXG4gICAgLyoqIEBwcml2YXRlICovXG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xuXG4gICAgLy90aGlzLmNsZWFyKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhY2hlQ2xhc3M7XG5cbi8qKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IHF1ZXJ5XHJcbiAqIEBwYXJhbSB7bnVtYmVyfE9iamVjdD19IGxpbWl0XHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAdGhpcyB7SW5kZXhJbnRlcmZhY2V9XHJcbiAqIEByZXR1cm5zIHtBcnJheTxudW1iZXJ8c3RyaW5nPn1cclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hDYWNoZShxdWVyeSwgbGltaXQsIG9wdGlvbnMpIHtcblxuICAgIGlmIChpc19vYmplY3QocXVlcnkpKSB7XG5cbiAgICAgICAgcXVlcnkgPSBxdWVyeS5xdWVyeTtcbiAgICB9XG5cbiAgICBsZXQgY2FjaGUgPSB0aGlzLmNhY2hlLmdldChxdWVyeSk7XG5cbiAgICBpZiAoIWNhY2hlKSB7XG5cbiAgICAgICAgY2FjaGUgPSB0aGlzLnNlYXJjaChxdWVyeSwgbGltaXQsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNhY2hlLnNldChxdWVyeSwgY2FjaGUpO1xuICAgIH1cblxuICAgIHJldHVybiBjYWNoZTtcbn1cblxuLy8gQ2FjaGVDbGFzcy5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpe1xuLy9cbi8vICAgICAvKiogQHByaXZhdGUgKi9cbi8vICAgICB0aGlzLmNhY2hlID0gY3JlYXRlX29iamVjdCgpO1xuLy9cbi8vICAgICAvKiogQHByaXZhdGUgKi9cbi8vICAgICB0aGlzLnF1ZXVlID0gW107XG4vLyB9O1xuXG5DYWNoZUNsYXNzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXG4gICAgaWYgKCF0aGlzLmNhY2hlW2tleV0pIHtcblxuICAgICAgICAvLyBpdCBpcyBqdXN0IGEgc2hhbWUgdGhhdCBuYXRpdmUgZnVuY3Rpb24gYXJyYXkuc2hpZnQoKSBwZXJmb3JtcyBzbyBiYWRcblxuICAgICAgICAvLyBjb25zdCBsZW5ndGggPSB0aGlzLnF1ZXVlLmxlbmd0aDtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gdGhpcy5xdWV1ZVtsZW5ndGhdID0ga2V5O1xuICAgICAgICAvL1xuICAgICAgICAvLyBpZihsZW5ndGggPT09IHRoaXMubGltaXQpe1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgZGVsZXRlIHRoaXMuY2FjaGVbdGhpcy5xdWV1ZS5zaGlmdCgpXTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIHRoZSBzYW1lIGJhZCBwZXJmb3JtYW5jZVxuXG4gICAgICAgIC8vIHRoaXMucXVldWUudW5zaGlmdChrZXkpO1xuICAgICAgICAvL1xuICAgICAgICAvLyBpZih0aGlzLnF1ZXVlLmxlbmd0aCA9PT0gdGhpcy5saW1pdCl7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICB0aGlzLnF1ZXVlLnBvcCgpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gZmFzdCBpbXBsZW1lbnRhdGlvbiB2YXJpYW50XG5cbiAgICAgICAgLy8gbGV0IGxlbmd0aCA9IHRoaXMucXVldWUubGVuZ3RoO1xuICAgICAgICAvL1xuICAgICAgICAvLyBpZihsZW5ndGggPT09IHRoaXMubGltaXQpe1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgbGVuZ3RoLS07XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICBkZWxldGUgdGhpcy5jYWNoZVt0aGlzLnF1ZXVlWzBdXTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIGZvcihsZXQgeCA9IDA7IHggPCBsZW5ndGg7IHgrKyl7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5xdWV1ZVt4XSA9IHRoaXMucXVldWVbeCArIDFdO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIHRoaXMucXVldWVbbGVuZ3RoXSA9IGtleTtcblxuICAgICAgICAvLyBjdXJyZW50IGZhc3Rlc3QgaW1wbGVtZW50YXRpb24gdmFyaWFudFxuICAgICAgICAvLyB0aGVvcmV0aWNhbGx5IHRoYXQgc2hvdWxkIG5vdCBwZXJmb3JtIGJldHRlciBjb21wYXJlZCB0byB0aGUgZXhhbXBsZSBhYm92ZVxuXG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLnF1ZXVlLmxlbmd0aDtcblxuICAgICAgICBpZiAobGVuZ3RoID09PSB0aGlzLmxpbWl0KSB7XG5cbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlW3RoaXMucXVldWVbbGVuZ3RoIC0gMV1dO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBsZW5ndGgrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHggPSBsZW5ndGggLSAxOyAwIDwgeDsgeC0tKSB7XG5cbiAgICAgICAgICAgIHRoaXMucXVldWVbeF0gPSB0aGlzLnF1ZXVlW3ggLSAxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucXVldWVbMF0gPSBrZXk7XG4gICAgfVxuXG4gICAgdGhpcy5jYWNoZVtrZXldID0gdmFsdWU7XG59O1xuXG5DYWNoZUNsYXNzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG5cbiAgICBjb25zdCBjYWNoZSA9IHRoaXMuY2FjaGVba2V5XTtcblxuICAgIGlmICh0aGlzLmxpbWl0ICYmIGNhY2hlKSB7XG5cbiAgICAgICAgLy8gcHJvYmFibHkgdGhlIGluZGV4T2YoKSBtZXRob2QgcGVyZm9ybXMgZmFzdGVyIHdoZW4gbWF0Y2hlZCBjb250ZW50IGlzIG9uIGZyb250IChsZWZ0LXRvLXJpZ2h0KVxuICAgICAgICAvLyB1c2luZyBsYXN0SW5kZXhPZigpIGRvZXMgbm90IGhlbHAsIGl0IHBlcmZvcm1zIGFsbW9zdCBzbG93ZXJcblxuICAgICAgICBjb25zdCBwb3MgPSB0aGlzLnF1ZXVlLmluZGV4T2Yoa2V5KTtcblxuICAgICAgICAvLyBpZihwb3MgPCB0aGlzLnF1ZXVlLmxlbmd0aCAtIDEpe1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgY29uc3QgdG1wID0gdGhpcy5xdWV1ZVtwb3NdO1xuICAgICAgICAvLyAgICAgdGhpcy5xdWV1ZVtwb3NdID0gdGhpcy5xdWV1ZVtwb3MgKyAxXTtcbiAgICAgICAgLy8gICAgIHRoaXMucXVldWVbcG9zICsgMV0gPSB0bXA7XG4gICAgICAgIC8vIH1cblxuICAgICAgICBpZiAocG9zKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IHRoaXMucXVldWVbcG9zIC0gMV07XG4gICAgICAgICAgICB0aGlzLnF1ZXVlW3BvcyAtIDFdID0gdGhpcy5xdWV1ZVtwb3NdO1xuICAgICAgICAgICAgdGhpcy5xdWV1ZVtwb3NdID0gdG1wO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhY2hlO1xufTtcblxuQ2FjaGVDbGFzcy5wcm90b3R5cGUuZGVsID0gZnVuY3Rpb24gKGlkKSB7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgaXRlbSwga2V5OyBpIDwgdGhpcy5xdWV1ZS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGtleSA9IHRoaXMucXVldWVbaV07XG4gICAgICAgIGl0ZW0gPSB0aGlzLmNhY2hlW2tleV07XG5cbiAgICAgICAgaWYgKGl0ZW0uaW5jbHVkZXMoaWQpKSB7XG5cbiAgICAgICAgICAgIHRoaXMucXVldWUuc3BsaWNlKGktLSwgMSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jYWNoZVtrZXldO1xuICAgICAgICB9XG4gICAgfVxufTsiLCJleHBvcnQgZnVuY3Rpb24gcGFyc2Vfb3B0aW9uKHZhbHVlLCBkZWZhdWx0X3ZhbHVlKSB7XG5cbiAgICByZXR1cm4gXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgdmFsdWUgPyB2YWx1ZSA6IGRlZmF1bHRfdmFsdWU7XG59XG5cbi8qKlxyXG4gKiBAcGFyYW0geyFudW1iZXJ9IGNvdW50XHJcbiAqIEByZXR1cm5zIHtBcnJheTxPYmplY3Q+fVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV9vYmplY3RfYXJyYXkoY291bnQpIHtcblxuICAgIGNvbnN0IGFycmF5ID0gQXJyYXkoY291bnQpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG5cbiAgICAgICAgYXJyYXlbaV0gPSBjcmVhdGVfb2JqZWN0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlX2FycmF5cyhjb3VudCkge1xuXG4gICAgY29uc3QgYXJyYXkgPSBBcnJheShjb3VudCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcblxuICAgICAgICBhcnJheVtpXSA9IFtdO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheTtcbn1cblxuLyoqXHJcbiAqIEBwYXJhbSB7IU9iamVjdH0gb2JqXHJcbiAqIEByZXR1cm5zIHtBcnJheTxzdHJpbmc+fVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldF9rZXlzKG9iaikge1xuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVfb2JqZWN0KCkge1xuXG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25jYXQoYXJyYXlzKSB7XG5cbiAgICByZXR1cm4gW10uY29uY2F0LmFwcGx5KFtdLCBhcnJheXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc29ydF9ieV9sZW5ndGhfZG93bihhLCBiKSB7XG5cbiAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzX2FycmF5KHZhbCkge1xuXG4gICAgcmV0dXJuIHZhbC5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc19zdHJpbmcodmFsKSB7XG5cbiAgICByZXR1cm4gXCJzdHJpbmdcIiA9PSB0eXBlb2YgdmFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNfb2JqZWN0KHZhbCkge1xuXG4gICAgcmV0dXJuIFwib2JqZWN0XCIgPT0gdHlwZW9mIHZhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzX2Z1bmN0aW9uKHZhbCkge1xuXG4gICAgcmV0dXJuIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgdmFsO1xufSIsIi8qKiFcclxuICogRmxleFNlYXJjaC5qc1xyXG4gKiBBdXRob3IgYW5kIENvcHlyaWdodDogVGhvbWFzIFdpbGtlcmxpbmdcclxuICogTGljZW5jZTogQXBhY2hlLTIuMFxyXG4gKiBIb3N0ZWQgYnkgTmV4dGFwcHMgR21iSFxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbmV4dGFwcHMtZGUvZmxleHNlYXJjaFxyXG4gKi9cblxuaW1wb3J0IEluZGV4IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBEb2N1bWVudEludGVyZmFjZSB9IGZyb20gXCIuL3R5cGUuanNcIjtcbmltcG9ydCBDYWNoZSwgeyBzZWFyY2hDYWNoZSB9IGZyb20gXCIuL2NhY2hlLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVfb2JqZWN0LCBpc19hcnJheSwgaXNfc3RyaW5nLCBpc19vYmplY3QsIHBhcnNlX29wdGlvbiwgZ2V0X2tleXMgfSBmcm9tIFwiLi9jb21tb24uanNcIjtcbmltcG9ydCBhcHBseV9hc3luYyBmcm9tIFwiLi9hc3luYy5qc1wiO1xuaW1wb3J0IHsgaW50ZXJzZWN0LCBpbnRlcnNlY3RfdW5pb24gfSBmcm9tIFwiLi9pbnRlcnNlY3QuanNcIjtcbmltcG9ydCB7IGV4cG9ydERvY3VtZW50LCBpbXBvcnREb2N1bWVudCB9IGZyb20gXCIuL3NlcmlhbGl6ZS5qc1wiO1xuaW1wb3J0IFdvcmtlckluZGV4IGZyb20gXCIuL3dvcmtlci9pbmRleC5qc1wiO1xuXG4vKipcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBpbXBsZW1lbnRzIHtEb2N1bWVudEludGVyZmFjZX1cclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEByZXR1cm4ge0RvY3VtZW50fVxyXG4gKi9cblxuZnVuY3Rpb24gRG9jdW1lbnQob3B0aW9ucykge1xuXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIERvY3VtZW50KSkge1xuXG4gICAgICAgIHJldHVybiBuZXcgRG9jdW1lbnQob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY29uc3QgZG9jdW1lbnQgPSBvcHRpb25zLmRvY3VtZW50IHx8IG9wdGlvbnMuZG9jIHx8IG9wdGlvbnM7XG4gICAgbGV0IG9wdDtcblxuICAgIHRoaXMudHJlZSA9IFtdO1xuICAgIHRoaXMuZmllbGQgPSBbXTtcbiAgICB0aGlzLm1hcmtlciA9IFtdO1xuICAgIHRoaXMucmVnaXN0ZXIgPSBjcmVhdGVfb2JqZWN0KCk7XG4gICAgdGhpcy5rZXkgPSAob3B0ID0gZG9jdW1lbnQua2V5IHx8IGRvY3VtZW50LmlkKSAmJiBwYXJzZV90cmVlKG9wdCwgdGhpcy5tYXJrZXIpIHx8IFwiaWRcIjtcbiAgICB0aGlzLmZhc3R1cGRhdGUgPSBwYXJzZV9vcHRpb24ob3B0aW9ucy5mYXN0dXBkYXRlLCAvKiBhcHBlbmQ6ICovIC8qIHNraXAgdXBkYXRlOiAqLyAvKiBza2lwX3VwZGF0ZTogKi8hMCk7XG5cbiAgICB0aGlzLnN0b3JldHJlZSA9IChvcHQgPSBkb2N1bWVudC5zdG9yZSkgJiYgITAgIT09IG9wdCAmJiBbXTtcbiAgICB0aGlzLnN0b3JlID0gb3B0ICYmIGNyZWF0ZV9vYmplY3QoKTtcblxuXG4gICAgLy8gVE9ETyBjYXNlLWluc2Vuc2l0aXZlIHRhZ3NcblxuICAgIHRoaXMudGFnID0gKG9wdCA9IGRvY3VtZW50LnRhZykgJiYgcGFyc2VfdHJlZShvcHQsIHRoaXMubWFya2VyKTtcbiAgICB0aGlzLnRhZ2luZGV4ID0gb3B0ICYmIGNyZWF0ZV9vYmplY3QoKTtcblxuXG4gICAgdGhpcy5jYWNoZSA9IChvcHQgPSBvcHRpb25zLmNhY2hlKSAmJiBuZXcgQ2FjaGUob3B0KTtcblxuICAgIC8vIGRvIG5vdCBhcHBseSBjYWNoZSBhZ2FpbiBmb3IgdGhlIGluZGV4ZXNcblxuICAgIG9wdGlvbnMuY2FjaGUgPSAhMTtcblxuXG4gICAgdGhpcy53b3JrZXIgPSBvcHRpb25zLndvcmtlcjtcblxuXG4gICAgLy8gdGhpcyBzd2l0Y2ggaXMgdXNlZCBieSByZWNhbGwgb2YgcHJvbWlzZSBjYWxsYmFja3NcblxuICAgIHRoaXMuYXN5bmMgPSAhMTtcblxuICAgIC8qKiBAZXhwb3J0ICovXG4gICAgdGhpcy5pbmRleCA9IHBhcnNlX2Rlc2NyaXB0b3IuY2FsbCh0aGlzLCBvcHRpb25zLCBkb2N1bWVudCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IERvY3VtZW50O1xuXG4vKipcclxuICogQHRoaXMgRG9jdW1lbnRcclxuICovXG5cbmZ1bmN0aW9uIHBhcnNlX2Rlc2NyaXB0b3Iob3B0aW9ucywgZG9jdW1lbnQpIHtcblxuICAgIGNvbnN0IGluZGV4ID0gY3JlYXRlX29iamVjdCgpO1xuICAgIGxldCBmaWVsZCA9IGRvY3VtZW50LmluZGV4IHx8IGRvY3VtZW50LmZpZWxkIHx8IGRvY3VtZW50O1xuXG4gICAgaWYgKGlzX3N0cmluZyhmaWVsZCkpIHtcblxuICAgICAgICBmaWVsZCA9IFtmaWVsZF07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGtleSwgb3B0OyBpIDwgZmllbGQubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBrZXkgPSBmaWVsZFtpXTtcblxuICAgICAgICBpZiAoIWlzX3N0cmluZyhrZXkpKSB7XG5cbiAgICAgICAgICAgIG9wdCA9IGtleTtcbiAgICAgICAgICAgIGtleSA9IGtleS5maWVsZDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdCA9IGlzX29iamVjdChvcHQpID8gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgb3B0KSA6IG9wdGlvbnM7XG5cbiAgICAgICAgaWYgKHRoaXMud29ya2VyKSB7XG5cbiAgICAgICAgICAgIGluZGV4W2tleV0gPSBuZXcgV29ya2VySW5kZXgob3B0KTtcblxuICAgICAgICAgICAgaWYgKCFpbmRleFtrZXldLndvcmtlcikge1xuXG4gICAgICAgICAgICAgICAgdGhpcy53b3JrZXIgPSAhMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy53b3JrZXIpIHtcblxuICAgICAgICAgICAgaW5kZXhba2V5XSA9IG5ldyBJbmRleChvcHQsIHRoaXMucmVnaXN0ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmVlW2ldID0gcGFyc2VfdHJlZShrZXksIHRoaXMubWFya2VyKTtcbiAgICAgICAgdGhpcy5maWVsZFtpXSA9IGtleTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdG9yZXRyZWUpIHtcblxuICAgICAgICBsZXQgc3RvcmUgPSBkb2N1bWVudC5zdG9yZTtcblxuICAgICAgICBpZiAoaXNfc3RyaW5nKHN0b3JlKSkge1xuXG4gICAgICAgICAgICBzdG9yZSA9IFtzdG9yZV07XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3JlLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc3RvcmV0cmVlW2ldID0gcGFyc2VfdHJlZShzdG9yZVtpXSwgdGhpcy5tYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGV4O1xufVxuXG5mdW5jdGlvbiBwYXJzZV90cmVlKGtleSwgbWFya2VyKSB7XG5cbiAgICBjb25zdCB0cmVlID0ga2V5LnNwbGl0KFwiOlwiKTtcbiAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmVlLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAga2V5ID0gdHJlZVtpXTtcblxuICAgICAgICBpZiAoMCA8PSBrZXkuaW5kZXhPZihcIltdXCIpKSB7XG5cbiAgICAgICAgICAgIGtleSA9IGtleS5zdWJzdHJpbmcoMCwga2V5Lmxlbmd0aCAtIDIpO1xuXG4gICAgICAgICAgICBpZiAoa2V5KSB7XG5cbiAgICAgICAgICAgICAgICBtYXJrZXJbY291bnRdID0gITA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5KSB7XG5cbiAgICAgICAgICAgIHRyZWVbY291bnQrK10gPSBrZXk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY291bnQgPCB0cmVlLmxlbmd0aCkge1xuXG4gICAgICAgIHRyZWUubGVuZ3RoID0gY291bnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIDEgPCBjb3VudCA/IHRyZWUgOiB0cmVlWzBdO1xufVxuXG4vLyBUT0RPIHN1cHBvcnQgZ2VuZXJpYyBmdW5jdGlvbiBjcmVhdGVkIGZyb20gc3RyaW5nIHdoZW4gdHJlZSBkZXB0aCA+IDFcblxuZnVuY3Rpb24gcGFyc2Vfc2ltcGxlKG9iaiwgdHJlZSkge1xuXG4gICAgaWYgKGlzX3N0cmluZyh0cmVlKSkge1xuXG4gICAgICAgIG9iaiA9IG9ialt0cmVlXTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBvYmogJiYgaSA8IHRyZWUubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgb2JqID0gb2JqW3RyZWVbaV1dO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn1cblxuLy8gVE9ETyBzdXBwb3J0IGdlbmVyaWMgZnVuY3Rpb24gY3JlYXRlZCBmcm9tIHN0cmluZyB3aGVuIHRyZWUgZGVwdGggPiAxXG5cbmZ1bmN0aW9uIHN0b3JlX3ZhbHVlKG9iaiwgc3RvcmUsIHRyZWUsIHBvcywga2V5KSB7XG5cbiAgICBvYmogPSBvYmpba2V5XTtcblxuICAgIC8vIHJlYWNoZWQgdGFyZ2V0IGZpZWxkXG5cbiAgICBpZiAocG9zID09PSB0cmVlLmxlbmd0aCAtIDEpIHtcblxuICAgICAgICAvLyBzdG9yZSB0YXJnZXQgdmFsdWVcblxuICAgICAgICBzdG9yZVtrZXldID0gb2JqO1xuICAgIH0gZWxzZSBpZiAob2JqKSB7XG5cbiAgICAgICAgaWYgKGlzX2FycmF5KG9iaikpIHtcblxuICAgICAgICAgICAgc3RvcmUgPSBzdG9yZVtrZXldID0gQXJyYXkob2JqLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBkbyBub3QgaW5jcmVhc2UgcG9zIChhbiBhcnJheSBpcyBub3QgYSBmaWVsZClcbiAgICAgICAgICAgICAgICBzdG9yZV92YWx1ZShvYmosIHN0b3JlLCB0cmVlLCBwb3MsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBzdG9yZSA9IHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSBjcmVhdGVfb2JqZWN0KCkpO1xuICAgICAgICAgICAga2V5ID0gdHJlZVsrK3Bvc107XG5cbiAgICAgICAgICAgIHN0b3JlX3ZhbHVlKG9iaiwgc3RvcmUsIHRyZWUsIHBvcywga2V5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkX2luZGV4KG9iaiwgdHJlZSwgbWFya2VyLCBwb3MsIGluZGV4LCBpZCwga2V5LCBfYXBwZW5kKSB7XG5cbiAgICBvYmogPSBvYmpba2V5XTtcblxuICAgIGlmIChvYmopIHtcblxuICAgICAgICAvLyByZWFjaGVkIHRhcmdldCBmaWVsZFxuXG4gICAgICAgIGlmIChwb3MgPT09IHRyZWUubGVuZ3RoIC0gMSkge1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgdGFyZ2V0IHZhbHVlXG5cbiAgICAgICAgICAgIGlmIChpc19hcnJheShvYmopKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBhcHBlbmQgYXJyYXkgY29udGVudHMgc28gZWFjaCBlbnRyeSBnZXRzIGEgbmV3IHNjb3JpbmcgY29udGV4dFxuXG4gICAgICAgICAgICAgICAgaWYgKG1hcmtlcltwb3NdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXguYWRkKGlkLCBvYmpbaV0sICEwLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gb3Igam9pbiBhcnJheSBjb250ZW50cyBhbmQgdXNlIG9uZSBzY29yaW5nIGNvbnRleHRcblxuICAgICAgICAgICAgICAgIG9iaiA9IG9iai5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5kZXguYWRkKGlkLCBvYmosIF9hcHBlbmQsICEwKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKGlzX2FycmF5KG9iaikpIHtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IGluY3JlYXNlIGluZGV4LCBhbiBhcnJheSBpcyBub3QgYSBmaWVsZFxuXG4gICAgICAgICAgICAgICAgICAgIGFkZF9pbmRleChvYmosIHRyZWUsIG1hcmtlciwgcG9zLCBpbmRleCwgaWQsIGksIF9hcHBlbmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBrZXkgPSB0cmVlWysrcG9zXTtcblxuICAgICAgICAgICAgICAgIGFkZF9pbmRleChvYmosIHRyZWUsIG1hcmtlciwgcG9zLCBpbmRleCwgaWQsIGtleSwgX2FwcGVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gaWRcclxuICogQHBhcmFtIGNvbnRlbnRcclxuICogQHBhcmFtIHtib29sZWFuPX0gX2FwcGVuZFxyXG4gKiBAcmV0dXJucyB7RG9jdW1lbnR8UHJvbWlzZX1cclxuICovXG5cbkRvY3VtZW50LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaWQsIGNvbnRlbnQsIF9hcHBlbmQpIHtcblxuICAgIGlmIChpc19vYmplY3QoaWQpKSB7XG5cbiAgICAgICAgY29udGVudCA9IGlkO1xuICAgICAgICBpZCA9IHBhcnNlX3NpbXBsZShjb250ZW50LCB0aGlzLmtleSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRlbnQgJiYgKGlkIHx8IDAgPT09IGlkKSkge1xuXG4gICAgICAgIGlmICghX2FwcGVuZCAmJiB0aGlzLnJlZ2lzdGVyW2lkXSkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cGRhdGUoaWQsIGNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIHRyZWUsIGZpZWxkOyBpIDwgdGhpcy5maWVsZC5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBmaWVsZCA9IHRoaXMuZmllbGRbaV07XG4gICAgICAgICAgICB0cmVlID0gdGhpcy50cmVlW2ldO1xuXG4gICAgICAgICAgICBpZiAoaXNfc3RyaW5nKHRyZWUpKSB7XG5cbiAgICAgICAgICAgICAgICB0cmVlID0gW3RyZWVdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhZGRfaW5kZXgoY29udGVudCwgdHJlZSwgdGhpcy5tYXJrZXIsIDAsIHRoaXMuaW5kZXhbZmllbGRdLCBpZCwgdHJlZVswXSwgX2FwcGVuZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50YWcpIHtcbiAgICAgICAgICAgIGxldCB0YWcgPSBwYXJzZV9zaW1wbGUoY29udGVudCwgdGhpcy50YWcpLFxuICAgICAgICAgICAgICAgIGR1cGVzID0gY3JlYXRlX29iamVjdCgpO1xuXG5cbiAgICAgICAgICAgIGlmIChpc19zdHJpbmcodGFnKSkge1xuXG4gICAgICAgICAgICAgICAgdGFnID0gW3RhZ107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBrZXksIGFycjsgaSA8IHRhZy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAga2V5ID0gdGFnW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFkdXBlc1trZXldKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZHVwZXNba2V5XSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGFyciA9IHRoaXMudGFnaW5kZXhba2V5XSB8fCAodGhpcy50YWdpbmRleFtrZXldID0gW10pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghX2FwcGVuZCB8fCAhYXJyLmluY2x1ZGVzKGlkKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJbYXJyLmxlbmd0aF0gPSBpZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGEgcmVmZXJlbmNlIHRvIHRoZSByZWdpc3RlciBmb3IgZmFzdCB1cGRhdGVzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhc3R1cGRhdGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IHRoaXMucmVnaXN0ZXJbaWRdIHx8ICh0aGlzLnJlZ2lzdGVyW2lkXSA9IFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXBbdG1wLmxlbmd0aF0gPSBhcnI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPOiBob3cgdG8gaGFuZGxlIHN0b3JlIHdoZW4gYXBwZW5kaW5nIGNvbnRlbnRzP1xuXG4gICAgICAgIGlmICh0aGlzLnN0b3JlICYmICghX2FwcGVuZCB8fCAhdGhpcy5zdG9yZVtpZF0pKSB7XG5cbiAgICAgICAgICAgIGxldCBzdG9yZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcmV0cmVlKSB7XG5cbiAgICAgICAgICAgICAgICBzdG9yZSA9IGNyZWF0ZV9vYmplY3QoKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCB0cmVlOyBpIDwgdGhpcy5zdG9yZXRyZWUubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICB0cmVlID0gdGhpcy5zdG9yZXRyZWVbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzX3N0cmluZyh0cmVlKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yZVt0cmVlXSA9IGNvbnRlbnRbdHJlZV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlX3ZhbHVlKGNvbnRlbnQsIHN0b3JlLCB0cmVlLCAwLCB0cmVlWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zdG9yZVtpZF0gPSBzdG9yZSB8fCBjb250ZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5Eb2N1bWVudC5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKGlkLCBjb250ZW50KSB7XG5cbiAgICByZXR1cm4gdGhpcy5hZGQoaWQsIGNvbnRlbnQsICEwKTtcbn07XG5cbkRvY3VtZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoaWQsIGNvbnRlbnQpIHtcblxuICAgIHJldHVybiB0aGlzLnJlbW92ZShpZCkuYWRkKGlkLCBjb250ZW50KTtcbn07XG5cbkRvY3VtZW50LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaWQpIHtcblxuICAgIGlmIChpc19vYmplY3QoaWQpKSB7XG5cbiAgICAgICAgaWQgPSBwYXJzZV9zaW1wbGUoaWQsIHRoaXMua2V5KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZWdpc3RlcltpZF0pIHtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZmllbGQubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgLy8gd29ya2VycyBkb2VzIG5vdCBzaGFyZSB0aGUgcmVnaXN0ZXJcblxuICAgICAgICAgICAgdGhpcy5pbmRleFt0aGlzLmZpZWxkW2ldXS5yZW1vdmUoaWQsICF0aGlzLndvcmtlcik7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZhc3R1cGRhdGUpIHtcblxuICAgICAgICAgICAgICAgIC8vIHdoZW4gZmFzdHVwZGF0ZSB3YXMgZW5hYmxlZCBhbGwgaWRzIGFyZSByZW1vdmVkXG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRhZykge1xuXG4gICAgICAgICAgICAvLyB3aGVuIGZhc3R1cGRhdGUgd2FzIGVuYWJsZWQgYWxsIGlkcyBhcmUgYWxyZWFkeSByZW1vdmVkXG5cbiAgICAgICAgICAgIGlmICghdGhpcy5mYXN0dXBkYXRlKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy50YWdpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWcgPSB0aGlzLnRhZ2luZGV4W2tleV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IHRhZy5pbmRleE9mKGlkKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICgtMSAhPT0gcG9zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgxIDwgdGFnLmxlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnLnNwbGljZShwb3MsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnRhZ2luZGV4W2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdG9yZSkge1xuXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5zdG9yZVtpZF07XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgdGhpcy5yZWdpc3RlcltpZF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcclxuICogQHBhcmFtIHshc3RyaW5nfE9iamVjdH0gcXVlcnlcclxuICogQHBhcmFtIHtudW1iZXJ8T2JqZWN0PX0gbGltaXRcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+PX0gX3Jlc29sdmUgRm9yIGludGVybmFsIHVzZSBvbmx5LlxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZXxBcnJheX1cclxuICovXG5cbkRvY3VtZW50LnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAocXVlcnksIGxpbWl0LCBvcHRpb25zLCBfcmVzb2x2ZSkge1xuXG4gICAgaWYgKCFvcHRpb25zKSB7XG5cbiAgICAgICAgaWYgKCFsaW1pdCAmJiBpc19vYmplY3QocXVlcnkpKSB7XG5cbiAgICAgICAgICAgIG9wdGlvbnMgPSAvKiogQHR5cGUge09iamVjdH0gKi9xdWVyeTtcbiAgICAgICAgICAgIHF1ZXJ5ID0gXCJcIjtcbiAgICAgICAgfSBlbHNlIGlmIChpc19vYmplY3QobGltaXQpKSB7XG5cbiAgICAgICAgICAgIG9wdGlvbnMgPSAvKiogQHR5cGUge09iamVjdH0gKi9saW1pdDtcbiAgICAgICAgICAgIGxpbWl0ID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSBbXSxcbiAgICAgICAgcmVzdWx0X2ZpZWxkID0gW10sXG4gICAgICAgIHBsdWNrLFxuICAgICAgICBlbnJpY2gsXG4gICAgICAgIGZpZWxkLFxuICAgICAgICB0YWcsXG4gICAgICAgIGJvb2wsXG4gICAgICAgIG9mZnNldCxcbiAgICAgICAgY291bnQgPSAwO1xuXG5cbiAgICBpZiAob3B0aW9ucykge1xuXG4gICAgICAgIGlmIChpc19hcnJheShvcHRpb25zKSkge1xuXG4gICAgICAgICAgICBmaWVsZCA9IG9wdGlvbnM7XG4gICAgICAgICAgICBvcHRpb25zID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcXVlcnkgPSBvcHRpb25zLnF1ZXJ5IHx8IHF1ZXJ5O1xuICAgICAgICAgICAgcGx1Y2sgPSBvcHRpb25zLnBsdWNrO1xuICAgICAgICAgICAgZmllbGQgPSBwbHVjayB8fCBvcHRpb25zLmluZGV4IHx8IG9wdGlvbnMuZmllbGQgLyp8fCAoaXNfc3RyaW5nKG9wdGlvbnMpICYmIFtvcHRpb25zXSkqLztcbiAgICAgICAgICAgIHRhZyA9IG9wdGlvbnMudGFnO1xuICAgICAgICAgICAgZW5yaWNoID0gdGhpcy5zdG9yZSAmJiBvcHRpb25zLmVucmljaDtcbiAgICAgICAgICAgIGJvb2wgPSBcImFuZFwiID09PSBvcHRpb25zLmJvb2w7XG4gICAgICAgICAgICBsaW1pdCA9IG9wdGlvbnMubGltaXQgfHwgbGltaXQgfHwgMTAwO1xuICAgICAgICAgICAgb2Zmc2V0ID0gb3B0aW9ucy5vZmZzZXQgfHwgMDtcblxuICAgICAgICAgICAgaWYgKHRhZykge1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzX3N0cmluZyh0YWcpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGFnID0gW3RhZ107XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gd2hlbiB0YWdzIGlzIHVzZWQgYW5kIG5vIHF1ZXJ5IHdhcyBzZXQsXG4gICAgICAgICAgICAgICAgLy8gdGhlbiBqdXN0IHJldHVybiB0aGUgdGFnIGluZGV4ZXNcblxuICAgICAgICAgICAgICAgIGlmICghcXVlcnkpIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgcmVzOyBpIDwgdGFnLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IGdldF90YWcuY2FsbCh0aGlzLCB0YWdbaV0sIGxpbWl0LCBvZmZzZXQsIGVucmljaCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50ID8gcmVzdWx0IDogW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNfc3RyaW5nKGZpZWxkKSkge1xuXG4gICAgICAgICAgICAgICAgZmllbGQgPSBbZmllbGRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmllbGQgfHwgKGZpZWxkID0gdGhpcy5maWVsZCk7XG4gICAgYm9vbCA9IGJvb2wgJiYgKDEgPCBmaWVsZC5sZW5ndGggfHwgdGFnICYmIDEgPCB0YWcubGVuZ3RoKTtcblxuICAgIGNvbnN0IHByb21pc2VzID0gIV9yZXNvbHZlICYmICh0aGlzLndvcmtlciB8fCB0aGlzLmFzeW5jKSAmJiBbXTtcblxuICAgIC8vIFRPRE8gc29sdmUgdGhpcyBpbiBvbmUgbG9vcCBiZWxvd1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIHJlcywga2V5LCBsZW47IGkgPCBmaWVsZC5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGxldCBmaWVsZF9vcHRpb25zO1xuXG4gICAgICAgIGtleSA9IGZpZWxkW2ldO1xuXG4gICAgICAgIGlmICghaXNfc3RyaW5nKGtleSkpIHtcblxuICAgICAgICAgICAgZmllbGRfb3B0aW9ucyA9IGtleTtcbiAgICAgICAgICAgIGtleSA9IGZpZWxkX29wdGlvbnMuZmllbGQ7XG4gICAgICAgICAgICBxdWVyeSA9IGZpZWxkX29wdGlvbnMucXVlcnkgfHwgcXVlcnk7XG4gICAgICAgICAgICBsaW1pdCA9IGZpZWxkX29wdGlvbnMubGltaXQgfHwgbGltaXQ7XG4gICAgICAgICAgICBlbnJpY2ggPSBmaWVsZF9vcHRpb25zLmVucmljaCB8fCBlbnJpY2g7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvbWlzZXMpIHtcblxuICAgICAgICAgICAgcHJvbWlzZXNbaV0gPSB0aGlzLmluZGV4W2tleV0uc2VhcmNoQXN5bmMocXVlcnksIGxpbWl0LCBmaWVsZF9vcHRpb25zIHx8IG9wdGlvbnMpO1xuXG4gICAgICAgICAgICAvLyBqdXN0IGNvbGxlY3QgYW5kIGNvbnRpbnVlXG5cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2UgaWYgKF9yZXNvbHZlKSB7XG5cbiAgICAgICAgICAgIHJlcyA9IF9yZXNvbHZlW2ldO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBpbmhlcml0IG9wdGlvbnMgYWxzbyB3aGVuIHNlYXJjaD8gaXQgaXMganVzdCBmb3IgbGF6aW5lc3MsIE9iamVjdC5hc3NpZ24oKSBoYXMgYSBjb3N0XG5cbiAgICAgICAgICAgIHJlcyA9IHRoaXMuaW5kZXhba2V5XS5zZWFyY2gocXVlcnksIGxpbWl0LCBmaWVsZF9vcHRpb25zIHx8IG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGVuID0gcmVzICYmIHJlcy5sZW5ndGg7XG5cbiAgICAgICAgaWYgKHRhZyAmJiBsZW4pIHtcblxuICAgICAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICAgICAgICBpZiAoYm9vbCkge1xuXG4gICAgICAgICAgICAgICAgLy8gcHJlcGFyZSBmb3IgaW50ZXJzZWN0aW9uXG5cbiAgICAgICAgICAgICAgICBhcnJbMF0gPSBbcmVzXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDAsIGtleSwgcmVzOyB5IDwgdGFnLmxlbmd0aDsgeSsrKSB7XG5cbiAgICAgICAgICAgICAgICBrZXkgPSB0YWdbeV07XG4gICAgICAgICAgICAgICAgcmVzID0gdGhpcy50YWdpbmRleFtrZXldO1xuICAgICAgICAgICAgICAgIGxlbiA9IHJlcyAmJiByZXMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxlbikge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIGFyclthcnIubGVuZ3RoXSA9IGJvb2wgPyBbcmVzXSA6IHJlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb3VudCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGJvb2wpIHtcblxuICAgICAgICAgICAgICAgICAgICByZXMgPSBpbnRlcnNlY3QoYXJyLCBsaW1pdCB8fCAxMDAsIG9mZnNldCB8fCAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IGludGVyc2VjdF91bmlvbihyZXMsIGFycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGVuID0gcmVzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsZW4pIHtcblxuICAgICAgICAgICAgcmVzdWx0X2ZpZWxkW2NvdW50XSA9IGtleTtcbiAgICAgICAgICAgIHJlc3VsdFtjb3VudCsrXSA9IHJlcztcbiAgICAgICAgfSBlbHNlIGlmIChib29sKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm9taXNlcykge1xuXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIC8vIGFueW9uZSBrbm93cyBhIGJldHRlciB3b3JrYXJvdW5kIG9mIG9wdGlvbmFsbHkgaGF2aW5nIGFzeW5jIHByb21pc2VzP1xuICAgICAgICAvLyB0aGUgcHJvbWlzZS5hbGwoKSBuZWVkcyB0byBiZSB3cmFwcGVkIGludG8gYWRkaXRpb25hbCBwcm9taXNlLFxuICAgICAgICAvLyBvdGhlcndpc2UgdGhlIHJlY3Vyc2l2ZSBjYWxsYmFjayB3b3VsZG4ndCBydW4gYmVmb3JlIHJldHVyblxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuXG4gICAgICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKHNlbGYuc2VhcmNoKHF1ZXJ5LCBsaW1pdCwgb3B0aW9ucywgcmVzdWx0KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFjb3VudCkge1xuXG4gICAgICAgIC8vIGZhc3QgcGF0aCBcIm5vdCBmb3VuZFwiXG5cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGlmIChwbHVjayAmJiAoIWVucmljaCB8fCAhdGhpcy5zdG9yZSkpIHtcblxuICAgICAgICAvLyBmYXN0IHBhdGggb3B0aW1pemF0aW9uXG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFswXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMCwgcmVzOyBpIDwgcmVzdWx0X2ZpZWxkLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgcmVzID0gcmVzdWx0W2ldO1xuXG4gICAgICAgIGlmIChyZXMubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgIGlmIChlbnJpY2gpIHtcblxuICAgICAgICAgICAgICAgIHJlcyA9IGFwcGx5X2VucmljaC5jYWxsKHRoaXMsIHJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGx1Y2spIHtcblxuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdFtpXSA9IHtcblxuICAgICAgICAgICAgZmllbGQ6IHJlc3VsdF9maWVsZFtpXSxcbiAgICAgICAgICAgIHJlc3VsdDogcmVzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxyXG4gKiBAdGhpcyBEb2N1bWVudFxyXG4gKi9cblxuZnVuY3Rpb24gZ2V0X3RhZyhrZXksIGxpbWl0LCBvZmZzZXQpIHtcbiAgICBsZXQgcmVzID0gdGhpcy50YWdpbmRleFtrZXldLFxuICAgICAgICBsZW4gPSByZXMgJiYgcmVzLmxlbmd0aCAtIG9mZnNldDtcbn1cblxuLyoqXHJcbiAqIEB0aGlzIERvY3VtZW50XHJcbiAqL1xuXG5mdW5jdGlvbiBhcHBseV9lbnJpY2gocmVzKSB7XG5cbiAgICBjb25zdCBhcnIgPSBBcnJheShyZXMubGVuZ3RoKTtcblxuICAgIGZvciAobGV0IHggPSAwLCBpZDsgeCA8IHJlcy5sZW5ndGg7IHgrKykge1xuXG4gICAgICAgIGlkID0gcmVzW3hdO1xuXG4gICAgICAgIGFyclt4XSA9IHtcblxuICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgZG9jOiB0aGlzLnN0b3JlW2lkXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBhcnI7XG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5jb250YWluID0gZnVuY3Rpb24gKGlkKSB7XG5cbiAgICByZXR1cm4gISF0aGlzLnJlZ2lzdGVyW2lkXTtcbn07XG5cbkRvY3VtZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaWQpIHtcblxuICAgIHJldHVybiB0aGlzLnN0b3JlW2lkXTtcbn07XG5cbkRvY3VtZW50LnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoaWQsIGRhdGEpIHtcblxuICAgIHRoaXMuc3RvcmVbaWRdID0gZGF0YTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cblxuRG9jdW1lbnQucHJvdG90eXBlLnNlYXJjaENhY2hlID0gc2VhcmNoQ2FjaGU7XG5cblxuRG9jdW1lbnQucHJvdG90eXBlLmV4cG9ydCA9IGV4cG9ydERvY3VtZW50O1xuRG9jdW1lbnQucHJvdG90eXBlLmltcG9ydCA9IGltcG9ydERvY3VtZW50O1xuXG5cbmFwcGx5X2FzeW5jKERvY3VtZW50LnByb3RvdHlwZSk7IiwiZXhwb3J0IGNvbnN0IGdsb2JhbF9sYW5nID0ge307XG5leHBvcnQgY29uc3QgZ2xvYmFsX2NoYXJzZXQgPSB7fTtcblxuLyoqXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gbmFtZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gY2hhcnNldFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ2hhcnNldChuYW1lLCBjaGFyc2V0KSB7XG5cbiAgZ2xvYmFsX2NoYXJzZXRbbmFtZV0gPSBjaGFyc2V0O1xufVxuXG4vKipcclxuICogQHBhcmFtIHshc3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBsYW5nXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJMYW5ndWFnZShuYW1lLCBsYW5nKSB7XG5cbiAgZ2xvYmFsX2xhbmdbbmFtZV0gPSBsYW5nO1xufSIsIi8qKiFcclxuICogRmxleFNlYXJjaC5qc1xyXG4gKiBBdXRob3IgYW5kIENvcHlyaWdodDogVGhvbWFzIFdpbGtlcmxpbmdcclxuICogTGljZW5jZTogQXBhY2hlLTIuMFxyXG4gKiBIb3N0ZWQgYnkgTmV4dGFwcHMgR21iSFxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbmV4dGFwcHMtZGUvZmxleHNlYXJjaFxyXG4gKi9cblxuaW1wb3J0IHsgSW5kZXhJbnRlcmZhY2UgfSBmcm9tIFwiLi90eXBlLmpzXCI7XG5pbXBvcnQgeyBlbmNvZGUgYXMgZGVmYXVsdF9lbmNvZGVyIH0gZnJvbSBcIi4vbGFuZy9sYXRpbi9kZWZhdWx0LmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVfb2JqZWN0LCBjcmVhdGVfb2JqZWN0X2FycmF5LCBjb25jYXQsIHNvcnRfYnlfbGVuZ3RoX2Rvd24sIGlzX2FycmF5LCBpc19zdHJpbmcsIGlzX29iamVjdCwgcGFyc2Vfb3B0aW9uIH0gZnJvbSBcIi4vY29tbW9uLmpzXCI7XG5pbXBvcnQgeyBwaXBlbGluZSwgaW5pdF9zdGVtbWVyX29yX21hdGNoZXIsIGluaXRfZmlsdGVyIH0gZnJvbSBcIi4vbGFuZy5qc1wiO1xuaW1wb3J0IHsgZ2xvYmFsX2xhbmcsIGdsb2JhbF9jaGFyc2V0IH0gZnJvbSBcIi4vZ2xvYmFsLmpzXCI7XG5pbXBvcnQgYXBwbHlfYXN5bmMgZnJvbSBcIi4vYXN5bmMuanNcIjtcbmltcG9ydCB7IGludGVyc2VjdCB9IGZyb20gXCIuL2ludGVyc2VjdC5qc1wiO1xuaW1wb3J0IENhY2hlLCB7IHNlYXJjaENhY2hlIH0gZnJvbSBcIi4vY2FjaGUuanNcIjtcbmltcG9ydCBhcHBseV9wcmVzZXQgZnJvbSBcIi4vcHJlc2V0LmpzXCI7XG5pbXBvcnQgeyBleHBvcnRJbmRleCwgaW1wb3J0SW5kZXggfSBmcm9tIFwiLi9zZXJpYWxpemUuanNcIjtcblxuLyoqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAaW1wbGVtZW50cyBJbmRleEludGVyZmFjZVxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQHBhcmFtIHtPYmplY3Q9fSBfcmVnaXN0ZXJcclxuICogQHJldHVybiB7SW5kZXh9XHJcbiAqL1xuXG5mdW5jdGlvbiBJbmRleChvcHRpb25zLCBfcmVnaXN0ZXIpIHtcblxuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBJbmRleCkpIHtcblxuICAgICAgICByZXR1cm4gbmV3IEluZGV4KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGxldCBjaGFyc2V0LCBsYW5nLCB0bXA7XG5cbiAgICBpZiAob3B0aW9ucykge1xuXG4gICAgICAgIG9wdGlvbnMgPSBhcHBseV9wcmVzZXQob3B0aW9ucyk7XG5cblxuICAgICAgICBjaGFyc2V0ID0gb3B0aW9ucy5jaGFyc2V0O1xuICAgICAgICBsYW5nID0gb3B0aW9ucy5sYW5nO1xuXG4gICAgICAgIGlmIChpc19zdHJpbmcoY2hhcnNldCkpIHtcblxuICAgICAgICAgICAgaWYgKC0xID09PSBjaGFyc2V0LmluZGV4T2YoXCI6XCIpKSB7XG5cbiAgICAgICAgICAgICAgICBjaGFyc2V0ICs9IFwiOmRlZmF1bHRcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2hhcnNldCA9IGdsb2JhbF9jaGFyc2V0W2NoYXJzZXRdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzX3N0cmluZyhsYW5nKSkge1xuXG4gICAgICAgICAgICBsYW5nID0gZ2xvYmFsX2xhbmdbbGFuZ107XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x1dGlvbixcbiAgICAgICAgb3B0aW1pemUsXG4gICAgICAgIGNvbnRleHQgPSBvcHRpb25zLmNvbnRleHQgfHwge307XG5cbiAgICB0aGlzLmVuY29kZSA9IG9wdGlvbnMuZW5jb2RlIHx8IGNoYXJzZXQgJiYgY2hhcnNldC5lbmNvZGUgfHwgZGVmYXVsdF9lbmNvZGVyO1xuICAgIHRoaXMucmVnaXN0ZXIgPSBfcmVnaXN0ZXIgfHwgY3JlYXRlX29iamVjdCgpO1xuICAgIHRoaXMucmVzb2x1dGlvbiA9IHJlc29sdXRpb24gPSBvcHRpb25zLnJlc29sdXRpb24gfHwgOTtcbiAgICB0aGlzLnRva2VuaXplID0gdG1wID0gY2hhcnNldCAmJiBjaGFyc2V0LnRva2VuaXplIHx8IG9wdGlvbnMudG9rZW5pemUgfHwgXCJzdHJpY3RcIjtcbiAgICB0aGlzLmRlcHRoID0gXCJzdHJpY3RcIiA9PT0gdG1wICYmIGNvbnRleHQuZGVwdGg7XG4gICAgdGhpcy5iaWRpcmVjdGlvbmFsID0gcGFyc2Vfb3B0aW9uKGNvbnRleHQuYmlkaXJlY3Rpb25hbCwgLyogYXBwZW5kOiAqLyAvKiBza2lwIHVwZGF0ZTogKi8gLyogc2tpcF91cGRhdGU6ICovITApO1xuICAgIHRoaXMub3B0aW1pemUgPSBvcHRpbWl6ZSA9IHBhcnNlX29wdGlvbihvcHRpb25zLm9wdGltaXplLCAhMCk7XG4gICAgdGhpcy5mYXN0dXBkYXRlID0gcGFyc2Vfb3B0aW9uKG9wdGlvbnMuZmFzdHVwZGF0ZSwgITApO1xuICAgIHRoaXMubWlubGVuZ3RoID0gb3B0aW9ucy5taW5sZW5ndGggfHwgMTtcbiAgICB0aGlzLmJvb3N0ID0gb3B0aW9ucy5ib29zdDtcblxuICAgIC8vIHdoZW4gbm90IHVzaW5nIHRoZSBtZW1vcnkgc3RyYXRlZ3kgdGhlIHNjb3JlIGFycmF5IHNob3VsZCBub3QgcHJlLWFsbG9jYXRlZCB0byBpdHMgZnVsbCBsZW5ndGhcblxuICAgIHRoaXMubWFwID0gb3B0aW1pemUgPyBjcmVhdGVfb2JqZWN0X2FycmF5KHJlc29sdXRpb24pIDogY3JlYXRlX29iamVjdCgpO1xuICAgIHRoaXMucmVzb2x1dGlvbl9jdHggPSByZXNvbHV0aW9uID0gY29udGV4dC5yZXNvbHV0aW9uIHx8IDE7XG4gICAgdGhpcy5jdHggPSBvcHRpbWl6ZSA/IGNyZWF0ZV9vYmplY3RfYXJyYXkocmVzb2x1dGlvbikgOiBjcmVhdGVfb2JqZWN0KCk7XG4gICAgdGhpcy5ydGwgPSBjaGFyc2V0ICYmIGNoYXJzZXQucnRsIHx8IG9wdGlvbnMucnRsO1xuICAgIHRoaXMubWF0Y2hlciA9ICh0bXAgPSBvcHRpb25zLm1hdGNoZXIgfHwgbGFuZyAmJiBsYW5nLm1hdGNoZXIpICYmIGluaXRfc3RlbW1lcl9vcl9tYXRjaGVyKHRtcCwgITEpO1xuICAgIHRoaXMuc3RlbW1lciA9ICh0bXAgPSBvcHRpb25zLnN0ZW1tZXIgfHwgbGFuZyAmJiBsYW5nLnN0ZW1tZXIpICYmIGluaXRfc3RlbW1lcl9vcl9tYXRjaGVyKHRtcCwgITApO1xuICAgIHRoaXMuZmlsdGVyID0gKHRtcCA9IG9wdGlvbnMuZmlsdGVyIHx8IGxhbmcgJiYgbGFuZy5maWx0ZXIpICYmIGluaXRfZmlsdGVyKHRtcCk7XG5cbiAgICB0aGlzLmNhY2hlID0gKHRtcCA9IG9wdGlvbnMuY2FjaGUpICYmIG5ldyBDYWNoZSh0bXApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBJbmRleDtcblxuLy9JbmRleC5wcm90b3R5cGUucGlwZWxpbmUgPSBwaXBlbGluZTtcblxuLyoqXHJcbiAqIEBwYXJhbSB7IW51bWJlcnxzdHJpbmd9IGlkXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gY29udGVudFxyXG4gKi9cblxuSW5kZXgucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIChpZCwgY29udGVudCkge1xuXG4gICAgcmV0dXJuIHRoaXMuYWRkKGlkLCBjb250ZW50LCAhMCk7XG59O1xuXG4vLyBUT0RPOlxuLy8gc3RyaW5nICsgbnVtYmVyIGFzIHRleHRcbi8vIGJvb2xlYW4sIG51bGwsIHVuZGVmaW5lZCBhcyA/XG5cbi8qKlxyXG4gKiBAcGFyYW0geyFudW1iZXJ8c3RyaW5nfSBpZFxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IGNvbnRlbnRcclxuICogQHBhcmFtIHtib29sZWFuPX0gX2FwcGVuZFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBfc2tpcF91cGRhdGVcclxuICovXG5cbkluZGV4LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaWQsIGNvbnRlbnQsIF9hcHBlbmQsIF9za2lwX3VwZGF0ZSkge1xuXG4gICAgaWYgKGNvbnRlbnQgJiYgKGlkIHx8IDAgPT09IGlkKSkge1xuXG4gICAgICAgIGlmICghX3NraXBfdXBkYXRlICYmICFfYXBwZW5kICYmIHRoaXMucmVnaXN0ZXJbaWRdKSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZShpZCwgY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZW50ID0gdGhpcy5lbmNvZGUoXCJcIiArIGNvbnRlbnQpO1xuICAgICAgICBjb25zdCBsZW5ndGggPSBjb250ZW50Lmxlbmd0aDtcblxuICAgICAgICBpZiAobGVuZ3RoKSB7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGNvbnRleHQgZHVwZXMgdG8gc2tpcCBhbGwgY29udGV4dHVhbCByZWR1bmRhbmN5IGFsb25nIGEgZG9jdW1lbnRcblxuICAgICAgICAgICAgY29uc3QgZHVwZXNfY3R4ID0gY3JlYXRlX29iamVjdCgpLFxuICAgICAgICAgICAgICAgICAgZHVwZXMgPSBjcmVhdGVfb2JqZWN0KCksXG4gICAgICAgICAgICAgICAgICBkZXB0aCA9IHRoaXMuZGVwdGgsXG4gICAgICAgICAgICAgICAgICByZXNvbHV0aW9uID0gdGhpcy5yZXNvbHV0aW9uO1xuXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVybSA9IGNvbnRlbnRbdGhpcy5ydGwgPyBsZW5ndGggLSAxIC0gaSA6IGldLFxuICAgICAgICAgICAgICAgICAgICB0ZXJtX2xlbmd0aCA9IHRlcm0ubGVuZ3RoO1xuXG5cbiAgICAgICAgICAgICAgICAvLyBza2lwIGR1cGVzIHdpbGwgYnJlYWsgdGhlIGNvbnRleHQgY2hhaW5cblxuICAgICAgICAgICAgICAgIGlmICh0ZXJtICYmIHRlcm1fbGVuZ3RoID49IHRoaXMubWlubGVuZ3RoICYmIChkZXB0aCB8fCAhZHVwZXNbdGVybV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY29yZSA9IGdldF9zY29yZShyZXNvbHV0aW9uLCBsZW5ndGgsIGkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBcIlwiO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnRva2VuaXplKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJmdWxsXCI6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMiA8IHRlcm1fbGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0ZXJtX2xlbmd0aDsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHkgPSB0ZXJtX2xlbmd0aDsgeSA+IHg7IHktLSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkgLSB4ID49IHRoaXMubWlubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydGlhbF9zY29yZSA9IGdldF9zY29yZShyZXNvbHV0aW9uLCBsZW5ndGgsIGksIHRlcm1fbGVuZ3RoLCB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSB0ZXJtLnN1YnN0cmluZyh4LCB5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoX2luZGV4KGR1cGVzLCB0b2tlbiwgcGFydGlhbF9zY29yZSwgaWQsIF9hcHBlbmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFsbHRocm91Z2ggdG8gbmV4dCBjYXNlIHdoZW4gdGVybSBsZW5ndGggPCAzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZXZlcnNlXCI6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBza2lwIGxhc3Qgcm91bmQgKHRoaXMgdG9rZW4gZXhpc3QgYWxyZWFkeSBpbiBcImZvcndhcmRcIilcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgxIDwgdGVybV9sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gdGVybV9sZW5ndGggLSAxOyAwIDwgeDsgeC0tKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gdGVybVt4XSArIHRva2VuO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4ubGVuZ3RoID49IHRoaXMubWlubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0aWFsX3Njb3JlID0gZ2V0X3Njb3JlKHJlc29sdXRpb24sIGxlbmd0aCwgaSwgdGVybV9sZW5ndGgsIHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVzaF9pbmRleChkdXBlcywgdG9rZW4sIHBhcnRpYWxfc2NvcmUsIGlkLCBfYXBwZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhbGx0aHJvdWdoIHRvIG5leHQgY2FzZSB0byBhcHBseSBmb3J3YXJkIGFsc29cblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZvcndhcmRcIjpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgxIDwgdGVybV9sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRlcm1fbGVuZ3RoOyB4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gKz0gdGVybVt4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLmxlbmd0aCA+PSB0aGlzLm1pbmxlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoX2luZGV4KGR1cGVzLCB0b2tlbiwgc2NvcmUsIGlkLCBfYXBwZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFsbHRocm91Z2ggdG8gbmV4dCBjYXNlIHdoZW4gdG9rZW4gaGFzIGEgbGVuZ3RoIG9mIDFcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYXNlIFwic3RyaWN0XCI6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ib29zdCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID0gTWF0aC5taW4oMCB8IHNjb3JlIC8gdGhpcy5ib29zdChjb250ZW50LCB0ZXJtLCBpKSwgcmVzb2x1dGlvbiAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVzaF9pbmRleChkdXBlcywgdGVybSwgc2NvcmUsIGlkLCBfYXBwZW5kKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnRleHQgaXMganVzdCBzdXBwb3J0ZWQgYnkgdG9rZW5pemVyIFwic3RyaWN0XCJcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgxIDwgbGVuZ3RoICYmIGkgPCBsZW5ndGggLSAxKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlubmVyIGR1cGVzIHRvIHNraXAgcmVwZWF0aW5nIHdvcmRzIGluIHRoZSBjdXJyZW50IGNvbnRleHRcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZHVwZXNfaW5uZXIgPSBjcmVhdGVfb2JqZWN0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHV0aW9uID0gdGhpcy5yZXNvbHV0aW9uX2N0eCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXdvcmQgPSB0ZXJtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IE1hdGgubWluKGRlcHRoICsgMSwgbGVuZ3RoIC0gaSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVwZXNfaW5uZXJba2V5d29yZF0gPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gMTsgeCA8IHNpemU7IHgrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVybSA9IGNvbnRlbnRbdGhpcy5ydGwgPyBsZW5ndGggLSAxIC0gaSAtIHggOiBpICsgeF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVybSAmJiB0ZXJtLmxlbmd0aCA+PSB0aGlzLm1pbmxlbmd0aCAmJiAhZHVwZXNfaW5uZXJbdGVybV0pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXBlc19pbm5lclt0ZXJtXSA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGV4dF9zY29yZSA9IGdldF9zY29yZShyZXNvbHV0aW9uICsgKGxlbmd0aCAvIDIgPiByZXNvbHV0aW9uID8gMCA6IDEpLCBsZW5ndGgsIGksIHNpemUgLSAxLCB4IC0gMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3YXAgPSB0aGlzLmJpZGlyZWN0aW9uYWwgJiYgdGVybSA+IGtleXdvcmQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoX2luZGV4KGR1cGVzX2N0eCwgc3dhcCA/IGtleXdvcmQgOiB0ZXJtLCBjb250ZXh0X3Njb3JlLCBpZCwgX2FwcGVuZCwgc3dhcCA/IHRlcm0gOiBrZXl3b3JkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZmFzdHVwZGF0ZSB8fCAodGhpcy5yZWdpc3RlcltpZF0gPSAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSByZXNvbHV0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGhcclxuICogQHBhcmFtIHtudW1iZXJ9IGlcclxuICogQHBhcmFtIHtudW1iZXI9fSB0ZXJtX2xlbmd0aFxyXG4gKiBAcGFyYW0ge251bWJlcj19IHhcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXG5cbmZ1bmN0aW9uIGdldF9zY29yZShyZXNvbHV0aW9uLCBsZW5ndGgsIGksIHRlcm1fbGVuZ3RoLCB4KSB7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcInJlc29sdXRpb25cIiwgcmVzb2x1dGlvbik7XG4gICAgLy8gY29uc29sZS5sb2coXCJsZW5ndGhcIiwgbGVuZ3RoKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcInRlcm1fbGVuZ3RoXCIsIHRlcm1fbGVuZ3RoKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcImlcIiwgaSk7XG4gICAgLy8gY29uc29sZS5sb2coXCJ4XCIsIHgpO1xuICAgIC8vIGNvbnNvbGUubG9nKChyZXNvbHV0aW9uIC0gMSkgLyAobGVuZ3RoICsgKHRlcm1fbGVuZ3RoIHx8IDApKSAqIChpICsgKHggfHwgMCkpICsgMSk7XG5cbiAgICAvLyB0aGUgZmlyc3QgcmVzb2x1dGlvbiBzbG90IGlzIHJlc2VydmVkIGZvciB0aGUgYmVzdCBtYXRjaCxcbiAgICAvLyB3aGVuIGEgcXVlcnkgbWF0Y2hlcyB0aGUgZmlyc3Qgd29yZChzKS5cblxuICAgIC8vIGFsc28gdG8gc3RyZXRjaCBzY29yZSB0byB0aGUgd2hvbGUgcmFuZ2Ugb2YgcmVzb2x1dGlvbiwgdGhlXG4gICAgLy8gY2FsY3VsYXRpb24gaXMgc2hpZnQgYnkgb25lIGFuZCBjdXQgdGhlIGZsb2F0aW5nIHBvaW50LlxuICAgIC8vIHRoaXMgbmVlZHMgdGhlIHJlc29sdXRpb24gXCIxXCIgdG8gYmUgaGFuZGxlZCBhZGRpdGlvbmFsbHkuXG5cbiAgICAvLyBkbyBub3Qgc3RyZXRjaCB0aGUgcmVzb2x1dGlvbiBtb3JlIHRoYW4gdGhlIHRlcm0gbGVuZ3RoIHdpbGxcbiAgICAvLyBpbXByb3ZlIHBlcmZvcm1hbmNlIGFuZCBtZW1vcnksIGFsc28gaXQgaW1wcm92ZXMgc2NvcmluZyBpblxuICAgIC8vIG1vc3QgY2FzZXMgYmV0d2VlbiBhIHNob3J0IGRvY3VtZW50IGFuZCBhIGxvbmcgZG9jdW1lbnRcblxuICAgIHJldHVybiBpICYmIDEgPCByZXNvbHV0aW9uID8gbGVuZ3RoICsgKHRlcm1fbGVuZ3RoIHx8IDApIDw9IHJlc29sdXRpb24gPyBpICsgKHggfHwgMCkgOiAwIHwgKHJlc29sdXRpb24gLSAxKSAvIChsZW5ndGggKyAodGVybV9sZW5ndGggfHwgMCkpICogKGkgKyAoeCB8fCAwKSkgKyAxIDogMDtcbn1cblxuLyoqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSBkdXBlc1xyXG4gKiBAcGFyYW0gdmFsdWVcclxuICogQHBhcmFtIHNjb3JlXHJcbiAqIEBwYXJhbSBpZFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBhcHBlbmRcclxuICogQHBhcmFtIHtzdHJpbmc9fSBrZXl3b3JkXHJcbiAqL1xuXG5JbmRleC5wcm90b3R5cGUucHVzaF9pbmRleCA9IGZ1bmN0aW9uIChkdXBlcywgdmFsdWUsIHNjb3JlLCBpZCwgYXBwZW5kLCBrZXl3b3JkKSB7XG5cbiAgICBsZXQgYXJyID0ga2V5d29yZCA/IHRoaXMuY3R4IDogdGhpcy5tYXA7XG5cbiAgICBpZiAoIWR1cGVzW3ZhbHVlXSB8fCBrZXl3b3JkICYmICFkdXBlc1t2YWx1ZV1ba2V5d29yZF0pIHtcblxuICAgICAgICBpZiAodGhpcy5vcHRpbWl6ZSkge1xuXG4gICAgICAgICAgICBhcnIgPSBhcnJbc2NvcmVdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleXdvcmQpIHtcblxuICAgICAgICAgICAgZHVwZXMgPSBkdXBlc1t2YWx1ZV0gfHwgKGR1cGVzW3ZhbHVlXSA9IGNyZWF0ZV9vYmplY3QoKSk7XG4gICAgICAgICAgICBkdXBlc1trZXl3b3JkXSA9IDE7XG5cbiAgICAgICAgICAgIGFyciA9IGFycltrZXl3b3JkXSB8fCAoYXJyW2tleXdvcmRdID0gY3JlYXRlX29iamVjdCgpKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgZHVwZXNbdmFsdWVdID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFyciA9IGFyclt2YWx1ZV0gfHwgKGFyclt2YWx1ZV0gPSBbXSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wdGltaXplKSB7XG5cbiAgICAgICAgICAgIGFyciA9IGFycltzY29yZV0gfHwgKGFycltzY29yZV0gPSBbXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWFwcGVuZCB8fCAhYXJyLmluY2x1ZGVzKGlkKSkge1xuXG4gICAgICAgICAgICBhcnJbYXJyLmxlbmd0aF0gPSBpZDtcblxuICAgICAgICAgICAgLy8gYWRkIGEgcmVmZXJlbmNlIHRvIHRoZSByZWdpc3RlciBmb3IgZmFzdCB1cGRhdGVzXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZhc3R1cGRhdGUpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IHRoaXMucmVnaXN0ZXJbaWRdIHx8ICh0aGlzLnJlZ2lzdGVyW2lkXSA9IFtdKTtcbiAgICAgICAgICAgICAgICB0bXBbdG1wLmxlbmd0aF0gPSBhcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcclxuICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0fSBxdWVyeVxyXG4gKiBAcGFyYW0ge251bWJlcnxPYmplY3Q9fSBsaW1pdFxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQHJldHVybnMge0FycmF5PG51bWJlcnxzdHJpbmc+fVxyXG4gKi9cblxuSW5kZXgucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChxdWVyeSwgbGltaXQsIG9wdGlvbnMpIHtcblxuICAgIGlmICghb3B0aW9ucykge1xuXG4gICAgICAgIGlmICghbGltaXQgJiYgaXNfb2JqZWN0KHF1ZXJ5KSkge1xuXG4gICAgICAgICAgICBvcHRpb25zID0gLyoqIEB0eXBlIHtPYmplY3R9ICovcXVlcnk7XG4gICAgICAgICAgICBxdWVyeSA9IG9wdGlvbnMucXVlcnk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNfb2JqZWN0KGxpbWl0KSkge1xuXG4gICAgICAgICAgICBvcHRpb25zID0gLyoqIEB0eXBlIHtPYmplY3R9ICovbGltaXQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gW10sXG4gICAgICAgIGxlbmd0aCxcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgc3VnZ2VzdCxcbiAgICAgICAgb2Zmc2V0ID0gMDtcblxuXG4gICAgaWYgKG9wdGlvbnMpIHtcblxuICAgICAgICBxdWVyeSA9IG9wdGlvbnMucXVlcnkgfHwgcXVlcnk7XG4gICAgICAgIGxpbWl0ID0gb3B0aW9ucy5saW1pdDtcbiAgICAgICAgb2Zmc2V0ID0gb3B0aW9ucy5vZmZzZXQgfHwgMDtcbiAgICAgICAgY29udGV4dCA9IG9wdGlvbnMuY29udGV4dDtcbiAgICAgICAgc3VnZ2VzdCA9IG9wdGlvbnMuc3VnZ2VzdDtcbiAgICB9XG5cbiAgICBpZiAocXVlcnkpIHtcblxuICAgICAgICBxdWVyeSA9IC8qKiBAdHlwZSB7QXJyYXl9ICovdGhpcy5lbmNvZGUoXCJcIiArIHF1ZXJ5KTtcbiAgICAgICAgbGVuZ3RoID0gcXVlcnkubGVuZ3RoO1xuXG4gICAgICAgIC8vIFRPRE86IHNvbHZlIHRoaXMgaW4gb25lIHNpbmdsZSBsb29wIGJlbG93XG5cbiAgICAgICAgaWYgKDEgPCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGR1cGVzID0gY3JlYXRlX29iamVjdCgpLFxuICAgICAgICAgICAgICAgICAgcXVlcnlfbmV3ID0gW107XG5cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGNvdW50ID0gMCwgdGVybTsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICB0ZXJtID0gcXVlcnlbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAodGVybSAmJiB0ZXJtLmxlbmd0aCA+PSB0aGlzLm1pbmxlbmd0aCAmJiAhZHVwZXNbdGVybV0pIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGZhc3QgcGF0aCBjYW4ganVzdCBhcHBseSB3aGVuIG5vdCBpbiBtZW1vcnktb3B0aW1pemVkIG1vZGVcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0aW1pemUgJiYgIXN1Z2dlc3QgJiYgIXRoaXMubWFwW3Rlcm1dKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhc3QgcGF0aCBcIm5vdCBmb3VuZFwiXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5X25ld1tjb3VudCsrXSA9IHRlcm07XG4gICAgICAgICAgICAgICAgICAgICAgICBkdXBlc1t0ZXJtXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHF1ZXJ5ID0gcXVlcnlfbmV3O1xuICAgICAgICAgICAgbGVuZ3RoID0gcXVlcnkubGVuZ3RoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFsZW5ndGgpIHtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGxpbWl0IHx8IChsaW1pdCA9IDEwMCk7XG5cbiAgICBsZXQgZGVwdGggPSB0aGlzLmRlcHRoICYmIDEgPCBsZW5ndGggJiYgITEgIT09IGNvbnRleHQsXG4gICAgICAgIGluZGV4ID0gMCxcbiAgICAgICAga2V5d29yZDtcblxuXG4gICAgaWYgKGRlcHRoKSB7XG5cbiAgICAgICAga2V5d29yZCA9IHF1ZXJ5WzBdO1xuICAgICAgICBpbmRleCA9IDE7XG4gICAgfSBlbHNlIHtcblxuICAgICAgICBpZiAoMSA8IGxlbmd0aCkge1xuXG4gICAgICAgICAgICBxdWVyeS5zb3J0KHNvcnRfYnlfbGVuZ3RoX2Rvd24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXJyLCB0ZXJtOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuXG4gICAgICAgIHRlcm0gPSBxdWVyeVtpbmRleF07XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coa2V5d29yZCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRlcm0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlwiKTtcblxuICAgICAgICBpZiAoZGVwdGgpIHtcblxuICAgICAgICAgICAgYXJyID0gdGhpcy5hZGRfcmVzdWx0KHJlc3VsdCwgc3VnZ2VzdCwgbGltaXQsIG9mZnNldCwgMiA9PT0gbGVuZ3RoLCB0ZXJtLCBrZXl3b3JkKTtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYXJyKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgIC8vIHdoZW4gc3VnZ2VzdGlvbiBlbmFibGVkIGp1c3QgZm9yd2FyZCBrZXl3b3JkIGlmIHRlcm0gd2FzIGZvdW5kXG4gICAgICAgICAgICAvLyBhcyBsb25nIGFzIHRoZSByZXN1bHQgaXMgZW1wdHkgZm9yd2FyZCB0aGUgcG9pbnRlciBhbHNvXG5cbiAgICAgICAgICAgIGlmICghc3VnZ2VzdCB8fCAhMSAhPT0gYXJyIHx8ICFyZXN1bHQubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICBrZXl3b3JkID0gdGVybTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgYXJyID0gdGhpcy5hZGRfcmVzdWx0KHJlc3VsdCwgc3VnZ2VzdCwgbGltaXQsIG9mZnNldCwgMSA9PT0gbGVuZ3RoLCB0ZXJtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcnIpIHtcblxuICAgICAgICAgICAgcmV0dXJuICgvKiogQHR5cGUge0FycmF5PG51bWJlcnxzdHJpbmc+fSAqL2FyclxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFwcGx5IHN1Z2dlc3Rpb25zIG9uIGxhc3QgbG9vcCBvciBmYWxsYmFja1xuXG4gICAgICAgIGlmIChzdWdnZXN0ICYmIGluZGV4ID09IGxlbmd0aCAtIDEpIHtcblxuICAgICAgICAgICAgbGV0IGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmICghbGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGVwdGgpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBmYWxsYmFjayB0byBub24tY29udGV4dHVhbCBzZWFyY2ggd2hlbiBubyByZXN1bHQgd2FzIGZvdW5kXG5cbiAgICAgICAgICAgICAgICAgICAgZGVwdGggPSAwO1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IC0xO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKDEgPT09IGxlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgLy8gZmFzdCBwYXRoIG9wdGltaXphdGlvblxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpbmdsZV9yZXN1bHQocmVzdWx0WzBdLCBsaW1pdCwgb2Zmc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpbnRlcnNlY3QocmVzdWx0LCBsaW1pdCwgb2Zmc2V0LCBzdWdnZXN0KTtcbn07XG5cbi8qKlxyXG4gKiBSZXR1cm5zIGFuIGFycmF5IHdoZW4gdGhlIHJlc3VsdCBpcyBkb25lICh0byBzdG9wIHRoZSBwcm9jZXNzIGltbWVkaWF0ZWx5KSxcclxuICogcmV0dXJucyBmYWxzZSB3aGVuIHN1Z2dlc3Rpb25zIGlzIGVuYWJsZWQgYW5kIG5vIHJlc3VsdCB3YXMgZm91bmQsXHJcbiAqIG9yIHJldHVybnMgbm90aGluZyB3aGVuIGEgc2V0IHdhcyBwdXNoZWQgc3VjY2Vzc2Z1bGx5IHRvIHRoZSByZXN1bHRzXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHJlc3VsdFxyXG4gKiBAcGFyYW0ge0FycmF5fSBzdWdnZXN0XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsaW1pdFxyXG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ2xlX3Rlcm1cclxuICogQHBhcmFtIHtzdHJpbmd9IHRlcm1cclxuICogQHBhcmFtIHtzdHJpbmc9fSBrZXl3b3JkXHJcbiAqIEByZXR1cm4ge0FycmF5PEFycmF5PHN0cmluZ3xudW1iZXI+Pnxib29sZWFufHVuZGVmaW5lZH1cclxuICovXG5cbkluZGV4LnByb3RvdHlwZS5hZGRfcmVzdWx0ID0gZnVuY3Rpb24gKHJlc3VsdCwgc3VnZ2VzdCwgbGltaXQsIG9mZnNldCwgc2luZ2xlX3Rlcm0sIHRlcm0sIGtleXdvcmQpIHtcbiAgICBsZXQgd29yZF9hcnIgPSBbXSxcbiAgICAgICAgYXJyID0ga2V5d29yZCA/IHRoaXMuY3R4IDogdGhpcy5tYXA7XG5cblxuICAgIGlmICghdGhpcy5vcHRpbWl6ZSkge1xuXG4gICAgICAgIGFyciA9IGdldF9hcnJheShhcnIsIHRlcm0sIGtleXdvcmQsIHRoaXMuYmlkaXJlY3Rpb25hbCk7XG4gICAgfVxuXG4gICAgaWYgKGFycikge1xuXG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IGFycl9sZW4gPSBNYXRoLm1pbihhcnIubGVuZ3RoLCBrZXl3b3JkID8gdGhpcy5yZXNvbHV0aW9uX2N0eCA6IHRoaXMucmVzb2x1dGlvbik7XG5cbiAgICAgICAgLy8gcmVsZXZhbmNlOlxuICAgICAgICBmb3IgKGxldCB4ID0gMCwgc2l6ZSA9IDAsIHRtcCwgbGVuOyB4IDwgYXJyX2xlbjsgeCsrKSB7XG5cbiAgICAgICAgICAgIHRtcCA9IGFyclt4XTtcblxuICAgICAgICAgICAgaWYgKHRtcCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW1pemUpIHtcblxuICAgICAgICAgICAgICAgICAgICB0bXAgPSBnZXRfYXJyYXkodG1wLCB0ZXJtLCBrZXl3b3JkLCB0aGlzLmJpZGlyZWN0aW9uYWwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodG1wICYmIHNpbmdsZV90ZXJtKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9IHRtcC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZW4gPD0gb2Zmc2V0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgLT0gbGVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gdG1wLnNsaWNlKG9mZnNldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0bXApIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBrZWVwIHNjb3JlIChzcGFyc2UgYXJyYXkpOlxuICAgICAgICAgICAgICAgICAgICAvL3dvcmRfYXJyW3hdID0gdG1wO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNpbXBsaWZpZWQgc2NvcmUgb3JkZXI6XG4gICAgICAgICAgICAgICAgICAgIHdvcmRfYXJyW2NvdW50KytdID0gdG1wO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaW5nbGVfdGVybSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplICs9IHRtcC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaXplID49IGxpbWl0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmYXN0IHBhdGggb3B0aW1pemF0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb3VudCkge1xuXG4gICAgICAgICAgICBpZiAoc2luZ2xlX3Rlcm0pIHtcblxuICAgICAgICAgICAgICAgIC8vIGZhc3QgcGF0aCBvcHRpbWl6YXRpb25cbiAgICAgICAgICAgICAgICAvLyBvZmZzZXQgd2FzIGFscmVhZHkgYXBwbGllZCBhdCB0aGlzIHBvaW50XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2luZ2xlX3Jlc3VsdCh3b3JkX2FyciwgbGltaXQsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSB3b3JkX2FycjtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldHVybiBhbiBlbXB0eSBhcnJheSB3aWxsIHN0b3AgdGhlIGxvb3AsXG4gICAgLy8gdG8gcHJldmVudCBzdG9wIHdoZW4gdXNpbmcgc3VnZ2VzdGlvbnMgcmV0dXJuIGEgZmFsc2UgdmFsdWVcblxuICAgIHJldHVybiAhc3VnZ2VzdCAmJiB3b3JkX2Fycjtcbn07XG5cbmZ1bmN0aW9uIHNpbmdsZV9yZXN1bHQocmVzdWx0LCBsaW1pdCwgb2Zmc2V0KSB7XG5cbiAgICBpZiAoMSA9PT0gcmVzdWx0Lmxlbmd0aCkge1xuXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdFswXTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIHJlc3VsdCA9IGNvbmNhdChyZXN1bHQpO1xuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXQgfHwgcmVzdWx0Lmxlbmd0aCA+IGxpbWl0ID8gcmVzdWx0LnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgbGltaXQpIDogcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBnZXRfYXJyYXkoYXJyLCB0ZXJtLCBrZXl3b3JkLCBiaWRpcmVjdGlvbmFsKSB7XG5cbiAgICBpZiAoa2V5d29yZCkge1xuXG4gICAgICAgIC8vIHRoZSBmcmVxdWVuY3kgb2YgdGhlIHN0YXJ0aW5nIGxldHRlciBpcyBzbGlnaHRseSBsZXNzXG4gICAgICAgIC8vIG9uIHRoZSBsYXN0IGhhbGYgb2YgdGhlIGFscGhhYmV0IChtLXopIGluIGFsbW9zdCBldmVyeSBsYXRpbiBsYW5ndWFnZSxcbiAgICAgICAgLy8gc28gd2Ugc29ydCBkb3dud2FyZHMgKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xldHRlcl9mcmVxdWVuY3kpXG5cbiAgICAgICAgY29uc3Qgc3dhcCA9IGJpZGlyZWN0aW9uYWwgJiYgdGVybSA+IGtleXdvcmQ7XG5cbiAgICAgICAgYXJyID0gYXJyW3N3YXAgPyB0ZXJtIDoga2V5d29yZF07XG4gICAgICAgIGFyciA9IGFyciAmJiBhcnJbc3dhcCA/IGtleXdvcmQgOiB0ZXJtXTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGFyciA9IGFyclt0ZXJtXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyO1xufVxuXG5JbmRleC5wcm90b3R5cGUuY29udGFpbiA9IGZ1bmN0aW9uIChpZCkge1xuXG4gICAgcmV0dXJuICEhdGhpcy5yZWdpc3RlcltpZF07XG59O1xuXG5JbmRleC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGlkLCBjb250ZW50KSB7XG5cbiAgICByZXR1cm4gdGhpcy5yZW1vdmUoaWQpLmFkZChpZCwgY29udGVudCk7XG59O1xuXG4vKipcclxuICogQHBhcmFtIHtib29sZWFuPX0gX3NraXBfZGVsZXRpb25cclxuICovXG5cbkluZGV4LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaWQsIF9za2lwX2RlbGV0aW9uKSB7XG5cbiAgICBjb25zdCByZWZzID0gdGhpcy5yZWdpc3RlcltpZF07XG5cbiAgICBpZiAocmVmcykge1xuXG4gICAgICAgIGlmICh0aGlzLmZhc3R1cGRhdGUpIHtcblxuICAgICAgICAgICAgLy8gZmFzdCB1cGRhdGVzIHBlcmZvcm1zIHJlYWxseSBmYXN0IGJ1dCBkaWQgbm90IGZ1bGx5IGNsZWFudXAgdGhlIGtleSBlbnRyaWVzXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCB0bXA7IGkgPCByZWZzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICB0bXAgPSByZWZzW2ldO1xuICAgICAgICAgICAgICAgIHRtcC5zcGxpY2UodG1wLmluZGV4T2YoaWQpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmVtb3ZlX2luZGV4KHRoaXMubWFwLCBpZCwgdGhpcy5yZXNvbHV0aW9uLCB0aGlzLm9wdGltaXplKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZGVwdGgpIHtcblxuICAgICAgICAgICAgICAgIHJlbW92ZV9pbmRleCh0aGlzLmN0eCwgaWQsIHRoaXMucmVzb2x1dGlvbl9jdHgsIHRoaXMub3B0aW1pemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgX3NraXBfZGVsZXRpb24gfHwgZGVsZXRlIHRoaXMucmVnaXN0ZXJbaWRdO1xuXG4gICAgICAgIGlmICh0aGlzLmNhY2hlKSB7XG5cbiAgICAgICAgICAgIHRoaXMuY2FjaGUuZGVsKGlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXHJcbiAqIEBwYXJhbSBtYXBcclxuICogQHBhcmFtIGlkXHJcbiAqIEBwYXJhbSByZXNcclxuICogQHBhcmFtIG9wdGltaXplXHJcbiAqIEBwYXJhbSB7bnVtYmVyPX0gcmVzb2x1dGlvblxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9XHJcbiAqL1xuXG5mdW5jdGlvbiByZW1vdmVfaW5kZXgobWFwLCBpZCwgcmVzLCBvcHRpbWl6ZSwgcmVzb2x1dGlvbikge1xuXG4gICAgbGV0IGNvdW50ID0gMDtcblxuICAgIGlmIChpc19hcnJheShtYXApKSB7XG5cbiAgICAgICAgLy8gdGhlIGZpcnN0IGFycmF5IGlzIHRoZSBzY29yZSBhcnJheSBpbiBib3RoIHN0cmF0ZWdpZXNcblxuICAgICAgICBpZiAoIXJlc29sdXRpb24pIHtcblxuICAgICAgICAgICAgcmVzb2x1dGlvbiA9IE1hdGgubWluKG1hcC5sZW5ndGgsIHJlcyk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwLCBhcnI7IHggPCByZXNvbHV0aW9uOyB4KyspIHtcblxuICAgICAgICAgICAgICAgIGFyciA9IG1hcFt4XTtcblxuICAgICAgICAgICAgICAgIGlmIChhcnIpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb3VudCA9IHJlbW92ZV9pbmRleChhcnIsIGlkLCByZXMsIG9wdGltaXplLCByZXNvbHV0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGltaXplICYmICFjb3VudCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIG5vdCBtZW1vcnkgb3B0aW1pemVkIHRoZSBzY29yZSBpbmRleCBzaG91bGQgcmVtb3ZlZFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbWFwW3hdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBjb25zdCBwb3MgPSBtYXAuaW5kZXhPZihpZCk7XG5cbiAgICAgICAgICAgIGlmICgtMSAhPT0gcG9zKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBmYXN0IHBhdGgsIHdoZW4gbGVuZ3RoIGlzIDEgb3IgbG93ZXIgdGhlbiB0aGUgd2hvbGUgZmllbGQgZ2V0cyBkZWxldGVkXG5cbiAgICAgICAgICAgICAgICBpZiAoMSA8IG1hcC5sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgICAgICBtYXAuc3BsaWNlKHBvcywgMSk7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBtYXApIHtcblxuICAgICAgICAgICAgY291bnQgPSByZW1vdmVfaW5kZXgobWFwW2tleV0sIGlkLCByZXMsIG9wdGltaXplLCByZXNvbHV0aW9uKTtcblxuICAgICAgICAgICAgaWYgKCFjb3VudCkge1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlIG1hcFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvdW50O1xufVxuXG5JbmRleC5wcm90b3R5cGUuc2VhcmNoQ2FjaGUgPSBzZWFyY2hDYWNoZTtcblxuXG5JbmRleC5wcm90b3R5cGUuZXhwb3J0ID0gZXhwb3J0SW5kZXg7XG5JbmRleC5wcm90b3R5cGUuaW1wb3J0ID0gaW1wb3J0SW5kZXg7XG5cblxuYXBwbHlfYXN5bmMoSW5kZXgucHJvdG90eXBlKTsiLCJpbXBvcnQgeyBjcmVhdGVfb2JqZWN0LCBjb25jYXQgfSBmcm9tIFwiLi9jb21tb24uanNcIjtcblxuLyoqXHJcbiAqIEltcGxlbWVudGF0aW9uIGJhc2VkIG9uIEFycmF5LmluY2x1ZGVzKCkgcHJvdmlkZXMgYmV0dGVyIHBlcmZvcm1hbmNlLFxyXG4gKiBidXQgaXQgbmVlZHMgYXQgbGVhc3Qgb25lIHdvcmQgaW4gdGhlIHF1ZXJ5IHdoaWNoIGlzIGxlc3MgZnJlcXVlbnQuXHJcbiAqIEFsc28gb24gbGFyZ2UgaW5kZXhlcyBpdCBkb2VzIG5vdCBzY2FsZSB3ZWxsIHBlcmZvcm1hbmNlLXdpc2UuXHJcbiAqIFRoaXMgc3RyYXRlZ3kgYWxzbyBsYWNrcyBvZiBzdWdnZXN0aW9uIGNhcGFiaWxpdGllcyAobWF0Y2hpbmcgJiBzb3J0aW5nKS5cclxuICpcclxuICogQHBhcmFtIGFycmF5c1xyXG4gKiBAcGFyYW0gbGltaXRcclxuICogQHBhcmFtIG9mZnNldFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW58QXJyYXk9fSBzdWdnZXN0XHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICovXG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBpbnRlcnNlY3QoYXJyYXlzLCBsaW1pdCwgb2Zmc2V0LCBzdWdnZXN0KSB7XG4vL1xuLy8gICAgIGNvbnN0IGxlbmd0aCA9IGFycmF5cy5sZW5ndGg7XG4vLyAgICAgbGV0IHJlc3VsdCA9IFtdO1xuLy8gICAgIGxldCBjaGVjaztcbi8vXG4vLyAgICAgLy8gZGV0ZXJtaW5lIHNob3J0ZXN0IGFycmF5IGFuZCBjb2xsZWN0IHJlc3VsdHNcbi8vICAgICAvLyBmcm9tIHRoZSBzcGFyc2UgcmVsZXZhbmNlIGFycmF5c1xuLy9cbi8vICAgICBsZXQgc21hbGxlc3Rfc2l6ZTtcbi8vICAgICBsZXQgc21hbGxlc3RfYXJyO1xuLy8gICAgIGxldCBzbWFsbGVzdF9pbmRleDtcbi8vXG4vLyAgICAgZm9yKGxldCB4ID0gMDsgeCA8IGxlbmd0aDsgeCsrKXtcbi8vXG4vLyAgICAgICAgIGNvbnN0IGFyciA9IGFycmF5c1t4XTtcbi8vICAgICAgICAgY29uc3QgbGVuID0gYXJyLmxlbmd0aDtcbi8vXG4vLyAgICAgICAgIGxldCBzaXplID0gMDtcbi8vXG4vLyAgICAgICAgIGZvcihsZXQgeSA9IDAsIHRtcDsgeSA8IGxlbjsgeSsrKXtcbi8vXG4vLyAgICAgICAgICAgICB0bXAgPSBhcnJbeV07XG4vL1xuLy8gICAgICAgICAgICAgaWYodG1wKXtcbi8vXG4vLyAgICAgICAgICAgICAgICAgc2l6ZSArPSB0bXAubGVuZ3RoO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vL1xuLy8gICAgICAgICBpZighc21hbGxlc3Rfc2l6ZSB8fCAoc2l6ZSA8IHNtYWxsZXN0X3NpemUpKXtcbi8vXG4vLyAgICAgICAgICAgICBzbWFsbGVzdF9zaXplID0gc2l6ZTtcbi8vICAgICAgICAgICAgIHNtYWxsZXN0X2FyciA9IGFycjtcbi8vICAgICAgICAgICAgIHNtYWxsZXN0X2luZGV4ID0geDtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vXG4vLyAgICAgc21hbGxlc3RfYXJyID0gc21hbGxlc3RfYXJyLmxlbmd0aCA9PT0gMSA/XG4vL1xuLy8gICAgICAgICBzbWFsbGVzdF9hcnJbMF1cbi8vICAgICA6XG4vLyAgICAgICAgIGNvbmNhdChzbWFsbGVzdF9hcnIpO1xuLy9cbi8vICAgICBpZihzdWdnZXN0KXtcbi8vXG4vLyAgICAgICAgIHN1Z2dlc3QgPSBbc21hbGxlc3RfYXJyXTtcbi8vICAgICAgICAgY2hlY2sgPSBjcmVhdGVfb2JqZWN0KCk7XG4vLyAgICAgfVxuLy9cbi8vICAgICBsZXQgc2l6ZSA9IDA7XG4vLyAgICAgbGV0IHN0ZXBzID0gMDtcbi8vXG4vLyAgICAgLy8gcHJvY2VzcyB0ZXJtcyBpbiByZXZlcnNlZCBvcmRlciBvZnRlbiByZXN1bHRzIGluIGJldHRlciBwZXJmb3JtYW5jZS5cbi8vICAgICAvLyB0aGUgb3V0ZXIgbG9vcCBtdXN0IGJlIHRoZSB3b3JkcyBhcnJheSwgdXNpbmcgdGhlXG4vLyAgICAgLy8gc21hbGxlc3QgYXJyYXkgaGVyZSBkaXNhYmxlcyB0aGUgXCJmYXN0IGZhaWxcIiBvcHRpbWl6YXRpb24uXG4vL1xuLy8gICAgIGZvcihsZXQgeCA9IGxlbmd0aCAtIDE7IHggPj0gMDsgeC0tKXtcbi8vXG4vLyAgICAgICAgIGlmKHggIT09IHNtYWxsZXN0X2luZGV4KXtcbi8vXG4vLyAgICAgICAgICAgICBzdGVwcysrO1xuLy9cbi8vICAgICAgICAgICAgIGNvbnN0IHdvcmRfYXJyID0gYXJyYXlzW3hdO1xuLy8gICAgICAgICAgICAgY29uc3Qgd29yZF9hcnJfbGVuID0gd29yZF9hcnIubGVuZ3RoO1xuLy8gICAgICAgICAgICAgY29uc3QgbmV3X2FyciA9IFtdO1xuLy9cbi8vICAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG4vL1xuLy8gICAgICAgICAgICAgZm9yKGxldCB6ID0gMCwgaWQ7IHogPCBzbWFsbGVzdF9hcnIubGVuZ3RoOyB6Kyspe1xuLy9cbi8vICAgICAgICAgICAgICAgICBpZCA9IHNtYWxsZXN0X2Fyclt6XTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgbGV0IGZvdW5kO1xuLy9cbi8vICAgICAgICAgICAgICAgICAvLyBwcm9jZXNzIHJlbGV2YW5jZSBpbiBmb3J3YXJkIG9yZGVyIChkaXJlY3Rpb24gaXNcbi8vICAgICAgICAgICAgICAgICAvLyBpbXBvcnRhbnQgZm9yIGFkZGluZyBJRHMgZHVyaW5nIHRoZSBsYXN0IHJvdW5kKVxuLy9cbi8vICAgICAgICAgICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgd29yZF9hcnJfbGVuOyB5Kyspe1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyID0gd29yZF9hcnJbeV07XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICBpZihhcnIubGVuZ3RoKXtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IGFyci5pbmNsdWRlcyhpZCk7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYoZm91bmQpe1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBpbiBsYXN0IHJvdW5kXG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHN0ZXBzID09PSBsZW5ndGggLSAxKXtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9mZnNldCl7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0LS07XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbc2l6ZSsrXSA9IGlkO1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNpemUgPT09IGxpbWl0KXtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFzdCBwYXRoIFwiZW5kIHJlYWNoZWRcIlxuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzdWdnZXN0KXtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1tpZF0gPSAxO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICAgICAgaWYoZm91bmQpe1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgbmV3X2Fycltjb3VudCsrXSA9IGlkO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICBpZihzdWdnZXN0KXtcbi8vXG4vLyAgICAgICAgICAgICAgICAgc3VnZ2VzdFtzdGVwc10gPSBuZXdfYXJyO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgZWxzZSBpZighY291bnQpe1xuLy9cbi8vICAgICAgICAgICAgICAgICByZXR1cm4gW107XG4vLyAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgc21hbGxlc3RfYXJyID0gbmV3X2Fycjtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vXG4vLyAgICAgaWYoc3VnZ2VzdCl7XG4vL1xuLy8gICAgICAgICAvLyBuZWVkcyB0byBpdGVyYXRlIGluIHJldmVyc2UgZGlyZWN0aW9uXG4vL1xuLy8gICAgICAgICBmb3IobGV0IHggPSBzdWdnZXN0Lmxlbmd0aCAtIDEsIGFyciwgbGVuOyB4ID49IDA7IHgtLSl7XG4vL1xuLy8gICAgICAgICAgICAgYXJyID0gc3VnZ2VzdFt4XTtcbi8vICAgICAgICAgICAgIGxlbiA9IGFyciAmJiBhcnIubGVuZ3RoO1xuLy9cbi8vICAgICAgICAgICAgIGlmKGxlbil7XG4vL1xuLy8gICAgICAgICAgICAgICAgIGZvcihsZXQgeSA9IDAsIGlkOyB5IDwgbGVuOyB5Kyspe1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgaWQgPSBhcnJbeV07XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICBpZighY2hlY2tbaWRdKXtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1tpZF0gPSAxO1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9mZnNldCl7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldC0tO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3NpemUrK10gPSBpZDtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2l6ZSA9PT0gbGltaXQpe1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFzdCBwYXRoIFwiZW5kIHJlYWNoZWRcIlxuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vL1xuLy8gICAgIHJldHVybiByZXN1bHQ7XG4vLyB9XG5cbi8qKlxyXG4gKiBJbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBPYmplY3Rba2V5XSBwcm92aWRlcyBiZXR0ZXIgc3VnZ2VzdGlvbnNcclxuICogY2FwYWJpbGl0aWVzIGFuZCBoYXMgbGVzcyBwZXJmb3JtYW5jZSBzY2FsaW5nIGlzc3VlcyBvbiBsYXJnZSBpbmRleGVzLlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJyYXlzXHJcbiAqIEBwYXJhbSBsaW1pdFxyXG4gKiBAcGFyYW0gb2Zmc2V0XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbnxBcnJheT19IHN1Z2dlc3RcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGludGVyc2VjdChhcnJheXMsIGxpbWl0LCBvZmZzZXQsIHN1Z2dlc3QpIHtcblxuICAgIGNvbnN0IGxlbmd0aCA9IGFycmF5cy5sZW5ndGg7XG4gICAgbGV0IHJlc3VsdCA9IFtdLFxuICAgICAgICBjaGVjayxcbiAgICAgICAgY2hlY2tfc3VnZ2VzdCxcbiAgICAgICAgc2l6ZSA9IDA7XG5cblxuICAgIGlmIChzdWdnZXN0KSB7XG5cbiAgICAgICAgc3VnZ2VzdCA9IFtdO1xuICAgIH1cblxuICAgIC8vIHByb2Nlc3MgdGVybXMgaW4gcmV2ZXJzZWQgb3JkZXIgb2Z0ZW4gaGFzIGFkdmFudGFnZSBmb3IgdGhlIGZhc3QgcGF0aCBcImVuZCByZWFjaGVkXCIuXG4gICAgLy8gYWxzbyBhIHJldmVyc2VkIG9yZGVyIHByaW9yaXRpemUgdGhlIG9yZGVyIG9mIHdvcmRzIGZyb20gYSBxdWVyeS5cblxuICAgIGZvciAobGV0IHggPSBsZW5ndGggLSAxOyAwIDw9IHg7IHgtLSkge1xuICAgICAgICBjb25zdCB3b3JkX2FyciA9IGFycmF5c1t4XSxcbiAgICAgICAgICAgICAgd29yZF9hcnJfbGVuID0gd29yZF9hcnIubGVuZ3RoLFxuICAgICAgICAgICAgICBjaGVja19uZXcgPSBjcmVhdGVfb2JqZWN0KCk7XG5cblxuICAgICAgICBsZXQgZm91bmQgPSAhY2hlY2s7XG5cbiAgICAgICAgLy8gcHJvY2VzcyByZWxldmFuY2UgaW4gZm9yd2FyZCBvcmRlciAoZGlyZWN0aW9uIGlzXG4gICAgICAgIC8vIGltcG9ydGFudCBmb3IgYWRkaW5nIElEcyBkdXJpbmcgdGhlIGxhc3Qgcm91bmQpXG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB3b3JkX2Fycl9sZW47IHkrKykge1xuICAgICAgICAgICAgY29uc3QgYXJyID0gd29yZF9hcnJbeV0sXG4gICAgICAgICAgICAgICAgICBhcnJfbGVuID0gYXJyLmxlbmd0aDtcblxuXG4gICAgICAgICAgICBpZiAoYXJyX2xlbikge1xuXG4gICAgICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIElEc1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeiA9IDAsIGNoZWNrX2lkeCwgaWQ7IHogPCBhcnJfbGVuOyB6KyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZCA9IGFyclt6XTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2spIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrW2lkXSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaW4gbGFzdCByb3VuZFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF4KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3NpemUrK10gPSBpZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpemUgPT09IGxpbWl0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmYXN0IHBhdGggXCJlbmQgcmVhY2hlZFwiXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHggfHwgc3VnZ2VzdCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrX25ld1tpZF0gPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gLyogYXBwZW5kOiAqLyAvKiBza2lwIHVwZGF0ZTogKi8gLyogc2tpcF91cGRhdGU6ICovITA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWdnZXN0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja19pZHggPSAoY2hlY2tfc3VnZ2VzdFtpZF0gfHwgMCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrX3N1Z2dlc3RbaWRdID0gY2hlY2tfaWR4O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IGFkZGluZyBJRHMgd2hpY2ggYXJlIGFscmVhZHkgaW5jbHVkZWQgaW4gdGhlIHJlc3VsdCAoc2F2ZXMgb25lIGxvb3ApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGZpcnN0IGludGVyc2VjdGlvbiBtYXRjaCBoYXMgdGhlIGNoZWNrIGluZGV4IDIsIHNvIHNoaWZ0IGJ5IC0yXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tfaWR4IDwgbGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG1wID0gc3VnZ2VzdFtjaGVja19pZHggLSAyXSB8fCAoc3VnZ2VzdFtjaGVja19pZHggLSAyXSA9IFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wW3RtcC5sZW5ndGhdID0gaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmUtZmlsbCBpbiBmaXJzdCByb3VuZFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja19uZXdbaWRdID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdWdnZXN0KSB7XG5cbiAgICAgICAgICAgIC8vIHJlLXVzZSB0aGUgZmlyc3QgcHJlLWZpbGxlZCBjaGVjayBmb3Igc3VnZ2VzdGlvbnNcblxuICAgICAgICAgICAgY2hlY2sgfHwgKGNoZWNrX3N1Z2dlc3QgPSBjaGVja19uZXcpO1xuICAgICAgICB9IGVsc2UgaWYgKCFmb3VuZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBjaGVjayA9IGNoZWNrX25ldztcbiAgICB9XG5cbiAgICBpZiAoc3VnZ2VzdCkge1xuXG4gICAgICAgIC8vIG5lZWRzIHRvIGl0ZXJhdGUgaW4gcmV2ZXJzZSBkaXJlY3Rpb25cblxuICAgICAgICBmb3IgKGxldCB4ID0gc3VnZ2VzdC5sZW5ndGggLSAxLCBhcnIsIGxlbjsgMCA8PSB4OyB4LS0pIHtcblxuICAgICAgICAgICAgYXJyID0gc3VnZ2VzdFt4XTtcbiAgICAgICAgICAgIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwLCBpZDsgeSA8IGxlbjsgeSsrKSB7XG5cbiAgICAgICAgICAgICAgICBpZCA9IGFyclt5XTtcblxuICAgICAgICAgICAgICAgIGlmICghY2hlY2tbaWRdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQtLTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3NpemUrK10gPSBpZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpemUgPT09IGxpbWl0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmYXN0IHBhdGggXCJlbmQgcmVhY2hlZFwiXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tbaWRdID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcclxuICogQHBhcmFtIG1hbmRhdG9yeVxyXG4gKiBAcGFyYW0gYXJyYXlzXHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnNlY3RfdW5pb24obWFuZGF0b3J5LCBhcnJheXMpIHtcbiAgICBjb25zdCBjaGVjayA9IGNyZWF0ZV9vYmplY3QoKSxcbiAgICAgICAgICB1bmlvbiA9IGNyZWF0ZV9vYmplY3QoKSxcbiAgICAgICAgICByZXN1bHQgPSBbXTtcblxuXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBtYW5kYXRvcnkubGVuZ3RoOyB4KyspIHtcblxuICAgICAgICBjaGVja1ttYW5kYXRvcnlbeF1dID0gMTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCB4ID0gMCwgYXJyOyB4IDwgYXJyYXlzLmxlbmd0aDsgeCsrKSB7XG5cbiAgICAgICAgYXJyID0gYXJyYXlzW3hdO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSAwLCBpZDsgeSA8IGFyci5sZW5ndGg7IHkrKykge1xuXG4gICAgICAgICAgICBpZCA9IGFyclt5XTtcblxuICAgICAgICAgICAgaWYgKGNoZWNrW2lkXSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCF1bmlvbltpZF0pIHtcblxuICAgICAgICAgICAgICAgICAgICB1bmlvbltpZF0gPSAxO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBpZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufSIsImltcG9ydCB7IEluZGV4SW50ZXJmYWNlIH0gZnJvbSBcIi4vdHlwZS5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlX29iamVjdCwgZ2V0X2tleXMgfSBmcm9tIFwiLi9jb21tb24uanNcIjtcblxuLyoqXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gc3RyXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbnxBcnJheTxzdHJpbmd8UmVnRXhwPj19IG5vcm1hbGl6ZVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW58c3RyaW5nfFJlZ0V4cD19IHNwbGl0XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IF9jb2xsYXBzZVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfEFycmF5PHN0cmluZz59XHJcbiAqIEB0aGlzIEluZGV4SW50ZXJmYWNlXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcGlwZWxpbmUoc3RyLCBub3JtYWxpemUsIHNwbGl0LCBfY29sbGFwc2UpIHtcblxuICAgIGlmIChzdHIpIHtcblxuICAgICAgICBpZiAobm9ybWFsaXplKSB7XG5cbiAgICAgICAgICAgIHN0ciA9IHJlcGxhY2Uoc3RyLCAvKiogQHR5cGUge0FycmF5PHN0cmluZ3xSZWdFeHA+fSAqL25vcm1hbGl6ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tYXRjaGVyKSB7XG5cbiAgICAgICAgICAgIHN0ciA9IHJlcGxhY2Uoc3RyLCB0aGlzLm1hdGNoZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc3RlbW1lciAmJiAxIDwgc3RyLmxlbmd0aCkge1xuXG4gICAgICAgICAgICBzdHIgPSByZXBsYWNlKHN0ciwgdGhpcy5zdGVtbWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfY29sbGFwc2UgJiYgMSA8IHN0ci5sZW5ndGgpIHtcblxuICAgICAgICAgICAgc3RyID0gY29sbGFwc2Uoc3RyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzcGxpdCB8fCBcIlwiID09PSBzcGxpdCkge1xuXG4gICAgICAgICAgICBjb25zdCB3b3JkcyA9IHN0ci5zcGxpdCggLyoqIEB0eXBlIHtzdHJpbmd8UmVnRXhwfSAqL3NwbGl0KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyID8gZmlsdGVyKHdvcmRzLCB0aGlzLmZpbHRlcikgOiB3b3JkcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdHI7XG59XG5cbi8vIFRPRE8gaW1wcm92ZSBub3JtYWxpemUgKyByZW1vdmUgbm9uLWRlbGltaXRlZCBjaGFycyBsaWtlIGluIFwiSSdtXCIgKyBzcGxpdCBvbiB3aGl0ZXNwYWNlK1xuXG5leHBvcnQgY29uc3QgcmVnZXhfd2hpdGVzcGFjZSA9IC9bXFxwe1p9XFxwe1N9XFxwe1B9XFxwe0N9XSsvdTtcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZXh0YXBwcy1kZS9mbGV4c2VhcmNoL3B1bGwvNDE0XG4vL2V4cG9ydCBjb25zdCByZWdleF93aGl0ZXNwYWNlID0gL1tcXHNcXHhBMFxcdTIwMDAtXFx1MjAwQlxcdTIwMjhcXHUyMDI5XFx1MzAwMFxcdWZlZmYhXCIjJCUmJygpKissXFwtLi86Ozw9Pj9AW1xcXFxcXF1eX2B7fH1+XS9cbmNvbnN0IHJlZ2V4X25vcm1hbGl6ZSA9IC9bXFx1MDMwMC1cXHUwMzZmXS9nO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplKHN0cikge1xuXG4gICAgaWYgKHN0ci5ub3JtYWxpemUpIHtcblxuICAgICAgICBzdHIgPSBzdHIubm9ybWFsaXplKFwiTkZEXCIpLnJlcGxhY2UocmVnZXhfbm9ybWFsaXplLCBcIlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyO1xufVxuXG4vKipcclxuICogQHBhcmFtIHshc3RyaW5nfSBzdHJcclxuICogQHBhcmFtIHtib29sZWFufEFycmF5PHN0cmluZ3xSZWdFeHA+PX0gbm9ybWFsaXplXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbnxzdHJpbmd8UmVnRXhwPX0gc3BsaXRcclxuICogQHBhcmFtIHtib29sZWFuPX0gX2NvbGxhcHNlXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd8QXJyYXk8c3RyaW5nPn1cclxuICovXG5cbi8vIEZsZXhTZWFyY2gucHJvdG90eXBlLnBpcGVsaW5lID0gZnVuY3Rpb24oc3RyLCBub3JtYWxpemUsIHNwbGl0LCBfY29sbGFwc2Upe1xuLy9cbi8vICAgICBpZihzdHIpe1xuLy9cbi8vICAgICAgICAgaWYobm9ybWFsaXplICYmIHN0cil7XG4vL1xuLy8gICAgICAgICAgICAgc3RyID0gcmVwbGFjZShzdHIsIC8qKiBAdHlwZSB7QXJyYXk8c3RyaW5nfFJlZ0V4cD59ICovIChub3JtYWxpemUpKTtcbi8vICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgaWYoc3RyICYmIHRoaXMubWF0Y2hlcil7XG4vL1xuLy8gICAgICAgICAgICAgc3RyID0gcmVwbGFjZShzdHIsIHRoaXMubWF0Y2hlcik7XG4vLyAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgIGlmKHRoaXMuc3RlbW1lciAmJiBzdHIubGVuZ3RoID4gMSl7XG4vL1xuLy8gICAgICAgICAgICAgc3RyID0gcmVwbGFjZShzdHIsIHRoaXMuc3RlbW1lcik7XG4vLyAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgIGlmKF9jb2xsYXBzZSAmJiBzdHIubGVuZ3RoID4gMSl7XG4vL1xuLy8gICAgICAgICAgICAgc3RyID0gY29sbGFwc2Uoc3RyKTtcbi8vICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgaWYoc3RyKXtcbi8vXG4vLyAgICAgICAgICAgICBpZihzcGxpdCB8fCAoc3BsaXQgPT09IFwiXCIpKXtcbi8vXG4vLyAgICAgICAgICAgICAgICAgY29uc3Qgd29yZHMgPSBzdHIuc3BsaXQoLyoqIEB0eXBlIHtzdHJpbmd8UmVnRXhwfSAqLyAoc3BsaXQpKTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyID8gZmlsdGVyKHdvcmRzLCB0aGlzLmZpbHRlcikgOiB3b3Jkcztcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vXG4vLyAgICAgcmV0dXJuIHN0cjtcbi8vIH07XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBwaXBlbGluZShzdHIsIG5vcm1hbGl6ZSwgbWF0Y2hlciwgc3RlbW1lciwgc3BsaXQsIF9maWx0ZXIsIF9jb2xsYXBzZSl7XG4vL1xuLy8gICAgIGlmKHN0cil7XG4vL1xuLy8gICAgICAgICBpZihub3JtYWxpemUgJiYgc3RyKXtcbi8vXG4vLyAgICAgICAgICAgICBzdHIgPSByZXBsYWNlKHN0ciwgbm9ybWFsaXplKTtcbi8vICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgaWYobWF0Y2hlciAmJiBzdHIpe1xuLy9cbi8vICAgICAgICAgICAgIHN0ciA9IHJlcGxhY2Uoc3RyLCBtYXRjaGVyKTtcbi8vICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgaWYoc3RlbW1lciAmJiBzdHIubGVuZ3RoID4gMSl7XG4vL1xuLy8gICAgICAgICAgICAgc3RyID0gcmVwbGFjZShzdHIsIHN0ZW1tZXIpO1xuLy8gICAgICAgICB9XG4vL1xuLy8gICAgICAgICBpZihfY29sbGFwc2UgJiYgc3RyLmxlbmd0aCA+IDEpe1xuLy9cbi8vICAgICAgICAgICAgIHN0ciA9IGNvbGxhcHNlKHN0cik7XG4vLyAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgIGlmKHN0cil7XG4vL1xuLy8gICAgICAgICAgICAgaWYoc3BsaXQgIT09IGZhbHNlKXtcbi8vXG4vLyAgICAgICAgICAgICAgICAgc3RyID0gc3RyLnNwbGl0KHNwbGl0KTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgaWYoX2ZpbHRlcil7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICBzdHIgPSBmaWx0ZXIoc3RyLCBfZmlsdGVyKTtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vL1xuLy8gICAgIHJldHVybiBzdHI7XG4vLyB9XG5cblxuLyoqXHJcbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gd29yZHNcclxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIHN0cmluZz59XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9maWx0ZXIod29yZHMpIHtcblxuICAgIGNvbnN0IGZpbHRlciA9IGNyZWF0ZV9vYmplY3QoKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSB3b3Jkcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGZpbHRlclt3b3Jkc1tpXV0gPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXI7XG59XG5cbi8qKlxyXG4gKiBAcGFyYW0geyFPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSBvYmpcclxuICogQHBhcmFtIHtib29sZWFufSBpc19zdGVtbWVyXHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0X3N0ZW1tZXJfb3JfbWF0Y2hlcihvYmosIGlzX3N0ZW1tZXIpIHtcbiAgICBjb25zdCBrZXlzID0gZ2V0X2tleXMob2JqKSxcbiAgICAgICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aCxcbiAgICAgICAgICBmaW5hbCA9IFtdO1xuXG5cbiAgICBsZXQgcmVtb3ZhbCA9IFwiXCIsXG4gICAgICAgIGNvdW50ID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwLCBrZXksIHRtcDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgdG1wID0gb2JqW2tleV07XG5cbiAgICAgICAgaWYgKHRtcCkge1xuXG4gICAgICAgICAgICBmaW5hbFtjb3VudCsrXSA9IHJlZ2V4KGlzX3N0ZW1tZXIgPyBcIig/IVxcXFxiKVwiICsga2V5ICsgXCIoXFxcXGJ8XylcIiA6IGtleSk7XG4gICAgICAgICAgICBmaW5hbFtjb3VudCsrXSA9IHRtcDtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmVtb3ZhbCArPSAocmVtb3ZhbCA/IFwifFwiIDogXCJcIikgKyBrZXk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVtb3ZhbCkge1xuXG4gICAgICAgIGZpbmFsW2NvdW50KytdID0gcmVnZXgoaXNfc3RlbW1lciA/IFwiKD8hXFxcXGIpKFwiICsgcmVtb3ZhbCArIFwiKShcXFxcYnxfKVwiIDogXCIoXCIgKyByZW1vdmFsICsgXCIpXCIpO1xuICAgICAgICBmaW5hbFtjb3VudF0gPSBcIlwiO1xuICAgIH1cblxuICAgIHJldHVybiBmaW5hbDtcbn1cblxuLyoqXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gc3RyXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHJlZ2V4cFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2Uoc3RyLCByZWdleHApIHtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSByZWdleHAubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDIpIHtcblxuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShyZWdleHBbaV0sIHJlZ2V4cFtpICsgMV0pO1xuXG4gICAgICAgIGlmICghc3RyKSB7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gc3RyXHJcbiAqIEByZXR1cm5zIHtSZWdFeHB9XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnZXgoc3RyKSB7XG5cbiAgICByZXR1cm4gbmV3IFJlZ0V4cChzdHIsIFwiZ1wiKTtcbn1cblxuLyoqXHJcbiAqIFJlZ2V4OiByZXBsYWNlKC8oPzooXFx3KSg/OlxcMSkqKS9nLCBcIiQxXCIpXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gc3RyaW5nXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY29sbGFwc2Uoc3RyaW5nKSB7XG5cbiAgICBsZXQgZmluYWwgPSBcIlwiLFxuICAgICAgICBwcmV2ID0gXCJcIjtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzdHJpbmcubGVuZ3RoLCBjaGFyOyBpIDwgbGVuOyBpKyspIHtcblxuICAgICAgICBpZiAoKGNoYXIgPSBzdHJpbmdbaV0pICE9PSBwcmV2KSB7XG5cbiAgICAgICAgICAgIGZpbmFsICs9IHByZXYgPSBjaGFyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbmFsO1xufVxuXG4vLyBUT0RPIHVzaW5nIGZhc3Qtc3dhcFxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlcih3b3JkcywgbWFwKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gd29yZHMubGVuZ3RoLFxuICAgICAgICAgIGZpbHRlcmVkID0gW107XG5cblxuICAgIGZvciAobGV0IGkgPSAwLCBjb3VudCA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGNvbnN0IHdvcmQgPSB3b3Jkc1tpXTtcblxuICAgICAgICBpZiAod29yZCAmJiAhbWFwW3dvcmRdKSB7XG5cbiAgICAgICAgICAgIGZpbHRlcmVkW2NvdW50KytdID0gd29yZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXJlZDtcbn1cblxuLy8gY29uc3QgY2hhcnMgPSB7YToxLCBlOjEsIGk6MSwgbzoxLCB1OjEsIHk6MX07XG4vL1xuLy8gZnVuY3Rpb24gY29sbGFwc2VfcmVwZWF0aW5nX2NoYXJzKHN0cmluZyl7XG4vL1xuLy8gICAgIGxldCBjb2xsYXBzZWRfc3RyaW5nID0gXCJcIixcbi8vICAgICAgICAgY2hhcl9wcmV2ID0gXCJcIixcbi8vICAgICAgICAgY2hhcl9uZXh0ID0gXCJcIjtcbi8vXG4vLyAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKyl7XG4vL1xuLy8gICAgICAgICBjb25zdCBjaGFyID0gc3RyaW5nW2ldO1xuLy9cbi8vICAgICAgICAgaWYoY2hhciAhPT0gY2hhcl9wcmV2KXtcbi8vXG4vLyAgICAgICAgICAgICBpZihpICYmIChjaGFyID09PSBcImhcIikpe1xuLy9cbi8vICAgICAgICAgICAgICAgICBpZigoY2hhcnNbY2hhcl9wcmV2XSAmJiBjaGFyc1tjaGFyX25leHRdKSB8fCAoY2hhcl9wcmV2ID09PSBcIiBcIikpe1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgY29sbGFwc2VkX3N0cmluZyArPSBjaGFyO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIGVsc2V7XG4vL1xuLy8gICAgICAgICAgICAgICAgIGNvbGxhcHNlZF9zdHJpbmcgKz0gY2hhcjtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgY2hhcl9uZXh0ID0gKFxuLy9cbi8vICAgICAgICAgICAgIChpID09PSAoc3RyaW5nLmxlbmd0aCAtIDEpKSA/XG4vL1xuLy8gICAgICAgICAgICAgICAgIFwiXCJcbi8vICAgICAgICAgICAgIDpcbi8vICAgICAgICAgICAgICAgICBzdHJpbmdbaSArIDFdXG4vLyAgICAgICAgICk7XG4vL1xuLy8gICAgICAgICBjaGFyX3ByZXYgPSBjaGFyO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgcmV0dXJuIGNvbGxhcHNlZF9zdHJpbmc7XG4vLyB9IiwiaW1wb3J0IHsgSW5kZXhJbnRlcmZhY2UgfSBmcm9tIFwiLi4vLi4vdHlwZS5qc1wiO1xuaW1wb3J0IHsgcGlwZWxpbmUsIG5vcm1hbGl6ZSwgcmVnZXhfd2hpdGVzcGFjZSB9IGZyb20gXCIuLi8uLi9sYW5nLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBydGwgPSAvKiBub3JtYWxpemU6ICovXG4vKiBjb2xsYXBzZTogKi8gLyogbm9ybWFsaXplOiAqLyAvKiBjb2xsYXBzZTogKi8gLyogbm9ybWFsaXplOiAqLyAvKiBjb2xsYXBzZTogKi9cbi8qIG5vcm1hbGl6ZTogKi9cbi8qIGNvbGxhcHNlOiAqLyExO1xuZXhwb3J0IGNvbnN0IHRva2VuaXplID0gXCJcIjtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlbmNvZGU6IGVuY29kZSxcbiAgICBydGw6ICExLFxuICAgIHRva2VuaXplOiBcIlwiXG5cbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gc3RyXHJcbiAgICAgKiBAdGhpcyBJbmRleEludGVyZmFjZVxyXG4gICAgICovXG5cbn07ZXhwb3J0IGZ1bmN0aW9uIGVuY29kZShzdHIpIHtcblxuICAgIHJldHVybiBwaXBlbGluZS5jYWxsKHRoaXMsXG4gICAgLyogc3RyaW5nOiAqLyhcIlwiICsgc3RyKS50b0xvd2VyQ2FzZSgpLCAhMSwgLyogc3BsaXQ6ICovcmVnZXhfd2hpdGVzcGFjZSwgITEpO1xufSIsIlxuaW1wb3J0IHsgaXNfc3RyaW5nIH0gZnJvbSBcIi4vY29tbW9uLmpzXCI7XG5cbi8qKlxyXG4gKiBAZW51bSB7T2JqZWN0fVxyXG4gKiBAY29uc3RcclxuICovXG5cbmNvbnN0IHByZXNldCA9IHtcblxuICAgIG1lbW9yeToge1xuICAgICAgICBjaGFyc2V0OiBcImxhdGluOmV4dHJhXCIsXG4gICAgICAgIC8vdG9rZW5pemU6IFwic3RyaWN0XCIsXG4gICAgICAgIHJlc29sdXRpb246IDMsXG4gICAgICAgIC8vdGhyZXNob2xkOiAwLFxuICAgICAgICBtaW5sZW5ndGg6IDQsXG4gICAgICAgIGZhc3R1cGRhdGU6IC8qIG5vcm1hbGl6ZTogKi8gLyogY29sbGFwc2U6ICovIC8qIG5vcm1hbGl6ZTogKi8gLyogY29sbGFwc2U6ICovIC8qIG5vcm1hbGl6ZTogKi8gLyogY29sbGFwc2U6ICovIC8qIG5vcm1hbGl6ZTogKi9cbiAgICAgICAgLyogY29sbGFwc2U6ICovXG4gICAgICAgIC8qIGNvbGxhcHNlOiAqLyExXG4gICAgfSxcblxuICAgIHBlcmZvcm1hbmNlOiB7XG4gICAgICAgIC8vY2hhcnNldDogXCJsYXRpblwiLFxuICAgICAgICAvL3Rva2VuaXplOiBcInN0cmljdFwiLFxuICAgICAgICByZXNvbHV0aW9uOiAzLFxuICAgICAgICBtaW5sZW5ndGg6IDMsXG4gICAgICAgIC8vZmFzdHVwZGF0ZTogdHJ1ZSxcbiAgICAgICAgb3B0aW1pemU6ICExLCAvL2Zhc3R1cGRhdGU6IHRydWUsXG4gICAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgICAgIGRlcHRoOiAyLCByZXNvbHV0aW9uOiAxXG4gICAgICAgICAgICAvL2JpZGlyZWN0aW9uYWw6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbWF0Y2g6IHtcbiAgICAgICAgY2hhcnNldDogXCJsYXRpbjpleHRyYVwiLFxuICAgICAgICB0b2tlbml6ZTogXCJyZXZlcnNlXCJcbiAgICAgICAgLy9yZXNvbHV0aW9uOiA5LFxuICAgICAgICAvL3RocmVzaG9sZDogMFxuICAgIH0sXG5cbiAgICBzY29yZToge1xuICAgICAgICBjaGFyc2V0OiBcImxhdGluOmFkdmFuY2VkXCIsXG4gICAgICAgIC8vdG9rZW5pemU6IFwic3RyaWN0XCIsXG4gICAgICAgIHJlc29sdXRpb246IDIwLFxuICAgICAgICBtaW5sZW5ndGg6IDMsXG4gICAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgICAgIGRlcHRoOiAzLFxuICAgICAgICAgICAgcmVzb2x1dGlvbjogOVxuICAgICAgICAgICAgLy9iaWRpcmVjdGlvbmFsOiB0cnVlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGVmYXVsdDoge1xuICAgICAgICAvLyBjaGFyc2V0OiBcImxhdGluOmRlZmF1bHRcIixcbiAgICAgICAgLy8gdG9rZW5pemU6IFwic3RyaWN0XCIsXG4gICAgICAgIC8vIHJlc29sdXRpb246IDMsXG4gICAgICAgIC8vIHRocmVzaG9sZDogMCxcbiAgICAgICAgLy8gZGVwdGg6IDNcbiAgICB9XG5cbiAgICAvLyBcImZhc3RcIjoge1xuICAgIC8vICAgICAvL2NoYXJzZXQ6IFwibGF0aW5cIixcbiAgICAvLyAgICAgLy90b2tlbml6ZTogXCJzdHJpY3RcIixcbiAgICAvLyAgICAgdGhyZXNob2xkOiA4LFxuICAgIC8vICAgICByZXNvbHV0aW9uOiA5LFxuICAgIC8vICAgICBkZXB0aDogMVxuICAgIC8vIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcGx5X3ByZXNldChvcHRpb25zKSB7XG5cbiAgICBpZiAoaXNfc3RyaW5nKG9wdGlvbnMpKSB7XG5cbiAgICAgICAgb3B0aW9ucyA9IHByZXNldFtvcHRpb25zXTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGNvbnN0IHByZXNldCA9IG9wdGlvbnMucHJlc2V0O1xuXG4gICAgICAgIGlmIChwcmVzZXQpIHtcblxuICAgICAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHByZXNldFtwcmVzZXRdLCAvKiogQHR5cGUge09iamVjdH0gKi9vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xufSIsIi8vIFRPRE8gcmV0dXJuIHByb21pc2VzIGluc3RlYWQgb2YgaW5uZXIgYXdhaXRcblxuaW1wb3J0IHsgSW5kZXhJbnRlcmZhY2UsIERvY3VtZW50SW50ZXJmYWNlIH0gZnJvbSBcIi4vdHlwZS5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlX29iamVjdCwgaXNfc3RyaW5nIH0gZnJvbSBcIi4vY29tbW9uLmpzXCI7XG5cbmZ1bmN0aW9uIGFzeW5jKGNhbGxiYWNrLCBzZWxmLCBmaWVsZCwga2V5LCBpbmRleF9kb2MsIGluZGV4LCBkYXRhLCBvbl9kb25lKSB7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCByZXMgPSBjYWxsYmFjayhmaWVsZCA/IGZpZWxkICsgXCIuXCIgKyBrZXkgOiBrZXksIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblxuICAgICAgICAvLyBhd2FpdCBpc24ndCBzdXBwb3J0ZWQgYnkgRVM1XG5cbiAgICAgICAgaWYgKHJlcyAmJiByZXMudGhlbikge1xuXG4gICAgICAgICAgICByZXMudGhlbihmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBzZWxmLmV4cG9ydChjYWxsYmFjaywgc2VsZiwgZmllbGQsIGluZGV4X2RvYywgaW5kZXggKyAxLCBvbl9kb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBzZWxmLmV4cG9ydChjYWxsYmFjaywgc2VsZiwgZmllbGQsIGluZGV4X2RvYywgaW5kZXggKyAxLCBvbl9kb25lKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vKipcclxuICogQHRoaXMgSW5kZXhJbnRlcmZhY2VcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBleHBvcnRJbmRleChjYWxsYmFjaywgc2VsZiwgZmllbGQsIGluZGV4X2RvYywgaW5kZXgsIG9uX2RvbmUpIHtcblxuICAgIGxldCByZXR1cm5fdmFsdWUgPSAvKiBhcHBlbmQ6ICovIC8qIHNraXAgdXBkYXRlOiAqLyAvKiBza2lwX3VwZGF0ZTogKi8gLyogc2tpcCBwb3N0LXByb2Nlc3Npbmc6ICovITA7XG4gICAgaWYgKCd1bmRlZmluZWQnID09IHR5cGVvZiBvbl9kb25lKSB7XG4gICAgICAgIHJldHVybl92YWx1ZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgb25fZG9uZSA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxldCBrZXksIGRhdGE7XG5cbiAgICBzd2l0Y2ggKGluZGV4IHx8IChpbmRleCA9IDApKSB7XG5cbiAgICAgICAgY2FzZSAwOlxuXG4gICAgICAgICAgICBrZXkgPSBcInJlZ1wiO1xuXG4gICAgICAgICAgICAvLyBmYXN0dXBkYXRlIGlzbid0IHN1cHBvcnRlZCBieSBleHBvcnRcblxuICAgICAgICAgICAgaWYgKHRoaXMuZmFzdHVwZGF0ZSkge1xuXG4gICAgICAgICAgICAgICAgZGF0YSA9IGNyZWF0ZV9vYmplY3QoKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnJlZ2lzdGVyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMucmVnaXN0ZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMTpcblxuICAgICAgICAgICAga2V5ID0gXCJjZmdcIjtcbiAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgZG9jOiAwLFxuICAgICAgICAgICAgICAgIG9wdDogdGhpcy5vcHRpbWl6ZSA/IDEgOiAwXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDI6XG5cbiAgICAgICAgICAgIGtleSA9IFwibWFwXCI7XG4gICAgICAgICAgICBkYXRhID0gdGhpcy5tYXA7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM6XG5cbiAgICAgICAgICAgIGtleSA9IFwiY3R4XCI7XG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jdHg7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgICBpZiAoJ3VuZGVmaW5lZCcgPT0gdHlwZW9mIGZpZWxkICYmIG9uX2RvbmUpIHtcblxuICAgICAgICAgICAgICAgIG9uX2RvbmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFzeW5jKGNhbGxiYWNrLCBzZWxmIHx8IHRoaXMsIGZpZWxkLCBrZXksIGluZGV4X2RvYywgaW5kZXgsIGRhdGEsIG9uX2RvbmUpO1xuXG4gICAgcmV0dXJuIHJldHVybl92YWx1ZTtcbn1cblxuLyoqXHJcbiAqIEB0aGlzIEluZGV4SW50ZXJmYWNlXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW1wb3J0SW5kZXgoa2V5LCBkYXRhKSB7XG5cbiAgICBpZiAoIWRhdGEpIHtcblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzX3N0cmluZyhkYXRhKSkge1xuXG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgIH1cblxuICAgIHN3aXRjaCAoa2V5KSB7XG5cbiAgICAgICAgY2FzZSBcImNmZ1wiOlxuXG4gICAgICAgICAgICB0aGlzLm9wdGltaXplID0gISFkYXRhLm9wdDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJyZWdcIjpcblxuICAgICAgICAgICAgLy8gZmFzdHVwZGF0ZSBpc24ndCBzdXBwb3J0ZWQgYnkgaW1wb3J0XG5cbiAgICAgICAgICAgIHRoaXMuZmFzdHVwZGF0ZSA9IC8qIG5vcm1hbGl6ZTogKi8gLyogY29sbGFwc2U6ICovIC8qIG5vcm1hbGl6ZTogKi8gLyogY29sbGFwc2U6ICovIC8qIG5vcm1hbGl6ZTogKi8gLyogY29sbGFwc2U6ICovIC8qIG5vcm1hbGl6ZTogKi8gLyogY29sbGFwc2U6ICovIC8qIGNvbGxhcHNlOiAqLyExO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlciA9IGRhdGE7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwibWFwXCI6XG5cbiAgICAgICAgICAgIHRoaXMubWFwID0gZGF0YTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJjdHhcIjpcblxuICAgICAgICAgICAgdGhpcy5jdHggPSBkYXRhO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG4vKipcclxuICogQHRoaXMgRG9jdW1lbnRJbnRlcmZhY2VcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBleHBvcnREb2N1bWVudChjYWxsYmFjaywgc2VsZiwgZmllbGQsIGluZGV4X2RvYywgaW5kZXgsIG9uX2RvbmUpIHtcblxuICAgIGxldCByZXR1cm5fdmFsdWU7XG4gICAgaWYgKCd1bmRlZmluZWQnID09IHR5cGVvZiBvbl9kb25lKSB7XG4gICAgICAgIHJldHVybl92YWx1ZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgb25fZG9uZSA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluZGV4IHx8IChpbmRleCA9IDApO1xuICAgIGluZGV4X2RvYyB8fCAoaW5kZXhfZG9jID0gMCk7XG5cbiAgICBpZiAoaW5kZXhfZG9jIDwgdGhpcy5maWVsZC5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZmllbGQgPSB0aGlzLmZpZWxkW2luZGV4X2RvY10sXG4gICAgICAgICAgICAgIGlkeCA9IHRoaXMuaW5kZXhbZmllbGRdO1xuXG5cbiAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmICghaWR4LmV4cG9ydChjYWxsYmFjaywgc2VsZiwgaW5kZXggPyBmaWVsZCAvKi5yZXBsYWNlKFwiOlwiLCBcIi1cIikqLyA6IFwiXCIsIGluZGV4X2RvYywgaW5kZXgrKywgb25fZG9uZSkpIHtcblxuICAgICAgICAgICAgICAgIGluZGV4X2RvYysrO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMTtcblxuICAgICAgICAgICAgICAgIHNlbGYuZXhwb3J0KGNhbGxiYWNrLCBzZWxmLCBmaWVsZCwgaW5kZXhfZG9jLCBpbmRleCwgb25fZG9uZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgbGV0IGtleSwgZGF0YTtcblxuICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XG5cbiAgICAgICAgICAgIGNhc2UgMTpcblxuICAgICAgICAgICAgICAgIGtleSA9IFwidGFnXCI7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMudGFnaW5kZXg7XG4gICAgICAgICAgICAgICAgZmllbGQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDI6XG5cbiAgICAgICAgICAgICAgICBrZXkgPSBcInN0b3JlXCI7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuc3RvcmU7XG4gICAgICAgICAgICAgICAgZmllbGQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBjYXNlIDM6XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gICAgIGtleSA9IFwicmVnXCI7XG4gICAgICAgICAgICAvLyAgICAgZGF0YSA9IHRoaXMucmVnaXN0ZXI7XG4gICAgICAgICAgICAvLyAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICAgICAgICBvbl9kb25lKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYXN5bmMoY2FsbGJhY2ssIHRoaXMsIGZpZWxkLCBrZXksIGluZGV4X2RvYywgaW5kZXgsIGRhdGEsIG9uX2RvbmUpO1xuICAgIH1cblxuICAgIHJldHVybiByZXR1cm5fdmFsdWU7XG59XG5cbi8qKlxyXG4gKiBAdGhpcyBEb2N1bWVudEludGVyZmFjZVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGltcG9ydERvY3VtZW50KGtleSwgZGF0YSkge1xuXG4gICAgaWYgKCFkYXRhKSB7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc19zdHJpbmcoZGF0YSkpIHtcblxuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGtleSkge1xuXG4gICAgICAgIGNhc2UgXCJ0YWdcIjpcblxuICAgICAgICAgICAgdGhpcy50YWdpbmRleCA9IGRhdGE7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwicmVnXCI6XG5cbiAgICAgICAgICAgIC8vIGZhc3R1cGRhdGUgaXNuJ3Qgc3VwcG9ydGVkIGJ5IGltcG9ydFxuXG4gICAgICAgICAgICB0aGlzLmZhc3R1cGRhdGUgPSAhMTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXIgPSBkYXRhO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaW5kZXg7IGkgPCB0aGlzLmZpZWxkLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBpbmRleCA9IHRoaXMuaW5kZXhbdGhpcy5maWVsZFtpXV07XG4gICAgICAgICAgICAgICAgaW5kZXgucmVnaXN0ZXIgPSBkYXRhO1xuICAgICAgICAgICAgICAgIGluZGV4LmZhc3R1cGRhdGUgPSAhMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0b3JlXCI6XG5cbiAgICAgICAgICAgIHRoaXMuc3RvcmUgPSBkYXRhO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgICAga2V5ID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0ga2V5WzBdO1xuICAgICAgICAgICAga2V5ID0ga2V5WzFdO1xuXG4gICAgICAgICAgICBpZiAoZmllbGQgJiYga2V5KSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4W2ZpZWxkXS5pbXBvcnQoa2V5LCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICB9XG59IiwiLyoqXHJcbiAqIEBpbnRlcmZhY2VcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBJbmRleEludGVyZmFjZSgpIHtcblxuICB0aGlzLmNhY2hlID0gbnVsbDtcbiAgdGhpcy5tYXRjaGVyID0gbnVsbDtcbiAgdGhpcy5zdGVtbWVyID0gbnVsbDtcbiAgdGhpcy5maWx0ZXIgPSBudWxsO1xufVxuXG4vKipcclxuICogQHBhcmFtIHshc3RyaW5nfSBzdHJcclxuICogQHBhcmFtIHtib29sZWFufEFycmF5PHN0cmluZ3xSZWdFeHA+PX0gbm9ybWFsaXplXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbnxzdHJpbmd8UmVnRXhwPX0gc3BsaXRcclxuICogQHBhcmFtIHtib29sZWFuPX0gY29sbGFwc2VcclxuICogQHJldHVybnMge3N0cmluZ3xBcnJheTxzdHJpbmc+fVxyXG4gKi9cblxuLy9JbmRleEludGVyZmFjZS5wcm90b3R5cGUucGlwZWxpbmU7XG5cbi8qKlxyXG4gKiBAcGFyYW0geyFudW1iZXJ8c3RyaW5nfSBpZFxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IGNvbnRlbnRcclxuICovXG5cbkluZGV4SW50ZXJmYWNlLnByb3RvdHlwZS5hZGQ7XG5cbi8qKlxyXG4gKiBAcGFyYW0geyFudW1iZXJ8c3RyaW5nfSBpZFxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IGNvbnRlbnRcclxuICovXG5cbkluZGV4SW50ZXJmYWNlLnByb3RvdHlwZS5hcHBlbmQ7XG5cbi8qKlxyXG4gKiBAcGFyYW0geyFzdHJpbmd8T2JqZWN0fSBxdWVyeVxyXG4gKiBAcGFyYW0ge251bWJlcnxPYmplY3Q9fSBsaW1pdFxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQHJldHVybnMge0FycmF5PG51bWJlcnxzdHJpbmc+fVxyXG4gKi9cblxuSW5kZXhJbnRlcmZhY2UucHJvdG90eXBlLnNlYXJjaDtcblxuLyoqXHJcbiAqIEBwYXJhbSB7IW51bWJlcnxzdHJpbmd9IGlkXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gY29udGVudFxyXG4gKi9cblxuSW5kZXhJbnRlcmZhY2UucHJvdG90eXBlLnVwZGF0ZTtcblxuLyoqXHJcbiAqIEBwYXJhbSB7IW51bWJlcnxzdHJpbmd9IGlkXHJcbiAqL1xuXG5JbmRleEludGVyZmFjZS5wcm90b3R5cGUucmVtb3ZlO1xuXG4vKipcclxuICogQGludGVyZmFjZVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIERvY3VtZW50SW50ZXJmYWNlKCkge1xuXG4gIHRoaXMuZmllbGQgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSBJbmRleEludGVyZmFjZSAqL1xuICB0aGlzLmluZGV4ID0gbnVsbDtcbn0iLCJpbXBvcnQgSW5kZXggZnJvbSBcIi4uL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmRhdGE7XG5cbiAgICAgICAgICAgIC8qKiBAdHlwZSBJbmRleCAqL1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzZWxmLl9pbmRleCxcbiAgICAgICAgICAgICAgICAgIGFyZ3MgPSBkYXRhLmFyZ3MsXG4gICAgICAgICAgICAgICAgICB0YXNrID0gZGF0YS50YXNrO1xuXG5cbiAgICAgICAgICAgIHN3aXRjaCAodGFzaykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW5pdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGRhdGEub3B0aW9ucyB8fCB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY3RvcnkgPSBkYXRhLmZhY3RvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmNvZGUgPSBvcHRpb25zLmVuY29kZTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNhY2hlID0gLyogbm9ybWFsaXplOiAqLyAvKiBjb2xsYXBzZTogKi8gLyogbm9ybWFsaXplOiAqL1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBjb2xsYXBzZTogKi8gLyogbm9ybWFsaXplOiAqLyAvKiBjb2xsYXBzZTogKi8gLyogbm9ybWFsaXplOiAqLyAvKiBjb2xsYXBzZTogKi8gLyogY29sbGFwc2U6ICovITE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbmNvZGUgJiYgMCA9PT0gZW5jb2RlLmluZGV4T2YoXCJmdW5jdGlvblwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGUgPSBGdW5jdGlvbihcInJldHVybiBcIiArIGVuY29kZSkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhY3RvcnkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhwb3J0IHRoZSBGbGV4U2VhcmNoIGdsb2JhbCBwYXlsb2FkIHRvIFwic2VsZlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGdW5jdGlvbihcInJldHVybiBcIiArIGZhY3RvcnkpKCkoc2VsZik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKiBAdHlwZSBJbmRleCAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5faW5kZXggPSBuZXcgc2VsZi5GbGV4U2VhcmNoLkluZGV4KG9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZXN0cm95IHRoZSBleHBvcnRlZCBwYXlsb2FkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgc2VsZi5GbGV4U2VhcmNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5faW5kZXggPSBuZXcgSW5kZXgob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWQgPSBkYXRhLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGluZGV4W3Rhc2tdLmFwcGx5KGluZGV4LCBhcmdzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoXCJzZWFyY2hcIiA9PT0gdGFzayA/IHsgaWQ6IGlkLCBtc2c6IG1lc3NhZ2UgfSA6IHsgaWQ6IGlkIH0pO1xuICAgICAgICAgICAgfVxufSIsIi8vaW1wb3J0IHsgcHJvbWlzZSBhcyBQcm9taXNlIH0gZnJvbSBcIi4uL3BvbHlmaWxsLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVfb2JqZWN0LCBpc19mdW5jdGlvbiwgaXNfb2JqZWN0LCBpc19zdHJpbmcgfSBmcm9tIFwiLi4vY29tbW9uLmpzXCI7XG5pbXBvcnQgaGFuZGxlciBmcm9tIFwiLi9oYW5kbGVyLmpzXCI7XG5cbmxldCBwaWQgPSAwO1xuXG4vKipcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cblxuZnVuY3Rpb24gV29ya2VySW5kZXgob3B0aW9ucykge1xuXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFdvcmtlckluZGV4KSkge1xuXG4gICAgICAgIHJldHVybiBuZXcgV29ya2VySW5kZXgob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgbGV0IG9wdDtcblxuICAgIGlmIChvcHRpb25zKSB7XG5cbiAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKG9wdCA9IG9wdGlvbnMuZW5jb2RlKSkge1xuXG4gICAgICAgICAgICBvcHRpb25zLmVuY29kZSA9IG9wdC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcblxuICAgICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgLy8gdGhlIGZhY3RvcnkgaXMgdGhlIG91dGVyIHdyYXBwZXIgZnJvbSB0aGUgYnVpbGRcbiAgICAvLyB3ZSB1c2UgXCJzZWxmXCIgYXMgYSB0cmFwIGZvciBub2RlLmpzXG5cbiAgICBsZXQgZmFjdG9yeSA9IChzZWxmIHx8IHdpbmRvdykuX2ZhY3Rvcnk7XG5cbiAgICBpZiAoZmFjdG9yeSkge1xuXG4gICAgICAgIGZhY3RvcnkgPSBmYWN0b3J5LnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNfbm9kZV9qcyA9IFwidW5kZWZpbmVkXCIgPT0gdHlwZW9mIHdpbmRvdyAmJiBzZWxmLmV4cG9ydHMsXG4gICAgICAgICAgX3NlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy53b3JrZXIgPSBjcmVhdGUoZmFjdG9yeSwgaXNfbm9kZV9qcywgb3B0aW9ucy53b3JrZXIpO1xuICAgIHRoaXMucmVzb2x2ZXIgPSBjcmVhdGVfb2JqZWN0KCk7XG5cbiAgICBpZiAoIXRoaXMud29ya2VyKSB7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc19ub2RlX2pzKSB7XG5cbiAgICAgICAgdGhpcy53b3JrZXIub24oXCJtZXNzYWdlXCIsIGZ1bmN0aW9uIChtc2cpIHtcblxuICAgICAgICAgICAgX3NlbGYucmVzb2x2ZXJbbXNnLmlkXShtc2cubXNnKTtcbiAgICAgICAgICAgIGRlbGV0ZSBfc2VsZi5yZXNvbHZlclttc2cuaWRdO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIHRoaXMud29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChtc2cpIHtcblxuICAgICAgICAgICAgbXNnID0gbXNnLmRhdGE7XG4gICAgICAgICAgICBfc2VsZi5yZXNvbHZlclttc2cuaWRdKG1zZy5tc2cpO1xuICAgICAgICAgICAgZGVsZXRlIF9zZWxmLnJlc29sdmVyW21zZy5pZF07XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy53b3JrZXIucG9zdE1lc3NhZ2Uoe1xuXG4gICAgICAgIHRhc2s6IFwiaW5pdFwiLFxuICAgICAgICBmYWN0b3J5OiBmYWN0b3J5LFxuICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdvcmtlckluZGV4O1xuXG5yZWdpc3RlcihcImFkZFwiKTtcbnJlZ2lzdGVyKFwiYXBwZW5kXCIpO1xucmVnaXN0ZXIoXCJzZWFyY2hcIik7XG5yZWdpc3RlcihcInVwZGF0ZVwiKTtcbnJlZ2lzdGVyKFwicmVtb3ZlXCIpO1xuXG5mdW5jdGlvbiByZWdpc3RlcihrZXkpIHtcblxuICAgIFdvcmtlckluZGV4LnByb3RvdHlwZVtrZXldID0gV29ya2VySW5kZXgucHJvdG90eXBlW2tleSArIFwiQXN5bmNcIl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgICBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpLFxuICAgICAgICAgICAgICBhcmcgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgbGV0IGNhbGxiYWNrO1xuXG4gICAgICAgIGlmIChpc19mdW5jdGlvbihhcmcpKSB7XG5cbiAgICAgICAgICAgIGNhbGxiYWNrID0gYXJnO1xuICAgICAgICAgICAgYXJncy5zcGxpY2UoYXJncy5sZW5ndGggLSAxLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIHNlbGYucmVzb2x2ZXJbKytwaWRdID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICBzZWxmLndvcmtlci5wb3N0TWVzc2FnZSh7XG5cbiAgICAgICAgICAgICAgICAgICAgdGFzazoga2V5LFxuICAgICAgICAgICAgICAgICAgICBpZDogcGlkLFxuICAgICAgICAgICAgICAgICAgICBhcmdzOiBhcmdzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG5cbiAgICAgICAgICAgIHByb21pc2UudGhlbihjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGUoZmFjdG9yeSwgaXNfbm9kZV9qcywgd29ya2VyX3BhdGgpIHtcblxuICAgIGxldCB3b3JrZXI7XG5cbiAgICB0cnkge1xuXG4gICAgICAgIHdvcmtlciA9IGlzX25vZGVfanMgPyBldmFsKCduZXcgKHJlcXVpcmUoXCJ3b3JrZXJfdGhyZWFkc1wiKVtcIldvcmtlclwiXSkoX19kaXJuYW1lICsgXCIvbm9kZS9ub2RlLmpzXCIpJykgOiBmYWN0b3J5ID8gbmV3IFdvcmtlcihVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtcIm9ubWVzc2FnZT1cIiArIGhhbmRsZXIudG9TdHJpbmcoKV0sIHsgdHlwZTogXCJ0ZXh0L2phdmFzY3JpcHRcIiB9KSkpIDogbmV3IFdvcmtlcihpc19zdHJpbmcod29ya2VyX3BhdGgpID8gd29ya2VyX3BhdGggOiBcIndvcmtlci93b3JrZXIuanNcIiwgeyB0eXBlOiBcIm1vZHVsZVwiIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICByZXR1cm4gd29ya2VyO1xufSIsImltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tIFwiLi4vc2VhcmNoL3NlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2VhcmNoQXBwQ29uZmlnIH0gZnJvbSBcIi4uL3NlYXJjaC9hcHBcIjtcclxuXHJcbmV4cG9ydCB0eXBlIExvZ0ZuID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcENvbmZpZyBleHRlbmRzIEFwcGxpY2F0aW9uIHtcclxuICBzdGF0aWMgYXBwSWQgPSAnZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gnO1xyXG4gIHB1YmxpYyBzZWFyY2hCdXR0b25IVE1MID0gIGBcclxuICAgIDxhIGNsYXNzPSdjaGFyYWN0ZXItc2VhcmNoLWljb24tYnV0dG9uJz48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWZ3IGZhLXNlYXJjaFwiPjwvaT48L2E+XHJcbiAgYDtcclxuXHJcbiAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKHt9KTtcclxuICAgIHRoaXMuc2VhcmNoU2VydmljZSA9IG5ldyBTZWFyY2hTZXJ2aWNlKHRoaXMubG9nKTtcclxuICB9XHJcbiAgXHJcblxyXG4gIHByaXZhdGUgbG9nKC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICBjb25zb2xlLmxvZygnQ2hhcmFjdGVyU2VhcmNoIHwnLCAuLi5hcmdzKTtcclxuICB9XHJcblxyXG5cdHN0YXRpYyBnZXQgZGVmYXVsdE9wdGlvbnMoKSB7XHJcbiAgICBjb25zdCBkZWZhdWx0cyA9IHN1cGVyLmRlZmF1bHRPcHRpb25zO1xyXG4gIFxyXG4gICAgY29uc3Qgb3ZlcnJpZGVzID0ge1xyXG4gICAgICBpZDogdGhpcy5hcHBJZCxcclxuICAgICAgdGl0bGU6ICdDaGFyYWN0ZXIgU2VhcmNoJyxcclxuICAgICAgY2hhcmFjdGVyOiBudWxsLFxyXG4gICAgfTtcclxuICBcclxuICAgIGNvbnN0IG1lcmdlZE9wdGlvbnMgPSBmb3VuZHJ5LnV0aWxzLm1lcmdlT2JqZWN0KGRlZmF1bHRzLCBvdmVycmlkZXMpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gbWVyZ2VkT3B0aW9ucztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblNoZWV0UmVuZGVyKGh0bWw6IEpRdWVyeTxIVE1MRWxlbWVudD4sIGFjdG9yOiBhbnkpIHtcclxuICAgIGNvbnN0IGNoYXJhY3RlckRldGFpbHMgPSBodG1sLmZpbmQoYGg0LndpbmRvdy10aXRsZWApO1xyXG4gICAgY2hhcmFjdGVyRGV0YWlscy5hcHBlbmQodGhpcy5zZWFyY2hCdXR0b25IVE1MKTtcclxuICAgIHRoaXMubG9nKCdMb2FkaW5nIGNoYXJhY3RlcicsIGFjdG9yKTtcclxuICAgIHRoaXMuc2VhcmNoU2VydmljZS5sb2FkQ2hhcmFjdGVyKGFjdG9yKTtcclxuICBcclxuICAgIGh0bWwub24oJ2NsaWNrJywgJy5jaGFyYWN0ZXItc2VhcmNoLWljb24tYnV0dG9uJywgKF8pID0+IHtcclxuICAgICAgY29uc3QgbmV3V2luZG93ID0gbmV3IFNlYXJjaEFwcENvbmZpZyhhY3RvciwgdGhpcy5zZWFyY2hTZXJ2aWNlLCB0aGlzLmxvZyk7XHJcbiAgICAgIG5ld1dpbmRvdy5yZW5kZXIodHJ1ZSwge2NoYXJhY3RlcjogYWN0b3J9IGFzIHVua25vd24gYXMgRm9ybUFwcGxpY2F0aW9uT3B0aW9ucyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59IiwiaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VcIjtcclxuaW1wb3J0IHsgTG9nRm4gfSBmcm9tIFwiLi4vYXBwL2FwcFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlYXJjaEFwcENvbmZpZyBleHRlbmRzIEZvcm1BcHBsaWNhdGlvbiB7XHJcbiAgc3RhdGljIHNlYXJjaEFwcElkID0gJ2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoJztcclxuXHJcbiAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlO1xyXG5cdHByaXZhdGUgbG9nOiBMb2dGbjtcclxuXHRwcml2YXRlIGNoYXJhY3RlcjtcclxuXHRwcml2YXRlIHF1ZXJ5ID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNoYXJhY3Rlciwgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSwgbG9nOiBMb2dGbikge1xyXG4gICAgc3VwZXIoe30pO1xyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlID0gc2VhcmNoU2VydmljZTtcclxuXHRcdHRoaXMubG9nID0gbG9nO1xyXG5cdFx0dGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXI7XHJcblx0fVxyXG5cclxuXHJcblx0c3RhdGljIGdldCBkZWZhdWx0T3B0aW9ucygpIHtcclxuICAgIGNvbnN0IGRlZmF1bHRzID0gc3VwZXIuZGVmYXVsdE9wdGlvbnM7XHJcbiAgXHJcbiAgICBjb25zdCBvdmVycmlkZXMgPSB7XHJcbiAgICAgIGhlaWdodDogNjAwLFxyXG5cdFx0XHR3aWR0aDogNjAwLFxyXG4gICAgICBpZDogdGhpcy5zZWFyY2hBcHBJZCxcclxuICAgICAgdGVtcGxhdGU6IGBtb2R1bGVzLyR7dGhpcy5zZWFyY2hBcHBJZH0vdGVtcGxhdGVzL3NlYXJjaC13aW5kb3cuaGJzYCxcclxuICAgICAgdGl0bGU6ICdDaGFyYWN0ZXIgU2VhcmNoJyxcclxuICAgICAgc3VibWl0T25DaGFuZ2U6IHRydWUsXHJcbiAgICAgIGNsb3NlT25TdWJtaXQ6IGZhbHNlLFxyXG4gICAgfTtcclxuICBcclxuICAgIGNvbnN0IG1lcmdlZE9wdGlvbnMgPSBmb3VuZHJ5LnV0aWxzLm1lcmdlT2JqZWN0KGRlZmF1bHRzLCBvdmVycmlkZXMpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gbWVyZ2VkT3B0aW9ucztcclxuICB9XHJcblxyXG5cdHByb3RlY3RlZCBhc3luYyBfdXBkYXRlT2JqZWN0KGV2ZW50KTogUHJvbWlzZTx2b2lkPiB7XHJcblx0XHRpZiAoZXZlbnQudHlwZSA9PVwic3VibWl0XCIpIHtcclxuXHRcdFx0dGhpcy5xdWVyeSA9IGV2ZW50LnRhcmdldFswXS52YWx1ZTtcclxuXHRcdFx0dGhpcy5yZW5kZXIoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIGdldERhdGEoKTogUHJvbWlzZTxGb3JtQXBwbGljYXRpb24uRGF0YTxvYmplY3QsIEZvcm1BcHBsaWNhdGlvbk9wdGlvbnM+PiB7XHJcblx0XHRjb25zdCBzZWFyY2hSZXN1bHRzID0gdGhpcy5zZWFyY2hTZXJ2aWNlXHJcblx0XHRcdC5zZWFyY2hDaGFyYWN0ZXIodGhpcy5jaGFyYWN0ZXIuYWN0b3IuX2lkLCB0aGlzLnF1ZXJ5KVxyXG5cdFx0XHQuc29ydCgoYSwgYikgPT4gYS5vcmRlciAtIGIub3JkZXIpXHJcblx0XHRcdC5tYXAoYXN5bmMgKHJlc3VsdCkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHQuLi5yZXN1bHQsXHJcblx0XHRcdFx0XHRlbnJpY2hlZERlc2NyaXB0aW9uOiBhd2FpdCBUZXh0RWRpdG9yLmVucmljaEhUTUwocmVzdWx0LmRvYy5kZXNjcmlwdGlvbiksXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fSk7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRjaGFyYWN0ZXI6IHRoaXMuY2hhcmFjdGVyLFxyXG5cdFx0XHRyZXN1bHRzOiBhd2FpdCBQcm9taXNlLmFsbChzZWFyY2hSZXN1bHRzKSxcclxuXHRcdH0gYXMgdW5rbm93biBhcyBGb3JtQXBwbGljYXRpb24uRGF0YTxvYmplY3QsIEZvcm1BcHBsaWNhdGlvbk9wdGlvbnM+O1xyXG5cdH1cclxuXHJcblx0YWN0aXZhdGVMaXN0ZW5lcnMoaHRtbDogSlF1ZXJ5PEhUTUxFbGVtZW50Pik6IHZvaWQge1xyXG5cclxuXHRcdGh0bWwub24oJ2NsaWNrJywgJy5jaGFyYWN0ZXItc2VhcmNoLXJlc3VsdCAudGl0bGUnLCAoZXZlbnQpID0+IHtcclxuXHRcdFx0XHQvLyBHZXQgdGhlIGNsaWNrZWQgZWxlbWVudFxyXG5cdFx0XHRcdGNvbnN0IHRpdGxlID0gJChldmVudC50YXJnZXQpO1xyXG5cclxuXHRcdFx0XHQvLyBGaW5kIHRoZSBzaWJsaW5nIGRlc2NyaXB0aW9uIGRpdiBhbmQgdG9nZ2xlIHRoZSAnb3BlbicgY2xhc3NcclxuXHRcdFx0XHR0aXRsZS5zaWJsaW5ncygnLmRlc2NyaXB0aW9uJykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbn0iLCJpbXBvcnQgeyBTZWFyY2hQcm92aWRlciwgU2VhcmNoUmVzdWx0LCBTZWFyY2hJbmRleCB9IGZyb20gJy4vdHlwZXMnO1xyXG5pbXBvcnQgeyBMb2dGbiB9IGZyb20gJy4uL2FwcC9hcHAnO1xyXG5pbXBvcnQgRG9jdW1lbnQgZnJvbSAnZmxleHNlYXJjaC9kaXN0L21vZHVsZS9kb2N1bWVudCc7XHJcblxyXG50eXBlIFJhd1NlYXJjaFJlc3VsdCA9IHtcclxuXHRmaWVsZDogc3RyaW5nO1xyXG5cdHJlc3VsdDoge1xyXG5cdFx0aWQ6IHN0cmluZztcclxuXHRcdGRvYzoge1xyXG5cdFx0XHRpZDogc3RyaW5nO1xyXG5cdFx0XHR0eXBlOiBzdHJpbmc7XHJcblx0XHRcdHRpdGxlOiBzdHJpbmc7XHJcblx0XHRcdGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcblx0XHR9XHJcblx0fVtdXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZsYXR0ZW5TZWFyY2hSZXN1bHRzKHJlc3VsdHM6IFJhd1NlYXJjaFJlc3VsdFtdKTogU2VhcmNoUmVzdWx0W10ge1xyXG5cdGNvbnN0IGZsYXR0ZW5lZFNlYXJjaFJlc3VsdHM6IGFueVtdPSBbXTtcclxuXHJcblx0cmVzdWx0cy5tYXAoKHJlc3VsdEJ5RmllbGQpID0+IHtcclxuXHRcdHJlc3VsdEJ5RmllbGQucmVzdWx0Lm1hcCgoc2VhcmNoUmVzdWx0KSA9PiB7XHJcblx0XHRcdGNvbnN0IGV4aXN0aW5nUmVzdWx0ID0gZmxhdHRlbmVkU2VhcmNoUmVzdWx0cy5maW5kKChyZXN1bHQpID0+IHJlc3VsdC5pZCA9PT0gc2VhcmNoUmVzdWx0LmlkKTtcclxuXHRcdFx0aWYgKGV4aXN0aW5nUmVzdWx0KSB7XHJcblx0XHRcdFx0aWYgKCFleGlzdGluZ1Jlc3VsdC5maWVsZHMuaW5jbHVkZXMocmVzdWx0QnlGaWVsZC5maWVsZCkpIHtcclxuXHRcdFx0XHRcdGV4aXN0aW5nUmVzdWx0LmZpZWxkcy5wdXNoKHJlc3VsdEJ5RmllbGQuZmllbGQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRmbGF0dGVuZWRTZWFyY2hSZXN1bHRzLnB1c2goe1xyXG5cdFx0XHRcdFx0aWQ6IHNlYXJjaFJlc3VsdC5pZCxcclxuXHRcdFx0XHRcdGZpZWxkczogW3Jlc3VsdEJ5RmllbGQuZmllbGRdLFxyXG5cdFx0XHRcdFx0b3JkZXI6IHJlc3VsdEJ5RmllbGQuZmllbGQgPT09ICd0aXRsZSc/IDA6IDEsXHJcblx0XHRcdFx0XHRkb2M6IHNlYXJjaFJlc3VsdC5kb2NcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBmbGF0dGVuZWRTZWFyY2hSZXN1bHRzO1xyXG59XHJcblxyXG5jbGFzcyBGbGV4c2VhcmNoSW5kZXggaW1wbGVtZW50cyBTZWFyY2hJbmRleCB7XHJcblx0cHJpdmF0ZSBpbmRleDogRG9jdW1lbnQ7XHJcblx0cHJpdmF0ZSBsb2dnZXI6IExvZ0ZuO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihsb2dnZXI6IExvZ0ZuKSB7XHJcblx0XHR0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcclxuXHRcdHRoaXMuaW5kZXggPSBuZXcgRG9jdW1lbnQoe1xyXG5cdFx0XHRkb2N1bWVudDoge1xyXG5cdFx0XHRcdGlkOiAnaWQnLFxyXG5cdFx0XHRcdHRhZzogJ3R5cGUnLFxyXG5cdFx0XHRcdGluZGV4OiBbJ3RpdGxlJywgJ2Rlc2NyaXB0aW9uJ10sXHJcblx0XHRcdFx0c3RvcmU6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0dG9rZW5pemU6ICdzdHJpY3QnLFxyXG5cdFx0XHRjb250ZXh0OiB0cnVlLFxyXG5cdFx0XHRsYW5ndWFnZTogJ2VuJyxcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YWRkKHtpZCwgdHlwZSwgdGl0bGUsIGRlc2NyaXB0aW9ufSkge1xyXG5cdFx0dGhpcy5pbmRleC5hZGQoe1xyXG5cdFx0XHRpZCxcclxuXHRcdFx0dHlwZSxcclxuXHRcdFx0dGl0bGUsXHJcblx0XHRcdGRlc2NyaXB0aW9uXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHNlYXJjaChxdWVyeTogc3RyaW5nKTogU2VhcmNoUmVzdWx0W10ge1xyXG5cdFx0Y29uc3QgcmVzdWx0cyA9IHRoaXMuaW5kZXguc2VhcmNoKHF1ZXJ5LCB7ZW5yaWNoOiB0cnVlfSk7XHJcblx0XHRpZiAoIXJlc3VsdHMpIHRoaXMubG9nZ2VyKCdObyBzZWFyY2ggcmVzdWx0cyBmb3VuZCBmb3IgcXVlcnknLCBxdWVyeSk7XHJcblx0XHRyZXR1cm4gZmxhdHRlblNlYXJjaFJlc3VsdHMocmVzdWx0cyk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmxleHNlYXJjaCBleHRlbmRzIFNlYXJjaFByb3ZpZGVyIHtcclxuXHJcblx0XHRwdWJsaWMgbmV3SW5kZXgoKSB7XHJcblx0XHRcdHJldHVybiBuZXcgRmxleHNlYXJjaEluZGV4KHRoaXMubG9nZ2VyKTtcclxuXHRcdH1cclxuXHJcbn0iLCIvLyBpbXBvcnQgc3RlbW1lciBmcm9tICdmbGV4c2VhcmNoL2Rpc3QvbGFuZy9lbi5taW4uanMnO1xyXG5pbXBvcnQgeyBTZWFyY2hJbmRleCwgU2VhcmNoUHJvdmlkZXIsIFNlYXJjaFJlc3VsdCB9IGZyb20gJy4vdHlwZXMnO1xyXG5pbXBvcnQgeyBMb2dGbiB9IGZyb20gJy4uL2FwcC9hcHAnO1xyXG5pbXBvcnQgRmxleHNlYXJjaCBmcm9tICcuL2ZsZXhzZWFyY2gnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlYXJjaFNlcnZpY2Uge1xyXG5cdHB1YmxpYyBpbmRleGVzOiBSZWNvcmQ8c3RyaW5nLCBTZWFyY2hJbmRleD47XHJcblx0cHJpdmF0ZSBsb2c6IExvZ0ZuO1xyXG5cdHByaXZhdGUgc2VhcmNoUHJvdmlkZXI6IFNlYXJjaFByb3ZpZGVyO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihsb2dnZXI6IExvZ0ZuKSB7XHJcblx0XHR0aGlzLmluZGV4ZXMgPSB7fTtcclxuXHRcdHRoaXMubG9nID0gbG9nZ2VyO1xyXG5cclxuXHRcdC8vIFVwZGF0ZSB0aGlzIGxpbmUgdG8gdXNlIGEgZGlmZmVyZW5jZSBzZWFyY2ggcHJvdmlkZXJcclxuXHRcdHRoaXMuc2VhcmNoUHJvdmlkZXIgPSBuZXcgRmxleHNlYXJjaCh7bG9nZ2VyfSk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBsb2FkQ2hhcmFjdGVyKGNoYXJhY3Rlcik6IHZvaWQge1xyXG5cclxuXHRcdHRoaXMuaW5kZXhlc1tjaGFyYWN0ZXIuYWN0b3IuX2lkXSA9IHRoaXMuc2VhcmNoUHJvdmlkZXIubmV3SW5kZXgoKTtcclxuXHJcblx0XHRcclxuXHRcdGNoYXJhY3Rlci5pdGVtcy5tYXAoKGl0ZW0pID0+IHtcclxuXHRcdFx0dGhpcy5pbmRleGVzW2NoYXJhY3Rlci5hY3Rvci5faWRdLmFkZCh7XHJcblx0XHRcdFx0aWQ6IGl0ZW0uX2lkLFxyXG5cdFx0XHRcdHR5cGU6IGl0ZW0udHlwZSxcclxuXHRcdFx0XHR0aXRsZTogaXRlbS5uYW1lLFxyXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiB0aGlzLmV4dHJhY3RUZXh0RnJvbUl0ZW0oaXRlbSlcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZXh0cmFjdFRleHRGcm9tSXRlbShpdGVtOiBhbnkpOiBzdHJpbmcge1xyXG5cdFx0Y29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xyXG5cclxuXHRcdGxldCBkZXNjcmlwdGlvbiA9IGl0ZW0/LnN5c3RlbT8uZGVzY3JpcHRpb24/LnZhbHVlIHx8ICcnO1xyXG5cdFx0XHRcdFxyXG5cdFx0aWYgKGRlc2NyaXB0aW9uKSB7XHJcblx0XHRcdGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoJzxib2R5PicrZGVzY3JpcHRpb24rJzwvYm9keT4nLCAndGV4dC9odG1sJyk7XHJcblx0XHRcdGRlc2NyaXB0aW9uID0gZG9jLmJvZHkuaW5uZXJUZXh0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghZGVzY3JpcHRpb24pIHtcclxuXHRcdFx0dGhpcy5sb2coJ05vIGRlc2NyaXB0aW9uIGZvdW5kIGZvciBpdGVtJywgaXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGRlc2NyaXB0aW9uO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNlYXJjaENoYXJhY3RlcihjaGFyYWN0ZXJJZDogc3RyaW5nLCBxdWVyeTogc3RyaW5nKTogU2VhcmNoUmVzdWx0W10ge1xyXG5cdFx0aWYgKCF0aGlzLmluZGV4ZXNbY2hhcmFjdGVySWRdKSB7XHJcblx0XHRcdHRoaXMubG9nKCdObyBpbmRleCBmb3VuZCBmb3IgY2hhcmFjdGVyJywgY2hhcmFjdGVySWQpO1xyXG5cdFx0XHRyZXR1cm4gW107XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgcmVzdWx0cyA9IHRoaXMuaW5kZXhlc1tjaGFyYWN0ZXJJZF0uc2VhcmNoKHF1ZXJ5KTtcclxuXHJcblx0XHR0aGlzLmxvZygnU2VhcmNoIHJlc3VsdHMnLCByZXN1bHRzKTtcclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0cztcclxuXHR9XHJcblxyXG59IiwiaW1wb3J0IHsgTG9nRm4gfSBmcm9tIFwiLi4vYXBwL2FwcFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hJbmRleCB7XHJcblx0YWRkKHtpZCwgdHlwZSwgdGl0bGUsIGRlc2NyaXB0aW9ufSk6IHZvaWQ7XHJcblx0c2VhcmNoKHF1ZXJ5OiBzdHJpbmcpOiBTZWFyY2hSZXN1bHRbXTtcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNlYXJjaFByb3ZpZGVyIHtcclxuXHRsb2dnZXI6IExvZ0ZuO1xyXG5cdGNvbnN0cnVjdG9yKHsgbG9nZ2VyIH06IHsgbG9nZ2VyOiBMb2dGbiB9KSB7XHJcblx0XHR0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcclxuXHR9O1xyXG5cclxuXHRwdWJsaWMgYWJzdHJhY3QgbmV3SW5kZXgoKTogU2VhcmNoSW5kZXg7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFNlYXJjaFJlc3VsdCA9IHtcclxuXHRpZDogc3RyaW5nO1xyXG5cdG9yZGVyOiBudW1iZXI7XHJcblx0ZG9jOiB7XHJcblx0XHRpZDogc3RyaW5nO1xyXG5cdFx0dHlwZTogc3RyaW5nO1xyXG5cdFx0dGl0bGU6IHN0cmluZztcclxuXHRcdGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcblx0fTtcclxufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEFwcENvbmZpZyB9IGZyb20gJy4vYXBwL2FwcCc7XHJcblxyXG5sZXQgYXBwOiBhbnk7XHJcblxyXG5Ib29rcy5vbmNlKCdpbml0JywgKCkgPT4ge1xyXG4gIGFwcCA9IG5ldyBBcHBDb25maWcoKTtcclxufSk7XHJcblxyXG5Ib29rcy5vbigncmVuZGVyQ2hhcmFjdGVyU2hlZXRQRjJlJywgKF8sIGh0bWwsIGRhdGEpID0+IHtcclxuXHRhcHAub25TaGVldFJlbmRlcihodG1sLCBkYXRhKTtcclxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
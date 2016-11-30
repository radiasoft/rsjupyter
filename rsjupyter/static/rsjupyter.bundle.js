/** START DEFINE BLOCK for rsjupyter@0.0.1/lib/plugin.js **/
jupyter.define('rsjupyter@0.0.1/lib/plugin.js', function (module, exports, __jupyter_require__) {
	"use strict";
	var commandpalette_1 = __jupyter_require__('jupyterlab@^0.10.0/lib/commandpalette/index.js');
	var commandlinker_1 = __jupyter_require__('jupyterlab@^0.10.0/lib/commandlinker/index.js');
	var _1 = __jupyter_require__('rsjupyter@0.0.1/lib/index.js');
	__jupyter_require__('rsjupyter@0.0.1/lib/index.css');
	exports.rslaunchProvider = {
	    id: _1.RS_LAUNCHER_ID,
	    activate: activateLauncher,
	    requires: [commandpalette_1.ICommandPalette, commandlinker_1.ICommandLinker],
	    autoStart: true,
	    provides: _1.IRSLauncher
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = exports.rslaunchProvider;
	function activateLauncher(app, palette, linker) {
	    var model = new _1.RSLauncherModel();
	    var widget = new _1.RSLauncherWidget(linker, model, 'rs-launcher', 'radiasoft');
	    var defaults = [
	        {
	            name: 'Comsol',
	            url: '/services/comsol',
	            imgClass: 'rs-Launcher-Comsol-Image',
	        }
	    ];
	    defaults.forEach(function (item) { model.add(item); });
	    app.commands.addCommand(_1.RS_LAUNCH_COMMAND, {
	        execute: function (args) {
	            window.open(args['url'], '_blank');
	        }
	    });
	    app.commands.addCommand('rslauncher:show', {
	        label: 'Show RSLauncher',
	        execute: function () {
	            if (!widget.isAttached) {
	                app.shell.addToLeftArea(widget);
	            }
	            app.shell.activateLeft(widget.id);
	        }
	    });
	    palette.addItem({ command: 'rslauncher:show', category: 'Help' });
	    app.shell.addToLeftArea(widget);
	    return model;
	}
	
})
/** END DEFINE BLOCK for rsjupyter@0.0.1/lib/plugin.js **/


/** START DEFINE BLOCK for jupyterlab@0.10.0/lib/commandpalette/index.js **/
jupyter.define('jupyterlab@0.10.0/lib/commandpalette/index.js', function (module, exports, __jupyter_require__) {
	/*-----------------------------------------------------------------------------
	| Copyright (c) Jupyter Development Team.
	| Distributed under the terms of the Modified BSD License.
	|----------------------------------------------------------------------------*/
	"use strict";
	var token_1 = __jupyter_require__('phosphor@^0.7.0/lib/core/token.js');
	/* tslint:disable */
	/**
	 * The command palette token.
	 */
	exports.ICommandPalette = new token_1.Token('jupyter.services.commandpalette');
	//# sourceMappingURL=index.js.map
})
/** END DEFINE BLOCK for jupyterlab@0.10.0/lib/commandpalette/index.js **/


/** START DEFINE BLOCK for phosphor@0.7.0/lib/core/token.js **/
jupyter.define('phosphor@0.7.0/lib/core/token.js', function (module, exports, __jupyter_require__) {
	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2016, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	"use strict";
	/**
	 * A runtime object which captures compile-time type information.
	 *
	 * #### Notes
	 * A token captures the compile-time type of an interface or class in
	 * an object which is useful for various type-safe runtime operations.
	 *
	 * #### Example
	 * ``` typescript
	 * interface IThing {
	 *   value: number;
	 * }
	 *
	 * const IThing = new Token<IThing>('my-module/IThing');
	 *
	 * // some runtime type registry
	 * registry.registerFactory(IThing, () => { value: 42 });
	 *
	 * // later...
	 * let thing = registry.getInstance(IThing);
	 * thing.value; // 42
	 * ```
	 */
	var Token = (function () {
	    /**
	     * Construct a new token.
	     *
	     * @param name - A human readable name for the token.
	     */
	    function Token(name) {
	        this._name = name;
	    }
	    Object.defineProperty(Token.prototype, "name", {
	        /**
	         * The human readable name for the token.
	         *
	         * #### Notes
	         * This can be useful for debugging and logging.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Token;
	}());
	exports.Token = Token;
	
})
/** END DEFINE BLOCK for phosphor@0.7.0/lib/core/token.js **/


/** START DEFINE BLOCK for jupyterlab@0.10.0/lib/commandlinker/index.js **/
jupyter.define('jupyterlab@0.10.0/lib/commandlinker/index.js', function (module, exports, __jupyter_require__) {
	/*-----------------------------------------------------------------------------
	| Copyright (c) Jupyter Development Team.
	| Distributed under the terms of the Modified BSD License.
	|----------------------------------------------------------------------------*/
	"use strict";
	var commandlinker_1 = __jupyter_require__('jupyterlab@0.10.0/lib/commandlinker/commandlinker.js');
	exports.ICommandLinker = commandlinker_1.ICommandLinker;
	//# sourceMappingURL=index.js.map
})
/** END DEFINE BLOCK for jupyterlab@0.10.0/lib/commandlinker/index.js **/


/** START DEFINE BLOCK for jupyterlab@0.10.0/lib/commandlinker/commandlinker.js **/
jupyter.define('jupyterlab@0.10.0/lib/commandlinker/commandlinker.js', function (module, exports, __jupyter_require__) {
	/*-----------------------------------------------------------------------------
	| Copyright (c) Jupyter Development Team.
	| Distributed under the terms of the Modified BSD License.
	|----------------------------------------------------------------------------*/
	"use strict";
	var token_1 = __jupyter_require__('phosphor@^0.7.0/lib/core/token.js');
	/**
	 * The command data attribute added to nodes that are connected.
	 */
	var COMMAND_ATTR = 'commandlinker-command';
	/**
	 * The args data attribute added to nodes that are connected.
	 */
	var ARGS_ATTR = 'commandlinker-args';
	/* tslint:disable */
	/**
	 * The command linker token.
	 */
	exports.ICommandLinker = new token_1.Token('jupyter.services.commandlinker');
	/**
	 * A static class that provides helper methods to generate clickable nodes that
	 * execute registered commands with pre-populated arguments.
	 */
	var CommandLinker = (function () {
	    /**
	     * Instantiate a new command linker.
	     */
	    function CommandLinker(options) {
	        this._commands = null;
	        this._isDisposed = false;
	        this._commands = options.commands;
	        document.body.addEventListener('click', this);
	    }
	    Object.defineProperty(CommandLinker.prototype, "isDisposed", {
	        /**
	         * Test whether the linker is disposed.
	         */
	        get: function () {
	            return this._isDisposed;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Connect a command/argument pair to a given node so that when it is clicked,
	     * the command will execute.
	     *
	     * @param node - The node being connected.
	     *
	     * @param command - The command ID to execute upon click.
	     *
	     * @param args - The arguments with which to invoke the command.
	     *
	     * @returns The same node that was passed in, after it has been connected.
	     *
	     * #### Notes
	     * Only `click` events will execute the command on a connected node. So, there
	     * are two considerations that are relevant:
	     * 1. If a node is connected, the default click action will be prevented.
	     * 2. The `HTMLElement` passed in should be clickable.
	     */
	    CommandLinker.prototype.connectNode = function (node, command, args) {
	        var argsValue = JSON.stringify(args);
	        node.setAttribute("data-" + COMMAND_ATTR, command);
	        if (argsValue) {
	            node.setAttribute("data-" + ARGS_ATTR, argsValue);
	        }
	        return node;
	    };
	    /**
	     * Disconnect a node that has been connected to execute a command on click.
	     *
	     * @param node - The node being disconnected.
	     *
	     * @returns The same node that was passed in, after it has been disconnected.
	     *
	     * #### Notes
	     * This method is safe to call multiple times and is safe to call on nodes
	     * that were never connected.
	     *
	     * This method can be called on rendered virtual DOM nodes that were populated
	     * using the `populateVNodeAttributes` method in order to disconnect them from
	     * executing their command/argument pair.
	     */
	    CommandLinker.prototype.disconnectNode = function (node) {
	        node.removeAttribute("data-" + COMMAND_ATTR);
	        node.removeAttribute("data-" + ARGS_ATTR);
	        return node;
	    };
	    /**
	     * Dispose of the resources held by the linker.
	     */
	    CommandLinker.prototype.dispose = function () {
	        if (this.isDisposed) {
	            return;
	        }
	        this._isDisposed = true;
	        this._commands = null;
	        document.body.removeEventListener('click', this);
	    };
	    /**
	     * Handle the DOM events for the command linker helper class.
	     *
	     * @param event - The DOM event sent to the class.
	     *
	     * #### Notes
	     * This method implements the DOM `EventListener` interface and is
	     * called in response to events on the panel's DOM node. It should
	     * not be called directly by user code.
	     */
	    CommandLinker.prototype.handleEvent = function (event) {
	        switch (event.type) {
	            case 'click':
	                this._evtClick(event);
	                break;
	            default:
	                return;
	        }
	    };
	    /**
	     * Populate the attributes used to instantiate a virtual DOM node with the
	     * data set values necessary for its rendered DOM node to respond to clicks by
	     * executing a command/argument pair
	     *
	     * @param attrs - The attributes that will eventually be used to instantiate
	     * a virtual DOM node.
	     *
	     * @param command - The command ID to execute upon click.
	     *
	     * @param args - The arguments with which to invoke the command.
	     *
	     * #### Notes
	     * The attributes instance that is returned is identical to the attributes
	     * instance that was passed in, i.e., this method mutates the original.
	     */
	    CommandLinker.prototype.populateVNodeAttrs = function (attrs, command, args) {
	        var argsValue = JSON.stringify(args);
	        attrs.dataset = attrs.dataset || {};
	        attrs.dataset[COMMAND_ATTR] = command;
	        if (argsValue) {
	            attrs.dataset[ARGS_ATTR] = argsValue;
	        }
	        return attrs;
	    };
	    /**
	     * The global click handler that deploys commands/argument pairs that are
	     * attached to the node being clicked.
	     */
	    CommandLinker.prototype._evtClick = function (event) {
	        var target = event.target;
	        while (target && target.parentElement) {
	            if (target.hasAttribute("data-" + COMMAND_ATTR)) {
	                event.preventDefault();
	                var command = target.getAttribute("data-" + COMMAND_ATTR);
	                var argsValue = target.getAttribute("data-" + ARGS_ATTR);
	                var args = void 0;
	                if (argsValue) {
	                    args = JSON.parse(argsValue);
	                }
	                this._commands.execute(command, args);
	                return;
	            }
	            target = target.parentElement;
	        }
	    };
	    return CommandLinker;
	}());
	exports.CommandLinker = CommandLinker;
	//# sourceMappingURL=commandlinker.js.map
})
/** END DEFINE BLOCK for jupyterlab@0.10.0/lib/commandlinker/commandlinker.js **/


/** START DEFINE BLOCK for rsjupyter@0.0.1/lib/index.js **/
jupyter.define('rsjupyter@0.0.1/lib/index.js', function (module, exports, __jupyter_require__) {
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var iteration_1 = __jupyter_require__('phosphor@^0.7.0/lib/algorithm/iteration.js');
	var token_1 = __jupyter_require__('phosphor@^0.7.0/lib/core/token.js');
	var vdom_1 = __jupyter_require__('phosphor@^0.7.0/lib/ui/vdom.js');
	var vector_1 = __jupyter_require__('phosphor@^0.7.0/lib/collections/vector.js');
	var vdom_2 = __jupyter_require__('jupyterlab@^0.10.0/lib/common/vdom.js');
	var LAUNCHER_CLASS = 'jp-LauncherWidget';
	var IMAGE_CLASS = 'jp-LauncherWidget-image';
	var TEXT_CLASS = 'jp-LauncherWidget-text';
	var ITEM_CLASS = 'jp-LauncherWidget-item';
	var FOLDER_CLASS = 'jp-LauncherWidget-folder';
	var FOLDER_ICON_CLASS = 'jp-FolderIcon';
	var PATH_CLASS = 'jp-LauncherWidget-path';
	var CWD_CLASS = 'jp-LauncherWidget-cwd';
	var BODY_CLASS = 'jp-LauncherWidget-body';
	var DIALOG_CLASS = 'jp-LauncherWidget-dialog';
	exports.RS_LAUNCH_COMMAND = 'rs:launcher:launch';
	exports.RS_LAUNCHER_ID = 'org.radiasoft.jupyterlab.launcher';
	exports.IRSLauncher = new token_1.Token(exports.RS_LAUNCHER_ID);
	var RSLauncherModel = (function (_super) {
	    __extends(RSLauncherModel, _super);
	    function RSLauncherModel() {
	        _super.call(this);
	        this._items = null;
	        this._items = new vector_1.Vector();
	    }
	    RSLauncherModel.prototype.add = function (item) {
	        this._items.pushBack(item);
	        this.stateChanged.emit(void 0);
	    };
	    RSLauncherModel.prototype.items = function () {
	        return this._items.iter();
	    };
	    return RSLauncherModel;
	}(vdom_2.VDomModel));
	exports.RSLauncherModel = RSLauncherModel;
	var RSLauncherWidget = (function (_super) {
	    __extends(RSLauncherWidget, _super);
	    function RSLauncherWidget(linker, model, id, label) {
	        _super.call(this);
	        this._linker = null;
	        this._linker = linker;
	        this.addClass(LAUNCHER_CLASS);
	        this.id = id;
	        this.model = model;
	        this.title.label = label;
	    }
	    RSLauncherWidget.prototype.render = function () {
	        var _this = this;
	        var children = iteration_1.map(this.model.items(), function (item) {
	            var icon = vdom_1.h.div({ className: item.imgClass + ' ' + IMAGE_CLASS });
	            var label = vdom_1.h.div({ className: TEXT_CLASS }, item.name);
	            var launch_attrs = _this._linker.populateVNodeAttrs({ className: ITEM_CLASS }, exports.RS_LAUNCH_COMMAND, { url: item.url });
	            var child = vdom_1.h.div(launch_attrs, [icon, label]);
	            return child;
	        });
	        return vdom_1.h.div({ className: DIALOG_CLASS }, vdom_1.h.div({ className: BODY_CLASS }, iteration_1.toArray(children)));
	    };
	    return RSLauncherWidget;
	}(vdom_2.VDomWidget));
	exports.RSLauncherWidget = RSLauncherWidget;
	
})
/** END DEFINE BLOCK for rsjupyter@0.0.1/lib/index.js **/


/** START DEFINE BLOCK for phosphor@0.7.0/lib/algorithm/iteration.js **/
jupyter.define('phosphor@0.7.0/lib/algorithm/iteration.js', function (module, exports, __jupyter_require__) {
	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2016, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	"use strict";
	/**
	 * Create an iterator for an iterable or array-like object.
	 *
	 * @param object - The iterable or array-like object of interest.
	 *
	 * @returns A new iterator for the given object.
	 *
	 * #### Notes
	 * This function allows iteration algorithms to operate on user-defined
	 * iterable types and builtin array-like objects in a uniform fashion.
	 */
	function iter(object) {
	    var it;
	    if (typeof object.iter === 'function') {
	        it = object.iter();
	    }
	    else {
	        it = new ArrayIterator(object, 0);
	    }
	    return it;
	}
	exports.iter = iter;
	/**
	 * Create an array from an iterable of values.
	 *
	 * @param object - The iterable or array-like object of interest.
	 *
	 * @returns A new array of values from the given object.
	 */
	function toArray(object) {
	    var value;
	    var result = [];
	    var it = iter(object);
	    while ((value = it.next()) !== void 0) {
	        result[result.length] = value;
	    }
	    return result;
	}
	exports.toArray = toArray;
	/**
	 * Create an empty iterator.
	 *
	 * @returns A new iterator which yields nothing.
	 */
	function empty() {
	    return new EmptyIterator();
	}
	exports.empty = empty;
	/**
	 * An iterator which is always empty.
	 */
	var EmptyIterator = (function () {
	    /**
	     * Construct a new empty iterator.
	     */
	    function EmptyIterator() {
	    }
	    /**
	     * Create an iterator over the object's values.
	     *
	     * @returns A reference to `this` iterator.
	     */
	    EmptyIterator.prototype.iter = function () {
	        return this;
	    };
	    /**
	     * Create an independent clone of the current iterator.
	     *
	     * @returns A new independent clone of the current iterator.
	     */
	    EmptyIterator.prototype.clone = function () {
	        return new EmptyIterator();
	    };
	    /**
	     * Get the next value from the iterator.
	     *
	     * @returns Always `undefined`.
	     */
	    EmptyIterator.prototype.next = function () {
	        return void 0;
	    };
	    return EmptyIterator;
	}());
	exports.EmptyIterator = EmptyIterator;
	/**
	 * An iterator for an array-like object.
	 *
	 * #### Notes
	 * This iterator can be used for any builtin JS array-like object.
	 */
	var ArrayIterator = (function () {
	    /**
	     * Construct a new array iterator.
	     *
	     * @param source - The array-like object of interest.
	     *
	     * @param start - The starting index for iteration.
	     */
	    function ArrayIterator(source, start) {
	        this._source = source;
	        this._index = start;
	    }
	    /**
	     * Create an iterator over the object's values.
	     *
	     * @returns A reference to `this` iterator.
	     */
	    ArrayIterator.prototype.iter = function () {
	        return this;
	    };
	    /**
	     * Create an independent clone of the current iterator.
	     *
	     * @returns A new independent clone of the current iterator.
	     *
	     * #### Notes
	     * The source array is shared among clones.
	     */
	    ArrayIterator.prototype.clone = function () {
	        return new ArrayIterator(this._source, this._index);
	    };
	    /**
	     * Get the next value from the source array.
	     *
	     * @returns The next value from the source array, or `undefined`
	     *   if the iterator is exhausted.
	     */
	    ArrayIterator.prototype.next = function () {
	        if (this._index >= this._source.length) {
	            return void 0;
	        }
	        return this._source[this._index++];
	    };
	    return ArrayIterator;
	}());
	exports.ArrayIterator = ArrayIterator;
	/**
	 * Invoke a function for each value in an iterable.
	 *
	 * @param object - The iterable or array-like object of interest.
	 *
	 * @param fn - The callback function to invoke for each value.
	 *
	 * #### Notes
	 * Iteration cannot be terminated early.
	 */
	function each(object, fn) {
	    var value;
	    var it = iter(object);
	    while ((value = it.next()) !== void 0) {
	        fn(value);
	    }
	}
	exports.each = each;
	/**
	 * Test whether all values in an iterable satisfy a predicate.
	 *
	 * @param object - The iterable or array-like object of interest.
	 *
	 * @param fn - The predicate function to invoke for each value.
	 *
	 * @returns `true` if all values pass the test, `false` otherwise.
	 *
	 * #### Notes
	 * Iteration terminates on the first `false` predicate result.
	 */
	function every(object, fn) {
	    var value;
	    var it = iter(object);
	    while ((value = it.next()) !== void 0) {
	        if (!fn(value)) {
	            return false;
	        }
	    }
	    return true;
	}
	exports.every = every;
	/**
	 * Test whether any value in an iterable satisfies a predicate.
	 *
	 * @param object - The iterable or array-like object of interest.
	 *
	 * @param fn - The predicate function to invoke for each value.
	 *
	 * @returns `true` if any value passes the test, `false` otherwise.
	 *
	 * #### Notes
	 * Iteration terminates on the first `true` predicate result.
	 */
	function some(object, fn) {
	    var value;
	    var it = iter(object);
	    while ((value = it.next()) !== void 0) {
	        if (fn(value)) {
	            return true;
	        }
	    }
	    return false;
	}
	exports.some = some;
	function reduce(object, fn, initial) {
	    // Setup the iterator and fetch the first value.
	    var it = iter(object);
	    var first = it.next();
	    // An empty iterator and no initial value is an error.
	    if (first === void 0 && initial === void 0) {
	        throw new TypeError('Reduce of empty iterable with no initial value.');
	    }
	    // If the iterator is empty, return the initial value.
	    if (first === void 0) {
	        return initial;
	    }
	    // If the iterator has a single item and no initial value, the
	    // reducer is not invoked and the first item is the return value.
	    var second = it.next();
	    if (second === void 0 && initial === void 0) {
	        return first;
	    }
	    // If iterator has a single item and an initial value is provided,
	    // the reducer is invoked and that result is the return value.
	    if (second === void 0) {
	        return fn(initial, first);
	    }
	    // Setup the initial accumulator value.
	    var accumulator;
	    if (initial === void 0) {
	        accumulator = fn(first, second);
	    }
	    else {
	        accumulator = fn(fn(initial, first), second);
	    }
	    // Iterate the rest of the values, updating the accumulator.
	    var next;
	    while ((next = it.next()) !== void 0) {
	        accumulator = fn(accumulator, next);
	    }
	    // Return the final accumulated value.
	    return accumulator;
	}
	exports.reduce = reduce;
	/**
	 * Filter an iterable for values which pass a test.
	 *
	 * @param object - The iterable or array-like object of interest.
	 *
	 * @param fn - The predicate function to invoke for each value.
	 *
	 * @returns An iterator which yields the values which pass the test.
	 */
	function filter(object, fn) {
	    return new FilterIterator(iter(object), fn);
	}
	exports.filter = filter;
	/**
	 * An iterator which yields values which pass a test.
	 */
	var FilterIterator = (function () {
	    /**
	     * Construct a new filter iterator.
	     *
	     * @param source - The iterator of values of interest.
	     *
	     * @param fn - The predicate function to invoke for each value in
	     *   the iterator. It returns whether the value passes the test.
	     */
	    function FilterIterator(source, fn) {
	        this._source = source;
	        this._fn = fn;
	    }
	    /**
	     * Create an iterator over the object's values.
	     *
	     * @returns A reference to `this` iterator.
	     */
	    FilterIterator.prototype.iter = function () {
	        return this;
	    };
	    /**
	     * Create an independent clone of the current iterator.
	     *
	     * @returns A new independent clone of the current iterator.
	     *
	     * #### Notes
	     * The source iterator must be cloneable.
	     *
	     * The predicate function is shared among clones.
	     */
	    FilterIterator.prototype.clone = function () {
	        return new FilterIterator(this._source.clone(), this._fn);
	    };
	    /**
	     * Get the next value which passes the test.
	     *
	     * @returns The next value from the source iterator which passes
	     *   the predicate, or `undefined` if the iterator is exhausted.
	     */
	    FilterIterator.prototype.next = function () {
	        var value;
	        var fn = this._fn;
	        var it = this._source;
	        while ((value = it.next()) !== void 0) {
	            if (fn(value)) {
	                return value;
	            }
	        }
	        return void 0;
	    };
	    return FilterIterator;
	}());
	exports.FilterIterator = FilterIterator;
	/**
	 * Transform the values of an iterable with a mapping function.
	 *
	 * @param object - The iterable or array-like object of interest.
	 *
	 * @param fn - The mapping function to invoke for each value.
	 *
	 * @returns An iterator which yields the transformed values.
	 */
	function map(object, fn) {
	    return new MapIterator(iter(object), fn);
	}
	exports.map = map;
	/**
	 * An iterator which transforms values using a mapping function.
	 */
	var MapIterator = (function () {
	    /**
	     * Construct a new map iterator.
	     *
	     * @param source - The iterator of values of interest.
	     *
	     * @param fn - The mapping function to invoke for each value in the
	     *   iterator. It returns the transformed value.
	     */
	    function MapIterator(source, fn) {
	        this._source = source;
	        this._fn = fn;
	    }
	    /**
	     * Create an iterator over the object's values.
	     *
	     * @returns A reference to `this` iterator.
	     */
	    MapIterator.prototype.iter = function () {
	        return this;
	    };
	    /**
	     * Create an independent clone of the current iterator.
	     *
	     * @returns A new independent clone of the current iterator.
	     *
	     * #### Notes
	     * The source iterator must be cloneable.
	     *
	     * The mapping function is shared among clones.
	     */
	    MapIterator.prototype.clone = function () {
	        return new MapIterator(this._source.clone(), this._fn);
	    };
	    /**
	     * Get the next mapped value from the source iterator.
	     *
	     * @returns The next value from the source iterator transformed
	     *   by the mapper, or `undefined` if the iterator is exhausted.
	     */
	    MapIterator.prototype.next = function () {
	        var value = this._source.next();
	        if (value === void 0) {
	            return void 0;
	        }
	        return this._fn.call(void 0, value);
	    };
	    return MapIterator;
	}());
	exports.MapIterator = MapIterator;
	/**
	 * Attach an incremental index to an iterable.
	 *
	 * @param object - The iterable or array-like object of interest.
	 *
	 * @param start - The initial value of the index. The default is zero.
	 *
	 * @returns An iterator which yields `[index, value]` tuples.
	 */
	function enumerate(object, start) {
	    if (start === void 0) { start = 0; }
	    return new EnumerateIterator(iter(object), start);
	}
	exports.enumerate = enumerate;
	/**
	 * An iterator which attaches an incremental index to a source.
	 */
	var EnumerateIterator = (function () {
	    /**
	     * Construct a new enumerate iterator.
	     *
	     * @param source - The iterator of values of interest.
	     *
	     * @param start - The initial value of the index.
	     */
	    function EnumerateIterator(source, start) {
	        this._source = source;
	        this._index = start;
	    }
	    /**
	     * Create an iterator over the object's values.
	     *
	     * @returns A reference to `this` iterator.
	     */
	    EnumerateIterator.prototype.iter = function () {
	        return this;
	    };
	    /**
	     * Create an independent clone of the enumerate iterator.
	     *
	     * @returns A new iterator starting with the current value.
	     *
	     * #### Notes
	     * The source iterator must be cloneable.
	     */
	    EnumerateIterator.prototype.clone = function () {
	        return new EnumerateIterator(this._source.clone(), this._index);
	    };
	    /**
	     * Get the next value from the enumeration.
	     *
	     * @returns The next value from the enumeration, or `undefined` if
	     *   the iterator is exhausted.
	     */
	    EnumerateIterator.prototype.next = function () {
	        var value = this._source.next();
	        if (value === void 0) {
	            return void 0;
	        }
	        return [this._index++, value];
	    };
	    return EnumerateIterator;
	}());
	exports.EnumerateIterator = EnumerateIterator;
	/**
	 * Create an iterator which yields a value a single time.
	 *
	 * @param value - The value to wrap in an iterator.
	 *
	 * @returns A new iterator which yields the value a single time.
	 */
	function once(value) {
	    return new RepeatIterator(value, 1);
	}
	exports.once = once;
	/**
	 * Create an iterator which repeats a value a number of times.
	 *
	 * @param value - The value to repeat.
	 *
	 * @param count - The number of times to repeat the value.
	 *
	 * @returns A new iterator which repeats the specified value.
	 */
	function repeat(value, count) {
	    return new RepeatIterator(value, count);
	}
	exports.repeat = repeat;
	/**
	 * An iterator which repeats a value a specified number of times.
	 */
	var RepeatIterator = (function () {
	    /**
	     * Construct a new repeat iterator.
	     *
	     * @param value - The value to repeat.
	     *
	     * @param count - The number of times to repeat the value.
	     */
	    function RepeatIterator(value, count) {
	        this._value = value;
	        this._count = count;
	    }
	    /**
	     * Create an iterator over the object's values.
	     *
	     * @returns A reference to `this` iterator.
	     */
	    RepeatIterator.prototype.iter = function () {
	        return this;
	    };
	    /**
	     * Create an independent clone of the repeat iterator.
	     *
	     * @returns A new iterator starting with the current value.
	     */
	    RepeatIterator.prototype.clone = function () {
	        return new RepeatIterator(this._value, this._count);
	    };
	    /**
	     * Get the next value from the iterator.
	     *
	     * @returns The next value from the iterator, or `undefined` if
	     *   the iterator is exhausted.
	     */
	    RepeatIterator.prototype.next = function () {
	        if (this._count <= 0) {
	            return void 0;
	        }
	        this._count--;
	        return this._value;
	    };
	    return RepeatIterator;
	}());
	exports.RepeatIterator = RepeatIterator;
	/**
	 * Chain together several iterables.
	 *
	 * @param objects - The iterables or array-like objects of interest.
	 *
	 * @returns An iterator which yields the values of the given iterables
	 *   in the order in which they are supplied.
	 */
	function chain() {
	    var objects = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        objects[_i - 0] = arguments[_i];
	    }
	    return new ChainIterator(map(objects, iter));
	}
	exports.chain = chain;
	/**
	 * An iterator which chains together several iterators.
	 */
	var ChainIterator = (function () {
	    /**
	     * Construct a new chain iterator.
	     *
	     * @param source - The iterator of iterators of interest.
	     */
	    function ChainIterator(source) {
	        this._cloned = false;
	        this._source = source;
	        this._active = void 0;
	    }
	    /**
	     * Create an iterator over the object's values.
	     *
	     * @returns A reference to `this` iterator.
	     */
	    ChainIterator.prototype.iter = function () {
	        return this;
	    };
	    /**
	     * Create an independent clone of the chain iterator.
	     *
	     * @returns A new iterator starting with the current value.
	     *
	     * #### Notes
	     * The source iterators must be cloneable.
	     */
	    ChainIterator.prototype.clone = function () {
	        var result = new ChainIterator(this._source.clone());
	        result._active = this._active && this._active.clone();
	        result._cloned = true;
	        this._cloned = true;
	        return result;
	    };
	    /**
	     * Get the next value from the iterator.
	     *
	     * @returns The next value from the iterator, or `undefined` when
	     *   all source iterators are exhausted.
	     */
	    ChainIterator.prototype.next = function () {
	        if (this._active === void 0) {
	            this._active = this._source.next();
	            if (this._active === void 0) {
	                return void 0;
	            }
	            if (this._cloned) {
	                this._active = this._active.clone();
	            }
	        }
	        var value = this._active.next();
	        if (value !== void 0) {
	            return value;
	        }
	        this._active = void 0;
	        return this.next();
	    };
	    return ChainIterator;
	}());
	exports.ChainIterator = ChainIterator;
	/**
	 * Iterate several iterables in lockstep.
	 *
	 * @param objects - The iterables or array-like objects of interest.
	 *
	 * @returns An iterator which yields successive tuples of values where
	 *   each value is taken in turn from the provided iterables. It will
	 *   be as long as the shortest provided iterable.
	 */
	function zip() {
	    var objects = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        objects[_i - 0] = arguments[_i];
	    }
	    return new ZipIterator(objects.map(iter));
	}
	exports.zip = zip;
	/**
	 * An iterator which iterates several sources in lockstep.
	 */
	var ZipIterator = (function () {
	    /**
	     * Construct a new zip iterator.
	     *
	     * @param source - The iterators of interest.
	     */
	    function ZipIterator(source) {
	        this._source = source;
	    }
	    /**
	     * Create an iterator over the object's values.
	     *
	     * @returns A reference to `this` iterator.
	     */
	    ZipIterator.prototype.iter = function () {
	        return this;
	    };
	    /**
	     * Create an independent clone of the zip iterator.
	     *
	     * @returns A new iterator starting with the current value.
	     *
	     * #### Notes
	     * The source iterators must be cloneable.
	     */
	    ZipIterator.prototype.clone = function () {
	        return new ZipIterator(this._source.map(function (it) { return it.clone(); }));
	    };
	    /**
	     * Get the next zipped value from the iterator.
	     *
	     * @returns The next zipped value from the iterator, or `undefined`
	     *   when the first source iterator is exhausted.
	     */
	    ZipIterator.prototype.next = function () {
	        var iters = this._source;
	        var result = new Array(iters.length);
	        for (var i = 0, n = iters.length; i < n; ++i) {
	            var value = iters[i].next();
	            if (value === void 0) {
	                return void 0;
	            }
	            result[i] = value;
	        }
	        return result;
	    };
	    return ZipIterator;
	}());
	exports.ZipIterator = ZipIterator;
	/**
	 * Iterate over an iterable using a stepped increment.
	 *
	 * @param object - The iterable or array-like object of interest.
	 *
	 * @param step - The distance to step on each iteration. A value
	 *   of less than `1` will behave the same as a value of `1`.
	 *
	 * @returns An iterator which traverses the iterable step-wise.
	 */
	function stride(object, step) {
	    return new StrideIterator(iter(object), step);
	}
	exports.stride = stride;
	/**
	 * An iterator which traverses a source iterator step-wise.
	 */
	var StrideIterator = (function () {
	    /**
	     * Construct a new stride iterator.
	     *
	     * @param source - The iterator of values of interest.
	     *
	     * @param step - The distance to step on each iteration. A value
	     *   of less than `1` will behave the same as a value of `1`.
	     */
	    function StrideIterator(source, step) {
	        this._source = source;
	        this._step = step;
	    }
	    /**
	     * Create an iterator over the object's values.
	     *
	     * @returns A reference to `this` iterator.
	     */
	    StrideIterator.prototype.iter = function () {
	        return this;
	    };
	    /**
	     * Create an independent clone of the stride iterator.
	     *
	     * @returns A new iterator starting with the current value.
	     *
	     * #### Notes
	     * The source iterator must be cloneable.
	     */
	    StrideIterator.prototype.clone = function () {
	        return new StrideIterator(this._source.clone(), this._step);
	    };
	    /**
	     * Get the next stepped value from the iterator.
	     *
	     * @returns The next stepped value from the iterator, or `undefined`
	     *   when the source iterator is exhausted.
	     */
	    StrideIterator.prototype.next = function () {
	        var value = this._source.next();
	        if (value === void 0) {
	            return void 0;
	        }
	        var step = this._step;
	        while (--step > 0) {
	            this._source.next();
	        }
	        return value;
	    };
	    return StrideIterator;
	}());
	exports.StrideIterator = StrideIterator;
	
})
/** END DEFINE BLOCK for phosphor@0.7.0/lib/algorithm/iteration.js **/


/** START DEFINE BLOCK for phosphor@0.7.0/lib/ui/vdom.js **/
jupyter.define('phosphor@0.7.0/lib/ui/vdom.js', function (module, exports, __jupyter_require__) {
	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2016, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	"use strict";
	/**
	 * A node in a virtual DOM hierarchy.
	 *
	 * #### Notes
	 * User code will not usually instantiate an node directly. Rather, the
	 * `h()` function will be called to create a node in a type-safe manner.
	 *
	 * A node *must* be treated as immutable. Mutating the state of a node
	 * **will** result in undefined rendering behavior.
	 */
	var VNode = (function () {
	    /**
	     * Construct a new virtual DOM node.
	     *
	     * @param type - The type of the node.
	     *
	     * @param tag - The node tag.
	     *
	     * @param attrs - The node attributes.
	     *
	     * @param children - The node children.
	     */
	    function VNode(type, tag, attrs, children) {
	        this.type = type;
	        this.tag = tag;
	        this.attrs = attrs;
	        this.children = children;
	    }
	    return VNode;
	}());
	exports.VNode = VNode;
	function h(tag, first) {
	    // Setup the variables to hold the parsed data.
	    var attrs;
	    var children;
	    // Parse the first variadic argument.
	    if (first) {
	        if (typeof first === 'string') {
	            children = [first];
	        }
	        else if (first instanceof VNode) {
	            children = [first];
	        }
	        else if (first instanceof Array) {
	            children = first.slice();
	        }
	        else {
	            attrs = first;
	        }
	    }
	    // Parse the rest of the variadic arguments.
	    if (arguments.length > 2) {
	        children = children || [];
	        for (var i = 2, n = arguments.length; i < n; ++i) {
	            var child = arguments[i];
	            if (child instanceof Array) {
	                for (var j = 0, k = child.length; j < k; ++j) {
	                    if (child[j])
	                        children.push(child[j]);
	                }
	            }
	            else if (child) {
	                children.push(child);
	            }
	        }
	    }
	    // Convert string literal children into text nodes.
	    if (children) {
	        for (var i = 0, n = children.length; i < n; ++i) {
	            var child = children[i];
	            if (typeof child === 'string') {
	                children[i] = Private.createTextVNode(child);
	            }
	        }
	    }
	    // Return a new virtual DOM node.
	    return Private.createElementVNode(tag, attrs, children);
	}
	exports.h = h;
	/**
	 * The namespace for the `h()` function statics.
	 */
	var h;
	(function (h) {
	    h.a = h.bind(void 0, 'a');
	    h.abbr = h.bind(void 0, 'abbr');
	    h.address = h.bind(void 0, 'address');
	    h.area = h.bind(void 0, 'area');
	    h.article = h.bind(void 0, 'article');
	    h.aside = h.bind(void 0, 'aside');
	    h.audio = h.bind(void 0, 'audio');
	    h.b = h.bind(void 0, 'b');
	    h.bdi = h.bind(void 0, 'bdi');
	    h.bdo = h.bind(void 0, 'bdo');
	    h.blockquote = h.bind(void 0, 'blockquote');
	    h.br = h.bind(void 0, 'br');
	    h.button = h.bind(void 0, 'button');
	    h.canvas = h.bind(void 0, 'canvas');
	    h.caption = h.bind(void 0, 'caption');
	    h.cite = h.bind(void 0, 'cite');
	    h.code = h.bind(void 0, 'code');
	    h.col = h.bind(void 0, 'col');
	    h.colgroup = h.bind(void 0, 'colgroup');
	    h.data = h.bind(void 0, 'data');
	    h.datalist = h.bind(void 0, 'datalist');
	    h.dd = h.bind(void 0, 'dd');
	    h.del = h.bind(void 0, 'del');
	    h.dfn = h.bind(void 0, 'dfn');
	    h.div = h.bind(void 0, 'div');
	    h.dl = h.bind(void 0, 'dl');
	    h.dt = h.bind(void 0, 'dt');
	    h.em = h.bind(void 0, 'em');
	    h.embed = h.bind(void 0, 'embed');
	    h.fieldset = h.bind(void 0, 'fieldset');
	    h.figcaption = h.bind(void 0, 'figcaption');
	    h.figure = h.bind(void 0, 'figure');
	    h.footer = h.bind(void 0, 'footer');
	    h.form = h.bind(void 0, 'form');
	    h.h1 = h.bind(void 0, 'h1');
	    h.h2 = h.bind(void 0, 'h2');
	    h.h3 = h.bind(void 0, 'h3');
	    h.h4 = h.bind(void 0, 'h4');
	    h.h5 = h.bind(void 0, 'h5');
	    h.h6 = h.bind(void 0, 'h6');
	    h.header = h.bind(void 0, 'header');
	    h.hr = h.bind(void 0, 'hr');
	    h.i = h.bind(void 0, 'i');
	    h.iframe = h.bind(void 0, 'iframe');
	    h.img = h.bind(void 0, 'img');
	    h.input = h.bind(void 0, 'input');
	    h.ins = h.bind(void 0, 'ins');
	    h.kbd = h.bind(void 0, 'kbd');
	    h.label = h.bind(void 0, 'label');
	    h.legend = h.bind(void 0, 'legend');
	    h.li = h.bind(void 0, 'li');
	    h.main = h.bind(void 0, 'main');
	    h.map = h.bind(void 0, 'map');
	    h.mark = h.bind(void 0, 'mark');
	    h.meter = h.bind(void 0, 'meter');
	    h.nav = h.bind(void 0, 'nav');
	    h.noscript = h.bind(void 0, 'noscript');
	    h.object = h.bind(void 0, 'object');
	    h.ol = h.bind(void 0, 'ol');
	    h.optgroup = h.bind(void 0, 'optgroup');
	    h.option = h.bind(void 0, 'option');
	    h.output = h.bind(void 0, 'output');
	    h.p = h.bind(void 0, 'p');
	    h.param = h.bind(void 0, 'param');
	    h.pre = h.bind(void 0, 'pre');
	    h.progress = h.bind(void 0, 'progress');
	    h.q = h.bind(void 0, 'q');
	    h.rp = h.bind(void 0, 'rp');
	    h.rt = h.bind(void 0, 'rt');
	    h.ruby = h.bind(void 0, 'ruby');
	    h.s = h.bind(void 0, 's');
	    h.samp = h.bind(void 0, 'samp');
	    h.section = h.bind(void 0, 'section');
	    h.select = h.bind(void 0, 'select');
	    h.small = h.bind(void 0, 'small');
	    h.source = h.bind(void 0, 'source');
	    h.span = h.bind(void 0, 'span');
	    h.strong = h.bind(void 0, 'strong');
	    h.sub = h.bind(void 0, 'sub');
	    h.summary = h.bind(void 0, 'summary');
	    h.sup = h.bind(void 0, 'sup');
	    h.table = h.bind(void 0, 'table');
	    h.tbody = h.bind(void 0, 'tbody');
	    h.td = h.bind(void 0, 'td');
	    h.textarea = h.bind(void 0, 'textarea');
	    h.tfoot = h.bind(void 0, 'tfoot');
	    h.th = h.bind(void 0, 'th');
	    h.thead = h.bind(void 0, 'thead');
	    h.time = h.bind(void 0, 'time');
	    h.title = h.bind(void 0, 'title');
	    h.tr = h.bind(void 0, 'tr');
	    h.track = h.bind(void 0, 'track');
	    h.u = h.bind(void 0, 'u');
	    h.ul = h.bind(void 0, 'ul');
	    h.var_ = h.bind(void 0, 'var');
	    h.video = h.bind(void 0, 'video');
	    h.wbr = h.bind(void 0, 'wbr');
	})(h = exports.h || (exports.h = {}));
	/**
	 * Create a real DOM node from a virtual DOM node.
	 *
	 * @param content - The virtual DOM content to realize.
	 *
	 * @returns A new DOM node for the given virtual DOM tree.
	 *
	 * #### Notes
	 * The content node is assumed to be of the `'element'` type.
	 *
	 * This creates a brand new *real* DOM node with a structure which
	 * matches the given virtual DOM node.
	 *
	 * If virtual diffing is desired, use the `render` function instead.
	 */
	function realize(content) {
	    return Private.realizeImpl(content);
	}
	exports.realize = realize;
	/**
	 * Render virtual DOM content into a host element.
	 *
	 * @param content - The virtual DOM content to render.
	 *
	 * @param host - The host element for the rendered content.
	 *
	 * #### Notes
	 * This renders the delta from the previous rendering. It assumes that
	 * the content of the host element is not manipulated by external code.
	 *
	 * Providing `null` content will clear the rendering.
	 *
	 * Externally modifying the provided content or the host element will
	 * result in undefined rendering behavior.
	 */
	function render(content, host) {
	    Private.renderImpl(content, host);
	}
	exports.render = render;
	/**
	 * The namespace for the private module data.
	 */
	var Private;
	(function (Private) {
	    /**
	     * Create a virtual text node for the given string.
	     */
	    function createTextVNode(text) {
	        return new VNode('text', text, emptyObject, emptyArray);
	    }
	    Private.createTextVNode = createTextVNode;
	    /**
	     * Create a virtual element node for the given parameters.
	     */
	    function createElementVNode(tag, attrs, children) {
	        attrs = attrs || emptyObject;
	        children = children || emptyArray;
	        return new VNode('element', tag, attrs, children);
	    }
	    Private.createElementVNode = createElementVNode;
	    /**
	     * The internal `realize` entry point.
	     */
	    function realizeImpl(content) {
	        return createDOMNode(content);
	    }
	    Private.realizeImpl = realizeImpl;
	    /**
	     * The internal `render` entry point.
	     */
	    function renderImpl(content, host) {
	        var oldContent = hostMap.get(host) || emptyArray;
	        var newContent = asVNodeArray(content);
	        hostMap.set(host, newContent);
	        updateContent(host, oldContent, newContent);
	    }
	    Private.renderImpl = renderImpl;
	    /**
	     * A shared frozen empty array.
	     */
	    var emptyArray = Object.freeze([]);
	    /**
	     * A shared frozen empty object.
	     */
	    var emptyObject = Object.freeze({});
	    /**
	     * A weak mapping of host element to virtual DOM content.
	     */
	    var hostMap = new WeakMap();
	    /**
	     * Coerce content into a virtual node array.
	     *
	     * Null content will be coerced to an empty array.
	     */
	    function asVNodeArray(content) {
	        if (content instanceof Array) {
	            return content;
	        }
	        if (content) {
	            return [content];
	        }
	        return emptyArray;
	    }
	    /**
	     * Update a host element with the delta of the virtual content.
	     *
	     * This is the core "diff" algorithm. There is no explicit "patch"
	     * phase. The host is patched at each step as the diff progresses.
	     */
	    function updateContent(host, oldContent, newContent) {
	        // Bail early if the content is identical. This can occur when an
	        // node has no children or if the user is rendering cached content.
	        if (oldContent === newContent) {
	            return;
	        }
	        // Collect the old keyed elems into a mapping.
	        var oldKeyed = collectKeys(host, oldContent);
	        // Create a copy of the old content which can be modified in-place.
	        var oldCopy = oldContent.slice();
	        // Update the host with the new content. The diff always proceeds
	        // forward and never modifies a previously visited index. The old
	        // copy array is modified in-place to reflect the changes made to
	        // the host children. This causes the stale nodes to be pushed to
	        // the end of the host node and removed at the end of the loop.
	        var currNode = host.firstChild;
	        var newCount = newContent.length;
	        for (var i = 0; i < newCount; ++i) {
	            // If the old elems are exhausted, create a new node.
	            if (i >= oldCopy.length) {
	                host.appendChild(createDOMNode(newContent[i]));
	                continue;
	            }
	            // Cache a reference to the old and new elems.
	            var oldVNode = oldCopy[i];
	            var newVNode = newContent[i];
	            // If the new elem is keyed, move an old keyed elem to the proper
	            // location before proceeding with the diff. The search can start
	            // at the current index, since the unmatched old keyed elems are
	            // pushed forward in the old copy array.
	            var newKey = newVNode.attrs.key;
	            if (newKey && newKey in oldKeyed) {
	                var pair = oldKeyed[newKey];
	                if (pair.vNode !== oldVNode) {
	                    arrayMove(oldCopy, oldCopy.indexOf(pair.vNode), i);
	                    host.insertBefore(pair.element, currNode);
	                    oldVNode = pair.vNode;
	                    currNode = pair.element;
	                }
	            }
	            // If both elements are identical, there is nothing to do.
	            // This can occur when the user renders cached content.
	            if (oldVNode === newVNode) {
	                currNode = currNode.nextSibling;
	                continue;
	            }
	            // If the old elem is keyed and does not match the new elem key,
	            // create a new node. This is necessary since the old keyed elem
	            // may be matched at a later point in the diff.
	            var oldKey = oldVNode.attrs.key;
	            if (oldKey && oldKey !== newKey) {
	                arrayInsert(oldCopy, i, newVNode);
	                host.insertBefore(createDOMNode(newVNode), currNode);
	                continue;
	            }
	            // If the elements have different types, create a new node.
	            if (oldVNode.type !== newVNode.type) {
	                arrayInsert(oldCopy, i, newVNode);
	                host.insertBefore(createDOMNode(newVNode), currNode);
	                continue;
	            }
	            // If the element is a text node, update its text content.
	            if (newVNode.type === 'text') {
	                currNode.textContent = newVNode.tag;
	                currNode = currNode.nextSibling;
	                continue;
	            }
	            // At this point, the node is an 'element' type. If the tags
	            // are different, create a new node.
	            if (oldVNode.tag !== newVNode.tag) {
	                arrayInsert(oldCopy, i, newVNode);
	                host.insertBefore(createDOMNode(newVNode), currNode);
	                continue;
	            }
	            // The element tags match, update the element in place.
	            updateAttrs(currNode, oldVNode.attrs, newVNode.attrs);
	            updateContent(currNode, oldVNode.children, newVNode.children);
	            currNode = currNode.nextSibling;
	        }
	        // Dispose of the old nodes pushed to the end of the host.
	        for (var i = oldCopy.length - 1; i >= newCount; --i) {
	            host.removeChild(host.lastChild);
	        }
	    }
	    /**
	     * Add attributes to a newly created DOM node.
	     */
	    function addAttrs(node, attrs) {
	        // Set the known attributes defined in the attr table.
	        for (var name_1 in attrs) {
	            var mode = attrModeTable[name_1];
	            if (mode === 0 /* Property */ || mode === 2 /* Event */) {
	                node[name_1] = attrs[name_1];
	            }
	            else if (mode === 1 /* Attribute */) {
	                node.setAttribute(name_1.toLowerCase(), attrs[name_1]);
	            }
	        }
	        // Handle the dataset values.
	        var dataset = attrs.dataset;
	        if (dataset) {
	            for (var name_2 in dataset) {
	                node.setAttribute("data-" + name_2, dataset[name_2]);
	            }
	        }
	        // Handle the inline styles.
	        var styles = attrs.style;
	        if (styles) {
	            var nodeStyle = node.style;
	            for (var name_3 in styles) {
	                nodeStyle[name_3] = styles[name_3];
	            }
	        }
	    }
	    /**
	     * Update the node attributes with the delta of attribute objects.
	     */
	    function updateAttrs(node, oldAttrs, newAttrs) {
	        // Do nothing if the attrs are the same object.
	        if (oldAttrs === newAttrs) {
	            return;
	        }
	        // Remove attributes which no longer exist.
	        for (var name_4 in oldAttrs) {
	            if (!(name_4 in newAttrs)) {
	                var mode = attrModeTable[name_4];
	                if (mode === 0 /* Property */) {
	                    node.removeAttribute(name_4);
	                }
	                else if (mode === 1 /* Attribute */) {
	                    node.removeAttribute(name_4.toLowerCase());
	                }
	                else if (mode === 2 /* Event */) {
	                    node[name_4] = null;
	                }
	            }
	        }
	        // Add new attributes an update existing ones.
	        for (var name_5 in newAttrs) {
	            var value = newAttrs[name_5];
	            if (oldAttrs[name_5] !== value) {
	                var mode = attrModeTable[name_5];
	                if (mode === 0 /* Property */ || mode === 2 /* Event */) {
	                    node[name_5] = value;
	                }
	                else if (mode === 1 /* Attribute */) {
	                    node.setAttribute(name_5.toLowerCase(), value);
	                }
	            }
	        }
	        // Handle the dataset values.
	        var oldDataset = oldAttrs.dataset || emptyObject;
	        var newDataset = newAttrs.dataset || emptyObject;
	        if (oldDataset !== newDataset) {
	            for (var name_6 in oldDataset) {
	                if (!(name_6 in newDataset)) {
	                    node.removeAttribute('data-' + name_6);
	                }
	            }
	            for (var name_7 in newDataset) {
	                var value = newDataset[name_7];
	                if (oldDataset[name_7] !== value) {
	                    node.setAttribute('data-' + name_7, value);
	                }
	            }
	        }
	        // Handle the inline styles.
	        var oldStyle = oldAttrs.style || emptyObject;
	        var newStyle = newAttrs.style || emptyObject;
	        if (oldStyle !== newStyle) {
	            var nodeStyle = node.style;
	            for (var name_8 in oldStyle) {
	                if (!(name_8 in newStyle)) {
	                    nodeStyle[name_8] = '';
	                }
	            }
	            for (var name_9 in newStyle) {
	                var value = newStyle[name_9];
	                if (oldStyle[name_9] !== value) {
	                    nodeStyle[name_9] = value;
	                }
	            }
	        }
	    }
	    /**
	     * Collect a mapping of keyed elements for the host content.
	     */
	    function collectKeys(host, content) {
	        var node = host.firstChild;
	        var keyed = Object.create(null);
	        for (var i = 0, n = content.length; i < n; ++i) {
	            var vNode = content[i];
	            if (vNode.type === 'element') {
	                var key = vNode.attrs.key;
	                if (key)
	                    keyed[key] = { vNode: vNode, element: node };
	            }
	            node = node.nextSibling;
	        }
	        return keyed;
	    }
	    /**
	     * Create and return a new DOM node for a virtual element.
	     */
	    function createDOMNode(elem) {
	        var node;
	        if (elem.type === 'text') {
	            node = document.createTextNode(elem.tag);
	        }
	        else {
	            node = document.createElement(elem.tag);
	            addAttrs(node, elem.attrs);
	            addContent(node, elem.children);
	        }
	        return node;
	    }
	    /**
	     * Create and add child content to a newly created DOM node.
	     */
	    function addContent(node, content) {
	        for (var i = 0, n = content.length; i < n; ++i) {
	            node.appendChild(createDOMNode(content[i]));
	        }
	    }
	    /**
	     * A mapping of attribute name to attribute mode.
	     */
	    var attrModeTable = {
	        accept: 0 /* Property */,
	        acceptCharset: 0 /* Property */,
	        accessKey: 0 /* Property */,
	        action: 0 /* Property */,
	        allowFullscreen: 1 /* Attribute */,
	        alt: 0 /* Property */,
	        autocomplete: 0 /* Property */,
	        autofocus: 0 /* Property */,
	        autoplay: 0 /* Property */,
	        checked: 0 /* Property */,
	        cite: 0 /* Property */,
	        className: 0 /* Property */,
	        colSpan: 0 /* Property */,
	        cols: 0 /* Property */,
	        contentEditable: 0 /* Property */,
	        controls: 0 /* Property */,
	        coords: 0 /* Property */,
	        crossOrigin: 0 /* Property */,
	        data: 0 /* Property */,
	        dateTime: 0 /* Property */,
	        default: 0 /* Property */,
	        dir: 0 /* Property */,
	        dirName: 0 /* Property */,
	        disabled: 0 /* Property */,
	        download: 0 /* Property */,
	        draggable: 0 /* Property */,
	        enctype: 0 /* Property */,
	        form: 1 /* Attribute */,
	        formAction: 0 /* Property */,
	        formEnctype: 0 /* Property */,
	        formMethod: 0 /* Property */,
	        formNoValidate: 0 /* Property */,
	        formTarget: 0 /* Property */,
	        headers: 0 /* Property */,
	        height: 0 /* Property */,
	        hidden: 0 /* Property */,
	        high: 0 /* Property */,
	        href: 0 /* Property */,
	        hreflang: 0 /* Property */,
	        htmlFor: 0 /* Property */,
	        id: 0 /* Property */,
	        inputMode: 0 /* Property */,
	        isMap: 0 /* Property */,
	        kind: 0 /* Property */,
	        label: 0 /* Property */,
	        lang: 0 /* Property */,
	        list: 1 /* Attribute */,
	        loop: 0 /* Property */,
	        low: 0 /* Property */,
	        max: 0 /* Property */,
	        maxLength: 0 /* Property */,
	        media: 1 /* Attribute */,
	        mediaGroup: 0 /* Property */,
	        method: 0 /* Property */,
	        min: 0 /* Property */,
	        minLength: 0 /* Property */,
	        multiple: 0 /* Property */,
	        muted: 0 /* Property */,
	        name: 0 /* Property */,
	        noValidate: 0 /* Property */,
	        optimum: 0 /* Property */,
	        pattern: 0 /* Property */,
	        placeholder: 0 /* Property */,
	        poster: 0 /* Property */,
	        preload: 0 /* Property */,
	        readOnly: 0 /* Property */,
	        rel: 0 /* Property */,
	        required: 0 /* Property */,
	        reversed: 0 /* Property */,
	        rowSpan: 0 /* Property */,
	        rows: 0 /* Property */,
	        sandbox: 0 /* Property */,
	        scope: 0 /* Property */,
	        seamless: 1 /* Attribute */,
	        selected: 0 /* Property */,
	        shape: 0 /* Property */,
	        size: 0 /* Property */,
	        sizes: 1 /* Attribute */,
	        sorted: 0 /* Property */,
	        span: 0 /* Property */,
	        spellcheck: 0 /* Property */,
	        src: 0 /* Property */,
	        srcdoc: 0 /* Property */,
	        srclang: 0 /* Property */,
	        srcset: 1 /* Attribute */,
	        start: 0 /* Property */,
	        step: 0 /* Property */,
	        tabIndex: 0 /* Property */,
	        target: 0 /* Property */,
	        title: 0 /* Property */,
	        type: 0 /* Property */,
	        typeMustMatch: 0 /* Property */,
	        useMap: 0 /* Property */,
	        value: 0 /* Property */,
	        volume: 0 /* Property */,
	        width: 0 /* Property */,
	        wrap: 0 /* Property */,
	        onabort: 2 /* Event */,
	        onbeforecopy: 2 /* Event */,
	        onbeforecut: 2 /* Event */,
	        onbeforepaste: 2 /* Event */,
	        onblur: 2 /* Event */,
	        oncanplay: 2 /* Event */,
	        oncanplaythrough: 2 /* Event */,
	        onchange: 2 /* Event */,
	        onclick: 2 /* Event */,
	        oncontextmenu: 2 /* Event */,
	        oncopy: 2 /* Event */,
	        oncuechange: 2 /* Event */,
	        oncut: 2 /* Event */,
	        ondblclick: 2 /* Event */,
	        ondrag: 2 /* Event */,
	        ondragend: 2 /* Event */,
	        ondragenter: 2 /* Event */,
	        ondragleave: 2 /* Event */,
	        ondragover: 2 /* Event */,
	        ondragstart: 2 /* Event */,
	        ondrop: 2 /* Event */,
	        ondurationchange: 2 /* Event */,
	        onended: 2 /* Event */,
	        onemptied: 2 /* Event */,
	        onerror: 2 /* Event */,
	        onfocus: 2 /* Event */,
	        onhelp: 2 /* Event */,
	        oninput: 2 /* Event */,
	        onkeydown: 2 /* Event */,
	        onkeypress: 2 /* Event */,
	        onkeyup: 2 /* Event */,
	        onload: 2 /* Event */,
	        onloadeddata: 2 /* Event */,
	        onloadedmetadata: 2 /* Event */,
	        onloadstart: 2 /* Event */,
	        onmousedown: 2 /* Event */,
	        onmouseenter: 2 /* Event */,
	        onmouseleave: 2 /* Event */,
	        onmousemove: 2 /* Event */,
	        onmouseout: 2 /* Event */,
	        onmouseover: 2 /* Event */,
	        onmouseup: 2 /* Event */,
	        onmousewheel: 2 /* Event */,
	        onpaste: 2 /* Event */,
	        onpause: 2 /* Event */,
	        onplay: 2 /* Event */,
	        onplaying: 2 /* Event */,
	        onprogress: 2 /* Event */,
	        onratechange: 2 /* Event */,
	        onreadystatechange: 2 /* Event */,
	        onreset: 2 /* Event */,
	        onscroll: 2 /* Event */,
	        onseeked: 2 /* Event */,
	        onseeking: 2 /* Event */,
	        onselect: 2 /* Event */,
	        onselectstart: 2 /* Event */,
	        onstalled: 2 /* Event */,
	        onsubmit: 2 /* Event */,
	        onsuspend: 2 /* Event */,
	        ontimeupdate: 2 /* Event */,
	        onvolumechange: 2 /* Event */,
	        onwaiting: 2 /* Event */
	    };
	    /**
	     * Insert an element into an array at a specified index.
	     */
	    function arrayInsert(array, i, value) {
	        for (var k = array.length; k > i; --k) {
	            array[k] = array[k - 1];
	        }
	        array[i] = value;
	    }
	    /**
	     * Move an element in an array from one index to another.
	     */
	    function arrayMove(array, i, j) {
	        if (i === j) {
	            return;
	        }
	        var value = array[i];
	        var d = i < j ? 1 : -1;
	        for (var k = i; k !== j; k += d) {
	            array[k] = array[k + d];
	        }
	        array[j] = value;
	    }
	})(Private || (Private = {}));
	
})
/** END DEFINE BLOCK for phosphor@0.7.0/lib/ui/vdom.js **/


/** START DEFINE BLOCK for phosphor@0.7.0/lib/collections/vector.js **/
jupyter.define('phosphor@0.7.0/lib/collections/vector.js', function (module, exports, __jupyter_require__) {
	"use strict";
	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2016, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	var iteration_1 = __jupyter_require__('phosphor@0.7.0/lib/algorithm/iteration.js');
	/**
	 * A generic vector data structure.
	 */
	var Vector = (function () {
	    /**
	     * Construct a new vector.
	     *
	     * @param values - The initial values for the vector.
	     */
	    function Vector(values) {
	        var _this = this;
	        this._array = [];
	        if (values)
	            iteration_1.each(values, function (value) { _this.pushBack(value); });
	    }
	    Object.defineProperty(Vector.prototype, "isEmpty", {
	        /**
	         * Test whether the vector is empty.
	         *
	         * @returns `true` if the vector is empty, `false` otherwise.
	         *
	         * #### Notes
	         * This is a read-only property.
	         *
	         * #### Complexity
	         * Constant.
	         *
	         * #### Iterator Validity
	         * No changes.
	         */
	        get: function () {
	            return this._array.length === 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector.prototype, "length", {
	        /**
	         * Get the length of the vector.
	         *
	         * @return The number of values in the vector.
	         *
	         * #### Notes
	         * This is a read-only property.
	         *
	         * #### Complexity
	         * Constant.
	         *
	         * #### Iterator Validity
	         * No changes.
	         */
	        get: function () {
	            return this._array.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector.prototype, "front", {
	        /**
	         * Get the value at the front of the vector.
	         *
	         * @returns The value at the front of the vector, or `undefined` if
	         *   the vector is empty.
	         *
	         * #### Notes
	         * This is a read-only property.
	         *
	         * #### Complexity
	         * Constant.
	         *
	         * #### Iterator Validity
	         * No changes.
	         */
	        get: function () {
	            return this._array[0];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector.prototype, "back", {
	        /**
	         * Get the value at the back of the vector.
	         *
	         * @returns The value at the back of the vector, or `undefined` if
	         *   the vector is empty.
	         *
	         * #### Notes
	         * This is a read-only property.
	         *
	         * #### Complexity
	         * Constant.
	         *
	         * #### Iterator Validity
	         * No changes.
	         */
	        get: function () {
	            return this._array[this._array.length - 1];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Create an iterator over the values in the vector.
	     *
	     * @returns A new iterator starting at the front of the vector.
	     *
	     * #### Complexity
	     * Constant.
	     *
	     * #### Iterator Validity
	     * No changes.
	     */
	    Vector.prototype.iter = function () {
	        return new iteration_1.ArrayIterator(this._array, 0);
	    };
	    /**
	     * Get the value at the specified index.
	     *
	     * @param index - The positive integer index of interest.
	     *
	     * @returns The value at the specified index.
	     *
	     * #### Complexity
	     * Constant.
	     *
	     * #### Iterator Validity
	     * No changes.
	     *
	     * #### Undefined Behavior
	     * An `index` which is non-integral or out of range.
	     */
	    Vector.prototype.at = function (index) {
	        return this._array[index];
	    };
	    /**
	     * Set the value at the specified index.
	     *
	     * @param index - The positive integer index of interest.
	     *
	     * @param value - The value to set at the specified index.
	     *
	     * #### Complexity
	     * Constant.
	     *
	     * #### Iterator Validity
	     * No changes.
	     *
	     * #### Undefined Behavior
	     * An `index` which is non-integral or out of range.
	     */
	    Vector.prototype.set = function (index, value) {
	        this._array[index] = value;
	    };
	    /**
	     * Add a value to the back of the vector.
	     *
	     * @param value - The value to add to the back of the vector.
	     *
	     * @returns The new length of the vector.
	     *
	     * #### Complexity
	     * Constant.
	     *
	     * #### Iterator Validity
	     * No changes.
	     */
	    Vector.prototype.pushBack = function (value) {
	        return this._array.push(value);
	    };
	    /**
	     * Remove and return the value at the back of the vector.
	     *
	     * @returns The value at the back of the vector, or `undefined` if
	     *   the vector is empty.
	     *
	     * #### Complexity
	     * Constant.
	     *
	     * #### Iterator Validity
	     * Iterators pointing at the removed value are invalidated.
	     */
	    Vector.prototype.popBack = function () {
	        return this._array.pop();
	    };
	    /**
	     * Insert a value into the vector at a specific index.
	     *
	     * @param index - The index at which to insert the value.
	     *
	     * @param value - The value to set at the specified index.
	     *
	     * @returns The new length of the vector.
	     *
	     * #### Complexity
	     * Linear.
	     *
	     * #### Iterator Validity
	     * No changes.
	     *
	     * #### Notes
	     * The `index` will be clamped to the bounds of the vector.
	     *
	     * #### Undefined Behavior
	     * An `index` which is non-integral.
	     */
	    Vector.prototype.insert = function (index, value) {
	        var array = this._array;
	        var n = array.length;
	        index = Math.max(0, Math.min(index, n));
	        for (var i = n; i > index; --i) {
	            array[i] = array[i - 1];
	        }
	        array[index] = value;
	        return n + 1;
	    };
	    /**
	     * Remove the first occurrence of a value from the vector.
	     *
	     * @param value - The value of interest.
	     *
	     * @returns The index of the removed value, or `-1` if the value
	     *   is not contained in the vector.
	     *
	     * #### Complexity
	     * Linear.
	     *
	     * #### Iterator Validity
	     * Iterators pointing at the removed value and beyond are invalidated.
	     *
	     * #### Notes
	     * Comparison is performed using strict `===` equality.
	     */
	    Vector.prototype.remove = function (value) {
	        var index = this._array.indexOf(value);
	        if (index !== -1)
	            this.removeAt(index);
	        return index;
	    };
	    /**
	     * Remove and return the value at a specific index.
	     *
	     * @param index - The index of the value of interest.
	     *
	     * @returns The value at the specified index, or `undefined` if the
	     *   index is out of range.
	     *
	     * #### Complexity
	     * Constant.
	     *
	     * #### Iterator Validity
	     * Iterators pointing at the removed value and beyond are invalidated.
	     *
	     * #### Undefined Behavior
	     * An `index` which is non-integral.
	     */
	    Vector.prototype.removeAt = function (index) {
	        var array = this._array;
	        var n = array.length;
	        if (index < 0 || index >= n) {
	            return void 0;
	        }
	        var value = array[index];
	        for (var i = index + 1; i < n; ++i) {
	            array[i - 1] = array[i];
	        }
	        array.length = n - 1;
	        return value;
	    };
	    /**
	     * Remove all values from the vector.
	     *
	     * #### Complexity
	     * Linear.
	     *
	     * #### Iterator Validity
	     * All current iterators are invalidated.
	     */
	    Vector.prototype.clear = function () {
	        this._array.length = 0;
	    };
	    /**
	     * Swap the contents of the vector with the contents of another.
	     *
	     * @param other - The other vector holding the contents to swap.
	     *
	     * #### Complexity
	     * Constant.
	     *
	     * #### Iterator Validity
	     * All current iterators remain valid, but will now point to the
	     * contents of the other vector involved in the swap.
	     */
	    Vector.prototype.swap = function (other) {
	        var array = other._array;
	        other._array = this._array;
	        this._array = array;
	    };
	    return Vector;
	}());
	exports.Vector = Vector;
	
})
/** END DEFINE BLOCK for phosphor@0.7.0/lib/collections/vector.js **/


/** START DEFINE BLOCK for jupyterlab@0.10.0/lib/common/vdom.js **/
jupyter.define('jupyterlab@0.10.0/lib/common/vdom.js', function (module, exports, __jupyter_require__) {
	// Copyright (c) Jupyter Development Team.
	// Distributed under the terms of the Modified BSD License.
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var signaling_1 = __jupyter_require__('phosphor@^0.7.0/lib/core/signaling.js');
	var widget_1 = __jupyter_require__('phosphor@^0.7.0/lib/ui/widget.js');
	var vdom_1 = __jupyter_require__('phosphor@^0.7.0/lib/ui/vdom.js');
	/**
	 * Concrete implementation of IVDomModel.
	 */
	var VDomModel = (function () {
	    function VDomModel() {
	        this._isDisposed = false;
	    }
	    /**
	     * Dispose the model.
	     */
	    VDomModel.prototype.dispose = function () {
	        if (this.isDisposed) {
	            return;
	        }
	        this._isDisposed = true;
	        signaling_1.clearSignalData(this);
	    };
	    Object.defineProperty(VDomModel.prototype, "isDisposed", {
	        /**
	         * Test whether the model is disposed.
	         */
	        get: function () {
	            return this._isDisposed;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return VDomModel;
	}());
	exports.VDomModel = VDomModel;
	// Define the signals for the VDomModel class.
	signaling_1.defineSignal(VDomModel.prototype, 'stateChanged');
	/**
	 * Phosphor widget that encodes best practices for VDOM based rendering.
	 */
	var VDomWidget = (function (_super) {
	    __extends(VDomWidget, _super);
	    function VDomWidget() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(VDomWidget.prototype, "model", {
	        /**
	         * Get the current model.
	         */
	        get: function () {
	            return this._model;
	        },
	        /**
	         * Set the model and fire changed signals.
	         */
	        set: function (newValue) {
	            newValue = newValue || null;
	            if (this._model === newValue) {
	                return;
	            }
	            if (this._model) {
	                this._model.stateChanged.disconnect(this.update, this);
	            }
	            this._model = newValue;
	            this._model.stateChanged.connect(this.update, this);
	            this.update();
	            this.modelChanged.emit(void 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(VDomWidget.prototype, "isDisposed", {
	        /**
	         * Test whether the widget is disposed.
	         */
	        get: function () {
	            return this._model === null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Dispose this widget.
	     */
	    VDomWidget.prototype.dispose = function () {
	        if (this.isDisposed) {
	            return;
	        }
	        this._model = null;
	        _super.prototype.dispose.call(this);
	    };
	    /**
	     * Called to update the state of the widget.
	     *
	     * The default implementation of this method triggers
	     * VDOM based rendering by calling the this.render() method.
	     */
	    VDomWidget.prototype.onUpdateRequest = function (msg) {
	        var vnode = this.render();
	        vdom_1.render(vnode, this.node);
	    };
	    return VDomWidget;
	}(widget_1.Widget));
	exports.VDomWidget = VDomWidget;
	// Define the signal for the VDomWidget class.
	signaling_1.defineSignal(VDomWidget.prototype, 'modelChanged');
	//# sourceMappingURL=vdom.js.map
})
/** END DEFINE BLOCK for jupyterlab@0.10.0/lib/common/vdom.js **/


/** START DEFINE BLOCK for phosphor@0.7.0/lib/core/signaling.js **/
jupyter.define('phosphor@0.7.0/lib/core/signaling.js', function (module, exports, __jupyter_require__) {
	/* WEBPACK VAR INJECTION */(function(setImmediate) {/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2016, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	"use strict";
	/**
	 * Define a signal property on a prototype object.
	 *
	 * @param target - The prototype for the class of interest.
	 *
	 * @param name - The name of the signal property.
	 *
	 * #### Notes
	 * The defined signal property is read-only.
	 *
	 * #### Example
	 * ```typescript
	 * class SomeClass {
	 *   valueChanged: ISignal<SomeClass, number>;
	 * }
	 *
	 * defineSignal(SomeClass.prototype, 'valueChanged');
	 */
	function defineSignal(target, name) {
	    var token = Object.freeze({});
	    Object.defineProperty(target, name, {
	        get: function () { return new Signal(this, token); }
	    });
	}
	exports.defineSignal = defineSignal;
	/**
	 * Remove all connections where the given object is the sender.
	 *
	 * @param sender - The sender object of interest.
	 *
	 * #### Example
	 * ```typescript
	 * disconnectSender(someObject);
	 * ```
	 */
	function disconnectSender(sender) {
	    // If there are no receivers, there is nothing to do.
	    var receiverList = senderData.get(sender);
	    if (receiverList === void 0) {
	        return;
	    }
	    // Clear the connections and schedule a cleanup of the
	    // receiver's corresponding list of sender connections.
	    for (var i = 0, n = receiverList.length; i < n; ++i) {
	        var conn = receiverList[i];
	        var senderList = receiverData.get(conn.thisArg || conn.slot);
	        scheduleCleanup(senderList);
	        conn.token = null;
	    }
	    // Schedule a cleanup of the receiver list.
	    scheduleCleanup(receiverList);
	}
	exports.disconnectSender = disconnectSender;
	/**
	 * Remove all connections where the given object is the receiver.
	 *
	 * @param receiver - The receiver object of interest.
	 *
	 * #### Notes
	 * If a `thisArg` is provided when connecting a signal, that object
	 * is considered the receiver. Otherwise, the `callback` is used as
	 * the receiver.
	 *
	 * #### Example
	 * ```typescript
	 * // disconnect a regular object receiver
	 * disconnectReceiver(myObject);
	 *
	 * // disconnect a plain callback receiver
	 * disconnectReceiver(myCallback);
	 * ```
	 */
	function disconnectReceiver(receiver) {
	    // If there are no senders, there is nothing to do.
	    var senderList = receiverData.get(receiver);
	    if (senderList === void 0) {
	        return;
	    }
	    // Clear the connections and schedule a cleanup of the
	    // senders's corresponding list of receiver connections.
	    for (var i = 0, n = senderList.length; i < n; ++i) {
	        var conn = senderList[i];
	        var receiverList = senderData.get(conn.sender);
	        scheduleCleanup(receiverList);
	        conn.token = null;
	    }
	    // Schedule a cleanup of the sender list.
	    scheduleCleanup(senderList);
	}
	exports.disconnectReceiver = disconnectReceiver;
	/**
	 * Clear all signal data associated with the given object.
	 *
	 * @param obj - The object for which the signal data should be cleared.
	 *
	 * #### Notes
	 * This removes all signal connections where the object is used as
	 * either the sender or the receiver.
	 *
	 * #### Example
	 * ```typescript
	 * clearSignalData(someObject);
	 * ```
	 */
	function clearSignalData(obj) {
	    disconnectSender(obj);
	    disconnectReceiver(obj);
	}
	exports.clearSignalData = clearSignalData;
	/**
	 * A concrete implementation of `ISignal`.
	 */
	var Signal = (function () {
	    /**
	     * Construct a new signal.
	     *
	     * @param sender - The object which owns the signal.
	     *
	     * @param token - The unique token identifying the signal.
	     */
	    function Signal(sender, token) {
	        this._sender = sender;
	        this._token = token;
	    }
	    /**
	     * Connect a slot to the signal.
	     *
	     * @param slot - The slot to invoke when the signal is emitted.
	     *
	     * @param thisArg - The `this` context for the slot. If provided,
	     *   this must be a non-primitive object.
	     *
	     * @returns `true` if the connection succeeds, `false` otherwise.
	     */
	    Signal.prototype.connect = function (slot, thisArg) {
	        return connect(this._sender, this._token, slot, thisArg);
	    };
	    /**
	     * Disconnect a slot from the signal.
	     *
	     * @param slot - The slot to disconnect from the signal.
	     *
	     * @param thisArg - The `this` context for the slot. If provided,
	     *   this must be a non-primitive object.
	     *
	     * @returns `true` if the connection is removed, `false` otherwise.
	     */
	    Signal.prototype.disconnect = function (slot, thisArg) {
	        return disconnect(this._sender, this._token, slot, thisArg);
	    };
	    /**
	     * Emit the signal and invoke the connected slots.
	     *
	     * @param args - The args to pass to the connected slots.
	     */
	    Signal.prototype.emit = function (args) {
	        emit(this._sender, this._token, args);
	    };
	    return Signal;
	}());
	/**
	 * A weak mapping of sender to list of receiver connections.
	 */
	var senderData = new WeakMap();
	/**
	 * A weak mapping of receiver to list of sender connections.
	 */
	var receiverData = new WeakMap();
	/**
	 * A set of connection lists which are pending cleanup.
	 */
	var dirtySet = new Set();
	/**
	 * A local reference to an event loop callback.
	 */
	var defer = (function () {
	    var ok = typeof requestAnimationFrame === 'function';
	    return ok ? requestAnimationFrame : setImmediate;
	})();
	/**
	 * Connect a slot to a signal.
	 *
	 * @param sender - The object emitting the signal.
	 *
	 * @param token - The unique token for the signal.
	 *
	 * @param slot - The slot to connect to the signal.
	 *
	 * @param thisArg - The `this` context for the slot.
	 *
	 * @returns `true` if the connection succeeds, `false` otherwise.
	 *
	 * #### Notes
	 * Signal connections are unique. If a connection already exists for
	 * the given `slot` and `thisArg`, this function returns `false`.
	 *
	 * A newly connected slot will not be invoked until the next time the
	 * signal is emitted, even if the slot is connected while the signal
	 * is dispatching.
	 */
	function connect(sender, token, slot, thisArg) {
	    // Coerce a `null` thisArg to `undefined`.
	    thisArg = thisArg || void 0;
	    // Ensure the sender's receiver list is created.
	    var receiverList = senderData.get(sender);
	    if (receiverList === void 0) {
	        receiverList = [];
	        senderData.set(sender, receiverList);
	    }
	    // Bail if a matching connection already exists.
	    if (findConnection(receiverList, token, slot, thisArg) !== null) {
	        return false;
	    }
	    // Ensure the receiver's sender list is created.
	    var receiver = thisArg || slot;
	    var senderList = receiverData.get(receiver);
	    if (senderList === void 0) {
	        senderList = [];
	        receiverData.set(receiver, senderList);
	    }
	    // Create a new connection and add it to the end of each list.
	    var connection = { sender: sender, token: token, slot: slot, thisArg: thisArg };
	    receiverList.push(connection);
	    senderList.push(connection);
	    // Indicate a successful connection.
	    return true;
	}
	/**
	 * Disconnect a slot from a signal.
	 *
	 * @param sender - The object emitting the signal.
	 *
	 * @param token - The unique token for the signal.
	 *
	 * @param slot - The slot to disconnect from the signal.
	 *
	 * @param thisArg - The `this` context for the slot.
	 *
	 * @returns `true` if the connection is removed, `false` otherwise.
	 *
	 * #### Notes
	 * If no connection exists for the given `slot` and `thisArg`, this
	 * function returns `false`.
	 *
	 * A disconnected slot will no longer be invoked, even if the slot
	 * is disconnected while the signal is dispatching.
	 */
	function disconnect(sender, token, slot, thisArg) {
	    // Coerce a `null` thisArg to `undefined`.
	    thisArg = thisArg || void 0;
	    // Lookup the list of receivers, and bail if none exist.
	    var receiverList = senderData.get(sender);
	    if (receiverList === void 0) {
	        return false;
	    }
	    // Bail if no matching connection exits.
	    var conn = findConnection(receiverList, token, slot, thisArg);
	    if (conn === null) {
	        return false;
	    }
	    // Lookup the list of senders, which is now known to exist.
	    var senderList = receiverData.get(thisArg || slot);
	    // Clear the connection and schedule list cleanup.
	    conn.token = null;
	    scheduleCleanup(receiverList);
	    scheduleCleanup(senderList);
	    // Indicate a successful disconnection.
	    return true;
	}
	/**
	 * Emit a signal and invoke the connected slots.
	 *
	 * @param sender - The object emitting the signal.
	 *
	 * @param token - The unique token for the signal.
	 *
	 * @param args - The args to pass to the connected slots.
	 *
	 * #### Notes
	 * Connected slots are invoked synchronously, in the order in which
	 * they are connected.
	 *
	 * Exceptions thrown by connected slots will be caught and logged.
	 */
	function emit(sender, token, args) {
	    // If there are no receivers, there is nothing to do.
	    var receiverList = senderData.get(sender);
	    if (receiverList === void 0) {
	        return;
	    }
	    // Invoke the connections which match the given token.
	    for (var i = 0, n = receiverList.length; i < n; ++i) {
	        var conn = receiverList[i];
	        if (conn.token === token) {
	            invokeSlot(conn, args);
	        }
	    }
	}
	/**
	 * Safely invoke a non-empty connection.
	 *
	 * @param conn - The connection of interest
	 *
	 * @param args - The arguments to pass to the slot.
	 *
	 * #### Notes
	 * Any exception thrown by the slot will be caught and logged.
	 */
	function invokeSlot(conn, args) {
	    try {
	        conn.slot.call(conn.thisArg, conn.sender, args);
	    }
	    catch (err) {
	        console.error(err);
	    }
	}
	/**
	 * Find a connection which matches the given parameters.
	 *
	 * @param list - The list of connections to search.
	 *
	 * @param token - The unique token for the signal.
	 *
	 * @param slot - The slot of interest.
	 *
	 * @param thisArg - The `this` context for the slot.
	 *
	 * @returns The first connection which matches the supplied parameters,
	 *   or null if no matching connection is found.
	 */
	function findConnection(list, token, slot, thisArg) {
	    for (var i = 0, n = list.length; i < n; ++i) {
	        var conn = list[i];
	        if (conn.token === token &&
	            conn.slot === slot &&
	            conn.thisArg === thisArg) {
	            return conn;
	        }
	    }
	    return null;
	}
	/**
	 * Schedule a cleanup of a connection list.
	 *
	 * @param list - The list of connections to cleanup.
	 *
	 * #### Notes
	 * This will add the list to the dirty set and schedule a deferred
	 * cleanup of the list contents. On cleanup, any connection with a
	 * null token will be removed from the array.
	 */
	function scheduleCleanup(list) {
	    if (dirtySet.size === 0) {
	        defer(cleanupDirtySet);
	    }
	    dirtySet.add(list);
	}
	/**
	 * Cleanup the connection lists in the dirty set.
	 *
	 * #### Notes
	 * This function should only be invoked asynchronously, when the stack
	 * frame is guaranteed to not be on the path of a signal dispatch.
	 */
	function cleanupDirtySet() {
	    dirtySet.forEach(cleanupList);
	    dirtySet.clear();
	}
	/**
	 * Cleanup the dirty connections in a connection list.
	 *
	 * @param list - The list of connection to cleanup.
	 *
	 * #### Notes
	 * This will remove any connection with a null token from the list,
	 * while retaining the relative order of the other connections.
	 *
	 * This function should only be invoked asynchronously, when the stack
	 * frame is guaranteed to not be on the path of a signal dispatch.
	 */
	function cleanupList(list) {
	    var count = 0;
	    for (var i = 0, n = list.length; i < n; ++i) {
	        var conn = list[i];
	        if (conn.token === null) {
	            count++;
	        }
	        else {
	            list[i - count] = conn;
	        }
	    }
	    list.length -= count;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __jupyter_require__('timers-browserify@1.4.2/main.js').setImmediate))
})
/** END DEFINE BLOCK for phosphor@0.7.0/lib/core/signaling.js **/


/** START DEFINE BLOCK for timers-browserify@1.4.2/main.js **/
jupyter.define('timers-browserify@1.4.2/main.js', function (module, exports, __jupyter_require__) {
	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __jupyter_require__('process@~0.11.0/browser.js').nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __jupyter_require__('timers-browserify@1.4.2/main.js').setImmediate, __jupyter_require__('timers-browserify@1.4.2/main.js').clearImmediate))
})
/** END DEFINE BLOCK for timers-browserify@1.4.2/main.js **/


/** START DEFINE BLOCK for process@0.11.9/browser.js **/
jupyter.define('process@0.11.9/browser.js', function (module, exports, __jupyter_require__) {
	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };
	
})
/** END DEFINE BLOCK for process@0.11.9/browser.js **/


/** START DEFINE BLOCK for phosphor@0.7.0/lib/ui/widget.js **/
jupyter.define('phosphor@0.7.0/lib/ui/widget.js', function (module, exports, __jupyter_require__) {
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2016, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	var iteration_1 = __jupyter_require__('phosphor@0.7.0/lib/algorithm/iteration.js');
	var messaging_1 = __jupyter_require__('phosphor@0.7.0/lib/core/messaging.js');
	var properties_1 = __jupyter_require__('phosphor@0.7.0/lib/core/properties.js');
	var signaling_1 = __jupyter_require__('phosphor@0.7.0/lib/core/signaling.js');
	var title_1 = __jupyter_require__('phosphor@0.7.0/lib/ui/title.js');
	/**
	 * The class name added to Widget instances.
	 */
	var WIDGET_CLASS = 'p-Widget';
	/**
	 * The class name added to hidden widgets.
	 */
	var HIDDEN_CLASS = 'p-mod-hidden';
	/**
	 * The base class of the Phosphor widget hierarchy.
	 *
	 * #### Notes
	 * This class will typically be subclassed in order to create a useful
	 * widget. However, it can be used directly to host externally created
	 * content.
	 */
	var Widget = (function () {
	    /**
	     * Construct a new widget.
	     *
	     * @param options - The options for initializing the widget.
	     */
	    function Widget(options) {
	        if (options === void 0) { options = {}; }
	        this._flags = 0;
	        this._layout = null;
	        this._parent = null;
	        this._node = Private.createNode(options);
	        this.addClass(WIDGET_CLASS);
	    }
	    /**
	     * Dispose of the widget and its descendant widgets.
	     *
	     * #### Notes
	     * It is unsafe to use the widget after it has been disposed.
	     *
	     * All calls made to this method after the first are a no-op.
	     */
	    Widget.prototype.dispose = function () {
	        // Do nothing if the widget is already disposed.
	        if (this.isDisposed) {
	            return;
	        }
	        // Set the disposed flag and emit the disposed signal.
	        this.setFlag(WidgetFlag.IsDisposed);
	        this.disposed.emit(void 0);
	        // Remove or detach the widget if necessary.
	        if (this.parent) {
	            this.parent = null;
	        }
	        else if (this.isAttached) {
	            Widget.detach(this);
	        }
	        // Dispose of the widget layout.
	        if (this._layout) {
	            this._layout.dispose();
	            this._layout = null;
	        }
	        // Clear the attached data associated with the widget.
	        signaling_1.clearSignalData(this);
	        messaging_1.clearMessageData(this);
	        properties_1.clearPropertyData(this);
	        // Clear the reference to the DOM node.
	        this._node = null;
	    };
	    Object.defineProperty(Widget.prototype, "isDisposed", {
	        /**
	         * Test whether the widget has been disposed.
	         *
	         * #### Notes
	         * This is a read-only property.
	         */
	        get: function () {
	            return this.testFlag(WidgetFlag.IsDisposed);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Widget.prototype, "isAttached", {
	        /**
	         * Test whether the widget's node is attached to the DOM.
	         *
	         * #### Notes
	         * This is a read-only property.
	         */
	        get: function () {
	            return this.testFlag(WidgetFlag.IsAttached);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Widget.prototype, "isHidden", {
	        /**
	         * Test whether the widget is explicitly hidden.
	         *
	         * #### Notes
	         * This is a read-only property.
	         */
	        get: function () {
	            return this.testFlag(WidgetFlag.IsHidden);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Widget.prototype, "isVisible", {
	        /**
	         * Test whether the widget is visible.
	         *
	         * #### Notes
	         * A widget is visible when it is attached to the DOM, is not
	         * explicitly hidden, and has no explicitly hidden ancestors.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return this.testFlag(WidgetFlag.IsVisible);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Widget.prototype, "node", {
	        /**
	         * Get the DOM node owned by the widget.
	         *
	         * #### Notes
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._node;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Widget.prototype, "id", {
	        /**
	         * Get the id of the widget's DOM node.
	         */
	        get: function () {
	            return this._node.id;
	        },
	        /**
	         * Set the id of the widget's DOM node.
	         */
	        set: function (value) {
	            this._node.id = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Widget.prototype, "title", {
	        /**
	         * Get the title object for the widget.
	         *
	         * #### Notes
	         * The title object is used by some container widgets when displaying
	         * the widget alongside some title, such as a tab panel or side bar.
	         *
	         * Since not all widgets will use the title, it is created on demand.
	         *
	         * The `owner` property of the title is set to this widget.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return Private.titleProperty.get(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Widget.prototype, "parent", {
	        /**
	         * Get the parent of the widget.
	         *
	         * #### Notes
	         * This will be `null` if the widget does not have a parent.
	         */
	        get: function () {
	            return this._parent;
	        },
	        /**
	         * Set the parent of the widget.
	         *
	         * #### Notes
	         * Children are typically added to a widget by using a layout, which
	         * means user code will not normally set the parent widget directly.
	         *
	         * The widget will be automatically removed from its old parent.
	         *
	         * This is a no-op if there is no effective parent change.
	         */
	        set: function (value) {
	            value = value || null;
	            if (this._parent === value) {
	                return;
	            }
	            if (value && this.contains(value)) {
	                throw new Error('Invalid parent widget.');
	            }
	            if (this._parent && !this._parent.isDisposed) {
	                messaging_1.sendMessage(this._parent, new ChildMessage('child-removed', this));
	            }
	            this._parent = value;
	            if (this._parent && !this._parent.isDisposed) {
	                messaging_1.sendMessage(this._parent, new ChildMessage('child-added', this));
	            }
	            messaging_1.sendMessage(this, WidgetMessage.ParentChanged);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Widget.prototype, "layout", {
	        /**
	         * Get the layout for the widget.
	         *
	         * #### Notes
	         * This will be `null` if the widget does not have a layout.
	         */
	        get: function () {
	            return this._layout;
	        },
	        /**
	         * Set the layout for the widget.
	         *
	         * #### Notes
	         * The layout is single-use only. It cannot be set to `null` and it
	         * cannot be changed after the first assignment.
	         *
	         * The layout is disposed automatically when the widget is disposed.
	         */
	        set: function (value) {
	            value = value || null;
	            if (this._layout === value) {
	                return;
	            }
	            if (this.testFlag(WidgetFlag.DisallowLayout)) {
	                throw new Error('Cannot set widget layout.');
	            }
	            if (this._layout) {
	                throw new Error('Cannot change widget layout.');
	            }
	            if (value.parent) {
	                throw new Error('Cannot change layout parent.');
	            }
	            this._layout = value;
	            value.parent = this;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Create an iterator over the widget's children.
	     *
	     * @returns A new iterator over the children of the widget.
	     *
	     * #### Notes
	     * The widget must have a populated layout in order to have children.
	     *
	     * If a layout is not installed, the returned iterator will be empty.
	     */
	    Widget.prototype.children = function () {
	        return this._layout ? this._layout.iter() : iteration_1.empty();
	    };
	    /**
	     * Test whether a widget is a descendant of this widget.
	     *
	     * @param widget - The descendant widget of interest.
	     *
	     * @returns `true` if the widget is a descendant, `false` otherwise.
	     */
	    Widget.prototype.contains = function (widget) {
	        for (; widget; widget = widget._parent) {
	            if (widget === this)
	                return true;
	        }
	        return false;
	    };
	    /**
	     * Test whether the widget's DOM node has the given class name.
	     *
	     * @param name - The class name of interest.
	     *
	     * @returns `true` if the node has the class, `false` otherwise.
	     */
	    Widget.prototype.hasClass = function (name) {
	        return this._node.classList.contains(name);
	    };
	    /**
	     * Add a class name to the widget's DOM node.
	     *
	     * @param name - The class name to add to the node.
	     *
	     * #### Notes
	     * If the class name is already added to the node, this is a no-op.
	     *
	     * The class name must not contain whitespace.
	     */
	    Widget.prototype.addClass = function (name) {
	        this._node.classList.add(name);
	    };
	    /**
	     * Remove a class name from the widget's DOM node.
	     *
	     * @param name - The class name to remove from the node.
	     *
	     * #### Notes
	     * If the class name is not yet added to the node, this is a no-op.
	     *
	     * The class name must not contain whitespace.
	     */
	    Widget.prototype.removeClass = function (name) {
	        this._node.classList.remove(name);
	    };
	    /**
	     * Toggle a class name on the widget's DOM node.
	     *
	     * @param name - The class name to toggle on the node.
	     *
	     * @param force - Whether to force add the class (`true`) or force
	     *   remove the class (`false`). If not provided, the presence of
	     *   the class will be toggled from its current state.
	     *
	     * @returns `true` if the class is now present, `false` otherwise.
	     *
	     * #### Notes
	     * The class name must not contain whitespace.
	     */
	    Widget.prototype.toggleClass = function (name, force) {
	        if (force === true) {
	            this._node.classList.add(name);
	            return true;
	        }
	        if (force === false) {
	            this._node.classList.remove(name);
	            return false;
	        }
	        return this._node.classList.toggle(name);
	    };
	    /**
	     * Post an `'update-request'` message to the widget.
	     *
	     * #### Notes
	     * This is a simple convenience method for posting the message.
	     */
	    Widget.prototype.update = function () {
	        messaging_1.postMessage(this, WidgetMessage.UpdateRequest);
	    };
	    /**
	     * Post a `'fit-request'` message to the widget.
	     *
	     * #### Notes
	     * This is a simple convenience method for posting the message.
	     */
	    Widget.prototype.fit = function () {
	        messaging_1.postMessage(this, WidgetMessage.FitRequest);
	    };
	    /**
	     * Post an `'activate-request'` message to the widget.
	     *
	     * #### Notes
	     * This is a simple convenience method for posting the message.
	     */
	    Widget.prototype.activate = function () {
	        messaging_1.postMessage(this, WidgetMessage.ActivateRequest);
	    };
	    /**
	     * Send a `'close-request'` message to the widget.
	     *
	     * #### Notes
	     * This is a simple convenience method for sending the message.
	     */
	    Widget.prototype.close = function () {
	        messaging_1.sendMessage(this, WidgetMessage.CloseRequest);
	    };
	    /**
	     * Show the widget and make it visible to its parent widget.
	     *
	     * #### Notes
	     * This causes the [[isHidden]] property to be `false`.
	     *
	     * If the widget is not explicitly hidden, this is a no-op.
	     */
	    Widget.prototype.show = function () {
	        if (!this.testFlag(WidgetFlag.IsHidden)) {
	            return;
	        }
	        this.clearFlag(WidgetFlag.IsHidden);
	        this.removeClass(HIDDEN_CLASS);
	        if (this.isAttached && (!this.parent || this.parent.isVisible)) {
	            messaging_1.sendMessage(this, WidgetMessage.AfterShow);
	        }
	        if (this.parent) {
	            messaging_1.sendMessage(this.parent, new ChildMessage('child-shown', this));
	        }
	    };
	    /**
	     * Hide the widget and make it hidden to its parent widget.
	     *
	     * #### Notes
	     * This causes the [[isHidden]] property to be `true`.
	     *
	     * If the widget is explicitly hidden, this is a no-op.
	     */
	    Widget.prototype.hide = function () {
	        if (this.testFlag(WidgetFlag.IsHidden)) {
	            return;
	        }
	        if (this.isAttached && (!this.parent || this.parent.isVisible)) {
	            messaging_1.sendMessage(this, WidgetMessage.BeforeHide);
	        }
	        this.setFlag(WidgetFlag.IsHidden);
	        this.addClass(HIDDEN_CLASS);
	        if (this.parent) {
	            messaging_1.sendMessage(this.parent, new ChildMessage('child-hidden', this));
	        }
	    };
	    /**
	     * Show or hide the widget according to a boolean value.
	     *
	     * @param hidden - `true` to hide the widget, or `false` to show it.
	     *
	     * #### Notes
	     * This is a convenience method for `hide()` and `show()`.
	     */
	    Widget.prototype.setHidden = function (hidden) {
	        if (hidden) {
	            this.hide();
	        }
	        else {
	            this.show();
	        }
	    };
	    /**
	     * Test whether the given widget flag is set.
	     *
	     * #### Notes
	     * This will not typically be called directly by user code.
	     */
	    Widget.prototype.testFlag = function (flag) {
	        return (this._flags & flag) !== 0;
	    };
	    /**
	     * Set the given widget flag.
	     *
	     * #### Notes
	     * This will not typically be called directly by user code.
	     */
	    Widget.prototype.setFlag = function (flag) {
	        this._flags |= flag;
	    };
	    /**
	     * Clear the given widget flag.
	     *
	     * #### Notes
	     * This will not typically be called directly by user code.
	     */
	    Widget.prototype.clearFlag = function (flag) {
	        this._flags &= ~flag;
	    };
	    /**
	     * Process a message sent to the widget.
	     *
	     * @param msg - The message sent to the widget.
	     *
	     * #### Notes
	     * Subclasses may reimplement this method as needed.
	     */
	    Widget.prototype.processMessage = function (msg) {
	        switch (msg.type) {
	            case 'resize':
	                this.notifyLayout(msg);
	                this.onResize(msg);
	                break;
	            case 'update-request':
	                this.notifyLayout(msg);
	                this.onUpdateRequest(msg);
	                break;
	            case 'after-show':
	                this.setFlag(WidgetFlag.IsVisible);
	                this.notifyLayout(msg);
	                this.onAfterShow(msg);
	                break;
	            case 'before-hide':
	                this.notifyLayout(msg);
	                this.onBeforeHide(msg);
	                this.clearFlag(WidgetFlag.IsVisible);
	                break;
	            case 'after-attach':
	                var visible = !this.isHidden && (!this.parent || this.parent.isVisible);
	                if (visible)
	                    this.setFlag(WidgetFlag.IsVisible);
	                this.setFlag(WidgetFlag.IsAttached);
	                this.notifyLayout(msg);
	                this.onAfterAttach(msg);
	                break;
	            case 'before-detach':
	                this.notifyLayout(msg);
	                this.onBeforeDetach(msg);
	                this.clearFlag(WidgetFlag.IsVisible);
	                this.clearFlag(WidgetFlag.IsAttached);
	                break;
	            case 'activate-request':
	                this.notifyLayout(msg);
	                this.onActivateRequest(msg);
	                break;
	            case 'close-request':
	                this.notifyLayout(msg);
	                this.onCloseRequest(msg);
	                break;
	            case 'child-added':
	                this.notifyLayout(msg);
	                this.onChildAdded(msg);
	                break;
	            case 'child-removed':
	                this.notifyLayout(msg);
	                this.onChildRemoved(msg);
	                break;
	            default:
	                this.notifyLayout(msg);
	                break;
	        }
	    };
	    /**
	     * Invoke the message processing routine of the widget's layout.
	     *
	     * @param msg - The message to dispatch to the layout.
	     *
	     * #### Notes
	     * This is a no-op if the widget does not have a layout.
	     *
	     * This will not typically be called directly by user code.
	     */
	    Widget.prototype.notifyLayout = function (msg) {
	        if (this._layout)
	            this._layout.processParentMessage(msg);
	    };
	    /**
	     * A message handler invoked on a `'close-request'` message.
	     *
	     * #### Notes
	     * The default implementation unparents or detaches the widget.
	     */
	    Widget.prototype.onCloseRequest = function (msg) {
	        if (this.parent) {
	            this.parent = null;
	        }
	        else if (this.isAttached) {
	            Widget.detach(this);
	        }
	    };
	    /**
	     * A message handler invoked on a `'resize'` message.
	     *
	     * #### Notes
	     * The default implementation of this handler is a no-op.
	     */
	    Widget.prototype.onResize = function (msg) { };
	    /**
	     * A message handler invoked on an `'update-request'` message.
	     *
	     * #### Notes
	     * The default implementation of this handler is a no-op.
	     */
	    Widget.prototype.onUpdateRequest = function (msg) { };
	    /**
	     * A message handler invoked on an `'activate-request'` message.
	     *
	     * #### Notes
	     * The default implementation of this handler is a no-op.
	     */
	    Widget.prototype.onActivateRequest = function (msg) { };
	    /**
	     * A message handler invoked on an `'after-show'` message.
	     *
	     * #### Notes
	     * The default implementation of this handler is a no-op.
	     */
	    Widget.prototype.onAfterShow = function (msg) { };
	    /**
	     * A message handler invoked on a `'before-hide'` message.
	     *
	     * #### Notes
	     * The default implementation of this handler is a no-op.
	     */
	    Widget.prototype.onBeforeHide = function (msg) { };
	    /**
	     * A message handler invoked on an `'after-attach'` message.
	     *
	     * #### Notes
	     * The default implementation of this handler is a no-op.
	     */
	    Widget.prototype.onAfterAttach = function (msg) { };
	    /**
	     * A message handler invoked on a `'before-detach'` message.
	     *
	     * #### Notes
	     * The default implementation of this handler is a no-op.
	     */
	    Widget.prototype.onBeforeDetach = function (msg) { };
	    /**
	     * A message handler invoked on a `'child-added'` message.
	     *
	     * #### Notes
	     * The default implementation of this handler is a no-op.
	     */
	    Widget.prototype.onChildAdded = function (msg) { };
	    /**
	     * A message handler invoked on a `'child-removed'` message.
	     *
	     * #### Notes
	     * The default implementation of this handler is a no-op.
	     */
	    Widget.prototype.onChildRemoved = function (msg) { };
	    return Widget;
	}());
	exports.Widget = Widget;
	// Define the signals for the `Widget` class.
	signaling_1.defineSignal(Widget.prototype, 'disposed');
	/**
	 * The namespace for the `Widget` class statics.
	 */
	var Widget;
	(function (Widget) {
	    // TODO - should this be an instance method?
	    /**
	     * Attach a widget to a host DOM node.
	     *
	     * @param widget - The widget of interest.
	     *
	     * @param host - The DOM node to use as the widget's host.
	     *
	     * #### Notes
	     * This will throw an error if the widget is not a root widget, if
	     * the widget is already attached, or if the host is not attached
	     * to the DOM.
	     */
	    function attach(widget, host) {
	        if (widget.parent) {
	            throw new Error('Cannot attach child widget.');
	        }
	        if (widget.isAttached || document.body.contains(widget.node)) {
	            throw new Error('Widget already attached.');
	        }
	        if (!document.body.contains(host)) {
	            throw new Error('Host not attached.');
	        }
	        host.appendChild(widget.node);
	        messaging_1.sendMessage(widget, WidgetMessage.AfterAttach);
	    }
	    Widget.attach = attach;
	    // TODO - should this be an instance method?
	    /**
	     * Detach the widget from its host DOM node.
	     *
	     * @param widget - The widget of interest.
	     *
	     * #### Notes
	     * This will throw an error if the widget is not a root widget, or
	     * if the widget is not attached to the DOM.
	     */
	    function detach(widget) {
	        if (widget.parent) {
	            throw new Error('Cannot detach child widget.');
	        }
	        if (!widget.isAttached || !document.body.contains(widget.node)) {
	            throw new Error('Widget not attached.');
	        }
	        messaging_1.sendMessage(widget, WidgetMessage.BeforeDetach);
	        widget.node.parentNode.removeChild(widget.node);
	    }
	    Widget.detach = detach;
	    /**
	     * Prepare a widget for absolute layout geometry.
	     *
	     * @param widget - The widget of interest.
	     *
	     * #### Notes
	     * This sets the inline style position of the widget to `absolute`.
	     */
	    function prepareGeometry(widget) {
	        widget.node.style.position = 'absolute';
	    }
	    Widget.prepareGeometry = prepareGeometry;
	    /**
	     * Reset the layout geometry of a widget.
	     *
	     * @param widget - The widget of interest.
	     *
	     * #### Notes
	     * This clears the inline style position and geometry of the widget.
	     */
	    function resetGeometry(widget) {
	        var style = widget.node.style;
	        var rect = Private.rectProperty.get(widget);
	        rect.top = NaN;
	        rect.left = NaN;
	        rect.width = NaN;
	        rect.height = NaN;
	        style.position = '';
	        style.top = '';
	        style.left = '';
	        style.width = '';
	        style.height = '';
	    }
	    Widget.resetGeometry = resetGeometry;
	    /**
	     * Set the absolute layout geometry of a widget.
	     *
	     * @param widget - The widget of interest.
	     *
	     * @param left - The desired offset left position of the widget.
	     *
	     * @param top - The desired offset top position of the widget.
	     *
	     * @param width - The desired offset width of the widget.
	     *
	     * @param height - The desired offset height of the widget.
	     *
	     * #### Notes
	     * All dimensions are assumed to be pixels with coordinates relative
	     * to the origin of the widget's offset parent.
	     *
	     * The widget's node is assumed to be position `absolute`.
	     *
	     * If the widget is resized from its previous size, a `ResizeMessage`
	     * will be automatically sent to the widget.
	     */
	    function setGeometry(widget, left, top, width, height) {
	        var resized = false;
	        var style = widget.node.style;
	        var rect = Private.rectProperty.get(widget);
	        if (rect.top !== top) {
	            rect.top = top;
	            style.top = top + "px";
	        }
	        if (rect.left !== left) {
	            rect.left = left;
	            style.left = left + "px";
	        }
	        if (rect.width !== width) {
	            resized = true;
	            rect.width = width;
	            style.width = width + "px";
	        }
	        if (rect.height !== height) {
	            resized = true;
	            rect.height = height;
	            style.height = height + "px";
	        }
	        if (resized) {
	            messaging_1.sendMessage(widget, new ResizeMessage(width, height));
	        }
	    }
	    Widget.setGeometry = setGeometry;
	})(Widget = exports.Widget || (exports.Widget = {}));
	/**
	 * An abstract base class for creating Phosphor layouts.
	 *
	 * #### Notes
	 * A layout is used to add widgets to a parent and to arrange those
	 * widgets within the parent's DOM node.
	 *
	 * This class implements the base functionality which is required of
	 * nearly all layouts. It must be subclassed in order to be useful.
	 *
	 * Notably, this class does not define a uniform interface for adding
	 * widgets to the layout. A subclass should define that API in a way
	 * which is meaningful for its intended use.
	 */
	var Layout = (function () {
	    function Layout() {
	        this._disposed = false;
	        this._parent = null;
	    }
	    /**
	     * Dispose of the resources held by the layout.
	     *
	     * #### Notes
	     * This should be reimplemented to clear and dispose of the widgets.
	     *
	     * All reimplementations should call the superclass method.
	     *
	     * This method is called automatically when the parent is disposed.
	     */
	    Layout.prototype.dispose = function () {
	        this._disposed = true;
	        this._parent = null;
	        signaling_1.clearSignalData(this);
	        properties_1.clearPropertyData(this);
	    };
	    Object.defineProperty(Layout.prototype, "isDisposed", {
	        /**
	         * Test whether the layout is disposed.
	         *
	         * #### Notes
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._disposed;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Layout.prototype, "parent", {
	        /**
	         * Get the parent widget of the layout.
	         */
	        get: function () {
	            return this._parent;
	        },
	        /**
	         * Set the parent widget of the layout.
	         *
	         * #### Notes
	         * This is set automatically when installing the layout on the parent
	         * widget. The parent widget should not be set directly by user code.
	         */
	        set: function (value) {
	            if (!value) {
	                throw new Error('Cannot set parent widget to null.');
	            }
	            if (this._parent === value) {
	                return;
	            }
	            if (this._parent) {
	                throw new Error('Cannot change parent widget.');
	            }
	            if (value.layout !== this) {
	                throw new Error('Invalid parent widget.');
	            }
	            this._parent = value;
	            this.init();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Process a message sent to the parent widget.
	     *
	     * @param msg - The message sent to the parent widget.
	     *
	     * #### Notes
	     * This method is called by the parent widget to process a message.
	     *
	     * Subclasses may reimplement this method as needed.
	     */
	    Layout.prototype.processParentMessage = function (msg) {
	        switch (msg.type) {
	            case 'resize':
	                this.onResize(msg);
	                break;
	            case 'update-request':
	                this.onUpdateRequest(msg);
	                break;
	            case 'fit-request':
	                this.onFitRequest(msg);
	                break;
	            case 'after-show':
	                this.onAfterShow(msg);
	                break;
	            case 'before-hide':
	                this.onBeforeHide(msg);
	                break;
	            case 'after-attach':
	                this.onAfterAttach(msg);
	                break;
	            case 'before-detach':
	                this.onBeforeDetach(msg);
	                break;
	            case 'child-removed':
	                this.onChildRemoved(msg);
	                break;
	            case 'child-shown':
	                this.onChildShown(msg);
	                break;
	            case 'child-hidden':
	                this.onChildHidden(msg);
	                break;
	        }
	    };
	    /**
	     * Perform layout initialization which requires the parent widget.
	     *
	     * #### Notes
	     * This method is invoked immediately after the layout is installed
	     * on the parent widget.
	     *
	     * The default implementation reparents all of the widgets to the
	     * layout parent widget.
	     *
	     * Subclasses should reimplement this method and attach the child
	     * widget nodes to the parent widget's node.
	     */
	    Layout.prototype.init = function () {
	        var _this = this;
	        iteration_1.each(this, function (widget) { widget.parent = _this.parent; });
	    };
	    /**
	     * A message handler invoked on a `'resize'` message.
	     *
	     * #### Notes
	     * The layout should ensure that its widgets are resized according
	     * to the specified layout space, and that they are sent a `'resize'`
	     * message if appropriate.
	     *
	     * The default implementation of this method sends an `UnknownSize`
	     * resize message to all widgets.
	     *
	     * This may be reimplemented by subclasses as needed.
	     */
	    Layout.prototype.onResize = function (msg) {
	        iteration_1.each(this, function (widget) { messaging_1.sendMessage(widget, ResizeMessage.UnknownSize); });
	    };
	    /**
	     * A message handler invoked on an `'update-request'` message.
	     *
	     * #### Notes
	     * The layout should ensure that its widgets are resized according
	     * to the available layout space, and that they are sent a `'resize'`
	     * message if appropriate.
	     *
	     * The default implementation of this method sends an `UnknownSize`
	     * resize message to all widgets.
	     *
	     * This may be reimplemented by subclasses as needed.
	     */
	    Layout.prototype.onUpdateRequest = function (msg) {
	        iteration_1.each(this, function (widget) { messaging_1.sendMessage(widget, ResizeMessage.UnknownSize); });
	    };
	    /**
	     * A message handler invoked on an `'after-attach'` message.
	     *
	     * #### Notes
	     * The default implementation of this method forwards the message
	     * to all widgets. It assumes all widget nodes are attached to the
	     * parent widget node.
	     *
	     * This may be reimplemented by subclasses as needed.
	     */
	    Layout.prototype.onAfterAttach = function (msg) {
	        iteration_1.each(this, function (widget) { messaging_1.sendMessage(widget, msg); });
	    };
	    /**
	     * A message handler invoked on a `'before-detach'` message.
	     *
	     * #### Notes
	     * The default implementation of this method forwards the message
	     * to all widgets. It assumes all widget nodes are attached to the
	     * parent widget node.
	     *
	     * This may be reimplemented by subclasses as needed.
	     */
	    Layout.prototype.onBeforeDetach = function (msg) {
	        iteration_1.each(this, function (widget) { messaging_1.sendMessage(widget, msg); });
	    };
	    /**
	     * A message handler invoked on an `'after-show'` message.
	     *
	     * #### Notes
	     * The default implementation of this method forwards the message to
	     * all non-hidden widgets. It assumes all widget nodes are attached
	     * to the parent widget node.
	     *
	     * This may be reimplemented by subclasses as needed.
	     */
	    Layout.prototype.onAfterShow = function (msg) {
	        iteration_1.each(this, function (widget) { if (!widget.isHidden)
	            messaging_1.sendMessage(widget, msg); });
	    };
	    /**
	     * A message handler invoked on a `'before-hide'` message.
	     *
	     * #### Notes
	     * The default implementation of this method forwards the message to
	     * all non-hidden widgets. It assumes all widget nodes are attached
	     * to the parent widget node.
	     *
	     * This may be reimplemented by subclasses as needed.
	     */
	    Layout.prototype.onBeforeHide = function (msg) {
	        iteration_1.each(this, function (widget) { if (!widget.isHidden)
	            messaging_1.sendMessage(widget, msg); });
	    };
	    /**
	     * A message handler invoked on a `'child-removed'` message.
	     *
	     * #### Notes
	     * This will remove the child widget from the layout.
	     *
	     * Subclasses should **not** typically reimplement this method.
	     */
	    Layout.prototype.onChildRemoved = function (msg) {
	        this.removeWidget(msg.child);
	    };
	    /**
	     * A message handler invoked on a `'fit-request'` message.
	     *
	     * #### Notes
	     * The default implementation of this handler is a no-op.
	     */
	    Layout.prototype.onFitRequest = function (msg) { };
	    /**
	     * A message handler invoked on a `'child-shown'` message.
	     *
	     * #### Notes
	     * The default implementation of this handler is a no-op.
	     */
	    Layout.prototype.onChildShown = function (msg) { };
	    /**
	     * A message handler invoked on a `'child-hidden'` message.
	     *
	     * #### Notes
	     * The default implementation of this handler is a no-op.
	     */
	    Layout.prototype.onChildHidden = function (msg) { };
	    return Layout;
	}());
	exports.Layout = Layout;
	// TODO should this be in the Widget namespace?
	/**
	 * An enum of widget bit flags.
	 */
	(function (WidgetFlag) {
	    /**
	     * The widget has been disposed.
	     */
	    WidgetFlag[WidgetFlag["IsDisposed"] = 1] = "IsDisposed";
	    /**
	     * The widget is attached to the DOM.
	     */
	    WidgetFlag[WidgetFlag["IsAttached"] = 2] = "IsAttached";
	    /**
	     * The widget is hidden.
	     */
	    WidgetFlag[WidgetFlag["IsHidden"] = 4] = "IsHidden";
	    /**
	     * The widget is visible.
	     */
	    WidgetFlag[WidgetFlag["IsVisible"] = 8] = "IsVisible";
	    /**
	     * A layout cannot be set on the widget.
	     */
	    WidgetFlag[WidgetFlag["DisallowLayout"] = 16] = "DisallowLayout";
	})(exports.WidgetFlag || (exports.WidgetFlag = {}));
	var WidgetFlag = exports.WidgetFlag;
	// TODO should this be in the Widget namespace?
	/**
	 * A collection of stateless messages related to widgets.
	 */
	var WidgetMessage;
	(function (WidgetMessage) {
	    /**
	     * A singleton `'after-show'` message.
	     *
	     * #### Notes
	     * This message is sent to a widget after it becomes visible.
	     *
	     * This message is **not** sent when the widget is being attached.
	     */
	    WidgetMessage.AfterShow = new messaging_1.Message('after-show');
	    /**
	     * A singleton `'before-hide'` message.
	     *
	     * #### Notes
	     * This message is sent to a widget before it becomes not-visible.
	     *
	     * This message is **not** sent when the widget is being detached.
	     */
	    WidgetMessage.BeforeHide = new messaging_1.Message('before-hide');
	    /**
	     * A singleton `'after-attach'` message.
	     *
	     * #### Notes
	     * This message is sent to a widget after it is attached.
	     */
	    WidgetMessage.AfterAttach = new messaging_1.Message('after-attach');
	    /**
	     * A singleton `'before-detach'` message.
	     *
	     * #### Notes
	     * This message is sent to a widget before it is detached.
	     */
	    WidgetMessage.BeforeDetach = new messaging_1.Message('before-detach');
	    /**
	     * A singleton `'parent-changed'` message.
	     *
	     * #### Notes
	     * This message is sent to a widget when its parent has changed.
	     */
	    WidgetMessage.ParentChanged = new messaging_1.Message('parent-changed');
	    /**
	     * A singleton conflatable `'update-request'` message.
	     *
	     * #### Notes
	     * This message can be dispatched to supporting widgets in order to
	     * update their content based on the current widget state. Not all
	     * widgets will respond to messages of this type.
	     *
	     * For widgets with a layout, this message will inform the layout to
	     * update the position and size of its child widgets.
	     */
	    WidgetMessage.UpdateRequest = new messaging_1.ConflatableMessage('update-request');
	    /**
	     * A singleton conflatable `'fit-request'` message.
	     *
	     * #### Notes
	     * For widgets with a layout, this message will inform the layout to
	     * recalculate its size constraints to fit the space requirements of
	     * its child widgets, and to update their position and size. Not all
	     * layouts will respond to messages of this type.
	     */
	    WidgetMessage.FitRequest = new messaging_1.ConflatableMessage('fit-request');
	    /**
	     * A singleton conflatable `'activate-request'` message.
	     *
	     * #### Notes
	     * This message should be dispatched to a widget when it should
	     * perform the actions necessary to activate the widget, which
	     * may include focusing its node or descendant node.
	     */
	    WidgetMessage.ActivateRequest = new messaging_1.ConflatableMessage('activate-request');
	    /**
	     * A singleton conflatable `'close-request'` message.
	     *
	     * #### Notes
	     * This message should be dispatched to a widget when it should close
	     * and remove itself from the widget hierarchy.
	     */
	    WidgetMessage.CloseRequest = new messaging_1.ConflatableMessage('close-request');
	})(WidgetMessage = exports.WidgetMessage || (exports.WidgetMessage = {}));
	// TODO should this be in the Widget namespace?
	/**
	 * A message class for child related messages.
	 */
	var ChildMessage = (function (_super) {
	    __extends(ChildMessage, _super);
	    /**
	     * Construct a new child message.
	     *
	     * @param type - The message type.
	     *
	     * @param child - The child widget for the message.
	     */
	    function ChildMessage(type, child) {
	        _super.call(this, type);
	        this._child = child;
	    }
	    Object.defineProperty(ChildMessage.prototype, "child", {
	        /**
	         * The child widget for the message.
	         *
	         * #### Notes
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._child;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ChildMessage;
	}(messaging_1.Message));
	exports.ChildMessage = ChildMessage;
	// TODO should this be in the Widget namespace?
	/**
	 * A message class for `'resize'` messages.
	 */
	var ResizeMessage = (function (_super) {
	    __extends(ResizeMessage, _super);
	    /**
	     * Construct a new resize message.
	     *
	     * @param width - The **offset width** of the widget, or `-1` if
	     *   the width is not known.
	     *
	     * @param height - The **offset height** of the widget, or `-1` if
	     *   the height is not known.
	     */
	    function ResizeMessage(width, height) {
	        _super.call(this, 'resize');
	        this._width = width;
	        this._height = height;
	    }
	    Object.defineProperty(ResizeMessage.prototype, "width", {
	        /**
	         * The offset width of the widget.
	         *
	         * #### Notes
	         * This will be `-1` if the width is unknown.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._width;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ResizeMessage.prototype, "height", {
	        /**
	         * The offset height of the widget.
	         *
	         * #### Notes
	         * This will be `-1` if the height is unknown.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._height;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ResizeMessage;
	}(messaging_1.Message));
	exports.ResizeMessage = ResizeMessage;
	/**
	 * The namespace for the `ResizeMessage` class statics.
	 */
	var ResizeMessage;
	(function (ResizeMessage) {
	    /**
	     * A singleton `'resize'` message with an unknown size.
	     */
	    ResizeMessage.UnknownSize = new ResizeMessage(-1, -1);
	})(ResizeMessage = exports.ResizeMessage || (exports.ResizeMessage = {}));
	/**
	 * The namespace for the private module data.
	 */
	var Private;
	(function (Private) {
	    /**
	     * A property descriptor for a widget absolute geometry rect.
	     */
	    Private.rectProperty = new properties_1.AttachedProperty({
	        name: 'rect',
	        create: function () { return ({ top: NaN, left: NaN, width: NaN, height: NaN }); },
	    });
	    /**
	     * An attached property for the widget title object.
	     */
	    Private.titleProperty = new properties_1.AttachedProperty({
	        name: 'title',
	        create: function (owner) { return new title_1.Title({ owner: owner }); },
	    });
	    /**
	     * Create a DOM node for the given widget options.
	     */
	    function createNode(options) {
	        return options.node || document.createElement('div');
	    }
	    Private.createNode = createNode;
	})(Private || (Private = {}));
	
})
/** END DEFINE BLOCK for phosphor@0.7.0/lib/ui/widget.js **/


/** START DEFINE BLOCK for phosphor@0.7.0/lib/core/messaging.js **/
jupyter.define('phosphor@0.7.0/lib/core/messaging.js', function (module, exports, __jupyter_require__) {
	/* WEBPACK VAR INJECTION */(function(setImmediate) {"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2016, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	var iteration_1 = __jupyter_require__('phosphor@0.7.0/lib/algorithm/iteration.js');
	var queue_1 = __jupyter_require__('phosphor@0.7.0/lib/collections/queue.js');
	/**
	 * A message which can be delivered to a message handler.
	 *
	 * #### Notes
	 * This class may be subclassed to create complex message types.
	 *
	 * **See also:** [[postMessage]] and [[sendMessage]].
	 */
	var Message = (function () {
	    /**
	     * Construct a new message.
	     *
	     * @param type - The type of the message.
	     */
	    function Message(type) {
	        this._type = type;
	    }
	    Object.defineProperty(Message.prototype, "type", {
	        /**
	         * The type of the message.
	         *
	         * #### Notes
	         * This value can be used to cast the message to a derived type.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._type;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Message.prototype, "isConflatable", {
	        /**
	         * Test whether the message is conflatable.
	         *
	         * #### Notes
	         * Message conflation is an advanced topic. Most message types will
	         * not make use of this feature.
	         *
	         * If a conflatable message is posted to the event queue when another
	         * conflatable message of the same type and handler has already been
	         * posted, the `conflate()` method of the existing message will be
	         * invoked. If that method returns `true`, the new message will not
	         * be enqueued. This allows messages to be compressed, so that only
	         * a single instance of the message type is processed per cycle, no
	         * matter how many times messages of that type are posted.
	         *
	         * Custom message types may reimplement this property. The default
	         * implementation is always `false`.
	         *
	         * This is a read-only property.
	         *
	         * **See also:** [[conflateMessage]]
	         */
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Conflate this message with another message of the same `type`.
	     *
	     * @param other - A conflatable message of the same `type`.
	     *
	     * @returns `true` if the message was successfully conflated, or
	     *   `false` otherwise.
	     *
	     * #### Notes
	     * Message conflation is an advanced topic. Most message types will
	     * not make use of this feature.
	     *
	     * This method is called automatically by the message loop when the
	     * given message is posted to the handler paired with this message.
	     * This message will already be enqueued and conflatable, and the
	     * given message will have the same `type` and also be conflatable.
	     *
	     * This method should merge the state of the other message into this
	     * message as needed so that when this message is finally delivered
	     * to the handler, it receives the most up-to-date information.
	     *
	     * If this method returns `true`, it signals that the other message
	     * was successfully conflated and it will not be enqueued.
	     *
	     * If this method returns `false`, the other message will be enqueued
	     * for normal delivery.
	     *
	     * Custom message types may reimplement this method. The default
	     * implementation always returns `false`.
	     *
	     * **See also:** [[isConflatable]]
	     */
	    Message.prototype.conflate = function (other) {
	        return false;
	    };
	    return Message;
	}());
	exports.Message = Message;
	/**
	 * A convenience message class which conflates automatically.
	 *
	 * #### Notes
	 * Message conflation is an advanced topic. Most user code will not
	 * make use of this class.
	 *
	 * This message class is useful for creating message instances which
	 * should be conflated, but which have no state other than `type`.
	 *
	 * If conflation of stateful messages is required, a custom `Message`
	 * subclass should be created.
	 */
	var ConflatableMessage = (function (_super) {
	    __extends(ConflatableMessage, _super);
	    function ConflatableMessage() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(ConflatableMessage.prototype, "isConflatable", {
	        /**
	         * Test whether the message is conflatable.
	         *
	         * #### Notes
	         * This property is always `true`.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Conflate this message with another message of the same `type`.
	     *
	     * #### Notes
	     * This method always returns `true`.
	     */
	    ConflatableMessage.prototype.conflate = function (other) {
	        return true;
	    };
	    return ConflatableMessage;
	}(Message));
	exports.ConflatableMessage = ConflatableMessage;
	/**
	 * Send a message to a message handler to process immediately.
	 *
	 * @param handler - The handler which should process the message.
	 *
	 * @param msg - The message to deliver to the handler.
	 *
	 * #### Notes
	 * The message will first be sent through any installed message hooks
	 * for the handler. If the message passes all hooks, it will then be
	 * delivered to the `processMessage` method of the handler.
	 *
	 * The message will not be conflated with pending posted messages.
	 *
	 * Exceptions in hooks and handlers will be caught and logged.
	 */
	function sendMessage(handler, msg) {
	    MessageLoop.sendMessage(handler, msg);
	}
	exports.sendMessage = sendMessage;
	/**
	 * Post a message to the message handler to process in the future.
	 *
	 * @param handler - The handler which should process the message.
	 *
	 * @param msg - The message to post to the handler.
	 *
	 * #### Notes
	 * The message will be conflated with the pending posted messages for
	 * the handler, if possible. If the message is not conflated, it will
	 * be queued for normal delivery on the next cycle of the event loop.
	 *
	 * Exceptions in hooks and handlers will be caught and logged.
	 */
	function postMessage(handler, msg) {
	    MessageLoop.postMessage(handler, msg);
	}
	exports.postMessage = postMessage;
	/**
	 * Install a message hook for a message handler.
	 *
	 * @param handler - The message handler of interest.
	 *
	 * @param hook - The message hook to install.
	 *
	 * #### Notes
	 * A message hook is invoked before a message is delivered to the
	 * handler. If the hook returns `false`, no other hooks will be
	 * invoked and the message will not be delivered to the handler.
	 *
	 * The most recently installed message hook is executed first.
	 *
	 * If the hook is already installed, it will be moved to the front.
	 *
	 * **See also:** [[removeMessageHook]]
	 */
	function installMessageHook(handler, hook) {
	    MessageLoop.installMessageHook(handler, hook);
	}
	exports.installMessageHook = installMessageHook;
	/**
	 * Remove an installed message hook for a message handler.
	 *
	 * @param handler - The message handler of interest.
	 *
	 * @param hook - The message hook to remove.
	 *
	 * #### Notes
	 * If the hook is not installed, this is a no-op.
	 *
	 * It is safe to call this function while the hook is executing.
	 */
	function removeMessageHook(handler, hook) {
	    MessageLoop.removeMessageHook(handler, hook);
	}
	exports.removeMessageHook = removeMessageHook;
	/**
	 * Clear all message data associated with a message handler.
	 *
	 * @param handler - The message handler of interest.
	 *
	 * #### Notes
	 * This will clear all pending messages and hooks for the handler.
	 */
	function clearMessageData(handler) {
	    MessageLoop.clearMessageData(handler);
	}
	exports.clearMessageData = clearMessageData;
	/**
	 * The namespace for the global singleton message loop.
	 */
	var MessageLoop;
	(function (MessageLoop) {
	    /**
	     * Send a message to a handler for immediate processing.
	     *
	     * This will first call all message hooks for the handler. If any
	     * hook rejects the message, the message will not be delivered.
	     */
	    function sendMessage(handler, msg) {
	        // Handle the common case of no message hooks.
	        var node = hooks.get(handler);
	        if (node === void 0) {
	            invokeHandler(handler, msg);
	            return;
	        }
	        // Run the message hooks and bail early if any hook returns false.
	        // A null hook indicates the hook was removed during dispatch.
	        for (; node !== null; node = node.next) {
	            if (node.hook !== null && !invokeHook(node.hook, handler, msg)) {
	                return;
	            }
	        }
	        // All message hooks returned true, so invoke the handler.
	        invokeHandler(handler, msg);
	    }
	    MessageLoop.sendMessage = sendMessage;
	    /**
	     * Post a message to a handler for processing in the future.
	     *
	     * This will first conflate the message, if possible. If it cannot
	     * be conflated, it will be queued for delivery on the next cycle
	     * of the event loop.
	     */
	    function postMessage(handler, msg) {
	        // Handle the common case a non-conflatable message first.
	        if (!msg.isConflatable) {
	            enqueueMessage(handler, msg);
	            return;
	        }
	        // Conflate message if possible.
	        var conflated = iteration_1.some(queue, function (posted) {
	            if (posted.handler !== handler) {
	                return false;
	            }
	            if (posted.msg.type !== msg.type) {
	                return false;
	            }
	            if (!posted.msg.isConflatable) {
	                return false;
	            }
	            return posted.msg.conflate(msg);
	        });
	        // If the message was not conflated, enqueue the message.
	        if (!conflated)
	            enqueueMessage(handler, msg);
	    }
	    MessageLoop.postMessage = postMessage;
	    /**
	     * Install a message hook for a handler.
	     *
	     * This will first remove the hook if it exists, then install the
	     * hook in front of other hooks for the handler.
	     */
	    function installMessageHook(handler, hook) {
	        // Remove the message hook if it's already installed.
	        removeMessageHook(handler, hook);
	        // Install the hook at the front of the list.
	        var next = hooks.get(handler) || null;
	        hooks.set(handler, { next: next, hook: hook });
	    }
	    MessageLoop.installMessageHook = installMessageHook;
	    /**
	     * Remove a message hook for a handler, if it exists.
	     */
	    function removeMessageHook(handler, hook) {
	        // Traverse the list and find the matching hook. If found, clear
	        // the reference to the hook and remove the node from the list.
	        // The node's next reference is *not* cleared so that dispatch
	        // may continue when the hook is removed during dispatch.
	        var prev = null;
	        var node = hooks.get(handler) || null;
	        for (; node !== null; prev = node, node = node.next) {
	            if (node.hook === hook) {
	                if (prev === null && node.next === null) {
	                    hooks.delete(handler);
	                }
	                else if (prev === null) {
	                    hooks.set(handler, node.next);
	                }
	                else {
	                    prev.next = node.next;
	                }
	                node.hook = null;
	                return;
	            }
	        }
	    }
	    MessageLoop.removeMessageHook = removeMessageHook;
	    /**
	     * Clear all message data for a handler.
	     *
	     * This will remove all message hooks and clear pending messages.
	     */
	    function clearMessageData(handler) {
	        // Clear all message hooks.
	        var node = hooks.get(handler) || null;
	        for (; node !== null; node = node.next) {
	            node.hook = null;
	        }
	        // Remove the handler from the hooks map.
	        hooks.delete(handler);
	        // Clear all pending messages.
	        iteration_1.each(queue, function (posted) {
	            if (posted.handler === handler) {
	                posted.handler = null;
	            }
	        });
	    }
	    MessageLoop.clearMessageData = clearMessageData;
	    /**
	     * The queue of posted message pairs.
	     */
	    var queue = new queue_1.Queue();
	    /**
	     * A mapping of handler to list of installed message hooks.
	     */
	    var hooks = new WeakMap();
	    /**
	     * A local reference to an event loop callback.
	     */
	    var defer = (function () {
	        var ok = typeof requestAnimationFrame === 'function';
	        return ok ? requestAnimationFrame : setImmediate;
	    })();
	    /**
	     * Whether a message loop cycle is pending.
	     */
	    var cyclePending = false;
	    /**
	     * Invoke a message hook with the specified handler and message.
	     *
	     * Returns the result of the hook, or `true` if the hook throws.
	     *
	     * Exceptions in the hook will be caught and logged.
	     */
	    function invokeHook(hook, handler, msg) {
	        var result;
	        try {
	            result = hook(handler, msg);
	        }
	        catch (err) {
	            result = true;
	            console.error(err);
	        }
	        return result;
	    }
	    /**
	     * Invoke a message handler with the specified message.
	     *
	     * Exceptions in the handler will be caught and logged.
	     */
	    function invokeHandler(handler, msg) {
	        try {
	            handler.processMessage(msg);
	        }
	        catch (err) {
	            console.error(err);
	        }
	    }
	    /**
	     * Add a message to the end of the message queue.
	     *
	     * This will automatically schedule a cycle of the loop.
	     */
	    function enqueueMessage(handler, msg) {
	        queue.pushBack({ handler: handler, msg: msg });
	        scheduleMessageLoop();
	    }
	    /**
	     * Schedule a message loop cycle to process any pending messages.
	     *
	     * This is a no-op if a loop cycle is already pending.
	     */
	    function scheduleMessageLoop() {
	        if (!cyclePending) {
	            defer(runMessageLoop);
	            cyclePending = true;
	        }
	    }
	    /**
	     * Run an iteration of the message loop.
	     *
	     * This will process all pending messages in the queue. If a message
	     * is added to the queue while the message loop is running, it will
	     * be processed on the next cycle of the loop.
	     */
	    function runMessageLoop() {
	        // Clear the pending flag so the next loop can be scheduled.
	        cyclePending = false;
	        // If the queue is empty, there is nothing else to do.
	        if (queue.isEmpty) {
	            return;
	        }
	        // Add a sentinel value to the end of the queue. The queue will
	        // only be processed up to the sentinel. Messages posted during
	        // this cycle will execute on the next cycle.
	        var sentinel = { handler: null, msg: null };
	        queue.pushBack(sentinel);
	        // Enter the message loop.
	        while (!queue.isEmpty) {
	            // Remove the first posted message in the queue.
	            var posted = queue.popFront();
	            // If the value is the sentinel, exit the loop.
	            if (posted === sentinel) {
	                return;
	            }
	            // Dispatch the message if the handler has not been cleared.
	            if (posted.handler !== null) {
	                sendMessage(posted.handler, posted.msg);
	            }
	        }
	    }
	})(MessageLoop || (MessageLoop = {}));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __jupyter_require__('timers-browserify@1.4.2/main.js').setImmediate))
})
/** END DEFINE BLOCK for phosphor@0.7.0/lib/core/messaging.js **/


/** START DEFINE BLOCK for phosphor@0.7.0/lib/collections/queue.js **/
jupyter.define('phosphor@0.7.0/lib/collections/queue.js', function (module, exports, __jupyter_require__) {
	"use strict";
	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2016, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	var iteration_1 = __jupyter_require__('phosphor@0.7.0/lib/algorithm/iteration.js');
	/**
	 * A generic FIFO queue data structure.
	 */
	var Queue = (function () {
	    /**
	     * Construct a new queue.
	     *
	     * @param values - The initial values for the queue.
	     */
	    function Queue(values) {
	        var _this = this;
	        this._length = 0;
	        this._front = null;
	        this._back = null;
	        if (values)
	            iteration_1.each(values, function (value) { _this.pushBack(value); });
	    }
	    Object.defineProperty(Queue.prototype, "isEmpty", {
	        /**
	         * Test whether the queue is empty.
	         *
	         * @returns `true` if the queue is empty, `false` otherwise.
	         *
	         * #### Notes
	         * This is a read-only property.
	         *
	         * #### Complexity
	         * Constant.
	         *
	         * #### Iterator Validity
	         * No changes.
	         */
	        get: function () {
	            return this._length === 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Queue.prototype, "length", {
	        /**
	         * Get the length of the queue.
	         *
	         * @return The number of values in the queue.
	         *
	         * #### Notes
	         * This is a read-only property.
	         *
	         * #### Complexity
	         * Constant.
	         *
	         * #### Iterator Validity
	         * No changes.
	         */
	        get: function () {
	            return this._length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Queue.prototype, "front", {
	        /**
	         * Get the value at the front of the queue.
	         *
	         * @returns The value at the front of the queue, or `undefined` if
	         *   the queue is empty.
	         *
	         * #### Notes
	         * This is a read-only property.
	         *
	         * #### Complexity
	         * Constant.
	         *
	         * #### Iterator Validity
	         * No changes.
	         */
	        get: function () {
	            return this._front ? this._front.value : void 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Queue.prototype, "back", {
	        /**
	         * Get the value at the back of the queue.
	         *
	         * @returns The value at the back of the queue, or `undefined` if
	         *   the queue is empty.
	         *
	         * #### Notes
	         * This is a read-only property.
	         *
	         * #### Complexity
	         * Constant.
	         *
	         * #### Iterator Validity
	         * No changes.
	         */
	        get: function () {
	            return this._back ? this._back.value : void 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Create an iterator over the values in the queue.
	     *
	     * @returns A new iterator starting at the front of the queue.
	     *
	     * #### Complexity
	     * Constant.
	     *
	     * #### Iterator Validity
	     * No changes.
	     */
	    Queue.prototype.iter = function () {
	        return new QueueIterator(this._front);
	    };
	    /**
	     * Add a value to the back of the queue.
	     *
	     * @param value - The value to add to the back of the queue.
	     *
	     * @returns The new length of the queue.
	     *
	     * #### Complexity
	     * Constant.
	     *
	     * #### Iterator Validity
	     * No changes.
	     */
	    Queue.prototype.pushBack = function (value) {
	        var node = new QueueNode(value);
	        if (this._length === 0) {
	            this._front = node;
	            this._back = node;
	        }
	        else {
	            this._back.next = node;
	            this._back = node;
	        }
	        return ++this._length;
	    };
	    /**
	     * Remove and return the value at the front of the queue.
	     *
	     * @returns The value at the front of the queue, or `undefined` if
	     *   the queue is empty.
	     *
	     * #### Complexity
	     * Constant.
	     *
	     * #### Iterator Validity
	     * Iterators pointing at the removed value are invalidated.
	     */
	    Queue.prototype.popFront = function () {
	        if (this._length === 0) {
	            return void 0;
	        }
	        var node = this._front;
	        if (this._length === 1) {
	            this._front = null;
	            this._back = null;
	        }
	        else {
	            this._front = node.next;
	            node.next = null;
	        }
	        this._length--;
	        return node.value;
	    };
	    /**
	     * Remove all values from the queue.
	     *
	     * #### Complexity
	     * Linear.
	     *
	     * #### Iterator Validity
	     * All current iterators are invalidated.
	     */
	    Queue.prototype.clear = function () {
	        var node = this._front;
	        while (node) {
	            var next = node.next;
	            node.next = null;
	            node = next;
	        }
	        this._length = 0;
	        this._front = null;
	        this._back = null;
	    };
	    /**
	     * Swap the contents of the queue with the contents of another.
	     *
	     * @param other - The other queue holding the contents to swap.
	     *
	     * #### Complexity
	     * Constant.
	     *
	     * #### Iterator Validity
	     * All current iterators remain valid, but will now point to the
	     * contents of the other queue involved in the swap.
	     */
	    Queue.prototype.swap = function (other) {
	        var length = other._length;
	        var front = other._front;
	        var back = other._back;
	        other._length = this._length;
	        other._front = this._front;
	        other._back = this._back;
	        this._length = length;
	        this._front = front;
	        this._back = back;
	    };
	    return Queue;
	}());
	exports.Queue = Queue;
	/**
	 * An iterator for a queue.
	 */
	var QueueIterator = (function () {
	    /**
	     * Construct a new queue iterator.
	     *
	     * @param node - The node at the front of range.
	     */
	    function QueueIterator(node) {
	        this._node = node;
	    }
	    /**
	     * Create an iterator over the object's values.
	     *
	     * @returns A reference to `this` iterator.
	     */
	    QueueIterator.prototype.iter = function () {
	        return this;
	    };
	    /**
	     * Create an independent clone of the queue iterator.
	     *
	     * @returns A new iterator starting with the current value.
	     */
	    QueueIterator.prototype.clone = function () {
	        return new QueueIterator(this._node);
	    };
	    /**
	     * Get the next value from the queue.
	     *
	     * @returns The next value from the queue, or `undefined` if the
	     *   iterator is exhausted.
	     */
	    QueueIterator.prototype.next = function () {
	        if (!this._node) {
	            return void 0;
	        }
	        var value = this._node.value;
	        this._node = this._node.next;
	        return value;
	    };
	    return QueueIterator;
	}());
	/**
	 * The node type for a queue.
	 */
	var QueueNode = (function () {
	    /**
	     * Construct a new queue node.
	     *
	     * @param value - The value for the node.
	     */
	    function QueueNode(value) {
	        /**
	         * The next node the queue.
	         */
	        this.next = null;
	        this.value = value;
	    }
	    return QueueNode;
	}());
	
})
/** END DEFINE BLOCK for phosphor@0.7.0/lib/collections/queue.js **/


/** START DEFINE BLOCK for phosphor@0.7.0/lib/core/properties.js **/
jupyter.define('phosphor@0.7.0/lib/core/properties.js', function (module, exports, __jupyter_require__) {
	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2016, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	"use strict";
	/**
	 * A class which attaches a value to an external object.
	 *
	 * #### Notes
	 * Attached properties are used to extend the state of an object with
	 * semantic data from an unrelated class. They also encapsulate value
	 * creation, coercion, and notification.
	 *
	 * Because attached property values are stored in a hash table, which
	 * in turn is stored in a WeakMap keyed on the owner object, there is
	 * non-trivial storage overhead involved in their use. The pattern is
	 * therefore best used for the storage of rare data.
	 */
	var AttachedProperty = (function () {
	    /**
	     * Construct a new attached property.
	     *
	     * @param options - The options for initializing the property.
	     */
	    function AttachedProperty(options) {
	        this._pid = nextPID();
	        this._name = options.name;
	        this._value = options.value;
	        this._create = options.create;
	        this._coerce = options.coerce;
	        this._compare = options.compare;
	        this._changed = options.changed;
	    }
	    Object.defineProperty(AttachedProperty.prototype, "name", {
	        /**
	         * Get the human readable name for the property.
	         *
	         * #### Notes
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Get the current value of the property for a given owner.
	     *
	     * @param owner - The property owner of interest.
	     *
	     * @returns The current value of the property.
	     *
	     * #### Notes
	     * If the value has not yet been set, the default value will be
	     * computed and assigned as the current value of the property.
	     */
	    AttachedProperty.prototype.get = function (owner) {
	        var value;
	        var map = ensureMap(owner);
	        if (this._pid in map) {
	            value = map[this._pid];
	        }
	        else {
	            value = map[this._pid] = this._createValue(owner);
	        }
	        return value;
	    };
	    /**
	     * Set the current value of the property for a given owner.
	     *
	     * @param owner - The property owner of interest.
	     *
	     * @param value - The value for the property.
	     *
	     * #### Notes
	     * If the value has not yet been set, the default value will be
	     * computed and used as the previous value for the comparison.
	     */
	    AttachedProperty.prototype.set = function (owner, value) {
	        var oldValue;
	        var map = ensureMap(owner);
	        if (this._pid in map) {
	            oldValue = map[this._pid];
	        }
	        else {
	            oldValue = map[this._pid] = this._createValue(owner);
	        }
	        var newValue = this._coerceValue(owner, value);
	        this._maybeNotify(owner, oldValue, map[this._pid] = newValue);
	    };
	    /**
	     * Explicitly coerce the current property value for a given owner.
	     *
	     * @param owner - The property owner of interest.
	     *
	     * #### Notes
	     * If the value has not yet been set, the default value will be
	     * computed and used as the previous value for the comparison.
	     */
	    AttachedProperty.prototype.coerce = function (owner) {
	        var oldValue;
	        var map = ensureMap(owner);
	        if (this._pid in map) {
	            oldValue = map[this._pid];
	        }
	        else {
	            oldValue = map[this._pid] = this._createValue(owner);
	        }
	        var newValue = this._coerceValue(owner, oldValue);
	        this._maybeNotify(owner, oldValue, map[this._pid] = newValue);
	    };
	    /**
	     * Get or create the default value for the given owner.
	     */
	    AttachedProperty.prototype._createValue = function (owner) {
	        var create = this._create;
	        return create ? create(owner) : this._value;
	    };
	    /**
	     * Coerce the value for the given owner.
	     */
	    AttachedProperty.prototype._coerceValue = function (owner, value) {
	        var coerce = this._coerce;
	        return coerce ? coerce(owner, value) : value;
	    };
	    /**
	     * Compare the old value and new value for equality.
	     */
	    AttachedProperty.prototype._compareValue = function (oldValue, newValue) {
	        var compare = this._compare;
	        return compare ? compare(oldValue, newValue) : oldValue === newValue;
	    };
	    /**
	     * Run the change notification if the given values are different.
	     */
	    AttachedProperty.prototype._maybeNotify = function (owner, oldValue, newValue) {
	        if (!this._changed || this._compareValue(oldValue, newValue)) {
	            return;
	        }
	        this._changed.call(void 0, owner, oldValue, newValue);
	    };
	    return AttachedProperty;
	}());
	exports.AttachedProperty = AttachedProperty;
	/**
	 * Clear the stored property data for the given property owner.
	 *
	 * @param owner - The property owner of interest.
	 *
	 * #### Notes
	 * This will clear all property values for the owner, but it will
	 * **not** run the change notification for any of the properties.
	 */
	function clearPropertyData(owner) {
	    ownerData.delete(owner);
	}
	exports.clearPropertyData = clearPropertyData;
	/**
	 * A weak mapping of property owner to property map.
	 */
	var ownerData = new WeakMap();
	/**
	 * A function which computes successive unique property ids.
	 */
	var nextPID = (function () {
	    var id = 0;
	    return function () {
	        var rand = Math.random();
	        var stem = ("" + rand).slice(2);
	        return "pid-" + stem + "-" + id++;
	    };
	})();
	/**
	 * Lookup the data map for the property owner.
	 *
	 * This will create the map if one does not already exist.
	 */
	function ensureMap(owner) {
	    var map = ownerData.get(owner);
	    if (map !== void 0)
	        return map;
	    map = Object.create(null);
	    ownerData.set(owner, map);
	    return map;
	}
	
})
/** END DEFINE BLOCK for phosphor@0.7.0/lib/core/properties.js **/


/** START DEFINE BLOCK for phosphor@0.7.0/lib/ui/title.js **/
jupyter.define('phosphor@0.7.0/lib/ui/title.js', function (module, exports, __jupyter_require__) {
	"use strict";
	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2016, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	var signaling_1 = __jupyter_require__('phosphor@0.7.0/lib/core/signaling.js');
	/**
	 * An object which holds data related to a widget's title.
	 *
	 * #### Notes
	 * A title object is intended to hold the data necessary to display a
	 * header for a particular widget. A common example is the `TabPanel`,
	 * which uses the widget title to populate the tab for a child widget.
	 */
	var Title = (function () {
	    /**
	     * Construct a new title.
	     *
	     * @param options - The options for initializing the title.
	     */
	    function Title(options) {
	        if (options === void 0) { options = {}; }
	        this._label = '';
	        this._icon = '';
	        this._caption = '';
	        this._mnemonic = -1;
	        this._className = '';
	        this._closable = false;
	        this._owner = null;
	        if (options.owner !== void 0) {
	            this._owner = options.owner;
	        }
	        if (options.label !== void 0) {
	            this._label = options.label;
	        }
	        if (options.mnemonic !== void 0) {
	            this._mnemonic = options.mnemonic;
	        }
	        if (options.icon !== void 0) {
	            this._icon = options.icon;
	        }
	        if (options.caption !== void 0) {
	            this._caption = options.caption;
	        }
	        if (options.closable !== void 0) {
	            this._closable = options.closable;
	        }
	        if (options.className !== void 0) {
	            this._className = options.className;
	        }
	    }
	    Object.defineProperty(Title.prototype, "owner", {
	        /**
	         * Get the object which owns the title.
	         *
	         * #### Notes
	         * This will be `null` if the title has no owner.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._owner;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Title.prototype, "label", {
	        /**
	         * Get the label for the title.
	         *
	         * #### Notes
	         * The default value is an empty string.
	         */
	        get: function () {
	            return this._label;
	        },
	        /**
	         * Set the label for the title.
	         */
	        set: function (value) {
	            if (this._label === value) {
	                return;
	            }
	            this._label = value;
	            this.changed.emit(void 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Title.prototype, "mnemonic", {
	        /**
	         * Get the mnemonic index for the title.
	         *
	         * #### Notes
	         * The default value is `-1`.
	         */
	        get: function () {
	            return this._mnemonic;
	        },
	        /**
	         * Set the mnemonic index for the title.
	         */
	        set: function (value) {
	            if (this._mnemonic === value) {
	                return;
	            }
	            this._mnemonic = value;
	            this.changed.emit(void 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Title.prototype, "icon", {
	        /**
	         * Get the icon class name for the title.
	         *
	         * #### Notes
	         * The default value is an empty string.
	         */
	        get: function () {
	            return this._icon;
	        },
	        /**
	         * Set the icon class name for the title.
	         *
	         * #### Notes
	         * Multiple class names can be separated with whitespace.
	         */
	        set: function (value) {
	            if (this._icon === value) {
	                return;
	            }
	            this._icon = value;
	            this.changed.emit(void 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Title.prototype, "caption", {
	        /**
	         * Get the caption for the title.
	         *
	         * #### Notes
	         * The default value is an empty string.
	         */
	        get: function () {
	            return this._caption;
	        },
	        /**
	         * Set the caption for the title.
	         */
	        set: function (value) {
	            if (this._caption === value) {
	                return;
	            }
	            this._caption = value;
	            this.changed.emit(void 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Title.prototype, "className", {
	        /**
	         * Get the extra class name for the title.
	         *
	         * #### Notes
	         * The default value is an empty string.
	         */
	        get: function () {
	            return this._className;
	        },
	        /**
	         * Set the extra class name for the title.
	         *
	         * #### Notes
	         * Multiple class names can be separated with whitespace.
	         */
	        set: function (value) {
	            if (this._className === value) {
	                return;
	            }
	            this._className = value;
	            this.changed.emit(void 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Title.prototype, "closable", {
	        /**
	         * Get the closable state for the title.
	         *
	         * #### Notes
	         * The default value is `false`.
	         */
	        get: function () {
	            return this._closable;
	        },
	        /**
	         * Set the closable state for the title.
	         *
	         * #### Notes
	         * This controls the presence of a close icon when applicable.
	         */
	        set: function (value) {
	            if (this._closable === value) {
	                return;
	            }
	            this._closable = value;
	            this.changed.emit(void 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Title;
	}());
	exports.Title = Title;
	// Define the signals for the `Title` class.
	signaling_1.defineSignal(Title.prototype, 'changed');
	
})
/** END DEFINE BLOCK for phosphor@0.7.0/lib/ui/title.js **/


/** START DEFINE BLOCK for rsjupyter@0.0.1/lib/index.css **/
jupyter.define('rsjupyter@0.0.1/lib/index.css', function (module, exports, __jupyter_require__) {
	// removed by extract-text-webpack-plugin
})
/** END DEFINE BLOCK for rsjupyter@0.0.1/lib/index.css **/

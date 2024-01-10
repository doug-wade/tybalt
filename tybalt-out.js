(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ../../node_modules/prismjs/prism.js
  var require_prism = __commonJS({
    "../../node_modules/prismjs/prism.js"(exports, module) {
      var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
      var Prism2 = function(_self2) {
        var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
        var uniqueId = 0;
        var plainTextGrammar = {};
        var _ = {
          /**
           * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
           * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
           * additional languages or plugins yourself.
           *
           * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
           *
           * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
           * empty Prism object into the global scope before loading the Prism script like this:
           *
           * ```js
           * window.Prism = window.Prism || {};
           * Prism.manual = true;
           * // add a new <script> to load Prism's script
           * ```
           *
           * @default false
           * @type {boolean}
           * @memberof Prism
           * @public
           */
          manual: _self2.Prism && _self2.Prism.manual,
          /**
           * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
           * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
           * own worker, you don't want it to do this.
           *
           * By setting this value to `true`, Prism will not add its own listeners to the worker.
           *
           * You obviously have to change this value before Prism executes. To do this, you can add an
           * empty Prism object into the global scope before loading the Prism script like this:
           *
           * ```js
           * window.Prism = window.Prism || {};
           * Prism.disableWorkerMessageHandler = true;
           * // Load Prism's script
           * ```
           *
           * @default false
           * @type {boolean}
           * @memberof Prism
           * @public
           */
          disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
          /**
           * A namespace for utility methods.
           *
           * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
           * change or disappear at any time.
           *
           * @namespace
           * @memberof Prism
           */
          util: {
            encode: function encode(tokens) {
              if (tokens instanceof Token) {
                return new Token(tokens.type, encode(tokens.content), tokens.alias);
              } else if (Array.isArray(tokens)) {
                return tokens.map(encode);
              } else {
                return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
              }
            },
            /**
             * Returns the name of the type of the given value.
             *
             * @param {any} o
             * @returns {string}
             * @example
             * type(null)      === 'Null'
             * type(undefined) === 'Undefined'
             * type(123)       === 'Number'
             * type('foo')     === 'String'
             * type(true)      === 'Boolean'
             * type([1, 2])    === 'Array'
             * type({})        === 'Object'
             * type(String)    === 'Function'
             * type(/abc+/)    === 'RegExp'
             */
            type: function(o) {
              return Object.prototype.toString.call(o).slice(8, -1);
            },
            /**
             * Returns a unique number for the given object. Later calls will still return the same number.
             *
             * @param {Object} obj
             * @returns {number}
             */
            objId: function(obj) {
              if (!obj["__id"]) {
                Object.defineProperty(obj, "__id", { value: ++uniqueId });
              }
              return obj["__id"];
            },
            /**
             * Creates a deep clone of the given object.
             *
             * The main intended use of this function is to clone language definitions.
             *
             * @param {T} o
             * @param {Record<number, any>} [visited]
             * @returns {T}
             * @template T
             */
            clone: function deepClone(o, visited) {
              visited = visited || {};
              var clone;
              var id;
              switch (_.util.type(o)) {
                case "Object":
                  id = _.util.objId(o);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone = /** @type {Record<string, any>} */
                  {};
                  visited[id] = clone;
                  for (var key in o) {
                    if (o.hasOwnProperty(key)) {
                      clone[key] = deepClone(o[key], visited);
                    }
                  }
                  return (
                    /** @type {any} */
                    clone
                  );
                case "Array":
                  id = _.util.objId(o);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone = [];
                  visited[id] = clone;
                  /** @type {Array} */
                  /** @type {any} */
                  o.forEach(function(v, i) {
                    clone[i] = deepClone(v, visited);
                  });
                  return (
                    /** @type {any} */
                    clone
                  );
                default:
                  return o;
              }
            },
            /**
             * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
             *
             * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
             *
             * @param {Element} element
             * @returns {string}
             */
            getLanguage: function(element) {
              while (element) {
                var m = lang.exec(element.className);
                if (m) {
                  return m[1].toLowerCase();
                }
                element = element.parentElement;
              }
              return "none";
            },
            /**
             * Sets the Prism `language-xxxx` class of the given element.
             *
             * @param {Element} element
             * @param {string} language
             * @returns {void}
             */
            setLanguage: function(element, language) {
              element.className = element.className.replace(RegExp(lang, "gi"), "");
              element.classList.add("language-" + language);
            },
            /**
             * Returns the script element that is currently executing.
             *
             * This does __not__ work for line script element.
             *
             * @returns {HTMLScriptElement | null}
             */
            currentScript: function() {
              if (typeof document === "undefined") {
                return null;
              }
              if ("currentScript" in document && 1 < 2) {
                return (
                  /** @type {any} */
                  document.currentScript
                );
              }
              try {
                throw new Error();
              } catch (err) {
                var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
                if (src) {
                  var scripts = document.getElementsByTagName("script");
                  for (var i in scripts) {
                    if (scripts[i].src == src) {
                      return scripts[i];
                    }
                  }
                }
                return null;
              }
            },
            /**
             * Returns whether a given class is active for `element`.
             *
             * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
             * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
             * given class is just the given class with a `no-` prefix.
             *
             * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
             * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
             * ancestors have the given class or the negated version of it, then the default activation will be returned.
             *
             * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
             * version of it, the class is considered active.
             *
             * @param {Element} element
             * @param {string} className
             * @param {boolean} [defaultActivation=false]
             * @returns {boolean}
             */
            isActive: function(element, className, defaultActivation) {
              var no = "no-" + className;
              while (element) {
                var classList = element.classList;
                if (classList.contains(className)) {
                  return true;
                }
                if (classList.contains(no)) {
                  return false;
                }
                element = element.parentElement;
              }
              return !!defaultActivation;
            }
          },
          /**
           * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
           *
           * @namespace
           * @memberof Prism
           * @public
           */
          languages: {
            /**
             * The grammar for plain, unformatted text.
             */
            plain: plainTextGrammar,
            plaintext: plainTextGrammar,
            text: plainTextGrammar,
            txt: plainTextGrammar,
            /**
             * Creates a deep copy of the language with the given id and appends the given tokens.
             *
             * If a token in `redef` also appears in the copied language, then the existing token in the copied language
             * will be overwritten at its original position.
             *
             * ## Best practices
             *
             * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
             * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
             * understand the language definition because, normally, the order of tokens matters in Prism grammars.
             *
             * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
             * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
             *
             * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
             * @param {Grammar} redef The new tokens to append.
             * @returns {Grammar} The new language created.
             * @public
             * @example
             * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
             *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
             *     // at its original position
             *     'comment': { ... },
             *     // CSS doesn't have a 'color' token, so this token will be appended
             *     'color': /\b(?:red|green|blue)\b/
             * });
             */
            extend: function(id, redef) {
              var lang2 = _.util.clone(_.languages[id]);
              for (var key in redef) {
                lang2[key] = redef[key];
              }
              return lang2;
            },
            /**
             * Inserts tokens _before_ another token in a language definition or any other grammar.
             *
             * ## Usage
             *
             * This helper method makes it easy to modify existing languages. For example, the CSS language definition
             * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
             * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
             * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
             * this:
             *
             * ```js
             * Prism.languages.markup.style = {
             *     // token
             * };
             * ```
             *
             * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
             * before existing tokens. For the CSS example above, you would use it like this:
             *
             * ```js
             * Prism.languages.insertBefore('markup', 'cdata', {
             *     'style': {
             *         // token
             *     }
             * });
             * ```
             *
             * ## Special cases
             *
             * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
             * will be ignored.
             *
             * This behavior can be used to insert tokens after `before`:
             *
             * ```js
             * Prism.languages.insertBefore('markup', 'comment', {
             *     'comment': Prism.languages.markup.comment,
             *     // tokens after 'comment'
             * });
             * ```
             *
             * ## Limitations
             *
             * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
             * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
             * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
             * deleting properties which is necessary to insert at arbitrary positions.
             *
             * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
             * Instead, it will create a new object and replace all references to the target object with the new one. This
             * can be done without temporarily deleting properties, so the iteration order is well-defined.
             *
             * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
             * you hold the target object in a variable, then the value of the variable will not change.
             *
             * ```js
             * var oldMarkup = Prism.languages.markup;
             * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
             *
             * assert(oldMarkup !== Prism.languages.markup);
             * assert(newMarkup === Prism.languages.markup);
             * ```
             *
             * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
             * object to be modified.
             * @param {string} before The key to insert before.
             * @param {Grammar} insert An object containing the key-value pairs to be inserted.
             * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
             * object to be modified.
             *
             * Defaults to `Prism.languages`.
             * @returns {Grammar} The new grammar object.
             * @public
             */
            insertBefore: function(inside, before, insert, root) {
              root = root || /** @type {any} */
              _.languages;
              var grammar = root[inside];
              var ret = {};
              for (var token in grammar) {
                if (grammar.hasOwnProperty(token)) {
                  if (token == before) {
                    for (var newToken in insert) {
                      if (insert.hasOwnProperty(newToken)) {
                        ret[newToken] = insert[newToken];
                      }
                    }
                  }
                  if (!insert.hasOwnProperty(token)) {
                    ret[token] = grammar[token];
                  }
                }
              }
              var old = root[inside];
              root[inside] = ret;
              _.languages.DFS(_.languages, function(key, value) {
                if (value === old && key != inside) {
                  this[key] = ret;
                }
              });
              return ret;
            },
            // Traverse a language definition with Depth First Search
            DFS: function DFS(o, callback, type, visited) {
              visited = visited || {};
              var objId = _.util.objId;
              for (var i in o) {
                if (o.hasOwnProperty(i)) {
                  callback.call(o, i, o[i], type || i);
                  var property = o[i];
                  var propertyType = _.util.type(property);
                  if (propertyType === "Object" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, null, visited);
                  } else if (propertyType === "Array" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, i, visited);
                  }
                }
              }
            }
          },
          plugins: {},
          /**
           * This is the most high-level function in Prism’s API.
           * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
           * each one of them.
           *
           * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
           *
           * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
           * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
           * @memberof Prism
           * @public
           */
          highlightAll: function(async, callback) {
            _.highlightAllUnder(document, async, callback);
          },
          /**
           * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
           * {@link Prism.highlightElement} on each one of them.
           *
           * The following hooks will be run:
           * 1. `before-highlightall`
           * 2. `before-all-elements-highlight`
           * 3. All hooks of {@link Prism.highlightElement} for each element.
           *
           * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
           * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
           * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
           * @memberof Prism
           * @public
           */
          highlightAllUnder: function(container, async, callback) {
            var env = {
              callback,
              container,
              selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            _.hooks.run("before-highlightall", env);
            env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
            _.hooks.run("before-all-elements-highlight", env);
            for (var i = 0, element; element = env.elements[i++]; ) {
              _.highlightElement(element, async === true, env.callback);
            }
          },
          /**
           * Highlights the code inside a single element.
           *
           * The following hooks will be run:
           * 1. `before-sanity-check`
           * 2. `before-highlight`
           * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
           * 4. `before-insert`
           * 5. `after-highlight`
           * 6. `complete`
           *
           * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
           * the element's language.
           *
           * @param {Element} element The element containing the code.
           * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
           * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
           * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
           * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
           *
           * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
           * asynchronous highlighting to work. You can build your own bundle on the
           * [Download page](https://prismjs.com/download.html).
           * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
           * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
           * @memberof Prism
           * @public
           */
          highlightElement: function(element, async, callback) {
            var language = _.util.getLanguage(element);
            var grammar = _.languages[language];
            _.util.setLanguage(element, language);
            var parent = element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === "pre") {
              _.util.setLanguage(parent, language);
            }
            var code = element.textContent;
            var env = {
              element,
              language,
              grammar,
              code
            };
            function insertHighlightedCode(highlightedCode) {
              env.highlightedCode = highlightedCode;
              _.hooks.run("before-insert", env);
              env.element.innerHTML = env.highlightedCode;
              _.hooks.run("after-highlight", env);
              _.hooks.run("complete", env);
              callback && callback.call(env.element);
            }
            _.hooks.run("before-sanity-check", env);
            parent = env.element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
              parent.setAttribute("tabindex", "0");
            }
            if (!env.code) {
              _.hooks.run("complete", env);
              callback && callback.call(env.element);
              return;
            }
            _.hooks.run("before-highlight", env);
            if (!env.grammar) {
              insertHighlightedCode(_.util.encode(env.code));
              return;
            }
            if (async && _self2.Worker) {
              var worker = new Worker(_.filename);
              worker.onmessage = function(evt) {
                insertHighlightedCode(evt.data);
              };
              worker.postMessage(JSON.stringify({
                language: env.language,
                code: env.code,
                immediateClose: true
              }));
            } else {
              insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
            }
          },
          /**
           * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
           * and the language definitions to use, and returns a string with the HTML produced.
           *
           * The following hooks will be run:
           * 1. `before-tokenize`
           * 2. `after-tokenize`
           * 3. `wrap`: On each {@link Token}.
           *
           * @param {string} text A string with the code to be highlighted.
           * @param {Grammar} grammar An object containing the tokens to use.
           *
           * Usually a language definition like `Prism.languages.markup`.
           * @param {string} language The name of the language definition passed to `grammar`.
           * @returns {string} The highlighted HTML.
           * @memberof Prism
           * @public
           * @example
           * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
           */
          highlight: function(text, grammar, language) {
            var env = {
              code: text,
              grammar,
              language
            };
            _.hooks.run("before-tokenize", env);
            if (!env.grammar) {
              throw new Error('The language "' + env.language + '" has no grammar.');
            }
            env.tokens = _.tokenize(env.code, env.grammar);
            _.hooks.run("after-tokenize", env);
            return Token.stringify(_.util.encode(env.tokens), env.language);
          },
          /**
           * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
           * and the language definitions to use, and returns an array with the tokenized code.
           *
           * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
           *
           * This method could be useful in other contexts as well, as a very crude parser.
           *
           * @param {string} text A string with the code to be highlighted.
           * @param {Grammar} grammar An object containing the tokens to use.
           *
           * Usually a language definition like `Prism.languages.markup`.
           * @returns {TokenStream} An array of strings and tokens, a token stream.
           * @memberof Prism
           * @public
           * @example
           * let code = `var foo = 0;`;
           * let tokens = Prism.tokenize(code, Prism.languages.javascript);
           * tokens.forEach(token => {
           *     if (token instanceof Prism.Token && token.type === 'number') {
           *         console.log(`Found numeric literal: ${token.content}`);
           *     }
           * });
           */
          tokenize: function(text, grammar) {
            var rest = grammar.rest;
            if (rest) {
              for (var token in rest) {
                grammar[token] = rest[token];
              }
              delete grammar.rest;
            }
            var tokenList = new LinkedList();
            addAfter(tokenList, tokenList.head, text);
            matchGrammar(text, tokenList, grammar, tokenList.head, 0);
            return toArray(tokenList);
          },
          /**
           * @namespace
           * @memberof Prism
           * @public
           */
          hooks: {
            all: {},
            /**
             * Adds the given callback to the list of callbacks for the given hook.
             *
             * The callback will be invoked when the hook it is registered for is run.
             * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
             *
             * One callback function can be registered to multiple hooks and the same hook multiple times.
             *
             * @param {string} name The name of the hook.
             * @param {HookCallback} callback The callback function which is given environment variables.
             * @public
             */
            add: function(name, callback) {
              var hooks = _.hooks.all;
              hooks[name] = hooks[name] || [];
              hooks[name].push(callback);
            },
            /**
             * Runs a hook invoking all registered callbacks with the given environment variables.
             *
             * Callbacks will be invoked synchronously and in the order in which they were registered.
             *
             * @param {string} name The name of the hook.
             * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
             * @public
             */
            run: function(name, env) {
              var callbacks = _.hooks.all[name];
              if (!callbacks || !callbacks.length) {
                return;
              }
              for (var i = 0, callback; callback = callbacks[i++]; ) {
                callback(env);
              }
            }
          },
          Token
        };
        _self2.Prism = _;
        function Token(type, content, alias, matchedStr) {
          this.type = type;
          this.content = content;
          this.alias = alias;
          this.length = (matchedStr || "").length | 0;
        }
        Token.stringify = function stringify(o, language) {
          if (typeof o == "string") {
            return o;
          }
          if (Array.isArray(o)) {
            var s = "";
            o.forEach(function(e) {
              s += stringify(e, language);
            });
            return s;
          }
          var env = {
            type: o.type,
            content: stringify(o.content, language),
            tag: "span",
            classes: ["token", o.type],
            attributes: {},
            language
          };
          var aliases = o.alias;
          if (aliases) {
            if (Array.isArray(aliases)) {
              Array.prototype.push.apply(env.classes, aliases);
            } else {
              env.classes.push(aliases);
            }
          }
          _.hooks.run("wrap", env);
          var attributes = "";
          for (var name in env.attributes) {
            attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
          }
          return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
        };
        function matchPattern(pattern, pos, text, lookbehind) {
          pattern.lastIndex = pos;
          var match = pattern.exec(text);
          if (match && lookbehind && match[1]) {
            var lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
          }
          return match;
        }
        function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
          for (var token in grammar) {
            if (!grammar.hasOwnProperty(token) || !grammar[token]) {
              continue;
            }
            var patterns = grammar[token];
            patterns = Array.isArray(patterns) ? patterns : [patterns];
            for (var j = 0; j < patterns.length; ++j) {
              if (rematch && rematch.cause == token + "," + j) {
                return;
              }
              var patternObj = patterns[j];
              var inside = patternObj.inside;
              var lookbehind = !!patternObj.lookbehind;
              var greedy = !!patternObj.greedy;
              var alias = patternObj.alias;
              if (greedy && !patternObj.pattern.global) {
                var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
              }
              var pattern = patternObj.pattern || patternObj;
              for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
                if (rematch && pos >= rematch.reach) {
                  break;
                }
                var str = currentNode.value;
                if (tokenList.length > text.length) {
                  return;
                }
                if (str instanceof Token) {
                  continue;
                }
                var removeCount = 1;
                var match;
                if (greedy) {
                  match = matchPattern(pattern, pos, text, lookbehind);
                  if (!match || match.index >= text.length) {
                    break;
                  }
                  var from = match.index;
                  var to = match.index + match[0].length;
                  var p = pos;
                  p += currentNode.value.length;
                  while (from >= p) {
                    currentNode = currentNode.next;
                    p += currentNode.value.length;
                  }
                  p -= currentNode.value.length;
                  pos = p;
                  if (currentNode.value instanceof Token) {
                    continue;
                  }
                  for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                    removeCount++;
                    p += k.value.length;
                  }
                  removeCount--;
                  str = text.slice(pos, p);
                  match.index -= pos;
                } else {
                  match = matchPattern(pattern, 0, str, lookbehind);
                  if (!match) {
                    continue;
                  }
                }
                var from = match.index;
                var matchStr = match[0];
                var before = str.slice(0, from);
                var after = str.slice(from + matchStr.length);
                var reach = pos + str.length;
                if (rematch && reach > rematch.reach) {
                  rematch.reach = reach;
                }
                var removeFrom = currentNode.prev;
                if (before) {
                  removeFrom = addAfter(tokenList, removeFrom, before);
                  pos += before.length;
                }
                removeRange(tokenList, removeFrom, removeCount);
                var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                currentNode = addAfter(tokenList, removeFrom, wrapped);
                if (after) {
                  addAfter(tokenList, currentNode, after);
                }
                if (removeCount > 1) {
                  var nestedRematch = {
                    cause: token + "," + j,
                    reach
                  };
                  matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                  if (rematch && nestedRematch.reach > rematch.reach) {
                    rematch.reach = nestedRematch.reach;
                  }
                }
              }
            }
          }
        }
        function LinkedList() {
          var head = { value: null, prev: null, next: null };
          var tail = { value: null, prev: head, next: null };
          head.next = tail;
          this.head = head;
          this.tail = tail;
          this.length = 0;
        }
        function addAfter(list, node, value) {
          var next = node.next;
          var newNode = { value, prev: node, next };
          node.next = newNode;
          next.prev = newNode;
          list.length++;
          return newNode;
        }
        function removeRange(list, node, count) {
          var next = node.next;
          for (var i = 0; i < count && next !== list.tail; i++) {
            next = next.next;
          }
          node.next = next;
          next.prev = node;
          list.length -= i;
        }
        function toArray(list) {
          var array = [];
          var node = list.head.next;
          while (node !== list.tail) {
            array.push(node.value);
            node = node.next;
          }
          return array;
        }
        if (!_self2.document) {
          if (!_self2.addEventListener) {
            return _;
          }
          if (!_.disableWorkerMessageHandler) {
            _self2.addEventListener("message", function(evt) {
              var message = JSON.parse(evt.data);
              var lang2 = message.language;
              var code = message.code;
              var immediateClose = message.immediateClose;
              _self2.postMessage(_.highlight(code, _.languages[lang2], lang2));
              if (immediateClose) {
                _self2.close();
              }
            }, false);
          }
          return _;
        }
        var script = _.util.currentScript();
        if (script) {
          _.filename = script.src;
          if (script.hasAttribute("data-manual")) {
            _.manual = true;
          }
        }
        function highlightAutomaticallyCallback() {
          if (!_.manual) {
            _.highlightAll();
          }
        }
        if (!_.manual) {
          var readyState = document.readyState;
          if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
            document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
          } else {
            if (window.requestAnimationFrame) {
              window.requestAnimationFrame(highlightAutomaticallyCallback);
            } else {
              window.setTimeout(highlightAutomaticallyCallback, 16);
            }
          }
        }
        return _;
      }(_self);
      if (typeof module !== "undefined" && module.exports) {
        module.exports = Prism2;
      }
      if (typeof global !== "undefined") {
        global.Prism = Prism2;
      }
      Prism2.languages.markup = {
        "comment": {
          pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
          greedy: true
        },
        "prolog": {
          pattern: /<\?[\s\S]+?\?>/,
          greedy: true
        },
        "doctype": {
          // https://www.w3.org/TR/xml/#NT-doctypedecl
          pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
          greedy: true,
          inside: {
            "internal-subset": {
              pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
              lookbehind: true,
              greedy: true,
              inside: null
              // see below
            },
            "string": {
              pattern: /"[^"]*"|'[^']*'/,
              greedy: true
            },
            "punctuation": /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/i,
            "name": /[^\s<>'"]+/
          }
        },
        "cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          greedy: true
        },
        "tag": {
          pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
          greedy: true,
          inside: {
            "tag": {
              pattern: /^<\/?[^\s>\/]+/,
              inside: {
                "punctuation": /^<\/?/,
                "namespace": /^[^\s>\/:]+:/
              }
            },
            "special-attr": [],
            "attr-value": {
              pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
              inside: {
                "punctuation": [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  {
                    pattern: /^(\s*)["']|["']$/,
                    lookbehind: true
                  }
                ]
              }
            },
            "punctuation": /\/?>/,
            "attr-name": {
              pattern: /[^\s>\/]+/,
              inside: {
                "namespace": /^[^\s>\/:]+:/
              }
            }
          }
        },
        "entity": [
          {
            pattern: /&[\da-z]{1,8};/i,
            alias: "named-entity"
          },
          /&#x?[\da-f]{1,8};/i
        ]
      };
      Prism2.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism2.languages.markup["entity"];
      Prism2.languages.markup["doctype"].inside["internal-subset"].inside = Prism2.languages.markup;
      Prism2.hooks.add("wrap", function(env) {
        if (env.type === "entity") {
          env.attributes["title"] = env.content.replace(/&amp;/, "&");
        }
      });
      Object.defineProperty(Prism2.languages.markup.tag, "addInlined", {
        /**
         * Adds an inlined language to markup.
         *
         * An example of an inlined language is CSS with `<style>` tags.
         *
         * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
         * case insensitive.
         * @param {string} lang The language key.
         * @example
         * addInlined('style', 'css');
         */
        value: function addInlined(tagName, lang) {
          var includedCdataInside = {};
          includedCdataInside["language-" + lang] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: true,
            inside: Prism2.languages[lang]
          };
          includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
          var inside = {
            "included-cdata": {
              pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
              inside: includedCdataInside
            }
          };
          inside["language-" + lang] = {
            pattern: /[\s\S]+/,
            inside: Prism2.languages[lang]
          };
          var def = {};
          def[tagName] = {
            pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
              return tagName;
            }), "i"),
            lookbehind: true,
            greedy: true,
            inside
          };
          Prism2.languages.insertBefore("markup", "cdata", def);
        }
      });
      Object.defineProperty(Prism2.languages.markup.tag, "addAttribute", {
        /**
         * Adds an pattern to highlight languages embedded in HTML attributes.
         *
         * An example of an inlined language is CSS with `style` attributes.
         *
         * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
         * case insensitive.
         * @param {string} lang The language key.
         * @example
         * addAttribute('style', 'css');
         */
        value: function(attrName, lang) {
          Prism2.languages.markup.tag.inside["special-attr"].push({
            pattern: RegExp(
              /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
              "i"
            ),
            lookbehind: true,
            inside: {
              "attr-name": /^[^\s=]+/,
              "attr-value": {
                pattern: /=[\s\S]+/,
                inside: {
                  "value": {
                    pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                    lookbehind: true,
                    alias: [lang, "language-" + lang],
                    inside: Prism2.languages[lang]
                  },
                  "punctuation": [
                    {
                      pattern: /^=/,
                      alias: "attr-equals"
                    },
                    /"|'/
                  ]
                }
              }
            }
          });
        }
      });
      Prism2.languages.html = Prism2.languages.markup;
      Prism2.languages.mathml = Prism2.languages.markup;
      Prism2.languages.svg = Prism2.languages.markup;
      Prism2.languages.xml = Prism2.languages.extend("markup", {});
      Prism2.languages.ssml = Prism2.languages.xml;
      Prism2.languages.atom = Prism2.languages.xml;
      Prism2.languages.rss = Prism2.languages.xml;
      (function(Prism3) {
        var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
        Prism3.languages.css = {
          "comment": /\/\*[\s\S]*?\*\//,
          "atrule": {
            pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
            inside: {
              "rule": /^@[\w-]+/,
              "selector-function-argument": {
                pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                lookbehind: true,
                alias: "selector"
              },
              "keyword": {
                pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                lookbehind: true
              }
              // See rest below
            }
          },
          "url": {
            // https://drafts.csswg.org/css-values-3/#urls
            pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
            greedy: true,
            inside: {
              "function": /^url/i,
              "punctuation": /^\(|\)$/,
              "string": {
                pattern: RegExp("^" + string.source + "$"),
                alias: "url"
              }
            }
          },
          "selector": {
            pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
            lookbehind: true
          },
          "string": {
            pattern: string,
            greedy: true
          },
          "property": {
            pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: true
          },
          "important": /!important\b/i,
          "function": {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: true
          },
          "punctuation": /[(){};:,]/
        };
        Prism3.languages.css["atrule"].inside.rest = Prism3.languages.css;
        var markup = Prism3.languages.markup;
        if (markup) {
          markup.tag.addInlined("style", "css");
          markup.tag.addAttribute("style", "css");
        }
      })(Prism2);
      Prism2.languages.clike = {
        "comment": [
          {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true,
            greedy: true
          },
          {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
          }
        ],
        "string": {
          pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        "class-name": {
          pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
          lookbehind: true,
          inside: {
            "punctuation": /[.\\]/
          }
        },
        "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
        "boolean": /\b(?:false|true)\b/,
        "function": /\b\w+(?=\()/,
        "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        "punctuation": /[{}[\];(),.:]/
      };
      Prism2.languages.javascript = Prism2.languages.extend("clike", {
        "class-name": [
          Prism2.languages.clike["class-name"],
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: true
          }
        ],
        "keyword": [
          {
            pattern: /((?:^|\})\s*)catch\b/,
            lookbehind: true
          },
          {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: true
          }
        ],
        // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
        "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        "number": {
          pattern: RegExp(
            /(^|[^\w$])/.source + "(?:" + // constant
            (/NaN|Infinity/.source + "|" + // binary integer
            /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
            /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
            /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
            /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
            /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
          ),
          lookbehind: true
        },
        "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
      });
      Prism2.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
      Prism2.languages.insertBefore("javascript", "keyword", {
        "regex": {
          pattern: RegExp(
            // lookbehind
            // eslint-disable-next-line regexp/no-dupe-characters-character-class
            /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
            // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
            // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
            // with the only syntax, so we have to define 2 different regex patterns.
            /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
            /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
            /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            "regex-source": {
              pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
              lookbehind: true,
              alias: "language-regex",
              inside: Prism2.languages.regex
            },
            "regex-delimiter": /^\/|\/$/,
            "regex-flags": /^[a-z]+$/
          }
        },
        // This must be declared before keyword because we use "function" inside the look-forward
        "function-variable": {
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
          alias: "function"
        },
        "parameter": [
          {
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: true,
            inside: Prism2.languages.javascript
          },
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: true,
            inside: Prism2.languages.javascript
          },
          {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: true,
            inside: Prism2.languages.javascript
          },
          {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: true,
            inside: Prism2.languages.javascript
          }
        ],
        "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
      });
      Prism2.languages.insertBefore("javascript", "string", {
        "hashbang": {
          pattern: /^#!.*/,
          greedy: true,
          alias: "comment"
        },
        "template-string": {
          pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
          greedy: true,
          inside: {
            "template-punctuation": {
              pattern: /^`|`$/,
              alias: "string"
            },
            "interpolation": {
              pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
              lookbehind: true,
              inside: {
                "interpolation-punctuation": {
                  pattern: /^\$\{|\}$/,
                  alias: "punctuation"
                },
                rest: Prism2.languages.javascript
              }
            },
            "string": /[\s\S]+/
          }
        },
        "string-property": {
          pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
          lookbehind: true,
          greedy: true,
          alias: "property"
        }
      });
      Prism2.languages.insertBefore("javascript", "operator", {
        "literal-property": {
          pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
          lookbehind: true,
          alias: "property"
        }
      });
      if (Prism2.languages.markup) {
        Prism2.languages.markup.tag.addInlined("script", "javascript");
        Prism2.languages.markup.tag.addAttribute(
          /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
          "javascript"
        );
      }
      Prism2.languages.js = Prism2.languages.javascript;
      (function() {
        if (typeof Prism2 === "undefined" || typeof document === "undefined") {
          return;
        }
        if (!Element.prototype.matches) {
          Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        }
        var LOADING_MESSAGE = "Loading\u2026";
        var FAILURE_MESSAGE = function(status, message) {
          return "\u2716 Error " + status + " while fetching file: " + message;
        };
        var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
        var EXTENSIONS = {
          "js": "javascript",
          "py": "python",
          "rb": "ruby",
          "ps1": "powershell",
          "psm1": "powershell",
          "sh": "bash",
          "bat": "batch",
          "h": "c",
          "tex": "latex"
        };
        var STATUS_ATTR = "data-src-status";
        var STATUS_LOADING = "loading";
        var STATUS_LOADED = "loaded";
        var STATUS_FAILED = "failed";
        var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
        function loadFile(src, success, error) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", src, true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              if (xhr.status < 400 && xhr.responseText) {
                success(xhr.responseText);
              } else {
                if (xhr.status >= 400) {
                  error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
                } else {
                  error(FAILURE_EMPTY_MESSAGE);
                }
              }
            }
          };
          xhr.send(null);
        }
        function parseRange(range) {
          var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
          if (m) {
            var start = Number(m[1]);
            var comma = m[2];
            var end = m[3];
            if (!comma) {
              return [start, start];
            }
            if (!end) {
              return [start, void 0];
            }
            return [start, Number(end)];
          }
          return void 0;
        }
        Prism2.hooks.add("before-highlightall", function(env) {
          env.selector += ", " + SELECTOR;
        });
        Prism2.hooks.add("before-sanity-check", function(env) {
          var pre = (
            /** @type {HTMLPreElement} */
            env.element
          );
          if (pre.matches(SELECTOR)) {
            env.code = "";
            pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
            var code = pre.appendChild(document.createElement("CODE"));
            code.textContent = LOADING_MESSAGE;
            var src = pre.getAttribute("data-src");
            var language = env.language;
            if (language === "none") {
              var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
              language = EXTENSIONS[extension] || extension;
            }
            Prism2.util.setLanguage(code, language);
            Prism2.util.setLanguage(pre, language);
            var autoloader = Prism2.plugins.autoloader;
            if (autoloader) {
              autoloader.loadLanguages(language);
            }
            loadFile(
              src,
              function(text) {
                pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
                var range = parseRange(pre.getAttribute("data-range"));
                if (range) {
                  var lines = text.split(/\r\n?|\n/g);
                  var start = range[0];
                  var end = range[1] == null ? lines.length : range[1];
                  if (start < 0) {
                    start += lines.length;
                  }
                  start = Math.max(0, Math.min(start - 1, lines.length));
                  if (end < 0) {
                    end += lines.length;
                  }
                  end = Math.max(0, Math.min(end, lines.length));
                  text = lines.slice(start, end).join("\n");
                  if (!pre.hasAttribute("data-start")) {
                    pre.setAttribute("data-start", String(start + 1));
                  }
                }
                code.textContent = text;
                Prism2.highlightElement(code);
              },
              function(error) {
                pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
                code.textContent = error;
              }
            );
          }
        });
        Prism2.plugins.fileHighlight = {
          /**
           * Executes the File Highlight plugin for all matching `pre` elements under the given container.
           *
           * Note: Elements which are already loaded or currently loading will not be touched by this method.
           *
           * @param {ParentNode} [container=document]
           */
          highlight: function highlight(container) {
            var elements = (container || document).querySelectorAll(SELECTOR);
            for (var i = 0, element; element = elements[i++]; ) {
              Prism2.highlightElement(element);
            }
          }
        };
        var logged = false;
        Prism2.fileHighlight = function() {
          if (!logged) {
            console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
            logged = true;
          }
          Prism2.plugins.fileHighlight.highlight.apply(this, arguments);
        };
      })();
    }
  });

  // ../core/dist/mjs/index.mjs
  var __create2 = Object.create;
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames2 = Object.getOwnPropertyNames;
  var __getProtoOf2 = Object.getPrototypeOf;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __commonJS2 = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps2 = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames2(from))
        if (!__hasOwnProp2.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var require_boolean = __commonJS2({
    "../parser/dist/api/boolean.js"(exports, module) {
      "use strict";
      var __defProp22 = Object.defineProperty;
      var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames22 = Object.getOwnPropertyNames;
      var __hasOwnProp22 = Object.prototype.hasOwnProperty;
      var __export = (target, all) => {
        for (var name in all)
          __defProp22(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps22 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames22(from))
            if (!__hasOwnProp22.call(to, key) && key !== except)
              __defProp22(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc22(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
      var boolean_exports = {};
      __export(boolean_exports, {
        default: () => boolean_default
      });
      module.exports = __toCommonJS(boolean_exports);
      var boolean_default = {
        parse(str) {
          if (str === "true") {
            return true;
          }
          if (str === "false") {
            return false;
          }
          return null;
        }
      };
    }
  });
  var require_json = __commonJS2({
    "../parser/dist/api/json.js"(exports, module) {
      "use strict";
      var __defProp22 = Object.defineProperty;
      var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames22 = Object.getOwnPropertyNames;
      var __hasOwnProp22 = Object.prototype.hasOwnProperty;
      var __export = (target, all) => {
        for (var name in all)
          __defProp22(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps22 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames22(from))
            if (!__hasOwnProp22.call(to, key) && key !== except)
              __defProp22(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc22(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
      var json_exports = {};
      __export(json_exports, {
        default: () => json_default
      });
      module.exports = __toCommonJS(json_exports);
      var json_default = {
        parse(str) {
          return JSON.parse(str);
        }
      };
    }
  });
  var require_string = __commonJS2({
    "../parser/dist/api/string.js"(exports, module) {
      "use strict";
      var __defProp22 = Object.defineProperty;
      var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames22 = Object.getOwnPropertyNames;
      var __hasOwnProp22 = Object.prototype.hasOwnProperty;
      var __export = (target, all) => {
        for (var name in all)
          __defProp22(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps22 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames22(from))
            if (!__hasOwnProp22.call(to, key) && key !== except)
              __defProp22(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc22(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
      var string_exports = {};
      __export(string_exports, {
        default: () => string_default2
      });
      module.exports = __toCommonJS(string_exports);
      var string_default2 = {
        parse(str) {
          if (str instanceof String) {
            return str;
          }
          return `${str}`;
        }
      };
    }
  });
  var require_number = __commonJS2({
    "../parser/dist/api/number.js"(exports, module) {
      "use strict";
      var __defProp22 = Object.defineProperty;
      var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames22 = Object.getOwnPropertyNames;
      var __hasOwnProp22 = Object.prototype.hasOwnProperty;
      var __export = (target, all) => {
        for (var name in all)
          __defProp22(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps22 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames22(from))
            if (!__hasOwnProp22.call(to, key) && key !== except)
              __defProp22(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc22(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
      var number_exports = {};
      __export(number_exports, {
        default: () => number_default
      });
      module.exports = __toCommonJS(number_exports);
      var number_default = {
        parse(str) {
          return Number(str);
        }
      };
    }
  });
  var require_standard = __commonJS2({
    "../parser/dist/api/standard.js"(exports, module) {
      "use strict";
      var __defProp22 = Object.defineProperty;
      var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames22 = Object.getOwnPropertyNames;
      var __hasOwnProp22 = Object.prototype.hasOwnProperty;
      var __export = (target, all) => {
        for (var name in all)
          __defProp22(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps22 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames22(from))
            if (!__hasOwnProp22.call(to, key) && key !== except)
              __defProp22(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc22(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
      var standard_exports = {};
      __export(standard_exports, {
        default: () => standard_default
      });
      module.exports = __toCommonJS(standard_exports);
      var standard_default = {
        parse(str) {
          if (str === void 0 || str === "undefined") {
            return void 0;
          }
          if (str === null || str === "null") {
            return null;
          }
          if (str === "true" || str === true) {
            return true;
          }
          if (str === "false" || str === false) {
            return false;
          }
          if (Array.isArray(str) || typeof str === "object") {
            return str;
          }
          if (str[0] === "{" || str[0] === "[") {
            try {
              return JSON.parse(str);
            } catch (e) {
            }
          }
          try {
            const parsed = Number(str);
            if (!Number.isNaN(parsed)) {
              return parsed;
            }
          } catch (e) {
          }
          return str;
        }
      };
    }
  });
  var require_dist = __commonJS2({
    "../parser/dist/index.js"(exports, module) {
      "use strict";
      var __create22 = Object.create;
      var __defProp22 = Object.defineProperty;
      var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames22 = Object.getOwnPropertyNames;
      var __getProtoOf22 = Object.getPrototypeOf;
      var __hasOwnProp22 = Object.prototype.hasOwnProperty;
      var __export = (target, all) => {
        for (var name in all)
          __defProp22(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps22 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames22(from))
            if (!__hasOwnProp22.call(to, key) && key !== except)
              __defProp22(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc22(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toESM22 = (mod, isNodeMode, target) => (target = mod != null ? __create22(__getProtoOf22(mod)) : {}, __copyProps22(
        // If the importer is in node compatibility mode or this is not an ESM
        // file that has been converted to a CommonJS file using a Babel-
        // compatible transform (i.e. "__esModule" has not been set), then set
        // "default" to the CommonJS "module.exports" for node compatibility.
        isNodeMode || !mod || !mod.__esModule ? __defProp22(target, "default", { value: mod, enumerable: true }) : target,
        mod
      ));
      var __toCommonJS = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
      var src_exports = {};
      __export(src_exports, {
        boolean: () => import_boolean.default,
        json: () => import_json.default,
        number: () => import_number.default,
        standard: () => import_standard.default,
        string: () => import_string.default
      });
      module.exports = __toCommonJS(src_exports);
      var import_boolean = __toESM22(require_boolean());
      var import_json = __toESM22(require_json());
      var import_string = __toESM22(require_string());
      var import_number = __toESM22(require_number());
      var import_standard = __toESM22(require_standard());
    }
  });
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }
  var byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
  }
  var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native_default = {
    randomUUID
  };
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var v4_default = v4;
  function forceRerenderOnUpdate(reactive2) {
    reactive2.isForcingRerenderOnUpdate = true;
    return reactive2;
  }
  var TYBALT_EVENT_PLACEHOLDER_ATTRIBUTE = "data-tybalt-event-placeholder";
  var TYBALT_SET_ATTRIBUTE_PLACEHOLDER_ATTRIBUTE = "data-tybalt-set-attribute-placeholder";
  var EVENT_LISTENER_REGEX = /\s+@\w+="/;
  var HTML_ATTRIBUTE_REGEX = /\s+(\w|-)+="[^"]*$/;
  var extractEventName = (str) => str.replace("@", "").split("=")[0];
  var prevAttribute = false;
  var renderToString = ({ strings, keys }, eventPlaceholders, setAttributePlaceholders) => {
    return strings.reduce((prev, current, i) => {
      let curr = current;
      const key = keys[i];
      if (prevAttribute) {
        const temp = curr.split('"');
        temp.shift();
        curr = temp.join('"');
        prevAttribute = false;
      }
      if (key === void 0 || key === null) {
        return `${prev}${curr}`;
      }
      if (HTML_ATTRIBUTE_REGEX.test(curr) && typeof key.addListener === "function") {
        const attributeChunks = curr.split('="');
        const attributePrefix = attributeChunks.pop();
        const htmlErrata = attributeChunks.join('="');
        const placeholder = v4_default();
        let suffix = "";
        if (!strings[i + 1].includes('"')) {
          throw new Error("Tybalt currently only supports one reactive per attribute. Please consolidate.");
        } else if (!strings[i + 1].startsWith('"')) {
          suffix = strings[i + 1].split('"')[0];
        }
        const chunks = htmlErrata.split(/\s+/);
        const attributeName = chunks[chunks.length - 1];
        setAttributePlaceholders.set(placeholder, {
          prefix: attributePrefix || "",
          reactive: key,
          suffix,
          attributeName
        });
        prevAttribute = true;
        return `${prev}${htmlErrata}="${attributePrefix}${key.value}${suffix}" ${TYBALT_SET_ATTRIBUTE_PLACEHOLDER_ATTRIBUTE}-${placeholder}="true"`;
      }
      if (typeof key.addListener === "function") {
        forceRerenderOnUpdate(key);
      }
      if (EVENT_LISTENER_REGEX.test(curr)) {
        const [preAt, postAt] = curr.split("@");
        const eventName = extractEventName(postAt);
        const placeholder = v4_default();
        eventPlaceholders.set(placeholder, { eventName, listener: key });
        return `${prev}${preAt}${TYBALT_EVENT_PLACEHOLDER_ATTRIBUTE}-${placeholder}="true`;
      }
      if (Array.isArray(key)) {
        const children = key.map((key2) => renderToString(key2, eventPlaceholders, setAttributePlaceholders)).join("");
        return `${prev}${curr}${children}`;
      }
      if (key?.addListener) {
        if (key?.value.strings && key?.value.keys) {
          return `${prev}${curr}${renderToString(key, eventPlaceholders, setAttributePlaceholders)}`;
        }
        if (Array.isArray(key.value)) {
          const children = key.value.map((templ) => renderToString(templ, eventPlaceholders, setAttributePlaceholders)).join("");
          return `${prev}${curr}${children}`;
        }
        return `${prev}${curr}${key.value}`;
      }
      if (key?.strings && key?.keys) {
        return `${prev}${curr}${renderToString(key, eventPlaceholders, setAttributePlaceholders)}`;
      }
      return `${prev}${curr}${key}`;
    }, "");
  };
  var render_default = (template) => {
    const mountPoint = document.createElement("div");
    const eventPlaceholders = /* @__PURE__ */ new Map();
    const setAttributePlaceholders = /* @__PURE__ */ new Map();
    mountPoint.innerHTML = renderToString(template, eventPlaceholders, setAttributePlaceholders);
    for (const [placeholder, { listener, eventName }] of eventPlaceholders.entries()) {
      const selector = `[${TYBALT_EVENT_PLACEHOLDER_ATTRIBUTE}-${placeholder}="true"]`;
      const placeheld = mountPoint.querySelector(selector);
      if (placeheld === null) {
        console.warn(`expected to find element with selector ${selector}`);
        continue;
      }
      placeheld.addEventListener(eventName, listener);
      placeheld.removeAttribute(`${TYBALT_EVENT_PLACEHOLDER_ATTRIBUTE}-${placeholder}`);
    }
    for (const [placeholder, { reactive: reactive2, attributeName, prefix, suffix }] of setAttributePlaceholders.entries()) {
      const selector = `[${TYBALT_SET_ATTRIBUTE_PLACEHOLDER_ATTRIBUTE}-${placeholder}="true"]`;
      const placeheld = mountPoint.querySelector(selector);
      if (placeheld === null) {
        console.warn(`expected to find element with selector ${selector}`);
        continue;
      }
      reactive2.addListener((value) => {
        placeheld.setAttribute(attributeName, `${prefix}${value}${suffix}`);
      });
      placeheld.removeAttribute(`${TYBALT_SET_ATTRIBUTE_PLACEHOLDER_ATTRIBUTE}-${placeholder}`);
    }
    return mountPoint.children;
  };
  var validator_default = (cb) => {
    return {
      async validate(value) {
        const result = await cb(value);
        if (result === void 0 || result === null || typeof result === "boolean" && result === true) {
          return {
            passed: true
          };
        }
        if (typeof result === "string") {
          return {
            passed: false,
            message: result,
            level: "error"
          };
        }
        if (typeof result === "boolean") {
          return {
            passed: result,
            level: "error"
          };
        }
        return result;
      }
    };
  };
  var levelNumbers = {
    error: 4,
    warn: 3,
    info: 2,
    debug: 1,
    silent: 0
  };
  var isMoreSevere = (current, previous) => {
    if (!current) {
      return false;
    }
    if (!previous) {
      return true;
    }
    const currentLevel = levelNumbers[current];
    const previousLevel = levelNumbers[previous];
    return currentLevel > previousLevel;
  };
  var getMostSevereLevel = (results) => {
    let mostSevere = void 0;
    results.forEach((result) => {
      if (isMoreSevere(result.level, mostSevere)) {
        mostSevere = result.level;
      }
    });
    return mostSevere;
  };
  var haveAllPassed = (results) => {
    return results.reduce((accumulator, result) => {
      return result.passed && accumulator;
    }, true);
  };
  var concatenateMessages = (results) => {
    const concatenatedMessages = results.map((result) => `  - (${result.level}) ${result.message}`).join("\n");
    if (concatenatedMessages.length) {
      return `Got validation failures:

${concatenatedMessages}
`;
    }
  };
  var compose_default = (...validators) => {
    return {
      async validate(value) {
        const promises = validators.map((validator) => {
          if (validator) {
            return validator.validate(value);
          }
          return Promise.resolve({ passed: true });
        });
        const results = await Promise.all(promises);
        const level = getMostSevereLevel(results);
        const message = concatenateMessages(results);
        const passed = haveAllPassed(results);
        return {
          level,
          message,
          passed
        };
      }
    };
  };
  var matches_pattern_default = (pattern) => {
    return validator_default(async (value) => {
      if (typeof pattern === "string") {
        return value.includes(pattern);
      } else {
        return pattern.test(value);
      }
    });
  };
  var one_of_default = (values) => {
    return validator_default(async (value) => {
      return values.includes(value);
    });
  };
  var required_default = () => {
    return validator_default(async (value) => {
      return !!value;
    });
  };
  var isValidatorFunction = (x) => typeof x === "function";
  var ensure_validator_default = (maybeValidator) => {
    if (isValidatorFunction(maybeValidator)) {
      return validator_default(maybeValidator);
    } else {
      return maybeValidator;
    }
  };
  var ValidationError = class extends Error {
  };
  var DEFAULT_MESSAGE = "A validator with no associated message failed.";
  var should_throw_default = (validator) => {
    return {
      async validate(value) {
        const result = await validator.validate(value);
        if (result.passed) {
          return;
        }
        if ("level" in result && result.level === "error") {
          throw new ValidationError(result.message || DEFAULT_MESSAGE);
        }
      }
    };
  };
  var with_message_default = (validator, message) => {
    const definitelyValidator = ensure_validator_default(validator);
    return {
      async validate(value) {
        const result = await definitelyValidator.validate(value);
        if (result.passed) {
          return result;
        }
        return {
          ...result,
          message
        };
      }
    };
  };
  var import_parser = __toESM2(require_dist());
  function reactive(initialValue, listeners = []) {
    const state = {
      value: initialValue,
      addListener(listener) {
        listeners.push(listener);
      },
      isForcingRerenderOnUpdate: false
    };
    const handler = {
      get(target, prop) {
        if (prop === "value") {
          return state.value;
        } else if (prop === "addListener") {
          return state.addListener;
        } else if (prop === "isForcingRerenderOnUpdate") {
          return state.isForcingRerenderOnUpdate;
        } else if (typeof state.value === "string" || typeof state.value === "number") {
          return state;
        } else if (state.value) {
          return Reflect.get(state.value, prop);
        } else {
          return void 0;
        }
      },
      set(obj, prop, value) {
        if (prop === "value") {
          state.value = value;
          try {
            listeners.forEach((listener) => listener(value));
          } catch (e) {
            console.error(e);
            return false;
          }
          return true;
        } else {
          return Reflect.set(obj, prop, value);
        }
      }
    };
    return new Proxy(state, handler);
  }
  var reactive_default = reactive;
  function isReactiveContainer(candidate) {
    return candidate.reactive !== void 0;
  }
  function derive(from = [], mapper) {
    let fromArray;
    if (Array.isArray(from)) {
      fromArray = from;
    } else if (isReactiveContainer(from)) {
      fromArray = [from.reactive];
    } else {
      fromArray = [from];
    }
    const initialValue = mapper(fromArray.map((v) => v.value));
    const derivedReactive = reactive_default(initialValue);
    const listener = () => {
      const newState = mapper(fromArray.map((v) => v.value));
      derivedReactive.value = newState;
    };
    fromArray.forEach((source) => {
      source.addListener(listener);
    });
    return derivedReactive;
  }
  var derive_default = derive;
  var TybaltContextEvent = class extends Event {
    #context;
    #callback;
    #subscribe;
    constructor(context, callback, options) {
      super("context-request");
      this.#context = context;
      this.#callback = callback;
      this.#subscribe = options?.subscribe || false;
    }
    get context() {
      return this.#context;
    }
    get callback() {
      return this.#callback;
    }
    get subscribe() {
      return this.#subscribe;
    }
  };
  var context_event_default = TybaltContextEvent;
  var nameValidator = should_throw_default(
    with_message_default(
      compose_default(required_default(), matches_pattern_default(/.*-.*/)),
      `web component names are required and must contain a hyphen`
    )
  );
  var define_component_default = ({
    name,
    emits,
    props = {},
    setup,
    connectedCallback,
    disconnectedCallback,
    adoptedCallback,
    render: passedRender,
    shadowMode = "open",
    css,
    template,
    contexts = []
  }) => {
    nameValidator.validate(name);
    const clazz = class extends HTMLElement {
      // Closed shadow roots aren't attached to the class instance by default, so we
      // grab a reference to it ourselves for later use.
      #shadowRoot;
      // The context object passed to the component definition's setup method
      #setupContext;
      // A hash from the attribute name to its corresponding reactive and parser
      #props = {};
      // A hash from the render state key to its corresponding reactive (returned from the setup method)
      #renderState = /* @__PURE__ */ new Map();
      // The render method from the component definition
      #render = passedRender;
      // The css string or function from the component definition
      #css = css;
      // The template string from the component definition
      #template = template;
      // Whether or not the component is currently connected to the dom
      #isConnected = false;
      // All of the contexts to connect to
      // https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/context.md
      #contexts = /* @__PURE__ */ new Map();
      contextState = void 0;
      constructor() {
        super();
        this.#props = Object.entries(props).reduce(
          (accumulator, [key, value]) => {
            const parser = value.parser || import_parser.standard;
            let initialValue = null;
            try {
              initialValue = parser.parse(value.default);
            } catch (e) {
              initialValue = e;
            }
            const entry = {
              reactive: reactive_default(initialValue),
              parser: value.parser || import_parser.standard,
              value: initialValue
            };
            entry.reactive.addListener((value2) => entry.value = value2);
            accumulator[key] = entry;
            return accumulator;
          },
          {}
        );
        for (const [contextName, context] of Object.entries(contexts)) {
          const contextReactive = reactive_default(context.initialValue);
          this.dispatchEvent(
            new context_event_default(
              context,
              (value, unsubscribe) => {
                const contextState = this.#contexts.get(context) || {
                  value: void 0,
                  unsubscribe: void 0
                };
                if (unsubscribe !== contextState.unsubscribe) {
                  contextState.unsubscribe?.();
                }
                contextReactive.value = value;
                this.#contexts.set(contextName, { unsubscribe, reactive: contextReactive });
              },
              {
                subscribe: true
              }
            )
          );
          this.#contexts.set(contextName, { reactive: contextReactive });
          if (!this.#props[contextName]) {
            this.#renderState.set(contextName, contextReactive);
          } else {
            console.warn(`Collision detected between context and prop: ${contextName}`);
          }
        }
        const emit = (type, detail) => {
          if (emits && !emits?.includes(type)) {
            console.warn(`unexpected event emitted with type ${type} and detail ${detail}`);
          }
          this.dispatchEvent(new CustomEvent(type, { detail }));
        };
        this.#setupContext = {
          emit
        };
        const propsForSetup = Object.fromEntries([
          ...Object.entries(this.#props).map(([key, value]) => [key, value.reactive]),
          ...Array.from(this.#contexts.entries()).map(([key, value]) => [key, value.reactive])
        ]);
        const setupResults = setup?.call(this, propsForSetup, this.#setupContext) || {};
        for (const [key, value] of Object.entries({ ...propsForSetup, ...setupResults })) {
          if (value.addListener) {
            this.#renderState.set(key, value);
          } else if (typeof value === "function") {
            this.#renderState.set(key, value);
          } else {
            this.#renderState.set(key, reactive_default(value));
          }
        }
        for (const [attributeName, propValue] of Object.entries(this.#props)) {
          if (!this.#renderState.get(attributeName)) {
            const parsedReactive = derive_default(propValue.reactive, ([newValue]) => {
              return propValue.parser.parse(newValue.value);
            });
            this.#renderState.set(attributeName, parsedReactive);
          }
        }
        this.#shadowRoot = this.attachShadow({ mode: shadowMode });
        this.#doRender();
      }
      connectedCallback() {
        this.#isConnected = true;
        connectedCallback?.apply(this);
        this.#updateProps();
        this.#doRender();
      }
      disconnectedCallback() {
        this.#isConnected = false;
        disconnectedCallback?.apply(this);
        for (const context of this.#contexts.values()) {
          context.unsubscribe?.();
        }
      }
      adoptedCallback() {
        adoptedCallback?.apply(this);
      }
      attributeChangedCallback(name2, oldValue, newValue) {
        const entry = this.#props[name2];
        const parsed = entry.parser.parse(newValue);
        entry.reactive.value = parsed;
        this.#doRender();
      }
      #doRender() {
        if (!this.#isConnected || !this.#shadowRoot) {
          return;
        }
        this.#shadowRoot.innerHTML = "";
        if (this.#css) {
          const styleElement = document.createElement("style");
          const calculatedCss = typeof css === "function" ? css(this.#renderState) || "" : css;
          styleElement.innerHTML = calculatedCss || "";
          this.#shadowRoot?.appendChild(styleElement);
        }
        if (this.#render) {
          const renderResults = this.#render(Object.fromEntries(this.#renderState));
          let renderedNodes;
          if (renderResults) {
            renderedNodes = render_default(renderResults);
          } else {
            renderedNodes = [];
          }
          for (let i = 0; i < renderedNodes.length; i++) {
            try {
              this.#shadowRoot?.appendChild(renderedNodes[i]);
            } catch (e) {
              console.error(e);
            }
          }
          for (let i = 0; i < renderedNodes.length; i++) {
            try {
              const childNode = renderedNodes[i];
              this.#shadowRoot?.appendChild(childNode);
            } catch (e) {
              console.error(e);
            }
          }
        }
        if (this.#template) {
          const templateElement = document.createElement("template");
          templateElement.innerHTML = this.#template;
          const templateContent = templateElement.content;
          this.#shadowRoot?.appendChild(templateContent.cloneNode(true));
        }
        const renderReactiveListener = () => {
          this.#doRender();
        };
        for (const renderReactive of this.#renderState.values()) {
          if (!renderReactive?.addListener) {
            continue;
          }
          if (renderReactive.isForcingRerenderOnUpdate) {
            renderReactive.addListener(renderReactiveListener);
          }
        }
      }
      /**
       * Pushes the current value of all props into their corresponding reactives. Called
       * on connectedCallback.
       */
      #updateProps() {
        for (const [key, value] of Object.entries(this.#props)) {
          const attributeValue = this.getAttribute(key);
          const usingDefault = attributeValue === null && value.value;
          const areDifferent = attributeValue !== value.value;
          if (!usingDefault && areDifferent) {
            const nextValue = value.parser.parse(attributeValue);
            value.reactive.value = nextValue;
          }
        }
      }
    };
    try {
      customElements.define(name, clazz);
    } catch (e) {
      console.warn(`failed to define component ${name}`, e);
    }
    return clazz;
  };
  var html_default = (strings, ...keys) => {
    return { strings, keys };
  };
  var import_parser2 = __toESM2(require_dist());
  var switch_default = define_component_default({
    name: "t-switch",
    props: {
      value: {
        validator: required_default,
        parser: import_parser2.string
      }
    },
    render({ value }) {
      return html_default`<slot name="${value}"></slot>`;
    }
  });
  var getSlotName = (condition) => {
    if (condition === "true" || condition === true) {
      return "true";
    }
    return "false";
  };
  var if_default = define_component_default({
    name: "t-if",
    props: {
      condition: {
        validator: one_of_default(["true", "false", true, false])
      }
    },
    render({ condition }) {
      const slotName = getSlotName(condition);
      return html_default`<div><slot name="${slotName}"></slot></div>`;
    }
  });
  var import_parser3 = __toESM2(require_dist());
  var else_default = define_component_default({
    name: "t-if",
    props: {
      condition: {
        validator: one_of_default(["true", "false"]),
        parser: import_parser3.boolean
      }
    },
    render({ condition }) {
      let slotName;
      if (condition) {
        slotName = "false";
      } else {
        slotName = "true";
      }
      return html_default`<div><slot name="${slotName}"></slot></div>`;
    }
  });

  // components/sidebar.js
  var PACKAGES = [
    "cli",
    "core",
    "eleventy-plugin",
    "esbuild-plugin",
    "eslint-plugin",
    "parser",
    "reactive",
    "test-utils",
    "validator"
  ];
  var GUIDES = [
    "props",
    "events",
    "slots",
    "new-website",
    "styling-your-component",
    "writing-tests",
    "custom-validator",
    "data-fetching",
    "linting",
    "building"
  ];
  define_component_default({
    name: "tybalt-sidebar",
    shadowMode: "open",
    render() {
      const packageLis = PACKAGES.map((pkg) => {
        return html_default`
                <li>
                    <tybalt-link href="/pages/${pkg}">@tybalt/${pkg}</tybalt-link>
                </li>
            `;
      });
      const guideLis = GUIDES.map((guide) => {
        return html_default`
                <li>
                    <tybalt-link href="/pages/${guide}-guide">${guide.replaceAll("-", " ")}</tybalt-link>
                </li>
            `;
      });
      return html_default`
            <aside>
                <div>Individual Package Documentation</div>
                <ul>
                    ${packageLis}
                </ul>
                <div>Guides</div>
                <ul>
                    ${guideLis}
                </ul>
                <tybalt-link href="https://discord.gg/FHpfstT7Dw">Join the Discord server</tybalt-link>
                <tybalt-link href="https://dougwade.substack.com/">Subscribe to the Substack</tybalt-link>
            </aside>
        `;
    }
  });

  // components/main.js
  define_component_default({
    name: "tybalt-main",
    shadowMode: "open",
    render() {
      return html_default`<div>
            <h1>Tybalt</h1>
            <h2>A collection of tools for building web components</h2>
            <p>
                Tybalt is a collection of tools for building web components. It is designed to be modular, so you can
                use as much or as little as you want.
            </p>
            <p>
                Tybalt built with a "use the platform" mentality, so it uses the latest web platform features to provide
                the best developer experience.
            </p>
            <h2>Features</h2>
            <ul>
                <li>Static Site Generation</li>
                <li>Web Component Development</li>
                <li>Compiler</li>
                <li>Unit Testing</li>
                <li>Linting</li>
                <li>Parsing and Validation</li>
            </ul>
            <h2>Core Concepts</h2>
            <h3>Web Components</h3>
            <p>
                Tybalt exports tools for building web components. It uses templates, slots, custom elements and the
                shadow dom to implement rendering.
            </p>
            <tybalt-code-example language="javascript">
                import { defineComponent, html } from '@tybalt/core'; export default defineComponent({ name:
                'my-component', shadowMode: 'open', render() { return html\`
                <div>Hello World</div>
                \`; }, });
            </tybalt-code-example>
            <h3>Unit Testing</h3>
            <p>
                Tybalt exports tools for testing web components. It uses Jest and JSDOM to render web components in a
                test environment.
            </p>
            <tybalt-code-example language="javascript">
                import MyComponent from './my-component.js'; import { mount } from '@tybalt/test-utils';
                describe('my-component', () => { it('renders', async () => { const el = await mount(MyComponent);
                expect(el.shadowHtml()).toContain('Hello World'); }); });
            </tybalt-code-example>
            <h3>Compilation</h3>
            <p>
                Tybalt exports a compiler for compiling web components. It uses esbuild to compile web components to a
                single file and a plugin called @tybalt/esbuild-plugin.
            </p>
            <h3>Linting</h3>
            <p>
                Tybalt exports a linter for linting web components. It uses eslint to lint web components and a plugin
                called @tybalt/eslint-plugin.
            </p>
            <h2>Getting Started</h2>
            <p>The fastest way to get started is creating a static website</p>
            <tybalt-code-example language="shell">
                $ npx @tybalt/cli scaffold eleventy -n my-static-website
            </tybalt-code-example>
            <p>Then, you can start the development server</p>
            <tybalt-code-example language="shell"> $ npx @11ty/eleventy --serve </tybalt-code-example>
            <p>And open the site at <tybalt-link href="http://localhost:8080/">http://localhost:8080/</tybalt-link></p>
        </div>`;
    }
  });

  // ../validator/dist/index.mjs
  var validator_default2 = (cb) => {
    return {
      async validate(value) {
        const result = await cb(value);
        if (result === void 0 || result === null || typeof result === "boolean" && result === true) {
          return {
            passed: true
          };
        }
        if (typeof result === "string") {
          return {
            passed: false,
            message: result,
            level: "error"
          };
        }
        if (typeof result === "boolean") {
          return {
            passed: result,
            level: "error"
          };
        }
        return result;
      }
    };
  };
  var levelNumbers2 = {
    error: 4,
    warn: 3,
    info: 2,
    debug: 1,
    silent: 0
  };
  var isMoreSevere2 = (current, previous) => {
    if (!current) {
      return false;
    }
    if (!previous) {
      return true;
    }
    const currentLevel = levelNumbers2[current];
    const previousLevel = levelNumbers2[previous];
    return currentLevel > previousLevel;
  };
  var getMostSevereLevel2 = (results) => {
    let mostSevere = void 0;
    results.forEach((result) => {
      if (isMoreSevere2(result.level, mostSevere)) {
        mostSevere = result.level;
      }
    });
    return mostSevere;
  };
  var haveAllPassed2 = (results) => {
    return results.reduce((accumulator, result) => {
      return result.passed && accumulator;
    }, true);
  };
  var concatenateMessages2 = (results) => {
    const concatenatedMessages = results.map((result) => `  - (${result.level}) ${result.message}`).join("\n");
    if (concatenatedMessages.length) {
      return `Got validation failures:

${concatenatedMessages}
`;
    }
  };
  var compose_default2 = (...validators) => {
    return {
      async validate(value) {
        const promises = validators.map((validator) => {
          if (validator) {
            return validator.validate(value);
          }
          return Promise.resolve({ passed: true });
        });
        const results = await Promise.all(promises);
        const level = getMostSevereLevel2(results);
        const message = concatenateMessages2(results);
        const passed = haveAllPassed2(results);
        return {
          level,
          message,
          passed
        };
      }
    };
  };
  var matches_pattern_default2 = (pattern) => {
    return validator_default2(async (value) => {
      if (typeof pattern === "string") {
        return value.includes(pattern);
      } else {
        return pattern.test(value);
      }
    });
  };
  var required_default2 = () => {
    return validator_default2(async (value) => {
      return !!value;
    });
  };
  var string_default = () => {
    return validator_default2(async (value) => {
      return typeof value === "string";
    });
  };
  var urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
  var url_default = () => {
    return matches_pattern_default2(urlPattern);
  };

  // components/link.js
  define_component_default({
    name: "tybalt-link",
    shadowMode: "open",
    props: {
      href: {
        validator: compose_default2(required_default2(), string_default(), url_default())
      },
      ariaLabel: {
        validator: required_default2()
      }
    },
    render({ ariaLabel, href }) {
      return html_default`<a href="${href}" aria-label="${ariaLabel}"><slot>link</slot></a>`;
    },
    css: `
            a {
                color: var(--purple);
            }
        `
  });

  // components/header.js
  define_component_default({
    name: "tybalt-header",
    shadowMode: "open",
    render() {
      return html_default`
            <nav>
                <span>Tybalt Web Components</span>
                <span>
                    <tybalt-link href="https://github.com/doug-wade/tybalt">Github</tybalt-link>
                </span>
            </nav>
        `;
    },
    css: `
        nav {
            display: flex;
            justify-content: space-between;
        }
    `
  });

  // components/footer.js
  define_component_default({
    name: "tybalt-footer",
    shadowMode: "open",
    render() {
      return html_default`<footer>Tybalt distributed under the MIT license</footer>`;
    }
  });

  // components/code-example.js
  var import_prism = __toESM(require_prism());

  // tybalt-styles:/home/runner/work/tybalt/tybalt/node_modules/prism-themes/themes/prism-night-owl.css
  var prism_night_owl_default = `/**
 * MIT License
 * Copyright (c) 2018 Sarah Drasner
 * Sarah Drasner's[@sdras] Night Owl
 * Ported by Sara vieria [@SaraVieira]
 * Added by Souvik Mandal [@SimpleIndian]
 */

code[class*="language-"],
pre[class*="language-"] {
	color: #d6deeb;
	font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	line-height: 1.5;
	font-size: 1em;

	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;

	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
}

pre[class*="language-"]::-moz-selection,
pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection,
code[class*="language-"] ::-moz-selection {
	text-shadow: none;
	background: rgba(29, 59, 83, 0.99);
}

pre[class*="language-"]::selection,
pre[class*="language-"] ::selection,
code[class*="language-"]::selection,
code[class*="language-"] ::selection {
	text-shadow: none;
	background: rgba(29, 59, 83, 0.99);
}

@media print {
	code[class*="language-"],
	pre[class*="language-"] {
		text-shadow: none;
	}
}

/* Code blocks */
pre[class*="language-"] {
	padding: 1em;
	margin: 0.5em 0;
	overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
	color: white;
	background: #011627;
}

:not(pre) > code[class*="language-"] {
	padding: 0.1em;
	border-radius: 0.3em;
	white-space: normal;
}

.token.comment,
.token.prolog,
.token.cdata {
	color: rgb(99, 119, 119);
	font-style: italic;
}

.token.punctuation {
	color: rgb(199, 146, 234);
}

.namespace {
	color: rgb(178, 204, 214);
}

.token.deleted {
	color: rgba(239, 83, 80, 0.56);
	font-style: italic;
}

.token.symbol,
.token.property {
	color: rgb(128, 203, 196);
}

.token.tag,
.token.operator,
.token.keyword {
	color: rgb(127, 219, 202);
}

.token.boolean {
	color: rgb(255, 88, 116);
}

.token.number {
	color: rgb(247, 140, 108);
}

.token.constant,
.token.function,
.token.builtin,
.token.char {
	color: rgb(130, 170, 255);
}

.token.selector,
.token.doctype {
	color: rgb(199, 146, 234);
	font-style: italic;
}

.token.attr-name,
.token.inserted {
	color: rgb(173, 219, 103);
	font-style: italic;
}

.token.string,
.token.url,
.token.entity,
.language-css .token.string,
.style .token.string {
	color: rgb(173, 219, 103);
}

.token.class-name,
.token.atrule,
.token.attr-value {
	color: rgb(255, 203, 139);
}

.token.regex,
.token.important,
.token.variable {
	color: rgb(214, 222, 235);
}

.token.important,
.token.bold {
	font-weight: bold;
}

.token.italic {
	font-style: italic;
}
`;

  // components/code-example.js
  define_component_default({
    name: "tybalt-code-example",
    shadowMode: "open",
    css: prism_night_owl_default,
    props: {
      language: {
        validator: compose_default2(string_default, required_default2)
      }
    },
    setup({ language }) {
      const code = this.innerHTML.replace(/^\s+/g, "");
      const languageCode = language === "shell" ? import_prism.default.languages.shell : import_prism.default.languages.javascript;
      const highlighted = import_prism.default.highlight(code, languageCode, language);
      return {
        code: highlighted
      };
    },
    render({ code, language }) {
      return html_default` <pre><code class="language-${language}">${code}</code></pre> `;
    }
  });
})();
/*! Bundled license information:

prismjs/prism.js:
  (**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   *)
*/

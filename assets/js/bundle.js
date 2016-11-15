(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Navigo", [], factory);
	else if(typeof exports === 'object')
		exports["Navigo"] = factory();
	else
		root["Navigo"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var PARAMETER_REGEXP = /([:*])(\w+)/g;
	var WILDCARD_REGEXP = /\*/g;
	var REPLACE_VARIABLE_REGEXP = '([^\/]+)';
	var REPLACE_WILDCARD = '(?:.*)';
	var FOLLOWED_BY_SLASH_REGEXP = '(?:\/|$)';
	
	function clean(s) {
	  if (s instanceof RegExp) return s;
	  return s.replace(/\/+$/, '').replace(/^\/+/, '/');
	}
	
	function regExpResultToParams(match, names) {
	  if (names.length === 0) return null;
	  if (!match) return null;
	  return match.slice(1, match.length).reduce(function (params, value, index) {
	    if (params === null) params = {};
	    params[names[index]] = value;
	    return params;
	  }, null);
	}
	
	function replaceDynamicURLParts(route) {
	  var paramNames = [],
	      regexp;
	
	  if (route instanceof RegExp) {
	    regexp = route;
	  } else {
	    regexp = new RegExp(clean(route).replace(PARAMETER_REGEXP, function (full, dots, name) {
	      paramNames.push(name);
	      return REPLACE_VARIABLE_REGEXP;
	    }).replace(WILDCARD_REGEXP, REPLACE_WILDCARD) + FOLLOWED_BY_SLASH_REGEXP);
	  }
	  return { regexp: regexp, paramNames: paramNames };
	}
	
	function findMatchedRoutes(url) {
	  var routes = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	  return routes.map(function (route) {
	    var _replaceDynamicURLPar = replaceDynamicURLParts(route.route);
	
	    var regexp = _replaceDynamicURLPar.regexp;
	    var paramNames = _replaceDynamicURLPar.paramNames;
	
	    var match = url.match(regexp);
	    var params = regExpResultToParams(match, paramNames);
	
	    return match ? { match: match, route: route, params: params } : false;
	  }).filter(function (m) {
	    return m;
	  });
	}
	
	function match(url, routes) {
	  return findMatchedRoutes(url, routes)[0] || false;
	}
	
	function root(url, routes) {
	  var matched = findMatchedRoutes(url, routes.filter(function (route) {
	    var u = clean(route.route);
	
	    return u !== '' && u !== '*';
	  }));
	  var fallbackURL = clean(url);
	
	  if (matched.length > 0) {
	    return matched.map(function (m) {
	      return clean(url.substr(0, m.match.index));
	    }).reduce(function (root, current) {
	      return current.length < root.length ? current : root;
	    }, fallbackURL);
	  }
	  return fallbackURL;
	}
	
	function isPushStateAvailable() {
	  return !!(typeof window !== 'undefined' && window.history && window.history.pushState);
	}
	
	function Navigo(r, useHash) {
	  this._routes = [];
	  this.root = useHash && r ? r.replace(/\/$/, '/#') : r || null;
	  this._useHash = useHash;
	  this._paused = false;
	  this._destroyed = false;
	  this._lastRouteResolved = null;
	  this._notFoundHandler = null;
	  this._defaultHandler = null;
	  this._ok = !useHash && isPushStateAvailable();
	  this._listen();
	  this.updatePageLinks();
	}
	
	Navigo.prototype = {
	  helpers: {
	    match: match,
	    root: root,
	    clean: clean
	  },
	  navigate: function navigate(path, absolute) {
	    var to;
	
	    path = path || '';
	    if (this._ok) {
	      to = (!absolute ? this._getRoot() + '/' : '') + clean(path);
	      to = to.replace(/([^:])(\/{2,})/g, '$1/');
	      history[this._paused ? 'replaceState' : 'pushState']({}, '', to);
	      this.resolve();
	    } else if (typeof window !== 'undefined') {
	      window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
	    }
	    return this;
	  },
	  on: function on() {
	    if (arguments.length >= 2) {
	      this._add(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
	    } else if (_typeof(arguments.length <= 0 ? undefined : arguments[0]) === 'object') {
	      for (var route in arguments.length <= 0 ? undefined : arguments[0]) {
	        this._add(route, (arguments.length <= 0 ? undefined : arguments[0])[route]);
	      }
	    } else if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'function') {
	      this._defaultHandler = arguments.length <= 0 ? undefined : arguments[0];
	    }
	    return this;
	  },
	  notFound: function notFound(handler) {
	    this._notFoundHandler = handler;
	  },
	  resolve: function resolve(current) {
	    var handler, m;
	    var url = (current || this._cLoc()).replace(this._getRoot(), '');
	
	    if (this._paused || url === this._lastRouteResolved) return false;
	    if (this._useHash) {
	      url = url.replace(/^\/#/, '/');
	    }
	    m = match(url, this._routes);
	
	    if (m) {
	      this._lastRouteResolved = url;
	      handler = m.route.handler;
	      m.route.route instanceof RegExp ? handler.apply(undefined, _toConsumableArray(m.match.slice(1, m.match.length))) : handler(m.params);
	      return m;
	    } else if (this._defaultHandler && (url === '' || url === '/')) {
	      this._defaultHandler();
	      return true;
	    } else if (this._notFoundHandler) {
	      this._notFoundHandler();
	    }
	    return false;
	  },
	  destroy: function destroy() {
	    this._routes = [];
	    this._destroyed = true;
	    clearTimeout(this._listenningInterval);
	    typeof window !== 'undefined' ? window.onpopstate = null : null;
	  },
	  updatePageLinks: function updatePageLinks() {
	    var self = this;
	
	    if (typeof document === 'undefined') return;
	
	    this._findLinks().forEach(function (link) {
	      if (!link.hasListenerAttached) {
	        link.addEventListener('click', function (e) {
	          var location = link.getAttribute('href');
	
	          if (!self._destroyed) {
	            e.preventDefault();
	            self.navigate(clean(location));
	          }
	        });
	        link.hasListenerAttached = true;
	      }
	    });
	  },
	  generate: function generate(name) {
	    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    return this._routes.reduce(function (result, route) {
	      var key;
	
	      if (route.name === name) {
	        result = route.route;
	        for (key in data) {
	          result = result.replace(':' + key, data[key]);
	        }
	      }
	      return result;
	    }, '');
	  },
	  link: function link(path) {
	    return this._getRoot() + path;
	  },
	  pause: function pause(status) {
	    this._paused = status;
	  },
	  disableIfAPINotAvailable: function disableIfAPINotAvailable() {
	    if (!isPushStateAvailable()) {
	      this.destroy();
	    }
	  },
	  _add: function _add(route) {
	    var handler = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
	    if ((typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === 'object') {
	      this._routes.push({ route: route, handler: handler.uses, name: handler.as });
	    } else {
	      this._routes.push({ route: route, handler: handler });
	    }
	    return this._add;
	  },
	  _getRoot: function _getRoot() {
	    if (this.root !== null) return this.root;
	    this.root = root(this._cLoc(), this._routes);
	    return this.root;
	  },
	  _listen: function _listen() {
	    var _this = this;
	
	    if (this._ok) {
	      window.onpopstate = function () {
	        _this.resolve();
	      };
	    } else {
	      (function () {
	        var cached = _this._cLoc(),
	            current = undefined,
	            _check = undefined;
	
	        _check = function check() {
	          current = _this._cLoc();
	          if (cached !== current) {
	            cached = current;
	            _this.resolve();
	          }
	          _this._listenningInterval = setTimeout(_check, 200);
	        };
	        _check();
	      })();
	    }
	  },
	  _cLoc: function _cLoc() {
	    if (typeof window !== 'undefined') {
	      return window.location.href;
	    }
	    return '';
	  },
	  _findLinks: function _findLinks() {
	    return [].slice.call(document.querySelectorAll('[data-navigo]'));
	  }
	};
	
	exports.default = Navigo;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;

},{}],2:[function(require,module,exports){
'use strict';

function Beacon(el) {
    this.el = el;
    this.computedStyles = window.getComputedStyle(this.el, ':before');
}

Beacon.prototype.status = function() {
    if (this.computedStyles.length < 1) {
        return null;
    }

    return this.computedStyles.getPropertyValue('content').replace(/"/g, '');
};

module.exports = Beacon;

},{}],3:[function(require,module,exports){
'use strict';

var Prism = function(prismEl) {
    if (!prismEl) {
        return;
    }

    this.el = prismEl;
    this.containerEl = prismEl.querySelector('.sides');
};

Prism.prototype.POSITIONS = {
    left: -90,
    right: 90,
    top: 90,
    bottom: -90
};

Prism.prototype.animateClass = 'side--will-animate';
Prism.prototype.transitionClass = 'sides--transition';
Prism.prototype.visibleClass = 'side--visible';

Prism.prototype.turn = function(target, status, noTransform) {
    var immediate;

    immediate = status === 's' || noTransform ? true : false;

    this.animate(target, immediate);
};

Prism.prototype.calculatedTransform = function(target, location) {
    var axis, origin;

    axis = (location === 'left' || location === 'right') ? 'Y' : 'X';

    // XXX: translate the element because
    //      transform-origin-z does not work in safari
    switch (location) {
        case 'left':
            origin = 'translateZ(50vw) translateX(50vw)';
            break;
        case 'right':
            origin = 'translateZ(50vw) translateX(-50vw)';
            break;
        case 'top':
            origin = 'translateZ(50vh) translateY(50vh)';
            break;
        case 'bottom':
            origin = 'translateZ(50vh) translateY(-50vh)';
            break;
    }

    return origin + ' rotate' + axis + '(' + this.POSITIONS[location] + 'deg)';
};

Prism.prototype.animate = function(target, immediate) {
    var targetEl, currentEl, location, axis, timeout;

    timeout = immediate === true ? 1 : 700;

    targetEl = document.querySelector(target);
    currentEl = document.querySelector('.' + this.visibleClass);

    location = targetEl.getAttribute('data-location');
    axis = (location === 'left' || location === 'right') ?
           'horizontal' : 'vertical';

    this.setupAnimation(targetEl, location, axis);

    this.setTransform(this.containerEl, this.calculatedTransform(targetEl,
                                                                 location));

    setTimeout(this.resetAnimation.bind(this, targetEl, currentEl), timeout);
};

Prism.prototype.setTransform = function(node, value) {
    var property = 'Transform';
    node.style['webkit' + property] = value;
    node.style['moz' + property] = value;
    node.style['ms' + property] = value;
    node.style['o' + property] = value;
    node.style[property.toLowerCase()] = value;
};

Prism.prototype.setupAnimation = function(targetEl, location, axis) {
    targetEl.classList.add('side--position-' + location);
    targetEl.classList.add(this.animateClass);
    this.containerEl.classList.add(this.transitionClass);
    this.el.classList.add('cube--transition-' + axis);
};

Prism.prototype.resetAnimation = function(targetEl, currentEl) {
    targetEl.className = targetEl.className.replace(/side--position-.*/, '');
    targetEl.classList.remove(this.animateClass);
    this.containerEl.classList.remove(this.transitionClass);
    this.el.className = this.el.className
                                 .replace(/cube--transition-.*/, '');

    if (currentEl) {
        currentEl.classList.remove(this.visibleClass);
    }

    this.setTransform(this.containerEl, '');
    targetEl.classList.add(this.visibleClass);
};

module.exports = Prism;

},{}],4:[function(require,module,exports){
'use strict';

var Navigo = require('navigo');

var Cube = require('./cube'),
    Beacon = require('./beacon');

var Site = {
    activeMenuItemClass: 'menu-item__link--active',

    init: function() {
        var self = this;

        this.menuEl = document.querySelector('.menu');
        this.menuButton = document.querySelector('.menu__button');
        this.cube = new Cube(document.querySelector('.cube'));
        this.router = new Navigo();
        this.beacon = new Beacon(document.querySelector('.beacon'));

        this.router.on({
            '/agenda/:event': this.navigate.bind(self, 'event'),
            '/agenda': this.navigate.bind(self, 'agenda'),
            '/contact': this.navigate.bind(self, 'contact'),
            '/archive': this.navigate.bind(self, 'archive'),
            '/about': this.navigate.bind(self, 'about'),
        });

        this.menuEl.addEventListener('click', this.onMenuClick.bind(this));
        this.menuButton.addEventListener('click',
                                         this.onMenuButtonClick.bind(this));
        this.bindEventClicks();

        this.intro();
    },

    intro: function() {
        var intro = document.querySelector('.intro'),
            wrapper = document.querySelector('.wrapper'),
            body = document.body,
            menu = this.menuEl,
            mobile = this.beacon.status() === 's',
            self = this;

        if (intro === null) {
            return;
        }

        wrapper.style.transform = 'none';
        intro.style.opacity = 0;

        setTimeout(function(){
            if (!mobile) {
                menu.classList.add('menu--active');
            }

            self.navigate('agenda');
            wrapper.removeChild(intro);
            body.classList.remove('intro-active');
        },  mobile ? 0 : 2750);
    },

    navigate: function(target, params) {
        var path;

        if (params) {
            //TODO: quick routing fix. remove when we have the final server
            path = window.location.pathname.indexOf('ef') > -1 ? '/ef' : '';
            this.fetch(path + '/agenda/' + params.event,
                       this.navigate.bind(this, target));
            return;
        }

        if (!this.isPageLoaded(target) && target !== 'event') {
            this.fetch(target, this.navigate.bind(this, target));
            return;
        }

        this.cube.turn('#' + target, this.beacon.status());
        this.toggleActiveMenuItem(target);
    },

    onMenuButtonClick: function(event) {
        event.preventDefault();
        this.menuEl.classList.add('menu--active');
    },


    onMenuClick: function(e) {
        var target, linkEl;

        if (e.target.nodeName.toLowerCase() !== 'button' &&
            this.menuEl.classList.contains('menu--active')) {
            this.menuEl.classList.remove('menu--active');
        }

        if (e.target.nodeName.toLowerCase() !== 'a') {
            return;
        }

        target = this.linkTarget(e.target);
        linkEl = document.querySelector('.menu-item--' + target + ' .menu-item__link');

        e.preventDefault();

        if (linkEl.classList.contains(this.activeMenuItemClass)) {
            return;
        }

        this.router.navigate(target);
    },

    bindEventClicks: function() {
        var events, i, len;

        events = document.querySelectorAll('.event__link');

        for (i = 0, len = events.length; i < len; i += 1) {
            events[i].addEventListener('click', this.onEventClick.bind(this));
        }
    },

    onEventClick: function(event) {
        var el;

        event.preventDefault();

        el = event.target;

        if (el.nodeName !== 'A') {
            el = this.ancestorLink(el);
        }

        this.router.navigate(el.href, true);
    },

    ancestorLink: function(node) {
        if (node.nodeName === 'A') {
            return node;
        }

        if (!node.parentElement) {
            return null;
        }

        return this.ancestorLink(node.parentElement);
    },

    isPageLoaded: function(target) {
        return document.querySelector('#' + target) !== null;
    },

    fetch: function(target, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', target, true);
        request.setRequestHeader('X-REQUESTED-WITH', 'XMLHttpRequest');
        request.onload = this.onPageFetchSuccess.bind(this, request, callback);
        request.onerror = this.onPageFetchError;

        request.send();
    },

    onPageFetchSuccess: function(request, callback) {
        var fragment, el, previousEvent;

        if (request.status < 200 || request.status >= 400) {
            return;
        }

        fragment = document.createElement('div');
        fragment.innerHTML = request.responseText;

        el = fragment.querySelector('.side');
        previousEvent = document.querySelector('#event');

        if (el && el.id === 'event' && previousEvent) {
            this.cube.containerEl.removeChild(previousEvent);
        }

        this.cube.containerEl.appendChild(el);

        if (el && (el.id === 'agenda' || el.id === 'archive')) {
            this.bindEventClicks();
        }

        if (callback && typeof callback === 'function') {
            //console.log('callback');
            callback();
        }
    },

    onPageFetchError: function(error) {
        console.log(error);
    },

    linkTarget: function(target) {
        var href, lastURLFragment;

        href = target.href.split('/');

        lastURLFragment = href.pop();

        return lastURLFragment !== '' ? lastURLFragment : href.pop();
    },

    toggleActiveMenuItem: function(target) {
        var currentItem, targetEl;

        currentItem = document.querySelector('.' + this.activeMenuItemClass);

        targetEl = document
                  .querySelector('.menu-item--' + target + ' .menu-item__link');

        if (target !== 'event' && currentItem) {
            currentItem.classList.remove(this.activeMenuItemClass);
        }

        if (targetEl) {
            targetEl.classList.add(this.activeMenuItemClass);
        }
    }
};

Site.init();

},{"./beacon":2,"./cube":3,"navigo":1}]},{},[4]);

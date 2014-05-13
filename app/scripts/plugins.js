// Place any helper plugins in here.
( function() {
        var method;
        var noop = function() {
        };
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        // Avoid console errors in browsers that lack a console.
        var console = (window.console = window.console || {});

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }

        // Array polyfills for ie
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function(obj, start) {
                for (var i = (start || 0), j = this.length; i < j; i++) {
                    if (this[i] === obj) {
                        return i;
                    }
                }
                return -1;
            }
        }

        [].filter || (Array.prototype.filter = function(g, f, j, i, h) {
            j = this;
            i = [];
            for (h in j) {
                ~~h + "" == h && h >= 0 && g.call(f, j[h], +h, j) && i.push(j[h])
            }
            return i
        });

        if ('function' !== typeof Array.prototype.reduce) {
            Array.prototype.reduce = function(callback, opt_initialValue) {'use strict';
                if (null === this || 'undefined' === typeof this) {
                    // At the moment all modern browsers, that support strict mode, have
                    // native implementation of Array.prototype.reduce. For instance, IE8
                    // does not support strict mode, so this check is actually useless.
                    throw new TypeError('Array.prototype.reduce called on null or undefined');
                }
                if ('function' !== typeof callback) {
                    throw new TypeError(callback + ' is not a function');
                }
                var index, value, length = this.length >>> 0, isValueSet = false;
                if (1 < arguments.length) {
                    value = opt_initialValue;
                    isValueSet = true;
                }
                for ( index = 0; length > index; ++index) {
                    if (this.hasOwnProperty(index)) {
                        if (isValueSet) {
                            value = callback(value, this[index], index, this);
                        } else {
                            value = this[index];
                            isValueSet = true;
                        }
                    }
                }
                if (!isValueSet) {
                    throw new TypeError('Reduce of empty array with no initial value');
                }
                return value;
            };
        }

    }());

// function for sorting objects by property - for sorting identify and search results
function predicatBy(prop) {
    return function(a, b) {
        var aStr, bstr;
        try {
            aStr = parseFloat(a[prop].split(" ")[0]);
            bStr = parseFloat(b[prop].split(" ")[0]);
        } catch(err) {/*do nothing*/
        }
        if (isNaN(aStr) || isNaN(bStr)) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
        } else {
            if (aStr > bStr) {
                return 1;
            } else if (aStr < bStr) {
                return -1;
            }
        }
        return 0;
    }
}

//split camel case
function splitCamelCase(s){
	return s.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
}

// check if  ie<10 and set the crossDomain value for ajax legend request accordingly
var ie = ( function() {
        var undef, v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
        while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);
        return v > 4 ? v : undef;
    }());
var crossDomain = ie >= 10 || !ie ? true : false;
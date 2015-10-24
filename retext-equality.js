(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.retextEquality = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = require('./lib/equality.js');

},{"./lib/equality.js":2}],2:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module retext:equality
 * @fileoverview Warn about possible insensitive, inconsiderate language
 *   with Retext.
 */

'use strict';

/*
 * Dependencies.
 */

var keys = require('object-keys');
var visit = require('unist-util-visit');
var nlcstToString = require('nlcst-to-string');
var isLiteral = require('nlcst-is-literal');
var patterns = require('./patterns.json');

/*
 * Internal mapping.
 */

var byId = {};
var byWord = {};

(function () {
    var index = -1;
    var length = patterns.length;
    var pattern;
    var inconsiderate;
    var id;
    var phrase;
    var firstWord;

    while (++index < length) {
        pattern = patterns[index];
        inconsiderate = pattern.inconsiderate;
        id = pattern.id;

        byId[id] = pattern;

        for (phrase in inconsiderate) {
            firstWord = phrase.split(' ')[0].toLowerCase();

            if (firstWord in byWord) {
                byWord[firstWord].push(id);
            } else {
                byWord[firstWord] = [id];
            }
        }
    }
})();

/**
 * Get the first key at which `value` lives in `context`.
 *
 * @todo Externalise.
 * @param {Object} object - Context to search in.
 * @param {*} value - Value to search for.
 * @return {string?} - First key at which `value` lives,
 *   when applicable.
 */
function byValue(object, value) {
    var key;

    for (key in object) {
        if (object[key] === value) {
            return key;
        }
    }

    /* istanbul ignore next */
    return null;
}

/**
 * Get a string value from a node.
 *
 * @param {NLCSTNode} node - NLCST node.
 * @return {string}
 */
function toString(node) {
    return nlcstToString(node).replace(/['’-]/g, '');
}

/**
 * Get the value of multiple nodes
 *
 * @param {Array.<NLCSTNode>} node - NLCST nodes.
 * @return {string}
 */
function valueOf(node) {
    return nlcstToString({
        'children': node
    });
}

/**
 * Check `expression` in `parent` at `position`,
 * where `expression` is list of words.
 *
 * @param {Array} phrase - List of words.
 * @param {NLCSTNode} parent - Parent node.
 * @param {number} position - Position in `parent` to
 *   check.
 * @return {Array.<NLCSTNode>?} - When matched to
 *   skip, because one word matched.
 */
function matches(phrase, parent, position) {
    var siblings = parent.children;
    var node = siblings[position];
    var queue = [node];
    var index = -1;
    var length;

    phrase = phrase.split(' ');
    length = phrase.length;

    while (++index < length) {
        /*
         * Check if this node matches.
         */

        if (!node || phrase[index] !== toString(node).toLowerCase()) {
            return null;
        }

        /*
         * Exit if this is the last node.
         */

        if (index === length - 1) {
            break;
        }

        /*
         * Find the next word.
         */

        while (++position < siblings.length) {
            node = siblings[position];
            queue.push(node);

            if (node.type === 'WordNode') {
                break;
            }

            if (node.type === 'WhiteSpaceNode') {
                continue;
            }

            return null;
        }
    }

    return queue;
}

/**
 * Check `expression` in `parent` at `position`.
 *
 * @param {Object} expression - Violation expression.
 * @param {NLCSTNode} parent - Parent node.
 * @param {number} position - Position in `parent` to
 *   check.
 * @return {Object?} - Result.
 */
function check(expression, parent, position) {
    var values = expression.inconsiderate;
    var phrase;
    var result;

    for (phrase in values) {
        result = matches(phrase, parent, position);

        if (result) {
            return {
                'end': position + result.length - 1,
                'category': values[phrase]
            };
        }
    }

    return null;
}

/**
 * Create a human readable warning message for `violation`
 * and suggest `suggestion`.
 *
 * @example
 *   message('one', 'two');
 *   // '`one` may be insensitive, use `two` instead'
 *
 *   message(['one', 'two'], 'three');
 *   // '`one`, `two` may be insensitive, use `three` instead'
 *
 *   message(['one', 'two'], 'three', '/');
 *   // '`one` / `two` may be insensitive, use `three` instead'
 *
 * @param {*} violation - One or more violations.
 * @param {*} suggestion - One or more suggestions.
 * @param {string} [joiner] - Joiner to use.
 * @return {string} - Human readable warning.
 */
function message(violation, suggestion, joiner) {
    return quote(violation, joiner) +
        ' may be insensitive, use ' +
        quote(suggestion, joiner) +
        ' instead';
}

/**
 * Quote text meant as literal.
 *
 * @example
 *   quote('one');
 *   // '`one`'
 *
 * @example
 *   quote(['one', 'two']);
 *   // '`one`, `two`'
 *
 * @example
 *   quote(['one', 'two'], '/');
 *   // '`one` / `two`'
 *
 * @param {string|Array.<string>} value - One or more
 *   violations.
 * @param {string} [joiner] - Joiner to use.
 * @return {string} - Quoted, joined `value`.
 */
function quote(value, joiner) {
    joiner = !joiner || joiner === ',' ? '`, `' : '` ' + joiner + ' `';

    return '`' + (value.join ? value.join(joiner) : value) + '`';
}

/**
 * Check whether the first character of a given value is
 * upper-case. Supports a string, or a list of strings.
 * Defers to the standard library for what defines
 * a “upper case” letter.
 *
 * @example
 *   isCapitalized('one'); // false
 *   isCapitalized('One'); // true
 *
 * @example
 *   isCapitalized(['one', 'Two']); // false
 *   isCapitalized(['One', 'two']); // true
 *
 * @param {string|Array.<string>} value - One, or a list
 *   of strings.
 * @return {boolean} - Whether the first character is
 *   upper-case.
 */
function isCapitalized(value) {
    var character = (value.charAt ? value : value[0]).charAt(0);

    return character.toUpperCase() === character;
}

/**
 * Capitalize a list of values.
 *
 * @example
 *   capitalize(['one', 'two']); // ['One', 'Two']
 *
 * @param {Array.<string>} value - List of values.
 * @return {Array.<string>} - Capitalized values.
 */
function capitalize(value) {
    var result = [];
    var index = -1;
    var length;

    length = value.length;

    while (++index < length) {
        result[index] = value[index].charAt(0).toUpperCase() +
            value[index].slice(1);
    }

    return result;
}

/**
 * Warn on `file` about `violation` (at `node`) with
 * `suggestion`s.
 *
 * @param {File} file - Virtual file.
 * @param {string|Array.<string>} violation - One or more
 *   violations.
 * @param {string|Array.<string>} suggestion - One or more
 *   suggestions.
 * @param {Node} node - Node which violates.
 * @param {string?} [note] - Extensive description.
 * @param {string?} [joiner] - Joiner of message.
 * @param {NLCSTNode} node - Node which violates.
 */
function warn(file, violation, suggestion, node, note, joiner) {
    var warning;

    if (!('join' in suggestion)) {
        suggestion = keys(suggestion);
    }

    if (isCapitalized(violation)) {
        suggestion = capitalize(suggestion);
    }

    warning = file.warn(message(violation, suggestion, joiner), node);

    if (note) {
        warning.note = note;
    }
}

/**
 * Test `epxression` on the node at `position` in
 * `parent`.
 *
 * @param {File} file - Virtual file.
 * @param {Object} expression - An expression mapping
 *   offenses to fixes.
 * @param {number} position - Index in `parent`
 * @param {Node} parent - Parent node.
 */
function test(file, expression, position, parent) {
    var result = check(expression, parent, position);

    if (result) {
        return {
            'id': expression.id,
            'type': result.category,
            'parent': parent,
            'start': position,
            'end': result.end
        };
    }

    return null;
}

/**
 * Handle matches for a `simple` pattern.  Simple-patterns
 * need no extra logic, every match is triggered as a
 * warning.
 *
 * @param {Array.<Object>} matches - List of matches
 *   matching `pattern` in a context.
 * @param {Object} pattern - Simple-pattern object.
 * @param {VFile} file - Virtual file.
 */
function simple(matches, pattern, file) {
    var length = matches.length;
    var index = -1;
    var match;
    var siblings;

    while (++index < length) {
        match = matches[index];
        siblings = match.parent.children;

        warn(file, valueOf(
            siblings.slice(match.start, match.end + 1)
        ), pattern.considerate, siblings[match.start], pattern.note);
    }
}

/**
 * Handle matches for an `and` pattern.  And-patterns
 * trigger a warning when every category is present.
 *
 * For example, when `master` and `slave` occur in a
 * context together, they trigger a warning.
 *
 * @param {Array.<Object>} matches - List of matches
 *   matching `pattern` in a context.
 * @param {Object} pattern - And-pattern object.
 * @param {VFile} file - Virtual file.
 */
function and(matches, pattern, file) {
    var categories = pattern.categories.concat();
    var length = matches.length;
    var index = -1;
    var phrases = [];
    var suggestions = [];
    var match;
    var position;
    var siblings;
    var first;

    while (++index < length) {
        match = matches[index];
        siblings = match.parent.children;
        position = categories.indexOf(match.type);

        if (position !== -1) {
            categories.splice(position, 1);
            phrases.push(valueOf(siblings.slice(match.start, match.end + 1)));
            suggestions.push(byValue(pattern.considerate, match.type));

            if (!first) {
                first = siblings[match.start];
            }

            if (categories.length === 0) {
                warn(file, phrases, suggestions, first, pattern.note, '/');
            }
        }
    }
}

/**
 * Handle matches for an `or` pattern.  Or-patterns
 * trigger a warning unless every category is present.
 *
 * For example, when `him` and `her` occur adjacent
 * to each other, they are not warned about. But when
 * they occur alone, they are.
 *
 * @param {Array.<Object>} matches - List of matches
 *   matching `pattern` in a context.
 * @param {Object} pattern - Or-pattern object.
 * @param {VFile} file - Virtual file.
 */
function or(matches, pattern, file) {
    var length = matches.length;
    var index = -1;
    var match;
    var next;
    var siblings;
    var sibling;
    var start;
    var end;

    while (++index < length) {
        match = matches[index];
        siblings = match.parent.children;
        next = matches[index + 1];

        if (
            next &&
            next.parent === match.parent &&
            next.type !== match.type
        ) {
            start = match.end;
            end = next.start;

            while (++start < end) {
                sibling = siblings[start];

                if (
                    sibling.type === 'WhiteSpaceNode' ||
                    (
                        sibling.type === 'WordNode' &&
                        /(and|or)/.test(toString(sibling))
                    )
                ) {
                    continue;
                }

                break;
            }

            /*
             * If we didn't break...
             */

            if (start === end) {
                index++;
                continue;
            }
        }

        warn(file, valueOf(
            siblings.slice(match.start, match.end + 1)
        ), pattern.considerate, siblings[match.start], pattern.note);
    }
}

/*
 * Dictionary of handled patterns.
 */

var handlers = {};

handlers.and = and;
handlers.or = or;
handlers.simple = simple;

/**
 * Factory to create a visitor which warns on `file`.
 *
 * @param {File} file - Virtual file.
 * @return {Function} - Paragraph visitor.
 */
function factory(file) {
    /**
     * Search `node` for violations.
     *
     * @param {NLCSTParagraphNode} node - Paragraph.
     */
    return function (node) {
        var matches = {};
        var id;
        var pattern;

        /*
         * Find offending words.
         */

        visit(node, 'WordNode', function (child, position, parent) {
            var value;
            var patterns;
            var length;
            var index;
            var result;

            if (isLiteral(parent, position)) {
                return;
            }

            value = toString(child).toLowerCase()
            patterns = byWord.hasOwnProperty(value) ? byWord[value] : null;
            length = patterns ? patterns.length : 0;
            index = -1;

            while (++index < length) {
                result = test(file, byId[patterns[index]], position, parent);

                if (result) {
                    if (result.id in matches) {
                        matches[result.id].push(result);
                    } else {
                        matches[result.id] = [result];
                    }
                }
            }
        });

        /*
         * Ignore or trigger offending words based on
         * their pattern.
         */

        for (id in matches) {
            pattern = byId[id];
            handlers[pattern.type](matches[id], pattern, file);
        }
    };
}

/**
 * Transformer.
 *
 * @param {NLCSTNode} cst - Syntax tree.
 */
function transformer(cst, file) {
    visit(cst, 'ParagraphNode', factory(file));
}

/**
 * Attacher.
 *
 * @return {Function} - `transformer`.
 */
function attacher() {
    return transformer;
}

/*
 * Expose.
 */

module.exports = attacher;

},{"./patterns.json":3,"nlcst-is-literal":4,"nlcst-to-string":5,"object-keys":6,"unist-util-visit":8}],3:[function(require,module,exports){
module.exports=[
  {
    "id": 0,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "their": "a",
      "theirs": "a",
      "them": "a"
    },
    "inconsiderate": {
      "her": "female",
      "hers": "female",
      "him": "male",
      "his": "male"
    }
  },
  {
    "id": 1,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "they": "a",
      "it": "a"
    },
    "inconsiderate": {
      "she": "female",
      "he": "male"
    }
  },
  {
    "id": 2,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "themselves": "a",
      "theirself": "a",
      "self": "a"
    },
    "inconsiderate": {
      "herself": "female",
      "himself": "male"
    }
  },
  {
    "id": 3,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "kid": "a",
      "child": "a"
    },
    "inconsiderate": {
      "girl": "female",
      "boy": "male"
    }
  },
  {
    "id": 4,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "people": "a",
      "persons": "a",
      "folks": "a"
    },
    "inconsiderate": {
      "women": "female",
      "girls": "female",
      "gals": "female",
      "ladies": "female",
      "men": "male",
      "guys": "male",
      "dudes": "male",
      "gents": "male",
      "gentlemen": "male",
      "mankind": "male"
    }
  },
  {
    "id": 5,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "person": "a",
      "friend": "a",
      "pal": "a",
      "folk": "a",
      "individual": "a"
    },
    "inconsiderate": {
      "woman": "female",
      "gal": "female",
      "lady": "female",
      "babe": "female",
      "bimbo": "female",
      "chick": "female",
      "guy": "male",
      "lad": "male",
      "fellow": "male",
      "dude": "male",
      "bro": "male",
      "gentleman": "male"
    }
  },
  {
    "id": 6,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "native land": "a"
    },
    "inconsiderate": {
      "motherland": "female",
      "fatherland": "male"
    }
  },
  {
    "id": 7,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "native tongue": "a",
      "native language": "a"
    },
    "inconsiderate": {
      "mother tongue": "female",
      "father tongue": "male"
    }
  },
  {
    "id": 8,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "first-year students": "a",
      "freshers": "a"
    },
    "inconsiderate": {
      "freshwomen": "female",
      "freshmen": "male"
    }
  },
  {
    "id": 9,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "garbage collector": "a",
      "waste collector": "a",
      "trash collector": "a"
    },
    "inconsiderate": {
      "garbagewoman": "female",
      "garbageman": "male"
    }
  },
  {
    "id": 10,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "garbage collectors": "a",
      "waste collectors": "a",
      "trash collectors": "a"
    },
    "inconsiderate": {
      "garbagewomen": "female",
      "garbagemen": "male"
    }
  },
  {
    "id": 11,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "chair": "a",
      "chairperson": "a",
      "coordinator": "a"
    },
    "inconsiderate": {
      "chairwoman": "female",
      "chairman": "male"
    }
  },
  {
    "id": 12,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "committee member": "a"
    },
    "inconsiderate": {
      "committee woman": "female",
      "committee man": "male"
    }
  },
  {
    "id": 13,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "cowhand": "a"
    },
    "inconsiderate": {
      "cowgirl": "female",
      "cowboy": "male"
    }
  },
  {
    "id": 14,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "cowhands": "a"
    },
    "inconsiderate": {
      "cowgirls": "female",
      "cowboys": "male"
    }
  },
  {
    "id": 15,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "cattle rancher": "a"
    },
    "inconsiderate": {
      "cattlewoman": "female",
      "cattleman": "male"
    }
  },
  {
    "id": 16,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "cattle ranchers": "a"
    },
    "inconsiderate": {
      "cattlewomen": "female",
      "cattlemen": "male"
    }
  },
  {
    "id": 17,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "chairs": "a",
      "chairpersons": "a",
      "coordinators": "a"
    },
    "inconsiderate": {
      "chairwomen": "female",
      "chairmen": "male"
    }
  },
  {
    "id": 18,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "mail carrier": "a",
      "letter carrier": "a",
      "postal worker": "a"
    },
    "inconsiderate": {
      "postwoman": "female",
      "mailwoman": "female",
      "postman": "male",
      "mailman": "male"
    }
  },
  {
    "id": 19,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "mail carriers": "a",
      "letter carriers": "a",
      "postal workers": "a"
    },
    "inconsiderate": {
      "postwomen": "female",
      "mailwomen": "female",
      "postmen": "male",
      "mailmen": "male"
    }
  },
  {
    "id": 20,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "officer": "a",
      "police officer": "a"
    },
    "inconsiderate": {
      "policewoman": "female",
      "policeman": "male"
    }
  },
  {
    "id": 21,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "officers": "a",
      "police officers": "a"
    },
    "inconsiderate": {
      "policewomen": "female",
      "policemen": "male"
    }
  },
  {
    "id": 22,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "flight attendant": "a"
    },
    "inconsiderate": {
      "stewardess": "female",
      "steward": "male"
    }
  },
  {
    "id": 23,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "flight attendants": "a"
    },
    "inconsiderate": {
      "stewardesses": "female",
      "stewards": "male"
    }
  },
  {
    "id": 24,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "member of congress": "a",
      "congress person": "a",
      "legislator": "a",
      "representative": "a"
    },
    "inconsiderate": {
      "congresswoman": "female",
      "congressman": "male"
    }
  },
  {
    "id": 25,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "member of congresss": "a",
      "congress persons": "a",
      "legislators": "a",
      "representatives": "a"
    },
    "inconsiderate": {
      "congresswomen": "female",
      "congressmen": "male"
    }
  },
  {
    "id": 26,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "fire fighter": "a"
    },
    "inconsiderate": {
      "firewoman": "female",
      "fireman": "male"
    }
  },
  {
    "id": 27,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "fire fighters": "a"
    },
    "inconsiderate": {
      "firewomen": "female",
      "firemen": "male"
    }
  },
  {
    "id": 28,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "fisher": "a",
      "crew member": "a"
    },
    "inconsiderate": {
      "fisherwoman": "female",
      "fisherman": "male"
    }
  },
  {
    "id": 29,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "fishers": "a"
    },
    "inconsiderate": {
      "fisherwomen": "female",
      "fishermen": "male"
    }
  },
  {
    "id": 30,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "kinship": "a",
      "community": "a"
    },
    "inconsiderate": {
      "sisterhood": "female",
      "brotherhood": "male"
    }
  },
  {
    "id": 31,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "common person": "a",
      "average person": "a"
    },
    "inconsiderate": {
      "common girl": "female",
      "common man": "male"
    }
  },
  {
    "id": 32,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "business executive": "a",
      "entrepreneur": "a",
      "business person": "a",
      "professional": "a"
    },
    "inconsiderate": {
      "businesswoman": "female",
      "salarywoman": "female",
      "businessman": "male",
      "salaryman": "male"
    }
  },
  {
    "id": 33,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "business executives": "a",
      "entrepreneurs": "a"
    },
    "inconsiderate": {
      "businesswomen": "female",
      "salarywomen": "female",
      "career girl": "female",
      "career woman": "female",
      "businessmen": "male",
      "salarymen": "male"
    }
  },
  {
    "id": 34,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "cleaner": "a"
    },
    "inconsiderate": {
      "cleaning lady": "female",
      "cleaning girl": "female",
      "cleaning woman": "female",
      "janitress": "female",
      "cleaning man": "male",
      "cleaning boy": "male",
      "janitor": "male"
    }
  },
  {
    "id": 35,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "cleaners": "a"
    },
    "inconsiderate": {
      "cleaning ladies": "female",
      "cleaning girls": "female",
      "janitresses": "female",
      "cleaning men": "male",
      "janitors": "male"
    }
  },
  {
    "id": 36,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "courier": "a",
      "messenger": "a"
    },
    "inconsiderate": {
      "delivery girl": "female",
      "delivery boy": "male"
    }
  },
  {
    "id": 37,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "supervisor": "a",
      "shift boss": "a"
    },
    "inconsiderate": {
      "forewoman": "female",
      "foreman": "male"
    }
  },
  {
    "id": 38,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "lead": "a",
      "front": "a",
      "figurehead": "a"
    },
    "inconsiderate": {
      "frontwoman, front woman": "female",
      "frontman, front man": "male"
    }
  },
  {
    "id": 39,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "figureheads": "a"
    },
    "inconsiderate": {
      "front women, frontwomen": "female",
      "front men, frontmen": "male"
    }
  },
  {
    "id": 40,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "supervisors": "a",
      "shift bosses": "a"
    },
    "inconsiderate": {
      "forewomen": "female",
      "foremen": "male"
    }
  },
  {
    "id": 41,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "insurance agent": "a"
    },
    "inconsiderate": {
      "insurance woman": "female",
      "insurance man": "male"
    }
  },
  {
    "id": 42,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "insurance agents": "a"
    },
    "inconsiderate": {
      "insurance women": "female",
      "insurance men": "male"
    }
  },
  {
    "id": 43,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "proprietor": "a",
      "building manager": "a"
    },
    "inconsiderate": {
      "landlady": "female",
      "landlord": "male"
    }
  },
  {
    "id": 44,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "proprietors": "a",
      "building managers": "a"
    },
    "inconsiderate": {
      "landladies": "female",
      "landlords": "male"
    }
  },
  {
    "id": 45,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "graduate": "a"
    },
    "inconsiderate": {
      "alumna": "female",
      "alumnus": "male"
    }
  },
  {
    "id": 46,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "graduates": "a"
    },
    "inconsiderate": {
      "alumnae": "female",
      "alumni": "male"
    }
  },
  {
    "id": 47,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "anchor": "a",
      "journalist": "a"
    },
    "inconsiderate": {
      "newswoman": "female",
      "newspaperwoman": "female",
      "anchorwoman": "female",
      "newsman": "male",
      "newspaperman": "male",
      "anchorman": "male"
    }
  },
  {
    "id": 48,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "anchors": "a",
      "journalists": "a"
    },
    "inconsiderate": {
      "newswomen": "female",
      "newspaperwomen": "female",
      "anchorwomen": "female",
      "newsmen": "male",
      "newspapermen": "male",
      "anchormen": "male"
    }
  },
  {
    "id": 49,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "repairer": "a",
      "technician": "a"
    },
    "inconsiderate": {
      "repairwoman": "female",
      "repairman": "male"
    }
  },
  {
    "id": 50,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "technicians": "a"
    },
    "inconsiderate": {
      "repairwomen": "female",
      "repairmen": "male"
    }
  },
  {
    "id": 51,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "salesperson": "a",
      "sales clerk": "a",
      "sales rep": "a",
      "sales agent": "a",
      "seller": "a"
    },
    "inconsiderate": {
      "saleswoman": "female",
      "sales woman": "female",
      "saleslady": "female",
      "salesman": "male",
      "sales man": "male"
    }
  },
  {
    "id": 52,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "sales clerks": "a",
      "sales reps": "a",
      "sales agents": "a",
      "sellers": "a"
    },
    "inconsiderate": {
      "saleswomen": "female",
      "sales women": "female",
      "salesladies": "female",
      "salesmen": "male",
      "sales men": "male"
    }
  },
  {
    "id": 53,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "soldier": "a",
      "service representative": "a"
    },
    "inconsiderate": {
      "servicewoman": "female",
      "serviceman": "male"
    }
  },
  {
    "id": 54,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "soldiers": "a",
      "service representatives": "a"
    },
    "inconsiderate": {
      "servicewomen": "female",
      "servicemen": "male"
    }
  },
  {
    "id": 55,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "server": "a"
    },
    "inconsiderate": {
      "waitress": "female",
      "waiter": "male"
    }
  },
  {
    "id": 56,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "servers": "a"
    },
    "inconsiderate": {
      "waitresses": "female",
      "waiters": "male"
    }
  },
  {
    "id": 57,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "worker": "a",
      "wage earner": "a",
      "taxpayer": "a"
    },
    "inconsiderate": {
      "workwoman": "female",
      "working woman": "female",
      "workman": "male",
      "working man": "male"
    }
  },
  {
    "id": 58,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "workers": "a"
    },
    "inconsiderate": {
      "workwomen": "female",
      "workmen": "male"
    }
  },
  {
    "id": 59,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "performer": "a",
      "star": "a",
      "artist": "a"
    },
    "inconsiderate": {
      "actress": "female",
      "actor": "male"
    }
  },
  {
    "id": 60,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "performers": "a",
      "stars": "a",
      "artists": "a"
    },
    "inconsiderate": {
      "actresses": "female",
      "actors": "male"
    }
  },
  {
    "id": 61,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "pilot": "a",
      "aviator": "a",
      "airstaff": "a"
    },
    "inconsiderate": {
      "aircrewwoman": "female",
      "aircrew woman": "female",
      "aircrewman": "male",
      "airman": "male"
    }
  },
  {
    "id": 62,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "pilots": "a",
      "aviators": "a",
      "airstaff": "a"
    },
    "inconsiderate": {
      "aircrewwomen": "female",
      "aircrew women": "female",
      "aircrewmen": "male",
      "airmen": "male"
    }
  },
  {
    "id": 63,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "cabinet member": "a"
    },
    "inconsiderate": {
      "alderwoman": "female",
      "alderman": "male"
    }
  },
  {
    "id": 64,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "cabinet": "a",
      "cabinet members": "a"
    },
    "inconsiderate": {
      "alderwomen": "female",
      "aldermen": "male"
    }
  },
  {
    "id": 65,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "assembly person": "a",
      "assembly worker": "a"
    },
    "inconsiderate": {
      "assemblywoman": "female",
      "assemblyman": "male"
    }
  },
  {
    "id": 66,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "relative": "a"
    },
    "inconsiderate": {
      "kinswoman": "female",
      "aunt": "female",
      "kinsman": "male",
      "uncle": "male"
    }
  },
  {
    "id": 67,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "relatives": "a"
    },
    "inconsiderate": {
      "kinswomen": "female",
      "aunts": "female",
      "kinsmen": "male",
      "uncles": "male"
    }
  },
  {
    "id": 68,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "klansperson": "a"
    },
    "inconsiderate": {
      "klanswoman": "female",
      "klansman": "male"
    }
  },
  {
    "id": 69,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "clansperson": "a",
      "clan member": "a"
    },
    "inconsiderate": {
      "clanswoman": "female",
      "clansman": "male"
    }
  },
  {
    "id": 70,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "klan": "a",
      "klanspersons": "a"
    },
    "inconsiderate": {
      "klanswomen": "female",
      "klansmen": "male"
    }
  },
  {
    "id": 71,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "boogey": "a"
    },
    "inconsiderate": {
      "boogeywoman": "female",
      "boogeyman": "male"
    }
  },
  {
    "id": 72,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "boogie": "a"
    },
    "inconsiderate": {
      "boogiewoman": "female",
      "boogieman": "male"
    }
  },
  {
    "id": 73,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "bogey": "a"
    },
    "inconsiderate": {
      "bogeywoman": "female",
      "bogeyman": "male"
    }
  },
  {
    "id": 74,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "bogie": "a"
    },
    "inconsiderate": {
      "bogiewoman": "female",
      "bogieman": "male"
    }
  },
  {
    "id": 75,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "boogies": "a"
    },
    "inconsiderate": {
      "boogiewomen": "female",
      "boogiemen": "male"
    }
  },
  {
    "id": 76,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "bogies": "a"
    },
    "inconsiderate": {
      "bogiewomen": "female",
      "bogiemen": "male"
    }
  },
  {
    "id": 77,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "bonder": "a"
    },
    "inconsiderate": {
      "bondswoman": "female",
      "bondsman": "male"
    }
  },
  {
    "id": 78,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "bonders": "a"
    },
    "inconsiderate": {
      "bondswomen": "female",
      "bondsmen": "male"
    }
  },
  {
    "id": 79,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "partner": "a",
      "significant other": "a",
      "spouse": "a"
    },
    "inconsiderate": {
      "wife": "female",
      "husband": "male"
    }
  },
  {
    "id": 80,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "partners": "a",
      "significant others": "a",
      "spouses": "a"
    },
    "inconsiderate": {
      "wives": "female",
      "husbands": "male"
    }
  },
  {
    "id": 81,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "partner": "a",
      "friend": "a",
      "significant other": "a"
    },
    "inconsiderate": {
      "girlfriend": "female",
      "boyfriend": "male"
    }
  },
  {
    "id": 82,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "partners": "a",
      "friends": "a",
      "significant others": "a"
    },
    "inconsiderate": {
      "girlfriends": "female",
      "boyfriends": "male"
    }
  },
  {
    "id": 83,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "childhood": "a"
    },
    "inconsiderate": {
      "girlhood": "female",
      "boyhood": "male"
    }
  },
  {
    "id": 84,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "childish": "a"
    },
    "inconsiderate": {
      "girly": "female",
      "girlish": "female",
      "boyish": "male"
    }
  },
  {
    "id": 85,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "traveler": "a"
    },
    "inconsiderate": {
      "journeywoman": "female",
      "journeyman": "male"
    }
  },
  {
    "id": 86,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "travelers": "a"
    },
    "inconsiderate": {
      "journeywomen": "female",
      "journeymen": "male"
    }
  },
  {
    "id": 87,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "godparent": "a",
      "elder": "a",
      "patron": "a"
    },
    "inconsiderate": {
      "godmother": "female",
      "patroness": "female",
      "godfather": "male"
    }
  },
  {
    "id": 88,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "grandchild": "a"
    },
    "inconsiderate": {
      "granddaughter": "female",
      "grandson": "male"
    }
  },
  {
    "id": 89,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "grandchildred": "a"
    },
    "inconsiderate": {
      "granddaughters": "female",
      "grandsons": "male"
    }
  },
  {
    "id": 90,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "ancestor": "a"
    },
    "inconsiderate": {
      "foremother": "female",
      "forefather": "male"
    }
  },
  {
    "id": 91,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "ancestors": "a"
    },
    "inconsiderate": {
      "foremothers": "female",
      "forefathers": "male"
    }
  },
  {
    "id": 92,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "grandparent": "a",
      "ancestor": "a"
    },
    "inconsiderate": {
      "granny": "female",
      "grandma": "female",
      "grandmother": "female",
      "grandpappy": "male",
      "granddaddy": "male",
      "gramps": "male",
      "grandpa": "male",
      "grandfather": "male"
    }
  },
  {
    "id": 93,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "grandparents": "a",
      "ancestors": "a"
    },
    "inconsiderate": {
      "grandmothers": "female",
      "grandfathers": "male"
    }
  },
  {
    "id": 94,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "spouse": "a"
    },
    "inconsiderate": {
      "bride": "female",
      "groom": "male"
    }
  },
  {
    "id": 95,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "sibling": "a"
    },
    "inconsiderate": {
      "sister": "female",
      "brother": "male"
    }
  },
  {
    "id": 96,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "siblings": "a"
    },
    "inconsiderate": {
      "sisters": "female",
      "brothers": "male"
    }
  },
  {
    "id": 97,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "camera operator": "a",
      "camera person": "a"
    },
    "inconsiderate": {
      "camerawoman": "female",
      "cameraman": "male"
    }
  },
  {
    "id": 98,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "camera operators": "a"
    },
    "inconsiderate": {
      "camerawomen": "female",
      "cameramen": "male"
    }
  },
  {
    "id": 99,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "troglodyte": "a",
      "hominidae": "a"
    },
    "inconsiderate": {
      "cavewoman": "female",
      "caveman": "male"
    }
  },
  {
    "id": 100,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "troglodytae": "a",
      "troglodyti": "a",
      "troglodytes": "a",
      "hominids": "a"
    },
    "inconsiderate": {
      "cavewomen": "female",
      "cavemen": "male"
    }
  },
  {
    "id": 101,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "clergyperson": "a",
      "clergy": "a",
      "cleric": "a"
    },
    "inconsiderate": {
      "clergywomen": "female",
      "clergyman": "male"
    }
  },
  {
    "id": 102,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "clergies": "a",
      "clerics": "a"
    },
    "inconsiderate": {
      "clergywomen": "female",
      "clergymen": "male"
    }
  },
  {
    "id": 103,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "council member": "a"
    },
    "inconsiderate": {
      "councilwoman": "female",
      "councilman": "male"
    }
  },
  {
    "id": 104,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "council members": "a"
    },
    "inconsiderate": {
      "councilwomen": "female",
      "councilmen": "male"
    }
  },
  {
    "id": 105,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "country person": "a"
    },
    "inconsiderate": {
      "countrywoman": "female",
      "countryman": "male"
    }
  },
  {
    "id": 106,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "country folk": "a"
    },
    "inconsiderate": {
      "countrywomen": "female",
      "countrymen": "male"
    }
  },
  {
    "id": 107,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "artisan": "a",
      "craftsperson": "a",
      "skilled worker": "a"
    },
    "inconsiderate": {
      "handywoman": "female",
      "craftswoman": "female",
      "handyman": "male",
      "craftsman": "male"
    }
  },
  {
    "id": 108,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "presenter": "a",
      "entertainer": "a"
    },
    "inconsiderate": {
      "hostess": "female",
      "host": "male"
    }
  },
  {
    "id": 109,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "presenters": "a",
      "entertainers": "a"
    },
    "inconsiderate": {
      "hostesses": "female",
      "hosts": "male"
    }
  },
  {
    "id": 110,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "artisans": "a",
      "craftspersons": "a",
      "skilled workers": "a"
    },
    "inconsiderate": {
      "handywomen": "female",
      "craftswomen": "female",
      "handymen": "male",
      "craftsmen": "male"
    }
  },
  {
    "id": 111,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "guillotine": "a"
    },
    "inconsiderate": {
      "hangwoman": "female",
      "hangman": "male"
    }
  },
  {
    "id": 112,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "guillotines": "a"
    },
    "inconsiderate": {
      "hangwomen": "female",
      "hangmen": "male"
    }
  },
  {
    "id": 113,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "sidekick": "a"
    },
    "inconsiderate": {
      "henchwoman": "female",
      "henchman": "male"
    }
  },
  {
    "id": 114,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "sidekicks": "a"
    },
    "inconsiderate": {
      "henchwomen": "female",
      "henchmen": "male"
    }
  },
  {
    "id": 115,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "role-model": "a"
    },
    "inconsiderate": {
      "heroine": "female",
      "hero": "male"
    }
  },
  {
    "id": 116,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "role-models": "a"
    },
    "inconsiderate": {
      "heroines": "female",
      "heroes": "male"
    }
  },
  {
    "id": 117,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "parental": "a",
      "warm": "a",
      "intimate": "a"
    },
    "inconsiderate": {
      "maternal": "female",
      "paternal": "male",
      "fraternal": "male"
    }
  },
  {
    "id": 118,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "parental": "a"
    },
    "inconsiderate": {
      "maternity": "female",
      "paternity": "male"
    }
  },
  {
    "id": 119,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "parents": "a"
    },
    "inconsiderate": {
      "mamas": "female",
      "mothers": "female",
      "moms": "female",
      "mums": "female",
      "mommas": "female",
      "mommies": "female",
      "papas": "male",
      "fathers": "male",
      "dads": "male",
      "daddies": "male"
    }
  },
  {
    "id": 120,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "parent": "a"
    },
    "inconsiderate": {
      "mama": "female",
      "mother": "female",
      "mom": "female",
      "mum": "female",
      "momma": "female",
      "mommy": "female",
      "papa": "male",
      "father": "male",
      "dad": "male",
      "pop": "male",
      "daddy": "male"
    }
  },
  {
    "id": 121,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "child": "a"
    },
    "inconsiderate": {
      "daughter": "female",
      "son": "male"
    }
  },
  {
    "id": 122,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "children": "a"
    },
    "inconsiderate": {
      "daughters": "female",
      "sons": "male"
    }
  },
  {
    "id": 123,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "convierge": "a"
    },
    "inconsiderate": {
      "doorwoman": "female",
      "doorman": "male"
    }
  },
  {
    "id": 124,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "convierges": "a"
    },
    "inconsiderate": {
      "doorwomen": "female",
      "doormen": "male"
    }
  },
  {
    "id": 125,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "humanly": "a",
      "mature": "a"
    },
    "inconsiderate": {
      "feminin": "female",
      "dudely": "male",
      "manly": "male"
    }
  },
  {
    "id": 126,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "humans": "a"
    },
    "inconsiderate": {
      "females": "female",
      "males": "male"
    }
  },
  {
    "id": 127,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "ruler": "a"
    },
    "inconsiderate": {
      "empress": "female",
      "queen": "female",
      "emperor": "male",
      "king": "male"
    }
  },
  {
    "id": 128,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "rulers": "a"
    },
    "inconsiderate": {
      "empresses": "female",
      "queens": "female",
      "emperors": "male",
      "kings": "male"
    }
  },
  {
    "id": 129,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "jumbo": "a",
      "gigantic": "a"
    },
    "inconsiderate": {
      "queensize": "female",
      "kingsize": "male"
    }
  },
  {
    "id": 130,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "power behind the throne": "a"
    },
    "inconsiderate": {
      "queenmaker": "female",
      "kingmaker": "male"
    }
  },
  {
    "id": 131,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "civilian": "a"
    },
    "inconsiderate": {
      "laywoman": "female",
      "layman": "male"
    }
  },
  {
    "id": 132,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "civilians": "a"
    },
    "inconsiderate": {
      "laywomen": "female",
      "laymen": "male"
    }
  },
  {
    "id": 133,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "official": "a",
      "owner": "a",
      "expert": "a",
      "superior": "a",
      "chief": "a",
      "ruler": "a"
    },
    "inconsiderate": {
      "dame": "female",
      "lord": "male"
    }
  },
  {
    "id": 134,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "officials": "a",
      "masters": "a",
      "chiefs": "a",
      "rulers": "a"
    },
    "inconsiderate": {
      "dames": "female",
      "lords": "male"
    }
  },
  {
    "id": 135,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "adulthood": "a",
      "personhood": "a"
    },
    "inconsiderate": {
      "girlhood": "female",
      "masculinity": "male",
      "manhood": "male"
    }
  },
  {
    "id": 136,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "humanity": "a"
    },
    "inconsiderate": {
      "femininity": "female",
      "manliness": "male"
    }
  },
  {
    "id": 137,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "shooter": "a"
    },
    "inconsiderate": {
      "markswoman": "female",
      "marksman": "male"
    }
  },
  {
    "id": 138,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "shooters": "a"
    },
    "inconsiderate": {
      "markswomen": "female",
      "marksmen": "male"
    }
  },
  {
    "id": 139,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "intermediary": "a",
      "go-between": "a"
    },
    "inconsiderate": {
      "middlewoman": "female",
      "middleman": "male"
    }
  },
  {
    "id": 140,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "intermediaries": "a",
      "go-betweens": "a"
    },
    "inconsiderate": {
      "middlewomen": "female",
      "middlemen": "male"
    }
  },
  {
    "id": 141,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "milk person": "a"
    },
    "inconsiderate": {
      "milkwoman": "female",
      "milkman": "male"
    }
  },
  {
    "id": 142,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "milk people": "a"
    },
    "inconsiderate": {
      "milkwomen": "female",
      "milkmen": "male"
    }
  },
  {
    "id": 143,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "nibling": "a",
      "sibling’s child": "a"
    },
    "inconsiderate": {
      "niece": "female",
      "nephew": "male"
    }
  },
  {
    "id": 144,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "niblings": "a",
      "sibling’s children": "a"
    },
    "inconsiderate": {
      "nieces": "female",
      "nephews": "male"
    }
  },
  {
    "id": 145,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "noble": "a"
    },
    "inconsiderate": {
      "noblewoman": "female",
      "nobleman": "male"
    }
  },
  {
    "id": 146,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "nobles": "a"
    },
    "inconsiderate": {
      "noblewomen": "female",
      "noblemen": "male"
    }
  },
  {
    "id": 147,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "notary": "a",
      "consumer advocate": "a",
      "trouble shooter": "a"
    },
    "inconsiderate": {
      "ombudswoman": "female",
      "ombudsman": "male"
    }
  },
  {
    "id": 148,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "notaries": "a"
    },
    "inconsiderate": {
      "ombudswomen": "female",
      "ombudsmen": "male"
    }
  },
  {
    "id": 149,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "heir": "a"
    },
    "inconsiderate": {
      "princess": "female",
      "prince": "male"
    }
  },
  {
    "id": 150,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "heirs": "a"
    },
    "inconsiderate": {
      "princesses": "female",
      "princes": "male"
    }
  },
  {
    "id": 151,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "fairy": "a"
    },
    "inconsiderate": {
      "sandwoman": "female",
      "sandman": "male"
    }
  },
  {
    "id": 152,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "fairies": "a"
    },
    "inconsiderate": {
      "sandwomen": "female",
      "sandmen": "male"
    }
  },
  {
    "id": 153,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "promoter": "a"
    },
    "inconsiderate": {
      "showwoman": "female",
      "showman": "male"
    }
  },
  {
    "id": 154,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "promoters": "a"
    },
    "inconsiderate": {
      "showwomen": "female",
      "show women": "female",
      "showmen": "male"
    }
  },
  {
    "id": 155,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "astronaut": "a"
    },
    "inconsiderate": {
      "spacewoman": "female",
      "spaceman": "male"
    }
  },
  {
    "id": 156,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "astronauts": "a"
    },
    "inconsiderate": {
      "spacewomen": "female",
      "spacemen": "male"
    }
  },
  {
    "id": 157,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "speaker": "a",
      "spokesperson": "a",
      "representative": "a"
    },
    "inconsiderate": {
      "spokeswoman": "female",
      "spokesman": "male"
    }
  },
  {
    "id": 158,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "speakers": "a",
      "spokespersons": "a"
    },
    "inconsiderate": {
      "spokeswomen": "female",
      "spokesmen": "male"
    }
  },
  {
    "id": 159,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "athlete": "a",
      "sports person": "a"
    },
    "inconsiderate": {
      "sportswoman": "female",
      "sportsman": "male"
    }
  },
  {
    "id": 160,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "athletes": "a",
      "sports persons": "a"
    },
    "inconsiderate": {
      "sportswomen": "female",
      "sportsmen": "male"
    }
  },
  {
    "id": 161,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "senator": "a"
    },
    "inconsiderate": {
      "stateswoman": "female",
      "statesman": "male"
    }
  },
  {
    "id": 162,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "step-sibling": "a"
    },
    "inconsiderate": {
      "stepsister": "female",
      "stepbrother": "male"
    }
  },
  {
    "id": 163,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "step-siblings": "a"
    },
    "inconsiderate": {
      "stepsisters": "female",
      "stepbrothers": "male"
    }
  },
  {
    "id": 164,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "step-parent": "a"
    },
    "inconsiderate": {
      "stepmom": "female",
      "stepmother": "female",
      "stepdad": "male",
      "stepfather": "male"
    }
  },
  {
    "id": 165,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "step-parents": "a"
    },
    "inconsiderate": {
      "stepmothers": "female",
      "stepfathers": "male"
    }
  },
  {
    "id": 166,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "titan": "a"
    },
    "inconsiderate": {
      "superwoman": "female",
      "superman": "male"
    }
  },
  {
    "id": 167,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "titans": "a"
    },
    "inconsiderate": {
      "superwomen": "female",
      "supermen": "male"
    }
  },
  {
    "id": 168,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "inhumane": "a"
    },
    "inconsiderate": {
      "unwomanly": "female",
      "unwomenly": "female",
      "unmanly": "male",
      "unmenly": "male"
    }
  },
  {
    "id": 169,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "watcher": "a"
    },
    "inconsiderate": {
      "watchwoman": "female",
      "watchman": "male"
    }
  },
  {
    "id": 170,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "watchers": "a"
    },
    "inconsiderate": {
      "watchwomen": "female",
      "watchmen": "male"
    }
  },
  {
    "id": 171,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "weather forecaster": "a",
      "meteorologist": "a"
    },
    "inconsiderate": {
      "weatherwoman": "female",
      "weatherman": "male"
    }
  },
  {
    "id": 172,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "weather forecasters": "a",
      "meteorologists": "a"
    },
    "inconsiderate": {
      "weatherwomen": "female",
      "weathermen": "male"
    }
  },
  {
    "id": 173,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "bereaved": "a"
    },
    "inconsiderate": {
      "widow": "female",
      "widows": "female",
      "widower": "male",
      "widowers": "male"
    }
  },
  {
    "id": 174,
    "type": "or",
    "categories": [
      "female",
      "male"
    ],
    "considerate": {
      "own person": "a"
    },
    "inconsiderate": {
      "own woman": "female",
      "own man": "male"
    }
  },
  {
    "id": 175,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "french": "a"
    },
    "inconsiderate": {
      "frenchmen": "male"
    }
  },
  {
    "id": 176,
    "type": "simple",
    "categories": [
      "female"
    ],
    "considerate": {
      "courteous": "a",
      "cultured": "a"
    },
    "inconsiderate": {
      "ladylike": "female"
    }
  },
  {
    "id": 177,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "resolutely": "a",
      "bravely": "a"
    },
    "inconsiderate": {
      "like a man": "male"
    }
  },
  {
    "id": 178,
    "type": "simple",
    "categories": [
      "female"
    ],
    "considerate": {
      "birth name": "a"
    },
    "inconsiderate": {
      "maiden name": "female"
    }
  },
  {
    "id": 179,
    "type": "simple",
    "categories": [
      "female"
    ],
    "considerate": {
      "first voyage": "a"
    },
    "inconsiderate": {
      "maiden voyage": "female"
    }
  },
  {
    "id": 180,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "strong enough": "a"
    },
    "inconsiderate": {
      "man enough": "male"
    }
  },
  {
    "id": 181,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "upstaging": "a",
      "competitiveness": "a"
    },
    "inconsiderate": {
      "oneupmanship": "male"
    }
  },
  {
    "id": 182,
    "type": "simple",
    "categories": [
      "female"
    ],
    "considerate": {
      "ms.": "a"
    },
    "inconsiderate": {
      "miss.": "female",
      "mrs.": "female"
    }
  },
  {
    "id": 183,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "manufactured": "a",
      "artificial": "a",
      "synthetic": "a",
      "machine-made": "a"
    },
    "inconsiderate": {
      "manmade": "male"
    }
  },
  {
    "id": 184,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "dynamo": "a"
    },
    "inconsiderate": {
      "man of action": "male"
    }
  },
  {
    "id": 185,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "scholar": "a",
      "writer": "a",
      "literary figure": "a"
    },
    "inconsiderate": {
      "man of letters": "male"
    }
  },
  {
    "id": 186,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "sophisticate": "a"
    },
    "inconsiderate": {
      "man of the world": "male"
    }
  },
  {
    "id": 187,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "camaraderie": "a"
    },
    "inconsiderate": {
      "fellowship": "male"
    }
  },
  {
    "id": 188,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "first-year student": "a",
      "fresher": "a"
    },
    "inconsiderate": {
      "freshman": "male",
      "freshwoman": "male"
    }
  },
  {
    "id": 189,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "quality construction": "a",
      "expertise": "a"
    },
    "inconsiderate": {
      "workmanship": "male"
    }
  },
  {
    "id": 190,
    "type": "simple",
    "categories": [
      "female"
    ],
    "considerate": {
      "homemaker": "a",
      "homeworker": "a"
    },
    "inconsiderate": {
      "housewife": "female"
    }
  },
  {
    "id": 191,
    "type": "simple",
    "categories": [
      "female"
    ],
    "considerate": {
      "homemakers": "a",
      "homeworkers": "a"
    },
    "inconsiderate": {
      "housewifes": "female"
    }
  },
  {
    "id": 192,
    "type": "simple",
    "categories": [
      "female"
    ],
    "considerate": {
      "loving": "a",
      "warm": "a",
      "nurturing": "a"
    },
    "inconsiderate": {
      "motherly": "female"
    }
  },
  {
    "id": 193,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "human resources": "a"
    },
    "inconsiderate": {
      "manpower": "male"
    }
  },
  {
    "id": 194,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "emcee": "a",
      "moderator": "a",
      "convenor": "a"
    },
    "inconsiderate": {
      "master of ceremonies": "male"
    }
  },
  {
    "id": 195,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "skilled": "a",
      "authoritative": "a",
      "commanding": "a"
    },
    "inconsiderate": {
      "masterful": "male"
    }
  },
  {
    "id": 196,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "genius": "a",
      "creator": "a",
      "instigator": "a",
      "oversee": "a",
      "launch": "a",
      "originate": "a"
    },
    "inconsiderate": {
      "mastermind": "male"
    }
  },
  {
    "id": 197,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "work of genius": "a",
      "chef d’oeuvre": "a"
    },
    "inconsiderate": {
      "masterpiece": "male"
    }
  },
  {
    "id": 198,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "vision": "a",
      "comprehensive plan": "a"
    },
    "inconsiderate": {
      "masterplan": "male"
    }
  },
  {
    "id": 199,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "trump card": "a",
      "stroke of genius": "a"
    },
    "inconsiderate": {
      "masterstroke": "male"
    }
  },
  {
    "id": 200,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "fanatic": "a",
      "zealot": "a",
      "enthusiast": "a"
    },
    "inconsiderate": {
      "madman": "male",
      "mad man": "male"
    }
  },
  {
    "id": 201,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "maniacs": "a"
    },
    "inconsiderate": {
      "madmen": "male",
      "mad men": "male"
    }
  },
  {
    "id": 202,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "humankind": "a"
    },
    "inconsiderate": {
      "mankind": "male"
    }
  },
  {
    "id": 203,
    "type": "simple",
    "categories": [
      "male"
    ],
    "considerate": {
      "staff hours": "a",
      "hours of work": "a"
    },
    "inconsiderate": {
      "manhour": "male",
      "man hour": "male"
    }
  },
  {
    "id": 204,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "staffed": "a",
      "crewed": "a",
      "pilotted": "a"
    },
    "inconsiderate": {
      "manned": "a"
    }
  },
  {
    "id": 205,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "robotic": "a",
      "automated": "a"
    },
    "inconsiderate": {
      "unmanned": "a"
    }
  },
  {
    "id": 206,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "whining": "a",
      "complaining": "a",
      "crying": "a"
    },
    "inconsiderate": {
      "bitching": "a",
      "moaning": "a"
    }
  },
  {
    "id": 207,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "whine": "a",
      "complain": "a",
      "cry": "a"
    },
    "inconsiderate": {
      "bitch": "a",
      "moan": "a"
    }
  },
  {
    "id": 208,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with learning disabilities": "a"
    },
    "inconsiderate": {
      "learning disabled": "a"
    }
  },
  {
    "id": 209,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "turned off": "a",
      "person with a disability": "a",
      "people with disabilities": "a"
    },
    "inconsiderate": {
      "disabled": "a"
    }
  },
  {
    "id": 210,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with a disability": "a",
      "people with disabilities": "a"
    },
    "inconsiderate": {
      "birth defect": "a"
    },
    "note": "If possible, describe exacly what this is. (source: http://ncdj.org/style-guide/)"
  },
  {
    "id": 211,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with a disability": "a",
      "people with disabilities": "a"
    },
    "inconsiderate": {
      "birth defect": "a",
      "suffers from disabilities": "a",
      "suffering from disabilities": "a",
      "suffering from a disability": "a",
      "afflicted with disabilities": "a",
      "afflicted with a disability": "a"
    }
  },
  {
    "id": 212,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "people with intellectual disabilities": "a"
    },
    "inconsiderate": {
      "intellectually disabled people": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 213,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with an intellectual disability": "a"
    },
    "inconsiderate": {
      "intellectually disabled": "a",
      "suffers from intellectual disabilities": "a",
      "suffering from intellectual disabilities": "a",
      "suffering from an intellectual disability": "a",
      "afflicted with intellectual disabilities": "a",
      "afflicted with a intellectual disability": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 214,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "rude": "a",
      "mean": "a",
      "disgusting": "a",
      "vile": "a",
      "person with symptoms of mental illness": "a",
      "person with mental illness": "a",
      "person with symptoms of a mental disorder": "a",
      "person with a mental disorder": "a"
    },
    "inconsiderate": {
      "batshit": "a",
      "psycho": "a",
      "crazy": "a",
      "insane": "a",
      "insanity": "a",
      "loony": "a",
      "lunacy": "a",
      "lunatic": "a",
      "mentally ill": "a",
      "psychopathology": "a",
      "mental defective": "a",
      "moron": "a",
      "moronic": "a",
      "nuts": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 215,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "fluctuating": "a",
      "person with schizophrenia": "a",
      "person with bipolar disorder": "a"
    },
    "inconsiderate": {
      "bipolar": "a",
      "schizophrenic": "a",
      "schizo": "a",
      "suffers from schizophrenia": "a",
      "suffering from schizophrenia": "a",
      "afflicted with schizophrenia": "a"
    }
  },
  {
    "id": 216,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "accessible parking": "a"
    },
    "inconsiderate": {
      "handicapped parking": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 217,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with a handicap": "a"
    },
    "inconsiderate": {
      "handicapped": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 218,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with an amputation": "a"
    },
    "inconsiderate": {
      "amputee": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 219,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with a limp": "a"
    },
    "inconsiderate": {
      "cripple": "a",
      "crippled": "a"
    }
  },
  {
    "id": 220,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with Down Syndrome": "a"
    },
    "inconsiderate": {
      "mongoloid": "a"
    }
  },
  {
    "id": 221,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "individual who has had a stroke": "a"
    },
    "inconsiderate": {
      "stroke victim": "a",
      "suffering from a stroke": "a",
      "victim of a stroke": "a"
    }
  },
  {
    "id": 222,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person who has multiple sclerosis": "a"
    },
    "inconsiderate": {
      "suffers from multiple sclerosis": "a",
      "suffering from multiple sclerosis": "a",
      "victim of multiple sclerosis": "a",
      "multiple sclerosis victim": "a",
      "afflicted with multiple sclerosis": "a"
    }
  },
  {
    "id": 223,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "with family support needs": "a"
    },
    "inconsiderate": {
      "family burden": "a"
    }
  },
  {
    "id": 224,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "psychiatric hospital": "a",
      "mental health hospital": "a"
    },
    "inconsiderate": {
      "asylum": "a"
    }
  },
  {
    "id": 225,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "chaos": "a",
      "hectic": "a",
      "pandemonium": "a"
    },
    "inconsiderate": {
      "asylum": "a",
      "bedlam": "a",
      "madhouse": "a",
      "loony bin": "a"
    }
  },
  {
    "id": 226,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Down Syndrome": "a"
    },
    "inconsiderate": {
      "downs syndrome": "a"
    },
    "note": "Source: http://www.specialolympics.org/uploadedFiles/Fact%20Sheet_Terminology%20Guide.pdf"
  },
  {
    "id": 227,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "silly": "a",
      "dullard": "a",
      "person with Down Syndrome": "a",
      "person with developmental disabilities": "a",
      "delay": "a",
      "hold back": "a"
    },
    "inconsiderate": {
      "retard": "a",
      "retarded": "a"
    }
  },
  {
    "id": 228,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "sillies": "a",
      "dullards": "a",
      "people with developmental disabilities": "a",
      "people with Down’s Syndrome": "a",
      "delays": "a",
      "holds back": "a"
    },
    "inconsiderate": {
      "retards": "a"
    }
  },
  {
    "id": 229,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with a psychotic condition": "a",
      "person with psychosis": "a"
    },
    "inconsiderate": {
      "psychotic": "a",
      "suffers from psychosis": "a",
      "suffering from psychosis": "a",
      "afflicted with psychosis": "a",
      "victim of psychosis": "a"
    }
  },
  {
    "id": 230,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "boring": "a",
      "dull": "a"
    },
    "inconsiderate": {
      "lame": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 231,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with AIDS": "a"
    },
    "inconsiderate": {
      "suffering from aids": "a",
      "suffer from aids": "a",
      "suffers from aids": "a",
      "afflicted with aids": "a",
      "victim of aids": "a",
      "aids victim": "a"
    }
  },
  {
    "id": 232,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "uses a wheelchair": "a"
    },
    "inconsiderate": {
      "confined to a wheelchair": "a",
      "bound to a wheelchair": "a",
      "restricted to a wheelchair": "a",
      "wheelchair bound": "a"
    }
  },
  {
    "id": 233,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "athletes": "a",
      "Special Olympics athletes": "a"
    },
    "inconsiderate": {
      "special olympians": "a",
      "special olympic athletes": "a"
    },
    "note": "Source: http://www.specialolympics.org/uploadedFiles/Fact%20Sheet_Terminology%20Guide.pdf"
  },
  {
    "id": 234,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "non-disabled": "a"
    },
    "inconsiderate": {
      "ablebodied": "a"
    },
    "note": "Sometimes `typical` can be used. (source: http://ncdj.org/style-guide/)"
  },
  {
    "id": 235,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with a drug addiction": "a",
      "person recovering from a drug addiction": "a"
    },
    "inconsiderate": {
      "addict": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 236,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "people with a drug addiction": "a",
      "people recovering from a drug addiction": "a"
    },
    "inconsiderate": {
      "addicts": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 237,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "people with a drug addiction": "a",
      "people recovering from a drug addiction": "a"
    },
    "inconsiderate": {
      "addicts": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 238,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "someone with an alcohol problem": "a"
    },
    "inconsiderate": {
      "alcoholic": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 239,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with autism spectrum disorder": "a"
    },
    "inconsiderate": {
      "autistic": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 240,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "deaf": "a"
    },
    "inconsiderate": {
      "deaf and dumb": "a",
      "deafmute": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 241,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with dementia": "a"
    },
    "inconsiderate": {
      "demented": "a",
      "senile": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 242,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "sad": "a",
      "blue": "a",
      "bummed out": "a",
      "person with seasonal affective disorder": "a",
      "person with psychotic depression": "a",
      "person with postpartum depression": "a"
    },
    "inconsiderate": {
      "depressed": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 243,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with dwarfism": "a"
    },
    "inconsiderate": {
      "vertically challenged": "a",
      "midget": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 244,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with dyslexia": "a"
    },
    "inconsiderate": {
      "dyslexic": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 245,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with epilepsy": "a"
    },
    "inconsiderate": {
      "epileptic": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 246,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "hard of hearing": "a",
      "partially deaf": "a",
      "partial hearing loss": "a",
      "deaf": "a"
    },
    "inconsiderate": {
      "hearing impaired": "a",
      "hearing impairment": "a"
    },
    "note": "When possible, ask the person what they prefer. (source: http://ncdj.org/style-guide/)"
  },
  {
    "id": 247,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "polio": "a",
      "person who had polio": "a"
    },
    "inconsiderate": {
      "infantile paralysis": "a",
      "suffers from polio": "a",
      "suffering from polio": "a",
      "suffering from a polio": "a",
      "afflicted with polio": "a",
      "afflicted with a polio": "a",
      "victim of polio": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 248,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "sustain an injury": "a",
      "receive an injury": "a"
    },
    "inconsiderate": {
      "suffer from an injury": "a",
      "suffers from an injury": "a",
      "suffering from an injury": "a",
      "afflicted with an injury": "a",
      "victim of an injury": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 249,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "sustaine injuries": "a",
      "receive injuries": "a"
    },
    "inconsiderate": {
      "suffer from injuries": "a",
      "suffers from injuries": "a",
      "suffering from injuries": "a",
      "afflicted with injuries": "a",
      "victim of injuries": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 250,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with paraplegia": "a"
    },
    "inconsiderate": {
      "paraplegic": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 251,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with quadriplegia": "a"
    },
    "inconsiderate": {
      "quadriplegic": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 252,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with cerebral palsy": "a"
    },
    "inconsiderate": {
      "spastic": "a",
      "spaz": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 253,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "stuttering": "a"
    },
    "inconsiderate": {
      "stammering": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 254,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person who stutters": "a"
    },
    "inconsiderate": {
      "stutterer": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 255,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "tourette syndrome": "a"
    },
    "inconsiderate": {
      "tourettes syndrome": "a",
      "tourettes disorder": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 256,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "treatment center": "a"
    },
    "inconsiderate": {
      "rehab center": "a",
      "detox center": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 257,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "treatment": "a"
    },
    "inconsiderate": {
      "rehab": "a",
      "detox": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 258,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with a personality disorder": "a",
      "person with psychopathic personality": "a"
    },
    "inconsiderate": {
      "sociopath": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 259,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "people with psychopathic personalities": "a",
      "people with a personality disorder": "a"
    },
    "inconsiderate": {
      "sociopaths": "a"
    },
    "note": "Source: http://ncdj.org/style-guide/"
  },
  {
    "id": 260,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "foolish": "a",
      "ludicrous": "a",
      "speechless": "a",
      "silent": "a"
    },
    "inconsiderate": {
      "dumb": "a"
    },
    "note": "Source: http://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html"
  },
  {
    "id": 261,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "foolish": "a",
      "ludicrous": "a",
      "unintelligent": "a"
    },
    "inconsiderate": {
      "simpleton": "a",
      "stupid": "a",
      "wacko": "a",
      "whacko": "a"
    },
    "note": "Source: http://www.mmonjejr.com/2014/02/deconstructing-stupid.html"
  },
  {
    "id": 262,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "fit of terror": "a",
      "scare": "a"
    },
    "inconsiderate": {
      "panic attack": "a"
    }
  },
  {
    "id": 263,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "thin": "a",
      "slim": "a"
    },
    "inconsiderate": {
      "anorexic": "a"
    }
  },
  {
    "id": 264,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "obsesive": "a",
      "pedantic": "a",
      "niggly": "a",
      "picky": "a"
    },
    "inconsiderate": {
      "ocd": "a",
      "o.c.d": "a",
      "o.c.d.": "a"
    },
    "note": "Source: http://english.stackexchange.com/questions/247550/"
  },
  {
    "id": 265,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "restlessness": "a",
      "sleeplessness": "a"
    },
    "inconsiderate": {
      "insomnia": "a"
    }
  },
  {
    "id": 266,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person who has insomnia": "a"
    },
    "inconsiderate": {
      "insomniac": "a"
    }
  },
  {
    "id": 267,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "people who have insomnia": "a"
    },
    "inconsiderate": {
      "insomniacs": "a"
    }
  },
  {
    "id": 268,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "empty": "a",
      "sterile": "a",
      "infertile": "a"
    },
    "inconsiderate": {
      "barren": "a"
    },
    "note": "Source: http://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html"
  },
  {
    "id": 269,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "careless": "a",
      "heartless": "a",
      "indifferent": "a",
      "insensitive": "a"
    },
    "inconsiderate": {
      "blind to": "a",
      "blind eye to": "a",
      "blinded by": "a"
    },
    "note": "Source: http://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html"
  },
  {
    "id": 270,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "careless": "a",
      "heartless": "a",
      "indifferent": "a",
      "insensitive": "a"
    },
    "inconsiderate": {
      "blind to": "a",
      "blind eye to": "a",
      "blinded by": "a",
      "deaf to": "a",
      "deaf ear to": "a",
      "deafened by": "a"
    },
    "note": "Source: http://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html"
  },
  {
    "id": 271,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "creep": "a",
      "fool": "a"
    },
    "inconsiderate": {
      "cretin": "a"
    },
    "note": "Source: http://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html"
  },
  {
    "id": 272,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "absurd": "a",
      "foolish": "a"
    },
    "inconsiderate": {
      "daft": "a"
    },
    "note": "Source: http://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html"
  },
  {
    "id": 273,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "foolish": "a",
      "ludicrous": "a",
      "silly": "a"
    },
    "inconsiderate": {
      "feebleminded": "a",
      "feeble minded": "a",
      "idiot": "a",
      "imbecile": "a"
    },
    "note": "Source: http://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html"
  },
  {
    "id": 274,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person with a cleft-lip and palate": "a"
    },
    "inconsiderate": {
      "harelipped": "a",
      "cleftlipped": "a"
    },
    "note": "Source: http://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html"
  },
  {
    "id": 275,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "cleft-lip and palate": "a"
    },
    "inconsiderate": {
      "harelip": "a"
    },
    "note": "Source: http://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html"
  },
  {
    "id": 276,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "cleft-lip and palate": "a"
    },
    "inconsiderate": {
      "harelip": "a"
    },
    "note": "Source: http://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html"
  },
  {
    "id": 277,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "fanatic": "a",
      "zealot": "a",
      "enthusiast": "a"
    },
    "inconsiderate": {
      "maniac": "a"
    },
    "note": "Source: http://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html"
  },
  {
    "id": 278,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Armenian person": "a",
      "Armenian American": "a"
    },
    "inconsiderate": {
      "armo": "a"
    }
  },
  {
    "id": 279,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Armenian people": "a",
      "Armenian Americans": "a"
    },
    "inconsiderate": {
      "armos": "a"
    }
  },
  {
    "id": 280,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Australian Aboriginal": "a",
      "people of the pacific islands": "a"
    },
    "inconsiderate": {
      "boongas": "a",
      "boongs": "a",
      "bungas": "a",
      "boonies": "a"
    }
  },
  {
    "id": 281,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Australian Aboriginal": "a",
      "pacific islander": "a"
    },
    "inconsiderate": {
      "boonga": "a",
      "boong": "a",
      "bong": "a",
      "bung": "a",
      "bunga": "a",
      "boonie": "a"
    }
  },
  {
    "id": 282,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Dutch person": "a"
    },
    "inconsiderate": {
      "cheesehead": "a"
    }
  },
  {
    "id": 283,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Dutch people": "a"
    },
    "inconsiderate": {
      "cheeseheads": "a"
    }
  },
  {
    "id": 284,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "French person": "a"
    },
    "inconsiderate": {
      "cheeseeating surrender monkey": "a",
      "cheese eating surrender monkey": "a"
    }
  },
  {
    "id": 285,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "French people": "a"
    },
    "inconsiderate": {
      "cheeseeating surrender monkies": "a",
      "cheese eating surrender monkies": "a"
    }
  },
  {
    "id": 286,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Finnish American": "a"
    },
    "inconsiderate": {
      "chinaswede": "a",
      "china swede": "a"
    }
  },
  {
    "id": 287,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Finnish Americans": "a"
    },
    "inconsiderate": {
      "chinaswedes": "a",
      "china swedes": "a"
    }
  },
  {
    "id": 288,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Chinese person": "a"
    },
    "inconsiderate": {
      "chinamen": "a"
    }
  },
  {
    "id": 289,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Chinese people": "a"
    },
    "inconsiderate": {
      "ching chong": "a",
      "chinaman": "a"
    }
  },
  {
    "id": 290,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Chinese person": "a",
      "Asian person": "a"
    },
    "inconsiderate": {
      "banana": "a",
      "ching chong": "a",
      "chink": "a"
    }
  },
  {
    "id": 291,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Chinese people": "a",
      "Asian people": "a"
    },
    "inconsiderate": {
      "bananas": "a",
      "ching chongs": "a",
      "chinks": "a"
    }
  },
  {
    "id": 292,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Chinese person": "a",
      "Korean person": "a"
    },
    "inconsiderate": {
      "chonky": "a",
      "chunky": "a",
      "chunger": "a"
    }
  },
  {
    "id": 293,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Chinese people": "a",
      "Korean people": "a"
    },
    "inconsiderate": {
      "chonkies": "a",
      "chunkies": "a",
      "chonkys": "a",
      "chunkys": "a",
      "chungers": "a"
    }
  },
  {
    "id": 294,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Canadian Aboriginal": "a"
    },
    "inconsiderate": {
      "chug": "a"
    }
  },
  {
    "id": 295,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Canadian Aboriginals": "a"
    },
    "inconsiderate": {
      "chugs": "a"
    }
  },
  {
    "id": 296,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "hispanic person": "a",
      "person of color": "a",
      "black person": "a"
    },
    "inconsiderate": {
      "coconut": "a",
      "oreo": "a"
    }
  },
  {
    "id": 297,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "hispanic people": "a",
      "people of color": "a",
      "black people": "a"
    },
    "inconsiderate": {
      "coconuts": "a",
      "oreos": "a"
    }
  },
  {
    "id": 298,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Cajun": "a"
    },
    "inconsiderate": {
      "coonass": "a",
      "coon ass": "a"
    }
  },
  {
    "id": 299,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Cajun people": "a"
    },
    "inconsiderate": {
      "coonasses": "a",
      "coon asses": "a"
    }
  },
  {
    "id": 300,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Indian person": "a"
    },
    "inconsiderate": {
      "currymuncher": "a",
      "curry muncher": "a"
    }
  },
  {
    "id": 301,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Indian people": "a"
    },
    "inconsiderate": {
      "currymunchers": "a",
      "curry munchers": "a"
    }
  },
  {
    "id": 302,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Hindi person": "a"
    },
    "inconsiderate": {
      "Dotheads": "a",
      "Dot heads": "a"
    }
  },
  {
    "id": 303,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Hindi people": "a"
    },
    "inconsiderate": {
      "Dothead": "a",
      "Dot head": "a"
    }
  },
  {
    "id": 304,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "caribbean people": "a"
    },
    "inconsiderate": {
      "golliwogs": "a"
    }
  },
  {
    "id": 305,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "caribbean person": "a"
    },
    "inconsiderate": {
      "golliwog": "a"
    }
  },
  {
    "id": 306,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "foreigners": "a"
    },
    "inconsiderate": {
      "guizi": "a"
    }
  },
  {
    "id": 307,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "romani person": "a"
    },
    "inconsiderate": {
      "gyppos": "a",
      "gippos": "a",
      "gypos": "a",
      "gyppies": "a",
      "gyppys": "a",
      "gipps": "a",
      "gypsys": "a",
      "gypsies": "a"
    }
  },
  {
    "id": 308,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "romani people": "a"
    },
    "inconsiderate": {
      "gyppo": "a",
      "gippo": "a",
      "gypo": "a",
      "gyppie": "a",
      "gyppy": "a",
      "gipp": "a",
      "gypsy": "a"
    }
  },
  {
    "id": 309,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "afrikaner": "a"
    },
    "inconsiderate": {
      "hairyback": "a"
    }
  },
  {
    "id": 310,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "afrikaners": "a"
    },
    "inconsiderate": {
      "hairybacks": "a"
    }
  },
  {
    "id": 311,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Maori person": "a"
    },
    "inconsiderate": {
      "hori": "a"
    }
  },
  {
    "id": 312,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Maoris": "a"
    },
    "inconsiderate": {
      "horis": "a"
    }
  },
  {
    "id": 313,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Indonesian person": "a"
    },
    "inconsiderate": {
      "jap": "a"
    }
  },
  {
    "id": 314,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Indonesians": "a"
    },
    "inconsiderate": {
      "indons": "a"
    }
  },
  {
    "id": 315,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Japanese person": "a"
    },
    "inconsiderate": {
      "jap": "a"
    }
  },
  {
    "id": 316,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Japanese": "a"
    },
    "inconsiderate": {
      "japs": "a"
    }
  },
  {
    "id": 317,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Koreans": "a"
    },
    "inconsiderate": {
      "gyopos": "a",
      "kyopos": "a",
      "kimchis": "a"
    }
  },
  {
    "id": 318,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Korean person": "a"
    },
    "inconsiderate": {
      "gyopo": "a",
      "kyopo": "a",
      "kimchi": "a"
    }
  },
  {
    "id": 319,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "lebanese": "a"
    },
    "inconsiderate": {
      "lebos": "a"
    }
  },
  {
    "id": 320,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "lebanese person": "a"
    },
    "inconsiderate": {
      "lebo": "a"
    }
  },
  {
    "id": 321,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "lithuanians": "a"
    },
    "inconsiderate": {
      "lugans": "a"
    }
  },
  {
    "id": 322,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "lithuanian person": "a"
    },
    "inconsiderate": {
      "lugan": "a"
    }
  },
  {
    "id": 323,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "russians": "a"
    },
    "inconsiderate": {
      "moskals": "a"
    }
  },
  {
    "id": 324,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "russian person": "a"
    },
    "inconsiderate": {
      "moskal": "a"
    }
  },
  {
    "id": 325,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Poles": "a",
      "Slavs": "a"
    },
    "inconsiderate": {
      "polacks": "a",
      "pollocks": "a"
    }
  },
  {
    "id": 326,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Pole": "a",
      "Slav": "a",
      "Polish person": "a",
      "Slavic person": "a"
    },
    "inconsiderate": {
      "polack": "a",
      "pollock": "a"
    }
  },
  {
    "id": 327,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "English": "a",
      "Brittish": "a"
    },
    "inconsiderate": {
      "lebo": "a",
      "pom": "a",
      "poms": "a",
      "pohm": "a",
      "pohms": "a",
      "pommy": "a",
      "pommie": "a",
      "pommies": "a",
      "pommie grant": "a",
      "pommie grants": "a"
    }
  },
  {
    "id": 328,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Hispanic": "a",
      "Spanish": "a"
    },
    "inconsiderate": {
      "spic": "a",
      "spick": "a",
      "spik": "a",
      "spig": "a",
      "spigotty": "a"
    }
  },
  {
    "id": 329,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "German": "a"
    },
    "inconsiderate": {
      "boche": "a",
      "bosche": "a",
      "bosch": "a",
      "hun": "a",
      "jerry": "a",
      "kraut": "a",
      "piefke": "a",
      "squarehead": "a"
    }
  },
  {
    "id": 330,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Germans": "a"
    },
    "inconsiderate": {
      "boches": "a",
      "bosches": "a",
      "boschs": "a",
      "huns": "a",
      "jerries": "a",
      "krauts": "a",
      "piefkes": "a",
      "squareheads": "a"
    }
  },
  {
    "id": 331,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "female Australian Aboriginal": "a"
    },
    "inconsiderate": {
      "lubra": "a"
    }
  },
  {
    "id": 332,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "female Native American": "a"
    },
    "inconsiderate": {
      "squa": "a",
      "skwa": "a",
      "esqua": "a",
      "sqeh": "a",
      "skwe": "a",
      "que": "a",
      "kwa": "a",
      "ikwe": "a",
      "exkwew": "a",
      "xkwe": "a"
    }
  },
  {
    "id": 333,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "italian": "a"
    },
    "inconsiderate": {
      "dago": "a",
      "dego": "a",
      "greaseball": "a",
      "greaser": "a",
      "guinea": "a",
      "ginzo": "a",
      "swamp guinea": "a"
    }
  },
  {
    "id": 334,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "italians": "a"
    },
    "inconsiderate": {
      "dagos": "a",
      "degos": "a",
      "greaseballs": "a",
      "greasers": "a",
      "guineas": "a",
      "ginzos": "a",
      "swamp guineas": "a"
    }
  },
  {
    "id": 335,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "person of color": "a",
      "black person": "a",
      "non-Muslim": "a"
    },
    "inconsiderate": {
      "kaffir": "a",
      "kaffer": "a",
      "kafir": "a",
      "kaffre": "a",
      "kuffar": "a"
    }
  },
  {
    "id": 336,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "african americans": "a",
      "south americans": "a",
      "caribbean people": "a",
      "africans": "a",
      "people of color": "a",
      "black people": "a"
    },
    "inconsiderate": {
      "abid": "a",
      "abeed": "a",
      "bluegums": "a",
      "bootlips": "a",
      "bounty bars": "a",
      "brownies": "a",
      "buffies": "a",
      "burrheads": "a",
      "burr heads": "a",
      "coons": "a",
      "darkeys": "a",
      "darkies": "a",
      "eight balls": "a",
      "gables": "a",
      "groids": "a",
      "jigaboos": "a",
      "jiggabos": "a",
      "jigaroonis": "a",
      "jijjiboos": "a",
      "zigabos": "a",
      "jigs": "a",
      "jiggs": "a",
      "jiggas": "a",
      "jiggers": "a",
      "jungle bunnies": "a",
      "macacas": "a",
      "maumaus": "a",
      "mau maus": "a",
      "mooncrickets": "a",
      "moon crickets": "a",
      "pickaninnies": "a",
      "porch monkies": "a",
      "sambos": "a",
      "spades": "a",
      "spearchuckers": "a",
      "sooties": "a",
      "schvartsen": "a",
      "schwartzen": "a",
      "thicklips": "a",
      "tar babies": "a",
      "niggers": "a",
      "negros": "a",
      "nigers": "a",
      "nigs": "a",
      "nigors": "a",
      "nigras": "a",
      "nigres": "a",
      "nigars": "a",
      "niggurs": "a",
      "niggas": "a",
      "niggahs": "a",
      "niggars": "a",
      "nigguhs": "a",
      "niggresses": "a",
      "nigettes": "a"
    }
  },
  {
    "id": 337,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "african american": "a",
      "south american": "a",
      "caribbean person": "a",
      "african": "a",
      "person of color": "a",
      "black person": "a"
    },
    "inconsiderate": {
      "abid": "a",
      "abeed": "a",
      "alligator bait": "a",
      "gator bait": "a",
      "bluegum": "a",
      "bootlip": "a",
      "bounty bar": "a",
      "brownie": "a",
      "buffy": "a",
      "burrhead": "a",
      "burr head": "a",
      "coon": "a",
      "darky": "a",
      "darkey": "a",
      "darkie": "a",
      "gable": "a",
      "eight ball": "a",
      "groid": "a",
      "jigaboo": "a",
      "jiggabo": "a",
      "jigarooni": "a",
      "jijjiboo": "a",
      "zigabo": "a",
      "jig": "a",
      "jigg": "a",
      "jigga": "a",
      "jigger": "a",
      "jungle bunny": "a",
      "macaca": "a",
      "maumau": "a",
      "mau mau": "a",
      "mooncricket": "a",
      "moon cricket": "a",
      "pickaninny": "a",
      "porch monkey": "a",
      "sambo": "a",
      "spade": "a",
      "spearchuckers": "a",
      "sooty": "a",
      "schvartse": "a",
      "schwartze": "a",
      "thicklip": "a",
      "tar baby": "a",
      "nigger": "a",
      "negro": "a",
      "niger": "a",
      "nig": "a",
      "nigor": "a",
      "nigra": "a",
      "nigre": "a",
      "nigar": "a",
      "niggur": "a",
      "nigga": "a",
      "niggah": "a",
      "niggar": "a",
      "nigguh": "a",
      "niggress": "a",
      "nigette": "a"
    }
  },
  {
    "id": 338,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Native Americans": "a"
    },
    "inconsiderate": {
      "injuns": "a",
      "prairie niggers": "a",
      "redskins": "a",
      "timber niggers": "a"
    }
  },
  {
    "id": 339,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "Native American": "a"
    },
    "inconsiderate": {
      "injun": "a",
      "prairie nigger": "a",
      "redskin": "a",
      "timber nigger": "a"
    }
  },
  {
    "id": 340,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "middle eastern person": "a",
      "arabic person": "a"
    },
    "inconsiderate": {
      "arabush": "a",
      "camel jockey": "a",
      "dune coon": "a",
      "hajji": "a",
      "hadji": "a",
      "haji": "a"
    }
  },
  {
    "id": 341,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "middle eastern people": "a",
      "arabic people": "a"
    },
    "inconsiderate": {
      "arabushs": "a",
      "camel jockeys": "a",
      "dune coons": "a",
      "hajjis": "a",
      "hadjis": "a",
      "hajis": "a"
    }
  },
  {
    "id": 342,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "sikhs": "a",
      "arabs": "a",
      "muslims": "a"
    },
    "inconsiderate": {
      "pakis": "a",
      "ragheads": "a",
      "sand niggers": "a",
      "towel heads": "a"
    }
  },
  {
    "id": 343,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "sikh": "a",
      "arab": "a",
      "muslim": "a"
    },
    "inconsiderate": {
      "pakis": "a",
      "osama": "a",
      "raghead": "a",
      "sand nigger": "a",
      "towel head": "a"
    }
  },
  {
    "id": 344,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "mexican": "a",
      "immigrant": "a",
      "migrant worker": "a"
    },
    "inconsiderate": {
      "beaner": "a",
      "beaney": "a",
      "tacohead": "a",
      "wetback": "a",
      "illegal": "a",
      "pocho": "a",
      "pocha": "a"
    }
  },
  {
    "id": 345,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "mexicans": "a",
      "immigrants": "a",
      "migrant workers": "a"
    },
    "inconsiderate": {
      "beaners": "a",
      "beaneys": "a",
      "tacoheads": "a",
      "wetbacks": "a",
      "illegals": "a",
      "pochos": "a",
      "pochas": "a"
    }
  },
  {
    "id": 346,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "caucasian": "a"
    },
    "inconsiderate": {
      "bule": "a",
      "gora": "a",
      "gub": "a",
      "gubba": "a",
      "gweilo": "a",
      "gwailo": "a",
      "kwai lo": "a",
      "haole": "a",
      "honky": "a",
      "honkey": "a",
      "honkie": "a",
      "japie": "a",
      "yarpie": "a",
      "mabuno": "a",
      "mahbuno": "a",
      "klansman": "a",
      "mzungu": "a",
      "redleg": "a",
      "redneck": "a",
      "roundeye": "a",
      "whitey": "a",
      "wigger": "a",
      "whigger": "a",
      "wigga": "a"
    }
  },
  {
    "id": 347,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "caucasians": "a"
    },
    "inconsiderate": {
      "bules": "a",
      "goras": "a",
      "gubs": "a",
      "gubbas": "a",
      "gweilos": "a",
      "gwailos": "a",
      "kwai los": "a",
      "haoles": "a",
      "honkeys": "a",
      "honkies": "a",
      "japies": "a",
      "yarpies": "a",
      "mabunos": "a",
      "mahbunos": "a",
      "klansmen": "a",
      "mzungus": "a",
      "redlegs": "a",
      "rednecks": "a",
      "round eyes": "a",
      "whities": "a",
      "whiteys": "a",
      "wiggers": "a",
      "whiggers": "a",
      "wiggas": "a",
      "write trash": "a"
    }
  },
  {
    "id": 348,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "ukrainian": "a"
    },
    "inconsiderate": {
      "ukrop": "a",
      "khokhol": "a",
      "khokhols": "a",
      "katsap": "a",
      "kacap": "a",
      "kacapas": "a"
    }
  },
  {
    "id": 349,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "african": "a"
    },
    "inconsiderate": {
      "uncle tom": "a"
    }
  },
  {
    "id": 350,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "foreigner": "a",
      "asian": "a",
      "african": "a"
    },
    "inconsiderate": {
      "wog": "a"
    }
  },
  {
    "id": 351,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "foreigners": "a",
      "asians": "a",
      "africans": "a"
    },
    "inconsiderate": {
      "wogs": "a"
    }
  },
  {
    "id": 352,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "northerner": "a",
      "american": "a"
    },
    "inconsiderate": {
      "gringo": "a",
      "hillbilly": "a",
      "seppo": "a",
      "septic": "a",
      "yankee": "a",
      "yank": "a"
    }
  },
  {
    "id": 353,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "northerners": "a",
      "americans": "a"
    },
    "inconsiderate": {
      "gringos": "a",
      "hillbillies": "a",
      "seppos": "a",
      "septics": "a",
      "yankees": "a",
      "yanks": "a"
    }
  },
  {
    "id": 354,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "jew": "a"
    },
    "inconsiderate": {
      "christ killers": "a",
      "cushi": "a",
      "kushi": "a",
      "heeb": "a",
      "hebe": "a",
      "hymie": "a",
      "ike": "a",
      "ikeymo": "a",
      "kike": "a",
      "kyke": "a",
      "yid": "a",
      "shylock": "a"
    }
  },
  {
    "id": 355,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "jews": "a"
    },
    "inconsiderate": {
      "christ killers": "a",
      "cushis": "a",
      "kushis": "a",
      "heebs": "a",
      "hebes": "a",
      "hymies": "a",
      "ikes": "a",
      "ikeymos": "a",
      "kikes": "a",
      "kykes": "a",
      "yids": "a",
      "shylocks": "a"
    }
  },
  {
    "id": 356,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "asian": "a"
    },
    "inconsiderate": {
      "buddhahead": "a",
      "coolie": "a",
      "dink": "a",
      "gook": "a",
      "gookeye": "a",
      "gook eye": "a",
      "gooky": "a",
      "pancake face": "a",
      "slope": "a",
      "slopehead": "a",
      "slopy": "a",
      "slopey": "a",
      "sloper": "a",
      "squinty": "a",
      "zipperhead": "a"
    }
  },
  {
    "id": 357,
    "type": "simple",
    "categories": [
      "a"
    ],
    "considerate": {
      "asians": "a"
    },
    "inconsiderate": {
      "buddhaheads": "a",
      "coolies": "a",
      "dinks": "a",
      "gooks": "a",
      "gookeyes": "a",
      "gook eyes": "a",
      "gookies": "a",
      "pancake faces": "a",
      "slopes": "a",
      "slopeheads": "a",
      "slopies": "a",
      "slopeys": "a",
      "slopers": "a",
      "stuinties": "a",
      "zipperheads": "a"
    }
  },
  {
    "id": 358,
    "type": "and",
    "categories": [
      "a",
      "b"
    ],
    "considerate": {
      "primary": "a",
      "primaries": "a",
      "replica": "b",
      "replicas": "b"
    },
    "inconsiderate": {
      "master": "a",
      "masters": "a",
      "slave": "b",
      "slaves": "b"
    }
  }
]

},{}],4:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module nlcst:is-literal
 * @fileoverview Check whether an NLCST node is meant literally.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var toString = require('nlcst-to-string');

/*
 * Single delimiters.
 */

var single = {
    '-': true, // hyphen-minus
    '–': true, // en-dash
    '—': true, // em-dash
    ':': true, // colon
    ';': true // semicolon
};

/*
 * Pair delimiters. From common sense, and wikipedia:
 * Mostly from https://en.wikipedia.org/wiki/Quotation_mark.
 */

var pairs = {
    ',': {
        ',': true
    },
    '-': {
        '-': true
    },
    '–': {
        '–': true
    },
    '—': {
        '—': true
    },
    '"': {
        '"': true
    },
    '\'': {
        '\'': true
    },
    '‘': {
        '’': true
    },
    '‚': {
        '’': true
    },
    '’': {
        '’': true,
        '‚': true
    },
    '“': {
        '”': true
    },
    '”': {
        '”': true
    },
    '„': {
        '”': true,
        '“': true
    },
    '«': {
        '»': true
    },
    '»': {
        '«': true
    },
    '‹': {
        '›': true
    },
    '›': {
        '‹': true
    },
    '(': {
        ')': true
    },
    '[': {
        ']': true
    },
    '{': {
        '}': true
    },
    '⟨': {
        '⟩': true
    },
    '「': {
        '」': true
    }
}

/**
 * Check whether parent contains word-nodes between
 * `start` and `end`.
 *
 * @param {NLCSTParentNode} parent - Node with children.
 * @param {number} start - Starting point (inclusive).
 * @param {number} end - Ending point (exclusive).
 * @return {boolean} - Whether word-nodes are found.
 */
function containsWord(parent, start, end) {
    var siblings = parent.children;
    var index = start - 1;

    while (++index < end) {
        if (siblings[index].type === 'WordNode') {
            return true;
        }
    }

    return false;
}

/**
 * Check if there are word nodes before `position`
 * in `parent`.
 *
 * @param {NLCSTParentNode} parent - Node with children.
 * @param {number} position - Position before which to
 *   check.
 * @return {boolean} - Whether word-nodes are found.
 */
function hasWordsBefore(parent, position) {
    return containsWord(parent, 0, position);
}

/**
 * Check if there are word nodes before `position`
 * in `parent`.
 *
 * @param {NLCSTParentNode} parent - Node with children.
 * @param {number} position - Position afyer which to
 *   check.
 * @return {boolean} - Whether word-nodes are found.
 */
function hasWordsAfter(parent, position) {
    return containsWord(parent, position + 1, parent.children.length);
}

/**
 * Check if `node` is in `delimiters`.
 *
 * @param {Node} node - Node to check.
 * @param {Object} delimiters - Map of delimiters.
 * @return {(Node|boolean)?} - `false` if not, the given
 *   node when true, and `null` when this is a white-space
 *   node.
 */
function delimiterCheck(node, delimiters) {
    var type = node.type;

    if (type === 'WordNode' || type === 'SourceNode') {
        return false;
    }

    if (type === 'WhiteSpaceNode') {
        return null;
    }

    return toString(node) in delimiters ? node : false;
}

/**
 * Find the next delimiter after `position` in
 * `parent`. Returns the delimiter node when found.
 *
 * @param {NLCSTParentNode} parent - Parent to search.
 * @param {number} position - Position to search after.
 * @param {Object} delimiters - Map of delimiters.
 * @return {Node?} - Following delimiter.
 */
function nextDelimiter(parent, position, delimiters) {
    var siblings = parent.children;
    var index = position;
    var length = siblings.length;
    var result;

    while (++index < length) {
        result = delimiterCheck(siblings[index], delimiters);

        if (result === null) {
            continue;
        }

        return result;
    }

    return null;
}

/**
 * Find the previous delimiter before `position` in
 * `parent`. Returns the delimiter node when found.
 *
 * @param {NLCSTParentNode} parent - Parent to search.
 * @param {number} position - Position to search before.
 * @param {Object} delimiters - Map of delimiters.
 * @return {Node?} - Previous delimiter.
 */
function previousDelimiter(parent, position, delimiters) {
    var siblings = parent.children;
    var index = position;
    var result;

    while (index--) {
        result = delimiterCheck(siblings[index], delimiters);

        if (result === null) {
            continue;
        }

        return result;
    }

    return null;
}

/**
 * Check if the node in `parent` at `position` is enclosed
 * by matching delimiters.
 *
 * @param {NLCSTParentNode} parent - Parent to search.
 * @param {number} position - Position of node to check.
 * @param {Object} delimiters - Map of delimiters.
 * @return {boolean} - Whether the node is wrapped.
 */
function isWrapped(parent, position, delimiters) {
    var prev = previousDelimiter(parent, position, delimiters);
    var next;

    if (prev) {
        next = nextDelimiter(parent, position, delimiters[toString(prev)]);
    }

    return Boolean(next);
}

/**
 * Check if the node in `parent` at `position` is enclosed
 * by matching delimiters.
 *
 * For example, in:
 *
 * -   `Foo - is meant as a literal.`;
 * -   `Meant as a literal is - foo.`;
 * -   `The word “foo” is meant as a literal.`;
 *
 * ...`foo` is literal.
 *
 * @param {NLCSTParentNode} parent - Parent to search.
 * @param {number} index - Position of node to check.
 * @return {boolean} - Whether the node is wrapped.
 */
function isLiteral(parent, index) {
    if (!(parent && parent.children)) {
        throw new Error('Parent must be a node');
    }

    if (isNaN(index)) {
        throw new Error('Index must be a number');
    }

    if (
        (!hasWordsBefore(parent, index) && nextDelimiter(parent, index, single)) ||
        (!hasWordsAfter(parent, index) && previousDelimiter(parent, index, single)) ||
        isWrapped(parent, index, pairs)
    ) {
        return true;
    }

    return false;
}

/*
 * Expose.
 */

module.exports = isLiteral;

},{"nlcst-to-string":5}],5:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module nlcst:to-string
 * @fileoverview Transform an NLCST node into a string.
 */

'use strict';

/* eslint-env commonjs */

/**
 * Stringify an NLCST node.
 *
 * @param {NLCSTNode|Array.<NLCSTNode>} node - Node to to
 *   stringify.
 * @return {string} - Stringified `node`.
 */
function nlcstToString(node) {
    var values;
    var length;
    var children;

    if (typeof node.value === 'string') {
        return node.value;
    }

    children = 'length' in node ? node : node.children;
    length = children.length;

    /*
     * Shortcut: This is pretty common, and a small performance win.
     */

    if (length === 1 && 'value' in children[0]) {
        return children[0].value;
    }

    values = [];

    while (length--) {
        values[length] = nlcstToString(children[length]);
    }

    return values.join('');
}

/*
 * Expose.
 */

module.exports = nlcstToString;

},{}],6:[function(require,module,exports){
'use strict';

// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = require('./isArguments');
var hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var blacklistedKeys = {
	$console: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$parent: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!blacklistedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./isArguments":7}],7:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],8:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer. All rights reserved.
 * @module unist:util:visit
 * @fileoverview Utility to recursively walk over unist nodes.
 */

'use strict';

/**
 * Walk forwards.
 *
 * @param {Array.<*>} values - Things to iterate over,
 *   forwards.
 * @param {function(*, number): boolean} callback - Function
 *   to invoke.
 * @return {boolean} - False if iteration stopped.
 */
function forwards(values, callback) {
    var index = -1;
    var length = values.length;

    while (++index < length) {
        if (callback(values[index], index) === false) {
            return false;
        }
    }

    return true;
}

/**
 * Walk backwards.
 *
 * @param {Array.<*>} values - Things to iterate over,
 *   backwards.
 * @param {function(*, number): boolean} callback - Function
 *   to invoke.
 * @return {boolean} - False if iteration stopped.
 */
function backwards(values, callback) {
    var index = values.length;
    var length = -1;

    while (--index > length) {
        if (callback(values[index], index) === false) {
            return false;
        }
    }

    return true;
}

/**
 * Visit.
 *
 * @param {Node} tree - Root node
 * @param {string} [type] - Node type.
 * @param {function(node): boolean?} callback - Invoked
 *   with each found node.  Can return `false` to stop.
 * @param {boolean} [reverse] - By default, `visit` will
 *   walk forwards, when `reverse` is `true`, `visit`
 *   walks backwards.
 */
function visit(tree, type, callback, reverse) {
    var iterate;
    var one;
    var all;

    if (typeof type === 'function') {
        reverse = callback;
        callback = type;
        type = null;
    }

    iterate = reverse ? backwards : forwards;

    /**
     * Visit `children` in `parent`.
     */
    all = function (children, parent) {
        return iterate(children, function (child, index) {
            return child && one(child, index, parent);
        });
    };

    /**
     * Visit a single node.
     */
    one = function (node, index, parent) {
        var result;

        index = index || (parent ? 0 : null);

        if (!type || node.type === type) {
            result = callback(node, index, parent || null);
        }

        if (node.children && result !== false) {
            return all(node.children, node);
        }

        return result;
    };

    one(tree);
}

/*
 * Expose.
 */

module.exports = visit;

},{}]},{},[1])(1)
});
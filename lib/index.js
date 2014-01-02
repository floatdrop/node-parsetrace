'use strict';

function parseStack(stack) {
    var lines = stack.split('\n');
    var message = lines[0];

    return {
        error: message
    }
}

module.exports = function (error, options, callback) {

    var trace = parseStack(error.stack);

    return {
        object: function () {
            return trace;
        },

        toString: function (options) {

        },

        json: function () {
            return JSON.stringify(trace);
        }
    };
};
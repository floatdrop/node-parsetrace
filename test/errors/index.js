'use strict';

module.exports = {
    stack: function (app) {
        try {
            require('./' + app);
        } catch (e) {
            return e.stack;
        }
    },
    error: function (app) {
        try {
            require('./' + app);
        } catch (e) {
            return e;
        }
    }
}
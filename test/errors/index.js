'use strict';

module.exports = function (app) {
    try {
        return require('./' + app);
    } catch (e) {
        return e;
    }
};
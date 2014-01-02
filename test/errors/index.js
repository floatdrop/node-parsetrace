'use strict';

module.exports = function (app) {
    try {
        require('./' + app);
    } catch (e) {
        return e;
    }
};
const logger = require('./logger');
module.exports = {
    replaceAll: function (input, searchVal, replaceVal) {
        while (input.indexOf(searchVal) >= 0) {
            (input = input.replace(searchVal, replaceVal));
        }
        return input;
    },

}
const curry = require('dead-simple-curry');

const state = {};

module.exports.cache = curry((config, target, key, descriptor) => {

    const fn = descriptor.value;

    descriptor.value = function () {
        const key = { config };
        if (state.hasOwnProperty(key)) {
            return state[key];
        }
        state[key] = fn.apply(target, arguments);
    };
    return descriptor;
});

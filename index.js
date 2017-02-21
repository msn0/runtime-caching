const curry = require('dead-simple-curry');

module.exports.cache = curry((config, target, key, descriptor) => {

    const fn = descriptor.value;

    descriptor.state = {};
    
    descriptor.value = function () {
        const key = config.key;
        const state = descriptor.state;

        if (state.hasOwnProperty(key)) {
            return state[key];
        }
        descriptor.state[key] = fn.apply(target, arguments);
    };
    return descriptor;
});

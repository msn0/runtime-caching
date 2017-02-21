const curry = require('dead-simple-curry');

module.exports.cache = curry((config, target, key, descriptor) => {

    const fn = descriptor.value;

    descriptor.state = {};
    
    descriptor.value = function () {
        console.log(1, descriptor);  
        const key = { config };
        const state = { descriptor };
        console.log(descriptor.state[key]);
        if (state.hasOwnProperty(key)) {

            return state[key];
        }
        descriptor.state[key] = fn.apply(target, arguments);
    };
    return descriptor;
});

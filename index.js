const curry = require('dead-simple-curry');

module.exports.cache = curry((config, target, key, descriptor) => {

    const fn = descriptor.value;

    descriptor.value = function () {
        const key = config.key;
        this.state = this.state || {};

        if (this.state.hasOwnProperty(key)) {
            return this.state[key];
        }

        this.state[key] = fn.apply(target, arguments);
        return this.state[key];
    };

    return descriptor;
});

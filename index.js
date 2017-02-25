const curry = require('dead-simple-curry');

module.exports.cache = curry((config, context, key, descriptor) => {

    const fn = descriptor.value;

    descriptor.value = function () {
        this.___cache = this.___cache || {};

        const index = `${key}___${JSON.stringify(arguments)}`;

        // return cache entry if any
        if (this.___cache[index] !== undefined) {
            return this.___cache[index];
        }

        // cache response
        this.___cache[index] = fn.apply(context, arguments);

        // schedule deletion
        setTimeout(() => delete this.___cache[index], config.timeout);

        return this.___cache[index];
    };

    return descriptor;
});

const curry = require('dead-simple-curry');

module.exports.cache = curry((config, context, key, descriptor) => {

    const fn = descriptor.value;

    descriptor.value = function () {
        this.___cache = this.___cache || {};

        const index = `${key}___${JSON.stringify(arguments)}`;
        if (this.___cache[index] !== undefined) {
            return this.___cache[index];
        }

        this.___cache[index] = fn.apply(context, arguments);


        return this.___cache[index];
    };

    return descriptor;
});

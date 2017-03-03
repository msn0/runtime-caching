function cacheFunction (context, config) {
    const fn = context;

    context = function () {
        context.prototype.___cache = context.prototype.___cache || {};

        const index = JSON.stringify(arguments);

        // return cache entry if any
        if (context.prototype.___cache[index] !== undefined) {
            return context.prototype.___cache[index];
        }

        // cache response
        const result = fn.apply(context.prototype, arguments);

        // if (result.constructor === Promise) {
        //     return result.then(data => {
        //         this.___cache[index] = new Promise(resolve => resolve(data));
        //
        //         // schedule deletion
        //         setTimeout(() => delete this.___cache[index], config.timeout);
        //
        //         return Promise.resolve(data);
        //     });
        // }

        // persist cache entry
        context.prototype.___cache[index] = result;

        // schedule deletion
        setTimeout(() => delete context.prototype.___cache[index], config.timeout);

        return context.prototype.___cache[index];
    };

    return context;
}

module.exports.cache = (config) => {

    return function (context, key, descriptor) {

        if (typeof context === 'function') {
            return cacheFunction(context, config);
        }

        const fn = descriptor.value;

        descriptor.value = function () {
            this.___cache = this.___cache || {};

            const index = `${key}___${JSON.stringify(arguments)}`;

            // return cache entry if any
            if (this.___cache[index] !== undefined) {
                return this.___cache[index];
            }

            // cache response
            const result = fn.apply(context, arguments);

            if (result.constructor === Promise) {
                return result.then(data => {
                    this.___cache[index] = new Promise(resolve => resolve(data));

                    // schedule deletion
                    setTimeout(() => delete this.___cache[index], config.timeout);

                    return Promise.resolve(data);
                });
            }

            // persist cache entry
            this.___cache[index] = result;

            // schedule deletion
            setTimeout(() => delete this.___cache[index], config.timeout);

            return this.___cache[index];
        };

        return descriptor;
    };
};

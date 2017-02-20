import curry from 'dead-simple-curry';

export const cache = curry((config, target) => {
    console.log(config, target);
    return target;
});


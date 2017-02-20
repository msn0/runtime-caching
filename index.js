const curry = require('dead-simple-curry');

const state = {
  
};

module.exports.cache = curry((config, target) => {
    console.log(config, target);
    return target;
});


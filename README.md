# runtime-caching [![Build Status](https://travis-ci.org/msn0/runtime-caching.svg?branch=master)](http://travis-ci.org/msn0/runtime-caching)

demo: [https://msn0.github.io/runtime-caching](https://msn0.github.io/runtime-caching)

Runtime-caching is used for caching function responses. It is useful when dealing with heavy, time-consuming algorithms. In the following example factorial is computed only once and cached in memory for the next 30 seconds:

```js
const { cache } = require('runtime-caching');

const factorial = (n) => {
    // compute and return n!
};

const factorialCached = cache({ timeout: 30000 })(factorial);

factorialCached(55); // 121645100408832000
```

## installation

```sh
$ npm i runtime-caching
```

## examples

### cache promise responses
```js
import { cache } from 'runtime-caching';

function foo (name) {
   return fetch(`/foo?name=${name}`);
}

module.exports = cache({ timeout: 30000 })(foo);
```

### cache computationally and memory expensive algorithms

```js
import { cache } from 'runtime-caching';

function compute(params) {
    // some heavy computations
    return result;
}

// computeCached will cache results for 30 seconds.
// Results obtained from different input params are cached separately.
const computeCached = cache({ timeout: 30000 })(compute);

// Nothing is cached at the moment.
// Execute compute('foo') and cache the result
computeCached('foo');

// compute was already called with 'foo'. Just return cached value.
computeCached('foo');

// compute was already called but with different params.
// Execute compute('bar') and cache value under different key.
computeCached('bar');
```

### cache class methods

`runtime-caching` may be used as [javascript-decorator](https://github.com/wycats/javascript-decorators)

```js
import { cache } from 'runtime-caching';

class Foo {

  // cache response for 1000 milliseconds
  @cache({ timeout: 1000 })
  request() {
    return 'the value to be cached';
  }
}
```

## License

MIT © [Michał Jezierski](https://github.com/msn0)

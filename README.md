# @cache decorator

## examples

### cache promise responses
```js
import { cache } from 'cache-decorator';

function foo (name) {
   return fetch(`/foo?name=${name}`);
}

module.exports = cache({ timeout: 30000 })(foo);
```

### cache computationally and memory expensive algorithms

```js
import { cache } from 'cache-decorator';

function compute(params) {
    // some heavy computations
    return result;
}

// computeCached will cache results for 30 seconds. 
// Results obtained from different input params will be cached separately.
const computeCached = cache({ timeout: 30000 })(compute);

// Nothing is cached at the moment.
// Execute compute('foo') and cache the result
const a = computeCached('foo');

// compute was already called with 'foo'. Just return cached value.
const b = computeCached('foo');

// compute was already called but with different params. 
// Execute compute('bar') and cache value under different key.
const c = computeCached('bar'); // c !== a
```

### cache class methods

`cache-decorator` may be used as [javascript-decorator](https://github.com/wycats/javascript-decorators)

```js
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

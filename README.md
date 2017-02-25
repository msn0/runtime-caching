# @cache decorator

```js
class Foo {

  // cache response for 1000 milliseconds
  @cache({ timeout: 1000 })
  request() {
    return 'the value to be cached';
  }
}
```

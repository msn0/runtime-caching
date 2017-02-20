import test from 'ava';
import sinon from 'sinon';
import { cache } from './';

class FooBar {
  
    @cache({ time: 10 })
    foo() {
        return this.bar();
    }
    
    bar() {
        return Math.random();
    }
}

test('should call method only once', t => {
    const foobar = new FooBar();
    const spy = sinon.spy(foobar, 'bar');
    
    foobar.foo();
    foobar.foo();
    
    t.truthy(spy.calledOnce);
});
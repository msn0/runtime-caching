import test from 'ava';
import sinon from 'sinon';
import { cache } from './';

class FooBar {

    @cache({ key: 'test' })
    foo() {
        return this.bar();
    }

    bar() {
        return Math.random();
    }
}

test('should call method only once', t => {
    const foobar = new FooBar();
    const spy = sinon.spy(FooBar.prototype, 'bar');
    
    foobar.foo();
    foobar.foo();
    
    t.truthy(spy.calledOnce);
});
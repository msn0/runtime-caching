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

test('should call annotated method only once', t => {
    const foobar = new FooBar();
    const spy = sinon.spy(FooBar.prototype, 'bar');

    foobar.foo();
    foobar.foo();
    spy.restore();

    t.truthy(spy.calledOnce);
});

test('the value for subsequent calls should match', t => {
    const foobar = new FooBar();
    const spy = sinon.spy(FooBar.prototype, 'bar');

    const firstValue = foobar.foo();
    const secondValue = foobar.foo();
    spy.restore();

    t.is(firstValue, secondValue);
});
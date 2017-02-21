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

    const firstValue = foobar.foo();
    const secondValue = foobar.foo();

    t.is(firstValue, secondValue);
});

test('value should not be shared across instances', t => {
    const foobar1 = new FooBar();
    const foobar2 = new FooBar();

    const value1 = foobar1.foo();
    const value2 = foobar2.foo();

    t.falsy(value1 === value2);
});

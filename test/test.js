import test from 'ava';
import sinon from 'sinon';
import FooBar from './fixtures/foobar';

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
    const first = new FooBar();
    const second = new FooBar();

    const firstValue = first.foo();
    const secondValue = second.foo();

    t.truthy(firstValue, secondValue);
});

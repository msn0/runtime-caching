import test from 'ava';
import sinon from 'sinon';
import FooBar from './fixtures/class';

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

test('the value for subsequent calls should match (with arguments)', t => {
    const foobar = new FooBar();

    const firstValue = foobar.foo('1', { foo: 'bar' });
    const secondValue = foobar.foo('1', { foo: 'bar' });

    t.is(firstValue, secondValue);
});

test('value should not be shared across instances', t => {
    const first = new FooBar();
    const second = new FooBar();

    const firstValue = first.foo();
    const secondValue = second.foo();

    t.truthy(firstValue, secondValue);
});

test('should call twice when arguments differ', t => {
    const foobar = new FooBar();
    const spy = sinon.spy(FooBar.prototype, 'bar');

    foobar.foo('1');
    foobar.foo('2');
    spy.restore();

    t.truthy(spy.calledTwice);
});

test('should store under ___cache property of «this»', t => {
    const foobar = new FooBar();

    const value = foobar.foo();

    t.is(foobar.___cache['foo___{}'], value);
});

test('should store under ___cache property of «this» (with arguments)', t => {
    const foobar = new FooBar();

    const value = foobar.foo('1', { foo: 'bar' }, [1, 2, 3]);

    t.is(foobar.___cache['foo___{"0":"1","1":{"foo":"bar"},"2":[1,2,3]}'], value);
});

test('should remove cached value after given time', t => {
    const foobar = new FooBar();
    const clock = sinon.useFakeTimers();

    const value = foobar.foo();
    const cacheEntry = foobar.___cache['foo___{}'];
    clock.tick(1001);
    clock.restore();

    t.is(value, cacheEntry);
    t.is(foobar.___cache['foo___{}'], undefined);
});

test('should remove cached value after given time (with arguments)', t => {
    const foobar = new FooBar();
    const clock = sinon.useFakeTimers();

    const value = foobar.foo('1', [2, 3]);
    const cacheEntry = foobar.___cache['foo___{"0":"1","1":[2,3]}'];
    clock.tick(1001);
    clock.restore();

    t.is(cacheEntry, value);
    t.is(foobar.___cache['foo___{"0":"1","1":[2,3]}'], undefined);
});

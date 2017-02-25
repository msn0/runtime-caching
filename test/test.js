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

test('should call twice when arguments differ', t => {
    const foobar = new FooBar();
    const spy = sinon.spy(FooBar.prototype, 'bar');

    foobar.foo('1');
    foobar.foo('2');
    spy.restore();

    t.truthy(spy.calledTwice);
});

test('the value for subsequent calls (with arguments) should match', t => {
    const foobar = new FooBar();

    const firstValue = foobar.foo('1', { foo: 'bar' });
    const secondValue = foobar.foo('1', { foo: 'bar' });

    t.is(firstValue, secondValue);
});

test('should store under ___cache property of «this»', t => {
    const foobar = new FooBar();

    const value = foobar.foo('1', { foo: 'bar' }, [1, 2, 3]);

    t.is(foobar.___cache['foo___{"0":"1","1":{"foo":"bar"},"2":[1,2,3]}'], value);
});

import test from 'ava';
import sinon from 'sinon';
import { cache } from '../';

test('should call cached function only once', t => {
    const fakeObject = {
        bar: function () {
            return Math.random();
        }
    };
    const spy = sinon.spy(fakeObject, 'bar');
    const foo = cache({ timeout: 1000 })(fakeObject.bar);

    foo();
    foo();

    t.truthy(spy.calledOnce);
});

test('the value for subsequent calls should match', t => {
    const foo = cache({ timeout: 1000 })(Math.random);

    const first = foo();
    const second = foo();

    t.is(first, second);
});

test('the value for subsequent calls should match (with arguments)', t => {
    const foo = cache({ timeout: 1000 })(Math.random);

    const first = foo('1', { foo: 'bar' });
    const second = foo('1', { foo: 'bar' });

    t.is(first, second);
});

test('value should not be shared across instances', t => {
    function bar() {
        return Math.random();
    }
    const foo = cache({ timeout: 1000 })(bar);

    const first = new foo();
    const second = new foo();

    t.not(first, second);
});

test('should call twice when arguments differ', t => {
    const fakeObject = {
        bar: function () {
            return Math.random();
        }
    };
    const spy = sinon.spy(fakeObject, 'bar');
    const foo = cache({ timeout: 1000 })(fakeObject.bar);

    foo('1');
    foo('2');

    t.truthy(spy.calledTwice);
});

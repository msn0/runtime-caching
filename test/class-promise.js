import test from 'ava';
import FooBar from './fixtures/class-promise';
import sinon from 'sinon';

test('the value for subsequent calls should match', async t => {
    const foobar = new FooBar();

    const firstValue = await foobar.foo();
    const secondValue = await foobar.foo();

    t.is(firstValue, secondValue);
});

test('the value for subsequent calls should match (with arguments)', async t => {
    const foobar = new FooBar();

    const firstValue = await foobar.foo('1', { foo: 'bar' });
    const secondValue = await foobar.foo('1', { foo: 'bar' });

    t.is(firstValue, secondValue);
});

test('value should not be shared across instances', async t => {
    const first = new FooBar();
    const second = new FooBar();

    const firstValue = await first.foo();
    const secondValue = await second.foo();

    t.truthy(firstValue, secondValue);
});

test('should store under ___cache property of «this»', async t => {
    const foobar = new FooBar();

    const value = await foobar.foo();

    t.is(await foobar.___cache['foo___{}'], value);
});

test('should store under ___cache property of «this» (with arguments)', async t => {
    const foobar = new FooBar();

    const value = await foobar.foo('1', { foo: 'bar' }, [1, 2, 3]);

    t.is(await foobar.___cache['foo___{"0":"1","1":{"foo":"bar"},"2":[1,2,3]}'], value);
});

test.cb('should remove cached value after given time', t => {
    const foobar = new FooBar();
    const foo = foobar.foo();
    const clock = sinon.useFakeTimers();

    foo.then(() => {
        clock.tick(1000);
        t.is(foobar.___cache['foo___{}'], undefined);
        clock.restore();
        t.end();
    });
});

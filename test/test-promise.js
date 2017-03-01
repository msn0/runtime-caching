import test from 'ava';
import sinon from 'sinon';
import FooBar from './fixtures/foobar-promise';

test('should call annotated method only once', async t => {
    const foobar = new FooBar();
    const spy = sinon.spy(foobar, 'bar');

    await foobar.foo('1');
    console.log(1, foobar.___cache);
    await foobar.foo('1');
    console.log(2, foobar.___cache);
    spy.restore();

    t.truthy(spy.calledOnce);
});

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

// test('should remove cached value after given time', t => {
//     const foobar = new FooBar();
//     const clock = sinon.useFakeTimers();
//
//     const value = await foobar.foo();
//     const cacheEntry = await foobar.___cache['foo___{}'];
//     clock.tick(1001);
//     clock.restore();
//
//     t.is(value, cacheEntry);
//     t.is(foobar.___cache['foo___{}'], undefined);
// });
//
// test('should remove cached value after given time (with arguments)', async t => {
//     const foobar = new FooBar();
//     const clock = sinon.useFakeTimers();
//
//     const value = await foobar.foo('1', [2, 3]);
//     const cacheEntry = await foobar.___cache['foo___{"0":"1","1":[2,3]}'];
//     clock.tick(1001);
//     clock.restore();
//
//     t.is(cacheEntry, value);
//     t.is(foobar.___cache['foo___{"0":"1","1":[2,3]}'], undefined);
// });

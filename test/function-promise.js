import test from 'ava';
import { cache } from '../';

test('should cache value', async t => {
    const foobar = cache({ timeout: 1000 })(foo);

    const first = await foobar();
    const second = await foobar();

    t.is(first, second);
});

test('should cache value (with arguments)', async t => {
    const foobar = cache({ timeout: 1000 })(foo);

    const first = await foobar('1', { foo: 'bar' });
    const second = await foobar('1', { foo: 'bar' });

    t.is(first, second);
});

test('should not cache value when arguments differ', async t => {
    const foobar = cache({ timeout: 1000 })(foo);

    const first = await foobar('1');
    const second = await foobar('2');

    t.not(first, second);
});

function foo() {
    return new Promise((resolve) =>
        setTimeout(() => resolve(Math.random()), 100)
    );
}

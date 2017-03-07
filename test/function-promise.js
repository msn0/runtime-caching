import test from 'ava';
import { cache } from '../';

test('should call cached function only once', async t => {
    const foobar = cache({ timeout: 1000 })(function foo() {
        return new Promise((resolve) =>
            setTimeout(() => resolve(Math.random()), 100)
        );
    });

    const first = await foobar();
    const second = await foobar();

    t.is(first, second);
});

test('should call twice when arguments differ', async t => {
    const foobar = cache({ timeout: 1000 })(function foo() {
        return new Promise((resolve) =>
            setTimeout(() => resolve(Math.random()), 100)
        );
    });

    const first = await foobar('1');
    const second = await foobar('2');

    t.not(first, second);
});

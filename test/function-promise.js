import test from 'ava';
import { cache } from '../';

test('should call cached function only once', async t => {
    const foobar = cache({ timeout: 1000 })(function foo() {
        return new Promise((resolve) =>
            setTimeout(() => resolve(Math.random()), 1000)
        );
    });

    const first = await foobar();
    const second = await foobar();

    t.is(first, second);
});

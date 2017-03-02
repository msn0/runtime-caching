import test from 'ava';
import { cache } from '../';

test('should call annotated method only once', t => {
    const foo = cache({ timeout: 1000 })(() => {
        return 'foo value';
    });

    const first = foo();
    const second = foo();

    t.is(first, second);
});

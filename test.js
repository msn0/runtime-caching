import test from 'ava';
import cache from './';

function foo(name) {
    return `Hello ${name}!`;
}

test('should pass', t => {
    cache(foo)('John');
    t.pass();
});
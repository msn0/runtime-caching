import { cache } from '../../';

class FooBar {

    @cache({ key: 'test' })
    foo() {
        return this.bar();
    }

    bar() {
        return Math.random();
    }
}

module.exports = FooBar;

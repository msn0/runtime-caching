import { cache } from '../../';

class FooBar {

    @cache({ timeout: 1000 })
    foo() {
        return this.bar();
    }

    bar() {
        return Math.random();
    }
}

module.exports = FooBar;

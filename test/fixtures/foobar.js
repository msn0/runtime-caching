import { cache } from '../../';

class FooBar {

    @cache({ key: 'testssss' })
    foo() {
        return this.bar();
    }

    bar() {
        return Math.random();
    }
}

module.exports = FooBar;

import { cache } from '../../';

class FooBar {

    @cache({ timeout: 1000 })
    foo() {
        return new Promise(resolve => setTimeout(() => resolve(this.bar()), 0));
    }

    bar() {
        console.log('bar called');
        return Math.random();
    }
}

module.exports = FooBar;

const assert = require('chai').assert;
const _ = require('lodash');

const obfuscator = require('../index');
const data = ['aaa', 'bbb', 'ccc', 'aaa', 'aaa', 'ddd', 'ccc'];
const uniqData = _.uniq(data);

describe('classnames obfuscator', () => {
    describe('Throw on non-array value', () => {
        it('Empty call', () => assert.throws(() => obfuscator()));

        it('Number', () => assert.throws(() => obfuscator(1)));
    });

    describe('Returns', () => {
        it('It\'s object', () => assert.isObject(obfuscator(data)));

        it('Correct count of classnames', () => {
            assert.equal(
                Object.keys(obfuscator(data)).length,
                uniqData.length
            );
        });

        it('All unique classnames', () => {
            const resultKeys = Object.keys(obfuscator(data));

            assert.isTrue(_.intersection(resultKeys, uniqData).length === uniqData.length);
        });

        it('Most used classname should be shortest', () => {
            assert.equal(obfuscator(data)['aaa'], 'a');
        });
    });
});

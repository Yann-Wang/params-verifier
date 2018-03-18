import test from 'ava';
import Validator from '../src/index';
import { isDat } from '../src/dataType';

test('test date validator success', (t) => {
    try {
        const query = new Date();
        const validator = new Validator(query, 'date');
        validator.singleField('join_date_start');
        const result = validator.filteredSingleField();
        t.is(result.join_date_start, query);
        t.is(isDat(result.join_date_start), true);
        t.pass();
    } catch (e) {
        console.log(e);
        t.fail();
    }
});


test('test date validator  fail', (t) => {
    try {
        const query = 66;
        const validator = new Validator(query, 'date');
        validator.singleField('join_date_start');
        t.fail();
    } catch (e) {
        t.is(e.message, 'the type of join_date_start is not date.');
        t.pass();
    }
});

test('test date validator options.required -- true', (t) => {
    try {
        let query;
        const validator = new Validator(query, 'date', { required: true });
        validator.singleField('join_date_start');
        t.fail();
    } catch (e) {
        t.is(e.message, 'the type of join_date_start is not date.');
        t.pass();
    }
});

test('test date validator options.required -- true -- 2', (t) => {
    try {
        let query;
        const validator = new Validator(query, 'date');
        validator.singleField('join_date_start', { required: true });
        t.fail();
    } catch (e) {
        t.is(e.message, 'the type of join_date_start is not date.');
        t.pass();
    }
});

test('test date validator options.required -- false', (t) => {
    try {
        let query;
        const validator = new Validator(query, 'date');
        validator.singleField('join_date_start');
        const result = validator.filteredSingleField();
        t.is(result.join_date_start, undefined);
        t.pass();
    } catch (e) {
        console.log(e);
        t.fail();
    }
});

test('test date validator try cast type', (t) => {
    try {
        const query = '2017-12-12';
        const validator = new Validator(query, 'date');
        validator.singleField('join_date_start');
        const result = validator.filteredSingleField();
        const date = result.join_date_start;
        const dateFormat = `${String(date.getFullYear())}-${String(date.getMonth() + 1)}-${String(date.getDate())}`;
        t.is(dateFormat, '2017-12-12');
        t.pass();
    } catch (e) {
        console.log(e);
        t.fail();
    }
});

test('test date validator options.validator -- success', (t) => {
    try {
        const query = '2017-12-12';
        const validator = new Validator(query, 'date');
        validator.singleField('join_date_start', {
            validator: value => value > new Date('2017-01-01'),
            validatorErrMsg: '日期必须在2017年之后'
        });
        t.pass();
    } catch (e) {
        console.log(e);
        t.fail();
    }
});

test('test date validator options.validator -- false', (t) => {
    try {
        const query = '2016-12-12';
        const validator = new Validator(query, 'date');
        validator.singleField('join_date_start', {
            validator: value => value > new Date('2017-01-01'),
            validatorErrMsg: '日期必须在2017年之后'
        });
        t.fail();
    } catch (e) {
        t.is(e.message, '日期必须在2017年之后');
        t.pass();
    }
});

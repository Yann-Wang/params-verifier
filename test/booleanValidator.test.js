import test from 'ava';
import Validator from '../src/index';

test('test boolean validator success', (t) => {
    try {
        const query = true;
        const validator = new Validator(query, 'boolean');
        validator.singleField('show_confirm_entry');
        const result = validator.filteredSingleField();
        t.is(result.show_confirm_entry, true);
        t.is(typeof result.show_confirm_entry, 'boolean');
        t.pass();
    } catch (e) {
        console.log(e);
        t.fail();
    }
});


test('test boolean validator  fail', (t) => {
    try {
        const query = 66;
        const validator = new Validator(query, 'boolean');
        validator.singleField('show_confirm_entry');
        t.fail();
    } catch (e) {
        t.is(e.message, 'the type of show_confirm_entry is not boolean.');
        t.pass();
    }
});

test('test boolean validator options.required -- true', (t) => {
    try {
        let query;
        const validator = new Validator(query, 'boolean', { required: true });
        validator.singleField('show_confirm_entry');
        t.fail();
    } catch (e) {
        t.is(e.message, 'the type of show_confirm_entry is not boolean.');
        t.pass();
    }
});

test('test boolean validator options.required -- true -- 2', (t) => {
    try {
        let query;
        const validator = new Validator(query, 'boolean');
        validator.singleField('show_confirm_entry', { required: true });
        t.fail();
    } catch (e) {
        t.is(e.message, 'the type of show_confirm_entry is not boolean.');
        t.pass();
    }
});

test('test boolean validator options.required -- false', (t) => {
    try {
        let query;
        const validator = new Validator(query, 'boolean');
        validator.singleField('show_confirm_entry');
        const result = validator.filteredSingleField();
        t.is(result.show_confirm_entry, undefined);
        t.pass();
    } catch (e) {
        console.log(e);
        t.fail();
    }
});

test('test boolean validator try cast type', (t) => {
    try {
        const query = 'true';
        const validator = new Validator(query, 'boolean');
        validator.singleField('show_confirm_entry');
        const result = validator.filteredSingleField();
        t.is(result.show_confirm_entry, true);
        t.pass();
    } catch (e) {
        console.log(e);
        t.fail();
    }
});

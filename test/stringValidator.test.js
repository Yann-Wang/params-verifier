import test from 'ava';
import Validator from '../src/index';

test('test string validator options.validator success', (t) => {
    try {
        const query = '张三';
        const validator = new Validator(query, 'string');
        validator.singleField('realname', {
            validator: value => /^[\u4E00-\u9FA5]*$/.test(value),
            validatorErrMsg: '姓名必须为中文'
        });
        const result = validator.filteredSingleField();
        t.is(result.realname, '张三');
        t.is(typeof result.realname, 'string');
        t.pass();
    } catch (e) {
        console.log(e);
        t.fail();
    }
});

test('test string validator options.validator fail', (t) => {
    try {
        const query = 'ceshizhanghao';
        const validator = new Validator(query, 'string');
        validator.singleField('realname', {
            validator: value => /^[\u4E00-\u9FA5]*$/.test(value),
            validatorErrMsg: '姓名必须为中文'
        });
        t.fail();
    } catch (e) {
        t.is(e.message, '姓名必须为中文');
        t.pass();
    }
});

test('test string validator options.stringNotEmpty -- fail', (t) => {
    try {
        const query = '';
        const validator = new Validator(query, 'string', { stringNotEmpty: true });
        validator.singleField('realname', {
            validator: value => /^[\u4E00-\u9FA5]*$/.test(value),
            validatorErrMsg: '姓名必须为中文'
        });
        t.fail();
    } catch (e) {
        t.is(e.message, 'the value of field realname can\'t be empty.');
        t.pass();
    }
});

test('test string validator options.type -- date', (t) => {
    try {
        const query = '2017-12-21T00:55:56+08:00';
        const validator = new Validator(query, 'string', { stringNotEmpty: true });
        validator.singleField('join_date', {
            type: 'date',
            typeErrMsg: '不是有效的时间字符串'
        });
        const result = validator.filteredSingleField();
        t.is(result.join_date, '2017-12-21T00:55:56+08:00');
        t.is(typeof result.join_date, 'string');
        t.pass();
    } catch (e) {
        console.log(e);
        t.fail();
    }
});

test('test string validator options.type -- date -- 2', (t) => {
    try {
        const query = '2017-12-12';
        const validator = new Validator(query, 'string', { stringNotEmpty: true });
        validator.singleField('join_date_start');
        const result = validator.filteredSingleField();
        t.is(result.join_date_start, '2017-12-12');
        t.is(typeof result.join_date_start, 'string');
        t.pass();
    } catch (e) {
        console.log(e);
        t.fail();
    }
});

test('test string validator options.type -- email', (t) => {
    try {
        const query = 'cc.ccs@163.com';
        const validator = new Validator(query, 'string', { stringNotEmpty: true });
        validator.singleField('email', {
            type: 'email'
        });
        const result = validator.filteredSingleField();
        t.is(result.email, 'cc.ccs@163.com');
        t.is(typeof result.email, 'string');
        t.pass();
    } catch (e) {
        console.log(e);
        t.fail();
    }
});

test('test string validator options.type -- email -- fail', (t) => {
    try {
        const query = 'cc.ccs163.com';
        const validator = new Validator(query, 'string', { stringNotEmpty: true });
        validator.singleField('email', {
            type: 'email'
        });
        t.fail();
    } catch (e) {
        t.is(e.message, 'the value of field email don\'t match the business type email of string');
        t.pass();
    }
});

test('test string validator options.type -- mobile', (t) => {
    try {
        const query = '13567441576';
        const validator = new Validator(query, 'string', { stringNotEmpty: true });
        validator.singleField('mobile', {
            type: 'mobile',
            typeErrMsg: '手机号格式错误'
        });
        const result = validator.filteredSingleField();
        t.is(result.mobile, '13567441576');
        t.is(typeof result.mobile, 'string');
        t.pass();
    } catch (e) {
        console.log(e);
        t.fail();
    }
});

test('test string validator options.type -- mobile -- fail', (t) => {
    try {
        const query = 'cc.ccs163.com';
        const validator = new Validator(query, 'string', { stringNotEmpty: true });
        validator.singleField('mobile', {
            type: 'mobile',
            typeErrMsg: '手机号格式错误'
        });
        t.fail();
    } catch (e) {
        t.is(e.message, '手机号格式错误');
        t.pass();
    }
});

test('test string validator options.type -- id_card, passport', (t) => {
    try {
        const query = '130181199909091111';
        const validator = new Validator(query, 'string', { stringNotEmpty: true });
        validator.singleField('id_card', {
            type: 'id_card',
            typeErrMsg: '证件号格式错误'
        });
        const result = validator.filteredSingleField();
        t.is(result.id_card, '130181199909091111');
        t.is(typeof result.id_card, 'string');
        t.pass();
    } catch (e) {
        console.log(e);
        t.fail();
    }
});

test('test string validator options.type -- id_card, passport -- fail', (t) => {
    try {
        const query = '13018119990909111';
        const validator = new Validator(query, 'string', { stringNotEmpty: true });
        validator.singleField('id_card', {
            type: 'id_card',
            typeErrMsg: '证件号格式错误'
        });
        t.fail();
    } catch (e) {
        t.is(e.message, '证件号格式错误');
        t.pass();
    }
});

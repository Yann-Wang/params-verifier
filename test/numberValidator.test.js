import test from 'ava';
import Validator from '../src/index';

test('test number validator options.validator success', (t) => {
    try {
        const query = 666;
        const validator = new Validator(query, 'number');
        validator.singleField('candidateId', {
            validator: value => value > 100
        });
        const result = validator.filteredSingleField();
        t.is(result.candidateId, 666);
        t.is(typeof result.candidateId, 'number');
        t.pass();
    } catch (e) {
        console.log(e);
        t.fail();
    }
});


test('test number validator options.validator fail', (t) => {
    try {
        const query = 66;
        const validator = new Validator(query, 'number');
        validator.singleField('candidateId', {
            validator: value => value > 100,
            validatorErrMsg: '待入职ID必须大于100'
        });
        t.fail();
    } catch (e) {
        t.is(e.message, '待入职ID必须大于100');
        t.pass();
    }
});

test('test number validator options.required -- required: true', (t) => {
    try {
        let query;
        const validator = new Validator(query, 'number', { required: true });
        validator.singleField('candidateId', {
            validator: value => value > 100,
            validatorErrMsg: '待入职ID必须大于100'
        });
        t.fail();
    } catch (e) {
        t.is(e.message, 'the type of candidateId is not number.');
        t.pass();
    }
});

test('test number validator options.required -- required: false', (t) => {
    try {
        let query;
        const validator = new Validator(query, 'number', { required: false });
        validator.singleField('candidateId', {
            validator: value => value > 100,
            validatorErrMsg: '待入职ID必须大于100'
        });
        const result = validator.filteredSingleField();
        t.is(result.candidateId, undefined);
        t.pass();
    } catch (e) {
        t.fail();
    }
});


test('test number validator options.type -- enum -- success', (t) => {
    try {
        const query = 7;
        const validator = new Validator(query, 'number');
        validator.singleField('candidateId', {
            required: true,
            type: 'enum',
            range: [1, 7],
            typeErrMsg: '待入职ID必须为1-7的整数'
        });
        const result = validator.filteredSingleField();
        t.is(result.candidateId, 7);
        t.pass();
    } catch (e) {
        t.fail();
    }
});

test('test number validator options.type -- enum -- fail', (t) => {
    try {
        const query = 9;
        const validator = new Validator(query, 'number');
        validator.singleField('candidateId', {
            required: true,
            type: 'enum',
            range: [1, 7],
            typeErrMsg: '待入职ID必须为1-7的整数'
        });
        t.fail();
    } catch (e) {
        t.is(e.message, '待入职ID必须为1-7的整数');
        t.pass();
    }
});

test('test number validator options.typeErrMsg -- enum -- options.typeErrMsg don\'t exist', (t) => {
    try {
        const query = 9;
        const validator = new Validator(query, 'number');
        validator.singleField('candidateId', {
            required: true,
            type: 'enum',
            range: [1, 7]
        });
        t.fail();
    } catch (e) {
        t.is(e.message, 'the value of field candidateId don\'t match the business type enum of number');
        t.pass();
    }
});

test('test number validator cast type success', (t) => {
    try {
        const query = '666';
        const validator = new Validator(query, 'number');
        validator.singleField('candidateId', {
            validator: value => value > 100
        });
        const result = validator.filteredSingleField();
        t.is(result.candidateId, 666);
        t.is(typeof result.candidateId, 'number');
        t.pass();
    } catch (e) {
        console.log(e);
        t.fail();
    }
});

test('test number validator verify type fail -- not number type', (t) => {
    try {
        const query = {};
        const validator = new Validator(query, 'number');
        validator.singleField('candidateId', {
            validator: value => value > 100
        });
        t.fail();
    } catch (e) {
        t.is(e.message, 'the type of candidateId is not number.');
        t.pass();
    }
});

test('test number validator verify type fail -- is NaN', (t) => {
    try {
        const query = Number('not number');
        const validator = new Validator(query, 'number');
        validator.singleField('candidateId', {
            validator: value => value > 100
        });
        t.fail();
    } catch (e) {
        t.is(e.message, 'the type of candidateId is not number.');
        t.pass();
    }
});

test('test number validator verify business type fail -- business not supported', (t) => {
    const businessType = 'notExisted';
    try {
        const query = 666;
        const validator = new Validator(query, 'number');
        validator.singleField('candidateId', {
            required: true,
            type: businessType,
            typeErrMsg: '该类型不存在'
        });
        t.fail();
    } catch (e) {
        t.is(e.message, `the value: ${businessType} of options.type is not supported.`);
        t.pass();
    }
});

test('test number validator options.type -- enum params format error', (t) => {
    try {
        const query = 666;
        const validator = new Validator(query, 'number');
        validator.singleField('candidateId', {
            required: true,
            type: 'enum',
            range: [5.5, 7.5],
            typeErrMsg: '待入职ID不在指定范围'
        });
        t.fail();
    } catch (e) {
        t.is(e.message, 'the value of range field in options for enum type is invalid.');
        t.pass();
    }
});

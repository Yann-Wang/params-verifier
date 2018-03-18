import test from 'ava';
import Validator from '../src/index';

test('test object validator success', (t) => {
    const query = {
        page: 0,
        show_confirm_entry: 'true',
        realnick_name: '测试',
        mobile: '13567441576',
        id_card: '130181199909091111',
        mail: 'wang.cc@163.com',
        employment_type: '3',
        hukou_type: '6',
        join_date: '2017-12-21T00:55:56+08:00',
        join_date_start: new Date(),
        join_date_end: '2017-12-21T00:55:56+08:00'
    };


    try {
        const validator = new Validator(query, 'object', { stringNotEmpty: true });
        validator
            .field('page', 'number', { required: true })
            .field('show_confirm_entry', 'boolean')
            .field('realnick_name', 'string', {
                validator: value => /^[a-zA-Z0-9\u4E00-\u9FA5]*$/.test(value),
                validatorErrMsg: '姓名必须为中文， 花名可以是中文、英文和数字'
            })
            .field('mobile', 'string', {
                type: 'mobile',
                typeErrMsg: '手机号格式错误'
            })
            .field('id_card', 'string', {
                type: 'id_card'
            })
            .field('mail', 'string', {
                type: 'email'
            })
            .field('nickname', 'string')
            .field('employment_type', 'number', {
                type: 'enum',
                range: [0, 4]
            })
            .field('hukou_type', 'number')
            .field('join_date', 'date')
            .field('join_date_start', 'date')
            .field('join_date_end', 'string', {
                type: 'date',
                typeErrMsg: '不是有效的时间字符串'
            });

        const filteredFields = validator.filter();
        t.is(filteredFields.show_confirm_entry, true);
        t.is(filteredFields.mobile, '13567441576');
        t.is(filteredFields.hukou_type, 6);
        t.is(filteredFields.nickname, undefined);
        t.pass();
    } catch (e) {
        console.log('error: ', e);
        t.fail();
    }
});

test('test object validator fail', (t) => {
    const query = {
        page: 0,
        show_confirm_entry: 'true',
        realnick_name: '测试',
        mobile: '135',
        id_card: '130181199909091111',
        mail: 'wang.cc@163.com',
        employment_type: '3',
        hukou_type: '6',
        join_date: '2017-12-21T00:55:56+08:00',
        join_date_start: new Date(),
        join_date_end: '2017-12-21T00:55:56+08:00'
    };


    try {
        const validator = new Validator(query, { stringNotEmpty: true });
        validator
            .field('page', 'number', { required: true })
            .field('show_confirm_entry', 'boolean')
            .field('realnick_name', 'string', {
                validator: value => /^[a-zA-Z0-9\u4E00-\u9FA5]*$/.test(value),
                validatorErrMsg: '姓名必须为中文， 花名可以是中文、英文和数字'
            })
            .field('mobile', 'string', {
                type: 'mobile',
                typeErrMsg: '手机号格式错误'
            })
            .field('id_card', 'string', {
                type: 'id_card'
            })
            .field('mail', 'string', {
                type: 'email'
            })
            .field('nickname', 'string')
            .field('employment_type', 'number', {
                type: 'enum',
                range: [0, 4]
            })
            .field('hukou_type', 'number')
            .field('join_date', 'date')
            .field('join_date_start', 'date')
            .field('join_date_end', 'string', {
                type: 'date',
                typeErrMsg: '不是有效的时间字符串'
            });
        t.fail();
    } catch (e) {
        t.is(e.message, '手机号格式错误');
        t.pass();
    }
});

test('test object validator single field', (t) => {
    const query = {
        page: 0,
        employment_type: '3',
        hukou_type: '6'
    };

    try {
        const validator = new Validator(query, 'object', { required: true });
        validator
            .singleField('query');
        const filteredFields = validator.filteredSingleField().query;
        t.is(filteredFields.page, 0);
        t.is(filteredFields.employment_type, '3');
        t.is(filteredFields.hukou_type, '6');
        t.pass();
    } catch (e) {
        console.log('error: ', e);
        t.fail();
    }
});

test('test object validator single field -- options.validator', (t) => {
    const query = {
        page: 0,
        employment_type: '3',
        hukou_type: '6'
    };

    try {
        const validator = new Validator(query, 'object', { required: true });
        validator
            .singleField('query', {
                validator: value => value.page > 9,
                validatorErrMsg: '页码大于9'
            });
        t.fail();
    } catch (e) {
        t.is(e.message, '页码大于9');
        t.pass();
    }
});

test('test object validator single field -- verify type -- false', (t) => {
    const query = new Date();

    try {
        const validator = new Validator(query, { required: true });
        validator
            .singleField('query');
        t.fail();
    } catch (e) {
        t.is(e.message, 'the type of query is not object.');
        t.pass();
    }
});

test('test object validator single field -- required: false', (t) => {
    let query;
    try {
        const validator = new Validator(query);
        validator
            .singleField('query');
        const filteredFields = validator.filteredSingleField().query;
        t.is(filteredFields, undefined);
        t.pass();
    } catch (e) {
        console.log(e);
        t.fail();
    }
});

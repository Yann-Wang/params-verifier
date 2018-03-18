### params-verifier

[![NPM](http://nodei.co/npm/params-verifier.png?downloads=true)](http://nodei.co/npm/params-verifier/)

[![NPM version](https://img.shields.io/npm/v/params-verifier.svg)]()

- params-verifier is a validator which can be used in controller of server or any other place.

### Demo

```javascript
    const query = {
        page: 0,
        show_confirm_entry: 'true',
        realname: '测试',
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
            .field('realname', 'string', {
                validator: value => /^[\u4E00-\u9FA5]*$/.test(value),
                validatorErrMsg: '姓名必须为中文'
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
        console.log(filteredFields);
    } catch (e) {
        console.log('error: ', e);
    }
```
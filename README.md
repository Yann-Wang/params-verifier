
[![NPM](http://nodei.co/npm/params-verifier.png?downloads=true)](http://nodei.co/npm/params-verifier/)

[![NPM version](https://img.shields.io/npm/v/params-verifier.svg)]()

- params-verifier is a validator which can be used in controller of server or any other place.

### install

```shell
    npm install params-verifier --save
```

### import
- this package is developed by es6 syntax, so we recommend to load the package as follows:
```javascript
    import Validator from 'params-verifier';
```
or you can also load like this:
```javascript
    const Validator = require('params-verifier').default;
```
### Demo

```javascript
    const query = {
        page: 0,
        employment_type: '3',
        show_confirm_entry: 'true',
        realname: '测试',
        mobile: '13567441576',
        join_date_end: '2017-12-21T00:55:56+08:00',
        join_date: '2017-12-21T00:55:56+08:00',
        join_date_start: new Date()
    };


    try {
        const validator = new Validator(query, 'object', { stringNotEmpty: true });
        validator
            .field('page', 'number', { required: true })
            .field('employment_type', 'number', {
                type: 'enum',
                range: [0, 4]
            })
            .field('show_confirm_entry', 'boolean')
            .field('realname', 'string', {
                validator: value => /^[\u4E00-\u9FA5]*$/.test(value),
                validatorErrMsg: '姓名必须为中文'
            })
            .field('mobile', 'string', {
                type: 'mobile',
                typeErrMsg: '手机号格式错误'
            })
            .field('join_date_end', 'string', {
                type: 'date',
                typeErrMsg: '不是有效的时间字符串'
            })
            .field('join_date', 'date')
            .field('join_date_start', 'date');

        const filteredFields = validator.filter();
        console.log(filteredFields);
    } catch (e) {
        console.log('error: ', e);
    }
```

```javascript
    try {
        const query = '张三';
        const validator = new Validator(query, 'string');
        validator.singleField('realname', {
            validator: value => /^[\u4E00-\u9FA5]*$/.test(value),
            validatorErrMsg: '姓名必须为中文'
        });
        const result = validator.filteredSingleField();
        console.log('result: ', result);
    } catch (e) {
        console.log(e);
    }
```

```javascript
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
        const result = validator.filteredSingleField();
        console.log('result: ', result);
    } catch (e) {
        console.log(e);
    }
```
### introduction
About the data validated by the validator, four basic types are be supported which include string, number, boolean and date. Besides, one complex type is supported, namely, the object type. At the meantime, the object type can also be acted as a basic type.

#### create a validator
- new Validator(data, dataType[, options])
- params:
    - data: source data
    - dataType: 'string' | 'number' | 'boolean' | 'date' | 'object'
    - options: an object, two fields can be set which are as follows.
        - **options.stringNotEmpty**:boolean -- the field value can't be an empty string when the data type is string.
        - **options.required**:boolean -- all fields are needed when the options.required is true. When the options.required is false, the field that equals to undefined will be filtered by the **filteredSingleField** or **filter** method.

#### start to validate data
- for complex type, we can use **field** method to load the field name, field type and options which is optional.
    - **field**(fieldName, fieldType[, options])
        - fieldName:string --
        - fieldType:string -- 'string' | 'number' | 'boolean' | 'date' | 'object'
        - options: an object
            - **options.type**:string -- the business type, only string and number is supported.
                | `data type` | `business type` |
                | --------- | ------------- |
                | string | `'mobile', 'id_card', 'passport', 'email', 'date'` |
                | number | `'enum'` |
            - **options.typeErrMsg**string -- set the customed error message about business type.
            - **options.range**:array[start, end] -- only for the field of which the field type is number and the options.type is enum. The start is the minimum and the end is maximum.
            - **options.validator**function -- a lambda expression, specify the validation rule.
            - **options.validatorErrMsg**string -- set the customed error message about validation rule.
            - **options.require**boolean -- when the value is true, the field is needed. The **options.require** of field method can override the options.required of validator.
            -  **options.stringNotEmpty**boolean -- only for the field of which the field type is string. When the value is true, the field value can't be an empty string.
            - the supported fields in options are different for different field type.

            | `data type` | `options.field supported` |
            | ------------- | ------------- |
            | string | `type, typeErrMsg, validator, validatorErrMsg, required, stringNotEmpty` |
            | number | `type, typeErrMsg, validator, validatorErrMsg, required` |
            | boolean | required |
            | date | `validator, validatorErrMsg, required` |
            | object | `validator, validatorErrMsg, required` |

### test
- you can test this node package in [es6 development environment](https://github.com/Yann-Wang/params-verifier-demo)

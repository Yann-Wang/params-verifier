import { ParamsError } from './Err';
import ValidatorBase from './ValidatorBase';
import { isStr } from './dataType';

export default class StringValidator extends ValidatorBase {
    constructor(data, options) {
        super();

        this.businessTypeList = ['mobile', 'id_card', 'passport', 'email', 'date'];
        this.type = 'string';
        this.value = data;
        this.options = options || {};
    }

    singleField(name, options) {
        this.currentFieldInfo = this.fetchFieldInfo(name, this.value, this.type, options);
        this.validate();
    }

    checkOptionsParamsSupport() {
        this.checkOptionsBusinessType();
        this.checkOptionsValidator();
        this.checkOptionsRequired();
        this.checkOptionsStringNotEmpty();
    }

    checkOptionsBusinessType() {
        const { businessType } = this.currentFieldInfo;
        const types = this.businessTypeList;

        if (businessType !== undefined) {
            if (typeof businessType !== 'string') {
                throw new ParamsError('the type of options.type must be string');
            }

            if (types.indexOf(businessType) === -1) {
                throw new ParamsError(`the value: ${businessType} of options.type is not supported.`);
            }
        }
    }

    checkOptionsStringNotEmpty() {
        const { stringNotEmpty } = this.currentFieldInfo;

        if (stringNotEmpty !== undefined) {
            if (typeof stringNotEmpty !== 'boolean') {
                throw new ParamsError('the type of options.stringNotEmpty must be boolean');
            }
        }
    }

    startValidateProcedure() {
        this.verifyType();
        this.checkStringNotEmpty();
        this.verifyBusinessType();
        this.runValidator();
    }

    checkStringNotEmpty() {
        const { stringNotEmpty, value, name } = this.currentFieldInfo;

        if (stringNotEmpty) {
            if (value === '') {
                throw new ParamsError(`the value of field ${name} can't be empty.`);
            }
        }
    }

    verifyType() {
        const { value, name } = this.currentFieldInfo;
        if (!isStr(value)) {
            throw new ParamsError(`the type of ${name} is not string.`);
        }
    }

    verifyBusinessType() {
        const {
            businessType, businessTypeErrMsg, name, value, type
        } = this.currentFieldInfo;


        if (businessType !== undefined) {
            const match = StringValidator.getLambdaExpressByBusinessType(businessType)(value);
            if (!match) {
                throw new ParamsError(businessTypeErrMsg || `the value of field ${name} don't match the business type ${businessType} of ${type}`);
            }
        }
    }

    static getLambdaExpressByBusinessType(businessType) {
        switch (businessType) {
            case 'mobile':
                return value => (/^[0-9]{11}$/.test(value));
            case 'id_card':
                return value => (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value));
            case 'passport':
                return value => (/(^[a-zA-Z]{5,17}$)|(^[a-zA-Z0-9]{5,17}$)/.test(value));
            case 'email':
                return value => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value));
            case 'date':
                return (value) => {
                    const date = new Date(value);
                    return Object.prototype.toString.call(date) === '[object Date]' && !Number.isNaN(date.getTime());
                };
            default:
                throw new Error(`the business type of ${businessType} for string is not defined.`);
        }
    }
}

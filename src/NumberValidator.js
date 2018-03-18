import { ParamsError } from './Err';
import ValidatorBase from './ValidatorBase';
import { isNum } from './dataType';

export default class NumberValidator extends ValidatorBase {
    constructor(data, options) {
        super();

        this.businessTypeList = ['enum'];
        this.type = 'number';
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
    }

    checkOptionsBusinessType() {
        const { businessType, range } = this.currentFieldInfo;
        const types = this.businessTypeList;

        if (businessType !== undefined) {
            if (typeof businessType !== 'string') {
                throw new ParamsError('the value of options.type for number must be string');
            }

            if (types.indexOf(businessType) === -1) {
                throw new ParamsError(`the value: ${businessType} of options.type is not supported.`);
            }

            if (businessType === 'enum') {
                if (!range
                    || !Array.isArray(range)
                    || range.length !== 2
                    || range.some(item => (
                        typeof item !== 'number'
                        || parseInt(item, 10) !== item
                    ))
                ) {
                    throw new ParamsError('the value of range field in options for enum type is invalid.');
                }
            }
        }
    }

    startValidateProcedure() {
        this.tryCastType();
        this.verifyType();
        this.verifyBusinessType();
        this.runValidator();
    }

    tryCastType() {
        const { value } = this.currentFieldInfo;
        if (typeof value === 'string' && /^[\d]+$/.test(value)) {
            this.currentFieldInfo.value = Number(value);
        }
    }

    verifyType() {
        const { value, name } = this.currentFieldInfo;
        if (!isNum(value)) {
            throw new ParamsError(`the type of ${name} is not number.`);
        }
    }

    verifyBusinessType() {
        const {
            businessType, businessTypeErrMsg, range, value, name, type
        }
            = this.currentFieldInfo;

        if (businessType !== undefined) {
            const match =
                NumberValidator.getLambdaExpressByBusinessType(businessType)(value, range);
            if (!match) {
                throw new ParamsError(businessTypeErrMsg || `the value of field ${name} don't match the business type ${businessType} of ${type}`);
            }
        }
    }

    static getLambdaExpressByBusinessType(businessType) {
        switch (businessType) {
            case 'enum':
                return (value, range) => (
                    value >= range[0] && value <= range[1]
                );
            default:
                throw new Error(`the business type of ${businessType} for number is not defined.`);
        }
    }
}

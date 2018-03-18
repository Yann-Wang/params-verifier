import { ParamsError } from './Err';
import { isStr, isFunc } from './dataType';

export default class ValidatorBase {
    constructor() {
        this.typeList = ['number', 'boolean', 'string', 'date', 'array', 'object'];
        this.currentFieldInfo = {};
        this.filteredField = {};
    }

    fetchFieldInfo(name, value, type, options = {}) {
        const fieldInfo = {
            name,
            value,
            type,
            businessType: options.type,
            businessTypeErrMsg: options.typeErrMsg,
            validator: options.validator,
            validatorErrMsg: options.validatorErrMsg,
            range: options.range
        };

        if (this.options.required !== undefined) {
            fieldInfo.required = this.options.required;
        }
        if (options.required !== undefined) {
            fieldInfo.required = options.required;
        }

        if (this.options.stringNotEmpty !== undefined) {
            fieldInfo.stringNotEmpty = this.options.stringNotEmpty;
        }
        if (options.stringNotEmpty !== undefined) {
            fieldInfo.stringNotEmpty = options.stringNotEmpty;
        }

        return fieldInfo;
    }

    validate() {
        this.checkParams();
        return this.whetherToValidate();
    }

    checkParams() {
        this.checkFieldNameAndType();
        this.checkOptionsParamsSupport();
    }

    checkFieldNameAndType() {
        const { name, type } = this.currentFieldInfo;
        if (!isStr(name)) {
            throw new ParamsError('the type of name must be string');
        }

        if (!isStr(type)) {
            throw new ParamsError('the value of type must be a string');
        }
        if (this.typeList.indexOf(type) === -1) {
            throw new ParamsError(`the type of ${type} is not supported`);
        }
    }

    checkOptionsValidator() {
        const { validator, validatorErrMsg } = this.currentFieldInfo;

        if (validator !== undefined) {
            if (!isFunc(validator)) {
                throw new ParamsError(validatorErrMsg || 'the type of options.validator must be function.');
            }
        }
    }

    checkOptionsRequired() {
        const { required } = this.currentFieldInfo;

        if (required !== undefined) {
            if (typeof required !== 'boolean') {
                throw new ParamsError('the type of options.required must be boolean');
            }
        }
    }

    whetherToValidate() {
        const { required, value, name } = this.currentFieldInfo;
        if (required || value !== undefined) {
            this.startValidateProcedure();
            this.recordFilteredField();
            return { [name]: this.currentFieldInfo.value };
        }
        return false;
    }

    recordFilteredField() {
        const { name } = this.currentFieldInfo;
        this.filteredField[name] = this.currentFieldInfo.value;
    }

    runValidator() {
        const {
            validator,
            validatorErrMsg,
            name,
            value
        } = this.currentFieldInfo;

        if (validator !== undefined) {
            const validationStatus = validator(value);
            if (!validationStatus) {
                throw new ParamsError(validatorErrMsg || `the value of field ${name} don't match the validator.`);
            }
        }
    }

    filteredSingleField() {
        return this.filteredField;
    }
}

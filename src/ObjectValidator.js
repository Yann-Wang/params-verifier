import arrayForEach from './util';
import { ParamsError } from './Err';
import ValidatorBase from './ValidatorBase';
import selectValidator from './selectValidator';
import { isObj } from './dataType';

export default class ObjectValidator extends ValidatorBase {
    constructor(data, options) {
        super();

        this.value = data;
        this.options = options || {};
        this.type = 'object';
        this.fieldsName = [];
        this.isSingleField = false;
    }

    singleField(name, options) {
        this.isSingleField = true;
        this.currentFieldInfo = this.fetchFieldInfo(name, this.value, this.type, options);
        this.validate();
    }

    field(name, type, options) {
        const typeValidator = selectValidator(type)(this.value[name], options);
        typeValidator.currentFieldInfo =
            this.fetchFieldInfo(name, typeValidator.value, typeValidator.type, options);
        typeValidator.validate();
        return this;
    }

    checkOptionsParamsSupport() {
        this.checkOptionsValidator();
        this.checkOptionsRequired();
    }

    whetherToValidate() {
        const { required, value, name } = this.currentFieldInfo;
        if (required || value !== undefined) {
            this.startValidateProcedure();
            if (this.isSingleField) {
                this.recordFilteredField();
            } else {
                this.fieldsName.push(name);
            }
        }
    }

    startValidateProcedure() {
        this.verifyType();
        this.runValidator();
    }

    verifyType() {
        const { value, name } = this.currentFieldInfo;
        if (!isObj(value)) {
            throw new ParamsError(`the type of ${name} is not object.`);
        }
    }

    filter() {
        const obj = {};
        arrayForEach(this.fieldsName, ((item) => {
            if (this.value[item] !== undefined) {
                obj[item] = this.value[item];
            }
        }));
        return obj;
    }
}

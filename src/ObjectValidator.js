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
        this.fieldsList = {};
    }

    singleField(name, options) {
        this.currentFieldInfo = this.fetchFieldInfo(name, this.value, this.type, options);
        this.validate();
    }

    field(name, type, options) {
        const typeValidator = selectValidator(type)(this.value[name], options);
        typeValidator.currentFieldInfo =
            this.fetchFieldInfo(name, typeValidator.value, typeValidator.type, options);
        const isFiltered = typeValidator.validate();
        if (isFiltered) {
            this.fieldsList[name] = isFiltered[name];
        }
        return this;
    }

    checkOptionsParamsSupport() {
        this.checkOptionsValidator();
        this.checkOptionsRequired();
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
        return this.fieldsList;
    }
}

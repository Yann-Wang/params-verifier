import { ParamsError } from './Err';
import ValidatorBase from './ValidatorBase';
import { isBool } from './dataType';

export default class BooleanValidator extends ValidatorBase {
    constructor(data, options) {
        super();

        this.type = 'boolean';
        this.value = data;
        this.options = options || {};
    }

    singleField(name, options) {
        this.currentFieldInfo = this.fetchFieldInfo(name, this.value, this.type, options);
        this.validate();
    }

    checkOptionsParamsSupport() {
        this.checkOptionsRequired();
    }

    startValidateProcedure() {
        this.tryCastType();
        this.verifyType();
    }

    tryCastType() {
        const { value } = this.currentFieldInfo;

        if (typeof value === 'string'
            && ['true', 'false'].indexOf(value) > -1) {
            this.currentFieldInfo.value = value === 'true';
        }
    }

    verifyType() {
        const { value, name } = this.currentFieldInfo;

        if (!isBool(value)) {
            throw new ParamsError(`the type of ${name} is not boolean.`);
        }
    }
}

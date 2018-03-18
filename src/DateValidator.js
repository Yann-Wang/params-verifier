import { ParamsError } from './Err';
import ValidatorBase from './ValidatorBase';
import { isDat } from './dataType';

export default class DateValidator extends ValidatorBase {
    constructor(data, options) {
        super();
        this.type = 'date';
        this.value = data;
        this.options = options || {};
    }

    singleField(name, options) {
        this.currentFieldInfo = this.fetchFieldInfo(name, this.value, this.type, options);
        this.validate();
    }

    checkOptionsParamsSupport() {
        this.checkOptionsValidator();
        this.checkOptionsRequired();
    }

    startValidateProcedure() {
        this.tryCastType();
        this.verifyType();
        this.runValidator();
    }

    tryCastType() {
        const { value } = this.currentFieldInfo;
        const date = new Date(value);

        if (typeof value === 'string' && !Number.isNaN(date.getTime())) {
            this.currentFieldInfo.value = date;
        }
    }

    verifyType() {
        const { value, name } = this.currentFieldInfo;

        if (!isDat(value)) {
            throw new ParamsError(`the type of ${name} is not date.`);
        }
    }
}

import selectValidator from './selectValidator';

export default class Validator {
    constructor(data, type, options) {
        let validatorType = type;
        let validatorOptions = options;
        if (
            (typeof type === 'object' && options === undefined)
            ||
            (type === undefined && options === undefined)
        ) {
            validatorOptions = type;
            validatorType = 'object';
        }
        return selectValidator(validatorType)(data, validatorOptions);
    }
}

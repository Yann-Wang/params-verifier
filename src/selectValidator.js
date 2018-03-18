import ObjectValidator from './ObjectValidator';
import NumberValidator from './NumberValidator';
import StringValidator from './StringValidator';
import DateValidator from './DateValidator';
import BooleanValidator from './BooleanValidator';
import { ParamsError } from './Err';

export default function (type) {
    switch (type) {
        case 'string':
            return (data, options) => (new StringValidator(data, options));
        case 'number':
            return (data, options) => (new NumberValidator(data, options));
        case 'boolean':
            return (data, options) => (new BooleanValidator(data, options));
        case 'date':
            return (data, options) => (new DateValidator(data, options));
        case 'object':
            return (data, options) => (new ObjectValidator(data, options));
        default:
            throw new ParamsError(`${type} is not supported`);
    }
}


export function isObj(data) {
    return (
        typeof data === 'object'
        &&
        Object.prototype.toString.call(data) === '[object Object]'
    );
}

export function isArr(data) {
    return Array.isArray(data);
}

export function isFunc(data) {
    return Object.prototype.toString.call(data) === '[object Function]';
}

export function isDat(data) {
    return (
        typeof data === 'object'
        &&
        Object.prototype.toString.call(data) === '[object Date]'
        &&
        !Number.isNaN(data.getTime())
    );
}

export function isReg(data) {
    return Object.prototype.toString.call(data) === '[object RegExp]';
}

export function isBool(data) {
    return typeof data === 'boolean';
}

export function isNum(data) {
    return typeof data === 'number' && !Number.isNaN(data);
}

export function isStr(data) {
    return typeof data === 'string';
}


export class ParamsError extends Error {
    constructor(msg) {
        super();
        this.name = 'ParamsError';
        this.message = msg;
        this.stack = `Error stack: ${this.stack}`;
    }
}

export class DataTypeError extends Error {
    constructor(msg) {
        super();
        this.name = 'DataTypeError';
        this.message = msg;
        this.stack = `Error name: ${this.name},\nError message: ${this.message},\nError stack: ${this.stack}`;
    }
}

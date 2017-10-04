function ElfSelectedObjectError(message) {
    const errorMessage = 'In ElvenConfig.json you must define the define the selected elvenImage class.\n' +
        'For instance:\n\n "elvenImages": {\n    "selected": "california",\n' +
        '    "california: {...}\n    "spain": {...}\n }';

    this.name = 'ElfSelectedObjectError';
    this.message = message || errorMessage;
    this.stack = (new Error()).stack;
}

ElfSelectedObjectError.prototype = Object.create(Error.prototype);

ElfSelectedObjectError.prototype.constructor = ElfSelectedObjectError;

module.exports = ElfSelectedObjectError;
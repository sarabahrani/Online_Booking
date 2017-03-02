
const validate = (value, validations) => {
    for (let i = 0; i < validations.length; i++) {
        const ret = validations[i](value);
        if (ret)
            return ret;
    }
    return undefined;
};
export default validate;

export const valEmail = (value) => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined;
};
export const valNumber = (value) => {
    return value && isNaN(Number(value)) ? 'Must be a number' : undefined;
};
export const valRequired = (value) => {
    return value || value.trim() ? undefined : 'Required';
};
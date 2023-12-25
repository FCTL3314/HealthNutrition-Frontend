export function getVuelidateFieldValidationClass(field) {
    if (!field.$dirty) {
        return "";
    }
    if (field.$errors.length !== 0) {
        return "is-invalid";
    } else {
        return "is-valid";
    }
}
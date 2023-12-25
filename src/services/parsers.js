import {capitalize} from "vue";


export function getLocalStorageBoolean(value, default_value = false) {
    return value === "true" ? true : default_value
}

export function parseDetailFromResponse(response) {
    try {
        const parsedResponse = JSON.parse(response);
        return parsedResponse.detail ? capitalize(parsedResponse.detail) : null;
    } catch {
        return null;
    }
}

export function parseMessagesFromResponse(response) {
    try {
        const parsedResponse = JSON.parse(response);
        return parsedResponse.messages ?
            parsedResponse.messages.map(message => capitalize(message)) :
            [];
    } catch {
        return null;
    }
}

const FIELDS_TO_IGNORE = ["detail", "code"];

export function parseFieldMessagesFromResponse(response) {
    try {
        const parsedResponse = JSON.parse(response);

        return Object.entries(parsedResponse)
            .filter(([key]) => !FIELDS_TO_IGNORE.includes(key))
            .map(([key, value]) => `${capitalize(key)} - ${value}`);
    } catch {
        return null;
    }
}

export function parseErrorsFromResponse(response) {
    const errors = [];

    const detail = parseDetailFromResponse(response);
    const messages = parseMessagesFromResponse(response);
    const fieldMessages = parseFieldMessagesFromResponse(response);

    if (detail) {
        errors.push(detail);
    }

    if (messages) {
        errors.push(...messages);
    }

    if (fieldMessages) {
        errors.push(...fieldMessages)
    }
    return errors;
}
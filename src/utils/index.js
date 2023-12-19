import {BASE_BACKEND_URL, TITLE_ENDING} from "@/constants";
import {capitalize} from "vue";

export function calculateTotalPages(objectsCount, paginateBy) {
    return Math.ceil(objectsCount / paginateBy);
}

export function scrollToTop(behavior = "smooth") {
    window.scrollTo({
        top: 0,
        behavior: behavior,
    });
}

export function scrollToBottom(element, behavior = "smooth") {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: behavior,
    });
}

export function createTitle(title) {
    return `${title} - ${TITLE_ENDING}`;
}

export function getValidationClass(field) {
    let validationClass = "";
    if (field.$dirty) {
        if (field.$errors.length) {
            validationClass = "is-invalid";
        } else {
            validationClass = "is-valid";
        }
    }
    return validationClass;
}

export function isJWTTokenExpired(token) {
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
        throw new Error("Invalid JWT token format");
    }
    const payload = JSON.parse(atob(tokenParts[1]));
    if (!payload || !payload.exp) {
        throw new Error("Invalid JWT token");
    }

    const expirationDate = new Date(payload.exp * 1000);
    const currentDate = new Date();
    return currentDate >= expirationDate;
}

export function parseDetailFromResponse(response) {
    const parsedResponse = JSON.parse(response);
    return parsedResponse.detail ? capitalize(parsedResponse.detail) : null;
}

export function parseMessagesFromResponse(response) {
    const parsedResponse = JSON.parse(response);
    return parsedResponse.messages ? parsedResponse.messages.map(message => capitalize(message)) : [];
}

const SERVICE_FIELDS = ["detail", "code"];

export function parseFieldMessagesFromResponse(response) {
    const parsedResponse = JSON.parse(response);

    return Object.entries(parsedResponse)
      .filter(([key]) => !SERVICE_FIELDS.includes(key))
      .map(([key, value]) => `${capitalize(key)} field - ${value}`);
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

export function getImageFullPath(url) {
    return BASE_BACKEND_URL + url;
}

export function getUserImage(user) {
    return user?.image || "/src/assets/images/default-user.png";
}

export async function replaceURLParams(router, route, params, savePosition = true) {
    const _params = {...params};
    if (savePosition) {
        _params.save_position = "true";
    }
    await router.replace({query: {...route.query, ..._params}});
}

export function tryParseOrDefault(value, defaultValue) {
    try {
        return value !== null ? JSON.parse(value) : defaultValue;
    } catch (error) {
        return defaultValue;
    }
}

export function calculateOffsetAdjustment(offset, createdObjects = 0, deletedObjects = 0) {
    return offset + (createdObjects - deletedObjects);
}

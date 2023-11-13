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

export function scrollToElement(element, behavior = "smooth") {
    window.scrollTo({
        top: element.offsetTop,
        behavior: behavior,
    });
}

export function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
    });
}

export function createTitle(title) {
    return `${title} | ${TITLE_ENDING}`;
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

export function isTokenExpired(token) {
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

export function getResponseDetail(response) {
    const parsedResponse = JSON.parse(response);
    if ("detail" in parsedResponse) {
        return capitalize(parsedResponse["detail"]);
    }
}

export function getResponseMessages(response) {
    const parsedResponse = JSON.parse(response);
    let messages = [];
    if ("messages" in parsedResponse) {
        for (const message of parsedResponse["messages"]) {
            messages.push(capitalize(message));
        }
    }
    return messages;
}

export function appendResponseErrorMessages(arr, response) {
    const detail = getResponseDetail(response);
    const messages = getResponseMessages(response);

    if (detail) {
        arr.push(detail);
    }

    if (messages) {
        arr.push(...messages);
    }
}

export function appendResponseFieldErrors(arr, response) {
    const parsedResponse = JSON.parse(response);
    for (const key in parsedResponse) {
        arr.push(...parsedResponse[key]);
    }
}

export function getImageFullPath(url) {
    return BASE_BACKEND_URL + url;
}

export function getUserImage(user) {
    return user?.image || "/src/assets/images/default_user.png";
}

export async function replaceURLParams(router, route, params, savePosition = true) {
    const _params = {...params};
    if (savePosition) {
        _params.save_position = "true";
    }
    await router.replace({query: {...route.query, ..._params}});
}

export function handleAuthError(error, errorsArr, v$) {
    appendResponseErrorMessages(errorsArr, error.request.response);
    v$.value.$reset();
    console.error(error.response);
}

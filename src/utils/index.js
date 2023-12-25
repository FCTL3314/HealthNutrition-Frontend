import {BASE_BACKEND_URL} from "@/constants";


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
    })
}

export function scrollToBottom(element, behavior = "smooth") {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: behavior,
    });
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

export function getImageFullPath(url) {
    return BASE_BACKEND_URL + url;
}

export function getUserImage(user) {
    return user.profile?.image || "/src/assets/images/default-user.png";
}

export async function replaceURLParams(router, route, params, savePosition = true) {
    const _params = {...params};
    if (savePosition) {
        _params.save_position = "true";
    }
    await router.replace({query: {...route.query, ..._params}});
}

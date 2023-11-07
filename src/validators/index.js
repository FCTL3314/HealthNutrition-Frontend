import {COMMENTS_ALLOWED_CONTENT_TYPES} from "@/constants";


export function isContentTypeAllowed(value) {
    return COMMENTS_ALLOWED_CONTENT_TYPES.includes(value);
}
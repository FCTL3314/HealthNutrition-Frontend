import {COMMENTS_ALLOWED_CONTENT_TYPES} from "@/constants";

export default function (instance) {
    return {
        comments(objectId, contentType, page, parentId = null) {
            if (!COMMENTS_ALLOWED_CONTENT_TYPES.includes(contentType)) {
                throw new Error(
                    `content_type must be one of the following options: ${COMMENTS_ALLOWED_CONTENT_TYPES.join(", ")}.`
                );
            }
            const params = {
                object_id: objectId,
                content_type: contentType,
                page,
            };
            if (parentId !== null) {
                params.parent_id = parentId;
            }
            return instance.get("comments/", {params: params});
        },
        comment_add(objectId, contentType, text, parentId = null) {
            const params = {
                object_id: objectId,
                content_type: contentType,
                text,
            };
            if (parentId !== null) {
                params.parent_id = parentId;
            }
            return instance.post("comments/", params);
        },
    };
}

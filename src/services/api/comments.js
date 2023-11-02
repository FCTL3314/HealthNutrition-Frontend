export default function (instance) {
  return {
    ALLOWED_CONTENT_TYPES: ['product', 'store'],
    comments(objectId, contentType, page, parentId = null) {
      if (!this.ALLOWED_CONTENT_TYPES.includes(contentType)) {
        throw new Error(
          `content_type must be one of the following options: ${allowed_content_types.join(', ')}.`
        );
      }
      const params = {
        object_id: objectId,
        content_type: contentType,
        page,
      }
      if (parentId !== null) {
        params.parent_id = parentId;
      }
      return instance.get(`comments/`, {params: params});
    },
    comment_add(objectId, contentType, text, parentId = null) {
      const params = {
        object_id: objectId,
        content_type: contentType,
        text,
      }
      if (parentId !== null) {
        params.parent_id = parentId;
      }
      return instance.post(`comments/`, params);
    },
  };
}

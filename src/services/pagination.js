export function calculateTotalPaginationPages(objectsCount, paginateBy) {
    return Math.ceil(objectsCount / paginateBy);
}

export function calculateOffsetAdjustment(offset, createdObjects = 0, deletedObjects = 0) {
    return offset + (createdObjects - deletedObjects);
}
function calculateTotalPages(objectsCount, paginateBy) {
  return Math.ceil(objectsCount / paginateBy)
}

export default calculateTotalPages

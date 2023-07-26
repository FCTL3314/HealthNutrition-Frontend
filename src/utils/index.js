import {TITLE_ENDING} from '@/constants';

export function calculateTotalPages(objectsCount, paginateBy) {
  return Math.ceil(objectsCount / paginateBy)
}

export const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
}

export function createTitle(title) {
  return `${title} | ${TITLE_ENDING}`
}

export function getValidationClass(field) {
  let validationClass = '';
  if (field.$dirty) {
    if (field.$errors.length) {
      validationClass = 'is-invalid';
    } else {
      validationClass = 'is-valid';
    }
  }
  return validationClass;
}
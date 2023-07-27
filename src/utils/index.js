import {TITLE_ENDING} from '@/constants';
import {capitalize} from "vue";

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

export function isTokenExpired(token) {
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    throw new Error('Invalid JWT token format');
  }
  const payload = JSON.parse(atob(tokenParts[1]));
  if (!payload || !payload.exp) {
    throw new Error('Invalid JWT token');
  }

  const expirationDate = new Date(payload.exp * 1000);
  const currentDate = new Date()
  return currentDate >= expirationDate;
}

export const resetForm = (validator) => {
  validator.$reset();
}

export function getResponseMessages(response) {
  const parsedResponse = JSON.parse(response);
  let messages = [];
  for (const key in parsedResponse) {
    for (const message of parsedResponse[key]) {
      messages.push(capitalize(message));
    }
  }
  return messages;
}

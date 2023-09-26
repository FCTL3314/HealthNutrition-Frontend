import {BASE_BACKEND_URL, TITLE_ENDING} from '@/constants';
import {capitalize} from "vue";

export function calculateTotalPages(objectsCount, paginateBy) {
  return Math.ceil(objectsCount / paginateBy)
}

export function scrollToTop(behavior = 'smooth') {
  window.scrollTo({
    top: 0,
    behavior: behavior,
  });
}

export function scrollToElement(element, behavior = 'smooth') {
  window.scrollTo({
    top: element.$el.offsetTop,
    behavior: behavior,
  });
}

export function scrollToBottom() {
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

export function resetForm(validator) {
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

export function getUserImage(user) {
  return user.image || '/src/assets/images/default_user.png'
}

export function getImageFullPath(url) {
  return BASE_BACKEND_URL + url;
}

export async function setParams(router, route, params, savePosition = true) {
  const _params = {...params}
  if (savePosition) {
    _params.save_position = "true"
  }
  await router.replace({query: {...route.query, ..._params}});
}

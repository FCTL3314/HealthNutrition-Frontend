import {alphaNum, helpers, maxLength, minLength, required} from "@vuelidate/validators";

export const alphaNumAndSpecialCharacters = helpers.regex(/^[a-z\d.@\-_+]*$/i);

export const usernameValidCharacters = helpers.withMessage(
  'Usernames may contain only alphanumeric and _ @ + . - characters',
  alphaNumAndSpecialCharacters,
);

export const containsLetter = (value) => /[a-z]/i.test(value);

export const passwordContainsLetter = helpers.withMessage(
  'This password does not have to be completely numeric',
  containsLetter,
);

export const usernameValidators = {
  minLength: minLength(4),
  maxLength: maxLength(32),
  usernameValidCharacters: usernameValidCharacters,
}

export const passwordValidators = {
  required,
  alphaNum,
  minLength: minLength(8),
  maxLength: maxLength(32),
  passwordContainsLetter: passwordContainsLetter,
}
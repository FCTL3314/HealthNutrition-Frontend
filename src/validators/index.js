import {helpers} from "@vuelidate/validators";

export const alphaNumAndSpecialCharacters = helpers.regex(/^[a-z\d.@\-_+]*$/i);

export const UsernameValidator = helpers.withMessage(
  'Usernames may contain only alphanumeric and _ @ + . - characters',
  alphaNumAndSpecialCharacters,
);
export const containsLetter = (value) => /[a-z]/i.test(value);

export const PasswordValidator = helpers.withMessage(
  'This password does not have to be completely numeric',
  containsLetter,
);

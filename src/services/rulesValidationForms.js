import { checkValidUrlImage } from "./checkValidUrlImage";
import { messagesErrorsValid } from "./messagesErrorsValid";
export const rulesValidationForms = {
  emailRules: {
    required: messagesErrorsValid.isRequired,
    pattern: {
      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: messagesErrorsValid.isEmail,
    },
  },
  usernameRules: {
    required: messagesErrorsValid.isRequired,
    maxLength: {
      value: 20,
      message: messagesErrorsValid.maxUsername,
    },
    minLength: {
      value: 3,
      message: messagesErrorsValid.minUsername,
    },
  },
  passwordRules: {
    required: messagesErrorsValid.isRequired,
    maxLength: {
      value: 40,
      message: messagesErrorsValid.maxPassword,
    },
    minLength: {
      value: 6,
      message: messagesErrorsValid.minPassword,
    },
  },
  imageRules: {
    value: checkValidUrlImage,
    message: messagesErrorsValid.isImage,
  },
  articleRules: {
    required: messagesErrorsValid.isRequired,
  },
  titleRules: {
    required: messagesErrorsValid.isRequired,
    maxLength: {
      value: 5000,
      message: messagesErrorsValid.isTitle,
    },
  },
};

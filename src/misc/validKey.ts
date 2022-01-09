import { helpers, maxLength, minLength, required } from "@vuelidate/validators";

export const validKey = (keyLen:number) => {
  return {
    required: helpers.withMessage("Key is required", required),
    minLength: helpers.withMessage(
      `key should be ${keyLen} characters`,
      minLength(keyLen)
    ),
    maxLength: helpers.withMessage(
      `key should be ${keyLen} characters`,
      maxLength(keyLen)
    ),
  };
};

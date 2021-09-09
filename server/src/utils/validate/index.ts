import { FieldError } from "src/resolvers/FieldError";
import { validateEmail } from "./validateEmail";
import { validatePassword } from "./validatePassword";
import { validateUsername } from "./validateUsername";

export const validateLogin = (
  loginCredentialName: string,
  loginCredentialPassword: string
) => {
  let errors: FieldError[] = [];
  let el;

  if (loginCredentialName.includes("@")) {
    el = validateEmail(loginCredentialName);
  } else {
    el = validateUsername(loginCredentialName);
  }

  let ep = validatePassword(loginCredentialPassword);

  if (el) errors.push(el);
  if (ep) errors.push(ep);

  if (errors.length > 0) return errors;

  return null;
};

export const validateAll = (
  username: String,
  password: String,
  email: String
) => {
  let errors: FieldError[] = [];
  let eu = validateUsername(username);
  let ep = validatePassword(password);
  let ee = validateEmail(email);

  if (eu) errors.push(eu);
  if (ep) errors.push(ep);
  if (ee) errors.push(ee);

  if (errors.length > 0) return errors;

  // if (eu) return [ eu ];
  // if (ep) return [ ep ];
  // if (ee) return [ ee ];

  return null;
};

export * from "./validateUsername";
export * from "./validatePassword";
export * from "./validateEmail";

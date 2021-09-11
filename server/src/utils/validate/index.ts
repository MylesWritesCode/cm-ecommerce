/*
 * File: \src\utils\validate\index.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Saturday September 11th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Saturday September 11th 2021 5:19:16 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { GeneralError } from "../../entity/general.error";
import { validateEmail } from "./validateEmail";
import { validatePassword } from "./validatePassword";
import { validateUsername } from "./validateUsername";

export const validateLogin = (
  loginCredentialName: string,
  loginCredentialPassword: string
) => {
  let errors: GeneralError[] = [];
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
  let errors: GeneralError[] = [];
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

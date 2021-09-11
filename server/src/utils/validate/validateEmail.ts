/*
 * File: \src\utils\validate\validateEmail.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Tuesday September 7th 2021
 * Author: Myles Berueda
 * Notes: Probably should expand upon this later on. For now, I just want
 *        to make sure the validation works.
 * -----
 * Last Modified: Tuesday September 7th 2021 2:14:07 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
export const validateEmail = (email: String) => {
  if (!email.includes("@")) {
    return {
      error: "email",
      message: "The email is invalid."
    }
  }
  
  // No errors found
  return null;
}
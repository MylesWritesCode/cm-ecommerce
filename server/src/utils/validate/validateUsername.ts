/*
 * File: \src\utils\validate\validateUsername.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Tuesday September 7th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Tuesday September 7th 2021 2:17:08 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
export const validateUsername = (username: String) => {
  if (username.length < 5) {
    return {
      error: "username",
      message: "The username must be greater than 5 characters",
    };
  }

  // No errors found
  return null;
};

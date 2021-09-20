/*
 * File: /src/utils/isServer.ts
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Monday September 20th 2021
 * Author: Myles Berueda
 * Note: A simple helper that just checks if a window exists. If none exists,
 *       then this is probably being run on the server instead of the browser.
 * -----
 * Last Modified: Monday September 20th 2021 2:15:55 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
export const isServer = () => typeof window === "undefined";

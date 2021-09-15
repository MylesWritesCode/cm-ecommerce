/*
 * File: /src/next.config.js
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Tuesday September 14th 2021
 * Author: Myles Berueda
 * Note: I don't want to use .env.local even though it's included in Next.js so
 *       I set up a function that will determine if an env variable should be 
 *       accessible from the client-side of the application. What this does is
 *       parse process.env as set by dotenv, then look for env variables that
 *       are prefixed by strings as shown in the array. If the prefix exists on
 *       the env variable, then it'll create a tuple with that specific variable
 *       to be exposed to the client.
 * 
 *       For the rest of the config, check the following refernce link. They
 *       don't need to be explicitly set or anything, and cm-ecommerce currently
 *       isn't using anythign else, but it could be useful in the future.
 *       
 *       REFERENCE:
 *       https://nextjs.org/docs/api-reference/next.config.js/introduction
 * -----
 * Last Modified: Tuesday September 14th 2021 12:32:43 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */


// Idk if I need this, but it was in the example to I'm keeping it.
/**
 * @type {import('next').NextConfig}
 */
const path = require('path');
const envPath = path.join(__dirname, "src/environment/.env.development");

require('dotenv').config({ path: envPath });

// From https://bit.ly/3tH5Cm7. 
const getEnvWithPrefixes = (prefixes = ['REACT_APP_', 'NEXT_PUBLIC_']) => {
  return Object.keys(process.env).reduce((prev, curr) => {
    if (prefixes.some(p => curr.startsWith(p))) {
      return {
        ...prev,
        [curr]: process.env[curr],
      }
    }

    return prev
  }, {})
}

const nextConfig = {
  env: getEnvWithPrefixes()
}

module.exports = nextConfig;

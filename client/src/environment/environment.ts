/*
 * File: /src/environment/environment.ts
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Sunday September 12th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Sunday September 12th 2021 10:22:49 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import * as dotenv from 'dotenv';
import path from "path"; 

const envPath = path.join(__dirname, ".env.development");
const result = dotenv.config({ path: envPath }); 

if (result.error) throw result.error;
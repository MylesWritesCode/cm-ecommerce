/*
 * File: \src\environment\environment.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Saturday September 4th 2021
 * Author: Myles Berueda
 * Note: .env files don't need to be in the build folder, but definitely need
 *       to be in one of the source folders. In production, we'll set this 
 *       through other means such as Docker secrets or env values in the VM. 
 *       It's important to be cognizant of how we're accessing secret values, 
 *       as the code won't change between production and development. Instead, 
 *       make sure to use process.env by setting this to some constant.
 *  
 *       Make sure to change the second argument in path.join to whatever your
 *       .env file is in this folder.
 * -----
 * Last Modified: Saturday September 4th 2021 11:48:00 pm
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
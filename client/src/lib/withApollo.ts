/*
 * File: /src/lib/withApollo.ts
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Sunday September 19th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Sunday September 19th 2021 11:28:09 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { withApollo as createWithApollo } from "next-apollo";

const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL as string,
  cache: new InMemoryCache({
    // config
  }),
  credentials: "include",
});

export const withApollo = createWithApollo(apolloClient);
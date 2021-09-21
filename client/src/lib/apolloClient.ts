/*
 * File: /src/lib/apolloClient.ts
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Monday September 20th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Monday September 20th 2021 2:06:19 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "@apollo/link-error";
import { createUploadLink } from "apollo-upload-client";
import merge from "deepmerge";
import { IncomingHttpHeaders } from "http";
import fetch from "isomorphic-unfetch";
import isEqual from "lodash/isEqual";
import type { AppProps } from "next/app";
import { useMemo } from "react";

const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
  // Isomorphic fetch for passing the cookies along with each GraphQL request
  const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        "Access-Control-Allow-Origin": "*",
        // Here we pass the cookie along for each request
        Cookie: headers?.cookie ?? "",
      },
    }).then((response) => response);
  };

  return new ApolloClient({
    // SSR only for Node.js
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        // TODO: This currently logs to the browser. I should probably set up
        //       some sort of error handler that writes this to a file instead.
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
          });
        }

        if (networkError) {
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
        }
      }),
      // Uses apollo-link-http under the hood
      createUploadLink({
        uri: process.env.NEXT_PUBLIC_API_URL as string,
        // Make sure that CORS and cookies work
        fetchOptions: {
          mode: "cors",
        },
        credentials: "include",
        fetch: enhancedFetch,
      }),
    ]),
    cache: new InMemoryCache({
      // config
      typePolicies: {
        Query: {
          fields: {
            me: {
              merge: true,
            },
          },
        },
      },
    }),
  });
};

type InitialState = NormalizedCacheObject | undefined;

interface IInitializeApollo {
  headers?: IncomingHttpHeaders | null;
  initialState?: InitialState | null;
}

export const initializeApollo = (
  { headers, initialState }: IInitializeApollo = {
    headers: null,
    initialState: null,
  }
) => {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the
  // initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps and
    // getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps["pageProps"]
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export function useApollo(pageProps: AppProps["pageProps"]) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state]
  );
  return store;
}

/*
 * File: /src/pages/_app.tsx
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
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

import { Navbar } from "@components/nav";
import { useApollo } from "@lib/apolloClient";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps);
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Navbar />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;

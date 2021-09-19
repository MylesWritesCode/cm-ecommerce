import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

import theme from "../theme";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL as string,
  cache: new InMemoryCache(),
  credentials: "include",
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;

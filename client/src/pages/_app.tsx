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
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;

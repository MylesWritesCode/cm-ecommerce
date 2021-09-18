import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';

// Store the Apollo client on `globalApolloClient` so we can call it throughout
// the app. I should probably move this into contexts, as this client needs to
// be app-wide, but that's an issue that can be fixed later.
let globalApolloClient = null;
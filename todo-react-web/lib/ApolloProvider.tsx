'use client';

import { ApolloProvider } from '@apollo/client/react';
import getClient from './apolloClient';

export default function ApolloClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const apolloClient = getClient(); // ← direto, sem useState

  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
}
"use client";

import { ApolloProvider } from "@apollo/client";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const httpLink = createHttpLink({
    uri: "https://sentiai.up.railway.app/graphql",
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = localStorage.getItem("auth_token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

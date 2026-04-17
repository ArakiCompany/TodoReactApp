import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function clearAndRedirect() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
  window.location.href = '/login';
}

const httpLink = new HttpLink({
  uri: 'https://todographql.onrender.com/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
  const token = getToken();

  if (token) {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      const isExpired = Date.now() >= exp * 1000;

      if (isExpired) {
        clearAndRedirect();
        return forward(operation);
      }
    } catch {
      clearAndRedirect();
    }
  }

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  }));

  return forward(operation);
});

let client: ReturnType<typeof makeClient> | null = null;

function makeClient() {
  return new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });
}

export function resetClient() {
  if (client) {
    client.clearStore();
  }
}

export default function getClient() {
  if (typeof window === 'undefined') return makeClient();
  if (!client) client = makeClient();
  return client;
}
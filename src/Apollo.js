import {
    ApolloClient as _ApolloClient,
    InMemoryCache,
    HttpLink
} from 'apollo-boost';

const ApolloClient = new _ApolloClient({
    link: new HttpLink({
        uri: 'http://127.0.0.1:5000/graphql'
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore'
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all'
        }
    }
});

export default ApolloClient;

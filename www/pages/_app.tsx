import App, { Container } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import withApollo from "../lib/withApollo";
import { ApolloClient } from "apollo-client";

interface Props {
  apollo: ApolloClient<any>;
}

class MyApp extends App<Props> {
  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);

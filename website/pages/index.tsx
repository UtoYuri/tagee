import * as React from 'react';
import { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import Home from '../routes/Home/Home';

const Index: NextPage<{}> = () => (
  <Layout>
    <Home />
  </Layout>
);

Index.getInitialProps = async ({ req }) => {
  if (req) {
    // server side
  }
  // client side

  // const res = await fetch('https://api.github.com/repos/zeit/next.js')
  // const json = await res.json()
  // return { stars: json.stargazers_count }
  return {};
};

export default Index;

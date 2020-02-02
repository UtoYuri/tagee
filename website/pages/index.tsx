import * as React from 'react';
import { NextPage } from 'next';

import Layout from '../components/Layout/Layout';
import Home from '../routes/Home/Home';
import { GlobalStateProvider } from '../stores/globalStateStore';

import { fetchMedias } from '../api/medias';

interface Props {
  initialMedias: Media[];
}

const Index: NextPage<Props> = ({initialMedias}: Props) => (
  <GlobalStateProvider>
    <Layout>
      <Home initialMedias={initialMedias} />
    </Layout>
  </GlobalStateProvider>
);

Index.getInitialProps = async ({ req }) => {
  if (req) {
    // server side
  }
  // client side

  const data = await fetchMedias();
  return { initialMedias: data }
};

export default Index;

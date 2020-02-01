import * as React from 'react';
import Head from 'next/head';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.less';

interface Props {
  children?: any;
}

class Layout extends React.Component<Props, {}> {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.layout}>
        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system,BlinkMacSystemFont,segoe ui,roboto,oxygen,cantarell,helvetica neue,ubuntu,sans-serif;
          }
        `}</style>
        <Head>
          <title>Tagee</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
        </Head>
        <Header />
        {children}
        <Footer />
      </div>
    );
  }
}

export default Layout;

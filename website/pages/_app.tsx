import App from 'next/app';

class CustomApp extends App<any, {}> {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default CustomApp;

import App from 'next/app';

import { GlobalSettingProvider } from '../stores/globalSettingStore';

class CustomApp extends App<any, {}> {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <GlobalSettingProvider>
        <Component {...pageProps} />
      </GlobalSettingProvider>
    );
  }
}

export default CustomApp;

import * as React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import classnames from 'classnames';

import styles from './Header.less';
import Banner from './Banner/Banner';
import logo from '../../static/images/logo.png';

const Header = function () {
  const [scrollHeight, setScrollHeight] = React.useState<number>(0)
  const [bannerHeight, setBannerHeight] = React.useState<number>(300)

  React.useLayoutEffect(() => {
    const handleScroll = () => {
      let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      if(document.body){
        bodyScrollTop = document.body.scrollTop;
      }
      if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  
      setScrollHeight(scrollTop)
    };

    const banner = document.getElementById('header')
    if (banner) {
      setBannerHeight(banner.offsetHeight - 64);
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, []);

  const floatMode = scrollHeight > bannerHeight;

  return (
    <header className={styles.header} id='header'>
      <nav className={classnames(styles.nav, floatMode && styles.outline)}>
        <div className={styles.left}>
          <Link href='/'>
            <a className={styles.logo}><img src={logo} alt="tagee" /></a>
          </Link>
        </div>
        <div className={styles.right}>
          <a target='_blank' href='https://github.com/UtoYuri/tagee'><Button icon="github" type='primary'>Github</Button></a>
        </div>
      </nav>
      <div className={styles.banner}>
        <Banner />
      </div>
    </header>
  );
}

export default Header;

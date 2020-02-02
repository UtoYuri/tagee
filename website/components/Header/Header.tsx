import * as React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import classnames from 'classnames';

import styles from './Header.less';
import Banner from './Banner/Banner';
import useScroll from '../../hooks/useScroll';
import logo from '../../static/images/logo.png';

const Header = function () {
  const scrollPorint = useScroll();
  const bannerRef: any = React.useRef();
  const [bannerHeight, setBannerHeight] = React.useState<number>(0);

  React.useLayoutEffect(() => {
    setBannerHeight(bannerRef && bannerRef.current ? bannerRef.current.offsetHeight - 72 : 0);
  }, []);

  const floatMode = scrollPorint.y > bannerHeight;

  return (
    <header className={styles.header}>
      <nav className={classnames(styles.nav, floatMode && styles.outline)}>
        <div className={styles.left}>
          <Link href='/'>
            <a className={styles.logo}><img src={logo} alt="tagee" /></a>
          </Link>
        </div>
        <div className={styles.right}>
          <a target='_blank' href='https://github.com/UtoYuri/tagee'><Button icon="github" type='primary' size="large">Github</Button></a>
        </div>
      </nav>
      <div ref={bannerRef}>
        <Banner />
      </div>
    </header>
  );
}

export default Header;

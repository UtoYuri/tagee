import * as React from 'react';
import { Button } from 'antd';

import styles from './Home.less';

class Home extends React.Component<{}, {}> {
  render() {
    return (
      <div className={styles.container}>
        <Button type='primary'>Home</Button>
      </div>
    );
  }
}

export default Home;

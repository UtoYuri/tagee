import * as React from 'react';
import { Popover, Icon, Input, Slider } from 'antd';
import classnames from 'classnames';

import styles from './Banner.less';
import useGlobalSetting from '../../../hooks/useGlobalSetting';

const Banner = () => {
  const [columns, setColumns] = useGlobalSetting('view-columns', 5);

  const columnSilder = (
    <Slider defaultValue={columns} dots min={3} max={10} style={{ width: 240 }} onChange={(value: any) => setColumns(value)} />
  );

  return (
    <div className={styles.banner}>
      <div className={classnames(styles.mask, styles.background)} />
      <div className={styles.mask}>
        <div className={styles.content}>
          <h3>TAGEE</h3>
          <Input.Search
            placeholder="Search ralated medias..."
            size="large"
            onSearch={value => console.log(value)}
            className={styles.search}
          />
          <div className={styles.shortCuts}>
            <div className={styles.title}>Hot</div>
            <div className={styles.tags}>
              {
                ['animal', 'car', 'beauty', 'self', 'travel'].map((tag: string) => (
                <span key={tag}>#{tag}</span>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className={styles.viewOptions}>
        <Popover content={columnSilder} placement="leftTop" title="Columns" trigger="click">
          <Icon type="layout" theme="twoTone" className={styles.option} />
        </Popover>
      </div>
    </div>
  );
};

export default Banner;

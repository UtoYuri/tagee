import * as React from 'react';
import { Popover, Icon, Input, Slider } from 'antd';
import classnames from 'classnames';

import styles from './Banner.less';
import useGlobalSetting from '../../../hooks/useGlobalSetting';
import useGlobalState from '../../../hooks/useGlobalState';
import useAsync from '../../../hooks/useAsync';
import { fetchMedias } from '../../../api/medias';

const Banner = () => {
  const [columns, setColumns] = useGlobalSetting<number>('view-columns', 5);
  const { setPayload: setMediasPayload } = useGlobalState<Media[]>('medias');
  const { execute: fetchMediasAction, result: medias, pending: fetchingMedias, error: fetchMediasError } = useAsync<Media[]>(fetchMedias, false);

  const columnSilder = (
    <Slider defaultValue={columns} dots min={3} max={10} style={{ width: 240 }} onChange={(value: any) => setColumns(value)} />
  );

  React.useEffect(() => {
    if (medias || fetchMediasError) {
      // has result
      setMediasPayload({result: medias, pending: fetchingMedias, error: fetchMediasError});
    } else if (fetchingMedias) {
      // pending
      setMediasPayload({pending: fetchingMedias});
    }
  }, [medias, fetchingMedias, fetchMediasError]);

  const searchMedias = async (key: string) => {
    fetchMediasAction(key);
  };

  return (
    <div className={styles.banner}>
      <div className={classnames(styles.mask, styles.background)} />
      <div className={styles.mask}>
        <div className={styles.content}>
          <h3>TAGEE</h3>
          <Input.Search
            placeholder="Search ralated medias..."
            size="large"
            onSearch={searchMedias}
            className={styles.search}
          />
          <div className={styles.shortCuts}>
            <div className={styles.title}>Hot</div>
            <div className={styles.tags}>
              {
                ['animal', 'car', 'beauty', 'self', 'travel'].map((tag: string) => (
                <span key={tag} onClick={() => searchMedias(tag)}>#{tag}</span>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className={styles.viewOptions}>
        <Popover content={columnSilder} placement="leftTop" title="Columns" trigger="click">
          <Icon type="tool" theme="filled" className={styles.option} />
        </Popover>
      </div>
    </div>
  );
};

export default Banner;

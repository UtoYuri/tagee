import * as React from 'react';
import { BackTop, Spin } from 'antd';

import styles from './Home.less';
import WaterfallsFlow from '../../components/WaterfallsFlow/WaterfallsFlow';
import MediaView from '../../components/MediaView/MediaView';
import useGlobalSetting from '../../hooks/useGlobalSetting';
import useGlobalState from '../../hooks/useGlobalState';

interface Props {
  initialMedias: Media[];
}

const Home = function({initialMedias}: Props) {
  const [columns] = useGlobalSetting<number>('view-columns', 5);
  const { payload: mediasPayload } = useGlobalState<Media[]>('medias', initialMedias)
  const [actualColumns, setActualColumns] = React.useState<number>(columns);

  React.useLayoutEffect(() => {
    setActualColumns(Math.min(mediasPayload.result.length, columns) > 3 ? Math.min(mediasPayload.result.length, columns) : 3);
  }, [columns]);

  return (
    <div className={styles.container}>
      <Spin tip="Loading..." spinning={mediasPayload.pending} size="large">
        <WaterfallsFlow columns={actualColumns} gutter={20}>
          {
            mediasPayload.result && mediasPayload.result.map((media: Media) => (
              <MediaView key={media.ID} media={media} />
            ))
          }
        </WaterfallsFlow>
        <BackTop>
          <div className={styles.backTop}>UP</div>
        </BackTop>
      </Spin>
    </div>
  );
}

export default Home;

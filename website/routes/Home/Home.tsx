import * as React from 'react';
import { BackTop } from 'antd';

import styles from './Home.less';
import WaterfallsFlow from '../../components/WaterfallsFlow/WaterfallsFlow';
import MediaView from '../../components/MediaView/MediaView';
import useGlobalSetting from '../../hooks/useGlobalSetting';
import { fakeData } from './medias';

const Home = function() {
  const [columns] = useGlobalSetting('view-columns', 5);
  const medias = fakeData;
  const [actualColumns, setActualColumns] = React.useState<number>(columns);

  React.useLayoutEffect(() => {
    setActualColumns(Math.min(medias.length, columns) > 3 ? Math.min(medias.length, columns) : 3);
  }, [columns]);

  return (
    <div className={styles.container}>
      <WaterfallsFlow columns={actualColumns} gutter={20}>
        {
          medias.map((media: Media) => (
            <MediaView key={media.ID} media={media} />
          ))
        }
      </WaterfallsFlow>
      <BackTop>
        <div className={styles.backTop}>UP</div>
      </BackTop>
    </div>
  );
}

export default Home;

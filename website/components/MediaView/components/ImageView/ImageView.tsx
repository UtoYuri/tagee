import * as React from 'react';
import { Card } from 'antd';

import styles from './ImageView.less';

interface Props {
  media: Media;
}

const ImageView = function(props: Props) {
  const { media } = props;

  return (
    <div>
      <Card
        hoverable
        cover={<img className={styles.preview} alt={media.Title} src={media.Url} />}
      >
        <Card.Meta title={media.Title} description={media.Description} />
      </Card>
    </div>
  );
}

export default ImageView;

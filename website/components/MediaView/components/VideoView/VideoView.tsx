import * as React from 'react';
import ReactPlayer from 'react-player';
import _ from 'lodash';
import { Card } from 'antd';

import styles from './VideoView.less';
import useWindowSize from '../../../../hooks/useWindowSize';
import useGlobalSetting from '../../../../hooks/useGlobalSetting';
import useHover from '../../../../hooks/useHover';

interface Props {
  media: Media;
  ref?: any;
}

const VideoView = function(props: Props) {
  const { media } = props;
  const windowSize = useWindowSize();
  const [columns] = useGlobalSetting<number>('view-columns', 5);
  const [isHovered, hoverRef] = useHover(false);
  const [viewWidth, setViewWidth] = React.useState<number | null>(null);
  const [viewHeight, setViewHeight] = React.useState<number | null>(null);
  let viewHolder: any = React.useRef();

  React.useLayoutEffect(() => {
    _.defer(() => {
      const refWidth = viewHolder.current && viewHolder.current.clientWidth;
      const refHeight = refWidth && refWidth * 0.58;
      setViewWidth(refWidth);
      setViewHeight(refHeight);
    });
  }, [windowSize, columns]);


  return (
    <div ref={viewHolder} className={styles.videoView} id={media.ID}>
      <Card
        hoverable
        cover={(
          <div ref={hoverRef}>
            <ReactPlayer
              ref={hoverRef}
              light={!isHovered ? media.ThumbnailUrl : false}
              playing={isHovered && !!media.ID}
              controls
              loop
              width={viewWidth || 'unset'}
              height={viewHeight || 'unset'}
              url={media.Url}
            />
          </div>
        )}
      >
        <Card.Meta title={media.Title} description={media.Description} />
      </Card>
    </div>
  );
}

export default VideoView;

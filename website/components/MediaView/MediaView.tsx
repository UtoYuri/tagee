import * as React from 'react';

import { MediaTypeEnum } from '../../utils/enums';
import ImageView from './components/ImageView/ImageView';
import VideoView from './components/VideoView/VideoView';

interface Props {
  media: Media;
}

const MediaView = function(props: Props) {
  const { media } = props;

  if (media.Kind === MediaTypeEnum.IMAGE) {
    return <ImageView media={media} />;
  } else if (media.Kind === MediaTypeEnum.AUDIO) {
    return <ImageView media={media} />;
  } else if (media.Kind === MediaTypeEnum.VIDEO) {
    return <VideoView media={media} />;
  }
  return null;
}

export default MediaView;

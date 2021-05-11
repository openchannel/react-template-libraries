import * as React from 'react';
import ReactPlayer from 'react-player/lazy';
import './styles.scss';

export interface VideoProps {
  /**
   * Video url
   */
  videoUrl: string;
}

export const Video: React.FC<VideoProps> = (props) => {
  const { videoUrl } = props;
  return (
    <div className="oc-video">
      <div className="oc-video__container">
        <div className="oc-video__preview">
          <div className="oc-video__preview-data">
            <ReactPlayer
              url={videoUrl}
              className="oc-video_frame-video"
              playing={false}
              controls
              width={300}
              height={150}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

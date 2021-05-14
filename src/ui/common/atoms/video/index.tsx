//commit 7c65d4c5751759f5ca8ea2a97520a1af5a5b71c6 Author: Alex Tkachenko Date: 23.02.21, 12:21
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

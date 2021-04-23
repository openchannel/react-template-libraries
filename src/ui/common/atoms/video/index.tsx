import * as React from 'react';
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
            <iframe src={videoUrl} frameBorder="0" allowFullScreen />
          </div>
        </div>
      </div>
    </div>
  );
};

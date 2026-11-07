import React from 'react';
import { Composition } from 'remotion';
import { VideoComposition } from './VideoComposition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainVideo"
        component={VideoComposition}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          topic: 'Halo dari Remotion Android App!',
        }}
      />
    </>
  );
};

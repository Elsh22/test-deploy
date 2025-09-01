'use client';
import { useEffect } from 'react';
import Instafeed from 'instafeed.js';

const InstagramFeed = () => {
  useEffect(() => {
    const userFeed = new Instafeed({
      get: 'user',
      userId: 'YOUR_USER_ID',
      accessToken: 'YOUR_ACCESS_TOKEN',
      target: 'instafeed-container',
      resolution: 'standard_resolution',
    });
    userFeed.run();
  }, []);

  return <div id="instafeed-container"></div>;
};

export default InstagramFeed;

import React, { Component } from 'react';
import Instafeed from 'instafeed.js';

class InstagramFeed extends Component {
    componentDidMount() {
      const userFeed = new Instafeed({
        get: 'user',
        target: 'instafeed-container',
        resolution: 'standard_resolution',
        accessToken: 'IGQWRQWnJROGJOTnZAuRTdJSFgzTGp2ZA0ktcEY0NWUwT3J4a0lYa2RUc2c3UWNpQTZADTFJsUW5sSWhfUGdkRUdYa1B2SHVSMXFhbXFvcHVkT1AyU2t5Vnpya2k1eGRWbmg5Qmc3ZAjd1eWRJVEFYZAFVhU1Fha05oMkkZD', 
        template: `<a href="{{link}}" class="block overflow-hidden mb-3">
                          <div class="relative" style="padding-bottom: 100%;"> <!-- Aspect ratio box -->
                            <img src="{{image}}" class="absolute top-0 left-0 w-full h-full object-cover" />
                          </div>
                       </a>`
      });
      userFeed.run();
    }
  
    render() {
      return (
        <div className="mt-4">
            <div id="instafeed-container" className="gallery grid grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-1 p-3"></div>
      </div>
    );
  }
}

export default InstagramFeed;
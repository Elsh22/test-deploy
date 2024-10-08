import React, { Component } from 'react';
import Instafeed from 'instafeed.js';

class InstagramFeed extends Component {
  componentDidMount() {
    const userFeed = new Instafeed({
      get: 'user',
      target: 'instafeed-container',
      resolution: 'standard_resolution',
      accessToken: 'IGQWRPLV8tOFhHTzQtTWhJdWxaS2I0bk1UZAkRrOUxYSTh2TVhseTR3MWxoT1Rid3hRQzNzX3Y5Y1hEYmN6Y2h1RU9falhDSzJjalR6cVNNX1djN09jNXYya2hoeDJ6LUQySDJQRDA4NXpJcWVfd0xscDlvR3NKdk0ZD', // Updated line
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
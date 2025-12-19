import React from 'react';
import { Link } from 'react-router';
import BannerSlider from './BannerSlider';
import Featured from './Featured';

const Home = () => {
    return (
      <div>
      <BannerSlider/>
        <Featured/>
        
        
      </div>
    );
};

export default Home;
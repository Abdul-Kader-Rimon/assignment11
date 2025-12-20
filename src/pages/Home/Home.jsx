import React from 'react';
import { Link } from 'react-router';
import BannerSlider from './BannerSlider';
import Featured from './Featured';
import ContactUs from './ContactUs';

const Home = () => {
    return (
      <div>
      <BannerSlider/>
        <Featured/>
        <ContactUs/>
        
        
      </div>
    );
};

export default Home;
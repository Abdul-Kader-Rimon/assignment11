import React from 'react';
import { Link } from 'react-router';
import BannerSlider from './BannerSlider';
import Featured from './Featured';
import ContactUs from './ContactUs';
 
import Stats from './Stats';
import UrgentRequestsSection from './UrgentRequests';
import BloodCompatibilitySection from './BloodCompatibility';
 
import WhyDonateSection from './WhyDonate';
import TickerSection from './Ticker';
import BloodDropWave from './BloodDropwave';
 

const Home = () => {
    return (
      <div>
     
      <BannerSlider/>
       <TickerSection/>
        <Featured/>
        <Stats/>
        <UrgentRequestsSection/>
        <BloodCompatibilitySection/>
        <WhyDonateSection/> 
         <BloodDropWave/>
        <ContactUs/>
        
        
      </div>
    );
};

export default Home;
// LandingPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import HomeAutomationAnimation from '@/pages/HomeAutomationAnimation'; // Adjust the path as needed

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Timer to navigate to Dashboard after the animation (adjust the time as needed)
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 4000); // Assuming your animation takes around 4 seconds

    return () => clearTimeout(timer); // Clear timer on unmount
  }, [navigate]);

  return (
    <div>
      {/* <HomeAutomationAnimation /> */}
    </div>
  );
};

export default LandingPage;

import React from 'react';
import './Home.css';
import Header from '../Header/Header';
import MenuTable from './MenuTable';


const Home = () => {
  return (
    <>
    <Header/>
    
    <div className="home-container">
      {/* Header Section */}
      <header className="header-home">
        <h1>College Mess Feedback System</h1>
        <p>Your voice matters! Share your thoughts to improve our services.</p>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Use the Feedback System?</h2>
        <div className="features">
          <div className="feature">
            <h3>Transparency</h3>
            <p>Ensure that your feedback is heard and considered by the management.</p>
          </div>
          <div className="feature">
            <h3>Improvement</h3>
            <p>Help us continuously improve the quality of food and service.</p>
          </div>
          <div className="feature">
            <h3>Engagement</h3>
            <p>Be a part of creating a better dining experience for everyone.</p>
          </div>
        </div>
      </section>

      
      {/* About Section */}
      <section className="about-section">
        <h2>About the Feedback System</h2>
        <p>
          The College Mess Feedback System is designed to gather opinions and suggestions
          from students regarding the quality of food, hygiene, and overall service of the
          mess. Your feedback plays a crucial role in making informed decisions to ensure 
          satisfaction for all.
        </p>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2024 RGUKT ONGOLE Mess Feedback System. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
};

export default Home;

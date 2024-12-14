import React from 'react';
import './Home.css';
import Header from '../Header/Header';
import MenuTable from './MenuTable';
import { Spin } from 'antd';
import Context from '../../context/Context';
import { useContext } from 'react';

const Home = () => {


  const { loading, setLoading, success, error, contextHolder, changeActiveTab} = useContext(Context);



  return (
    
    <Spin tip="Loading...." size='large' spinning={loading}>
    <Header/>
    
    <div className="home-container">
      {/* Header Section */}
      <header className="header-home">
        <h1>College Mess Management System</h1>
        <p>Your voice matters! Share your thoughts to improve our services.</p>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Use the Management System?</h2>
        <div className="features">
          <div className="feature">
            <h3>Smart Planning</h3>
            <p>Automate meal schedules and reduce waste effortlessly.</p>
          </div>
          <div className="feature">
            <h3>User Friendly</h3>
            <p>Simplify dining and improve overall satisfaction.</p>
          </div>
          <div className="feature">
            <h3>Stock Control</h3>
            <p>Track inventory instantly and avoid shortages.</p>
          </div>
        </div>
      </section>

      
      {/* About Section */}
      <section className="about-section">
        <h2>About the Management System</h2>
        <p>
        The RGUKT mess management system simplifies meal planning, inventory tracking, and billing. With real-time updates and streamlined processes, it provides transparency and convenience for both staff and students, fostering a well-organized and hassle-free dining experience within the campus.
        </p>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2024 RGUKT Mess Management System. All rights reserved.</p>
      </footer>
    </div>
    </Spin>
    
  );
};

export default Home;

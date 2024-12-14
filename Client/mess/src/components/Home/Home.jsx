import React from 'react';
import './Home.css';
import Header from '../Header/Header';
import MenuTable from './MenuTable';
import { Spin,Card,Typography,Flex } from 'antd';
import Context from '../../context/Context';
import { useContext } from 'react';
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { Carousel } from 'antd';
import c1 from './c1.webp';
import c2 from './c2.jpeg';
import c3 from './c3.jpeg';
import mess from './mess.webp'
import c4 from './c4.jpeg';
import { FaDotCircle } from 'react-icons/fa';


const {Text}=Typography;

const Home = () => {


  const { loading, setLoading, success, error, contextHolder, changeActiveTab} = useContext(Context);



  return (
    
    <Spin tip="Loading...." size='large' spinning={loading}>
    <Header/>
    
   
    <Carousel infinite autoplay arrows className='my-5' centerMode={true} dots={false} nextArrow={<MdArrowForwardIos color='red' size='large' />} prevArrow={<MdArrowBackIos color='red' size={30} />} >

<div className='home-carousel px-2'>
    <img src={c1} className='mx-3' />
</div>
<div className='home-carousel px-2'>
    <img src={c2} className='mx-3' />
</div>
<div className='home-carousel px-2'>
    <img src={c3} className='mx-3' />
</div>
<div className='home-carousel px-2'>
    <img src={c4} className='mx-3' />
</div>
</Carousel>
  <div className='container-fluid'>
   <h1 >Welcome to <b>RGUKT Mess</b></h1>
<Text> Raise Your Complaints At Any time With a Digital Record</Text><br></br>
<Text> Every Complaint matters and valued</Text>
</div>
    <div className="home-container">   
      <Card hoverable>
      <section className="about-section">
        <h2>About the Management System</h2>
        <p>
        The RGUKT mess management system simplifies meal planning, inventory tracking, and billing. With real-time updates and streamlined processes, it provides transparency and convenience for both staff and students, fostering a well-organized and hassle-free dining experience within the campus.
        </p>
      </section>
      </Card>
      <footer className="footer">
        <p>© 2024 RGUKT Mess Management System. All rights reserved.</p>
      </footer>
    </div>
    </Spin>
    
  );
};

export default Home;

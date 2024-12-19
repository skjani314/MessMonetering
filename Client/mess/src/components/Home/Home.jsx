import React,  { useState } from 'react';
import './Home.css';
import Header from '../Header/Header';
import { Spin, Card, Typography, Flex } from 'antd';
import Context from '../../context/Context';
import { useContext } from 'react';
import { MdArrowForwardIos, MdArrowBackIos, MdFeedback, MdTimeline } from "react-icons/md";
import { Carousel } from 'antd';
import c1 from './c1.webp';
import c2 from './girlsmess.jpeg';
import c3 from './dosa.webp';
import c4 from './servers.jpg';
import { IoMdAnalytics } from 'react-icons/io';


const { Text } = Typography;

const Home = () => {

  const [isHovered, setIsHovered] = useState(false);
  const { loading, setLoading, success, error, contextHolder, changeActiveTab } = useContext(Context);

  const headingStyle = {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    fontSize: "2.5rem",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "capitalize",
    textAlign: "center",
    color: isHovered ? "#ff758c" : "#333", // Dynamic color on hover
    background: "linear-gradient(90deg, #ff7eb3, #ff758c)", // Gradient text
    WebkitBackgroundClip: "text", // Clipping background to text
    WebkitTextFillColor: "transparent", // Makes gradient visible
    margin: "20px 0 0 0",
    padding: "10px 20px 0 20px",
    transition: "all 0.3s ease-in-out", // Smooth transitions
    textShadow: isHovered
      ? "2px 2px 10px rgba(255, 117, 140, 0.5)" // Larger shadow on hover
      : "1px 1px 5px rgba(0, 0, 0, 0.2)", // Subtle shadow by default
    transform: isHovered ? "scale(1.05)" : "scale(1)", // Slight scaling on hover
    cursor: "pointer", // Pointer cursor for interactivity
  };

  


  return (

    <Spin tip="Loading...." size='large' spinning={loading}>
      <Header />
      <h1 style={headingStyle}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true
      onMouseLeave={() => setIsHovered(false)}>Welcome to <b>RGUKT MESS</b></h1>

      <Carousel infinite autoplay arrows className='my-4 mb-5' centerMode={true} dots={false} nextArrow={<MdArrowForwardIos color='red' size='large' />} prevArrow={<MdArrowBackIos color='red' size={30} />} >

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
      
      <div className="home-container">
        <h2 style={{
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#003366",
                      textAlign: "center",
                      textTransform: "capitalize",
                      margin: "20px 0",
                      paddingBottom: "5px",
                      borderBottom: "2px solid #0066cc",
                      letterSpacing: "1px",
                      lineHeight: "1.5",
                      
                    }}>Mess Monitoring Application</h2>
        <Flex vertical>
          <Card hoverable style={{ background: '#E0F7FA', margin: '3%' }} >

            <Flex vertical >
              <IoMdAnalytics size={50} color='#9e2021' ></IoMdAnalytics>
              <Text style={{ fontSize: 20 }} > <b>Analytics</b></Text>
              <Text >Admin Dashboard with statistices like monthlywise complaint bargraphs and categorywise complaints</Text>
            </Flex>

          </Card>
          <Card hoverable style={{ background: '#FFF9CC', margin: '3%' }} >

            <Flex vertical >
              <MdFeedback size={50} color='#9e2021' ></MdFeedback>
              <Text style={{ fontSize: 20 }} > <b>Complaints</b></Text>
              <Text >
                Any Student Can Raise Complaints at any time and can attach images also and every complaint is digitally recorded and retrieved when needed and help in making dashboard statistics

              </Text>
            </Flex>

          </Card>
          <Card hoverable style={{ background: '#FDE2E4', margin: '3%' }} >

            <Flex vertical >
              <MdTimeline size={50} color='#9e2021' ></MdTimeline>
              <Text style={{ fontSize: 20 }} > <b>Timeline</b></Text>
              <Text >
            Every complaint has Timeline to track ehen complaint is lodged and when complaint acknowledeg and resolved
              </Text>
            </Flex>

          </Card>
        </Flex>



        <footer className="footer">
          <p>© 2024 RGUKT Mess Management System. All rights reserved.</p>
        </footer>
      </div>
    </Spin>

  );
};

export default Home;
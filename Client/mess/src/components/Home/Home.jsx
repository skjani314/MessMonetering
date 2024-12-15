import React from 'react';
import './Home.css';
import Header from '../Header/Header';
import MenuTable from './MenuTable';
import { Spin, Card, Typography, Flex } from 'antd';
import Context from '../../context/Context';
import { useContext } from 'react';
import { MdArrowForwardIos, MdArrowBackIos, MdFeedback, MdTimeline } from "react-icons/md";
import { Carousel } from 'antd';
import c1 from './c1.webp';
import c2 from './c2.jpeg';
import c3 from './c3.jpeg';
import mess from './mess.webp'
import c4 from './c4.jpeg';
import { FaArrowRight, FaDotCircle, FaUser } from 'react-icons/fa';
import { IoMdAnalytics } from 'react-icons/io';


const { Text } = Typography;

const Home = () => {


  const { loading, setLoading, success, error, contextHolder, changeActiveTab } = useContext(Context);



  return (

    <Spin tip="Loading...." size='large' spinning={loading}>
      <Header />


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
        <h1 >Welcome to <b>RGUKT MESS</b></h1>
        <div className='container-fluid-para'>
        <Text style={{color:'white'}}> <FaArrowRight></FaArrowRight>  Raise Your Complaints At Any time With a Digital Record</Text><br></br>
        <Text style={{color:'white'}}> <FaArrowRight></FaArrowRight>  Every Complaint matters and valued</Text>
        </div>
      </div>
      <div className="home-container">
        <h1 style={{ margin: "2%" }}>Mess Monitoring Application</h1>
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
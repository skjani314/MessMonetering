import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../Header/Header";
import { Spin, Card, Typography } from "antd";
import Context from "../../context/Context";
import { useContext } from "react";
import { MdArrowForwardIos, MdArrowBackIos, MdFeedback, MdTimeline } from "react-icons/md";
import { Carousel } from "antd";
import c1 from "./c1.webp";
import c2 from "./girlsmess.jpeg";
import c3 from "./meals.jpg";
import c4 from "./servers.jpg";
import { IoMdAnalytics } from "react-icons/io";

const { Text } = Typography;

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { loading, setLoading, success, error, contextHolder, changeActiveTab,} = useContext(Context);


  
  const headingStyle = {
    fontFamily: 'Times New Roman, Times, serif',
    fontSize: "2.5rem",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "capitalize",
    textAlign: "center",
    color: isHovered ? "#b22222" : "#b22222", // Dynamic color on hover
    background: "linear-gradient(to right,rgb(220, 20, 20),rgb(228, 21, 21))", // Gradient text
    WebkitBackgroundClip: "text", // Clipping background to text
    WebkitTextFillColor: "transparent", // Makes gradient visible
    margin: "5px 0 5px 0",
    padding: "10px 20px 0 20px",
    transition: "all 0.3s ease-in-out", // Smooth transitions
    textShadow: isHovered
      ? "2px 2px 10px rgba(255, 109, 109, 0.5)" // Larger shadow on hover
      : "1px 1px 5px rgba(0, 0, 0, 0.2)", // Subtle shadow by default
    transform: isHovered ? "scale(1.05)" : "scale(1)", // Slight scaling on hover
    cursor: "pointer", // Pointer cursor for interactivity
};
  
  

  return (
    <div>
      <Spin tip="Loading...." size="large" spinning={loading}>
        <Header />
        <h1
          style={headingStyle}
          onMouseEnter={() => setIsHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsHovered(false)}
        >
          Welcome to <b>RGUKT MESS</b>
        </h1>

        <Carousel
          infinite
          autoplay
          arrows
          className="my-4 mb-5"
          centerMode={true}
          dots={false}
          nextArrow={<MdArrowForwardIos color="red" size="large" />}
          prevArrow={<MdArrowBackIos color="red" size={30} />}
        >
          <div className="home-carousel px-2">
            <img src={c1} className="mx-3" alt="Carousel 1" />
          </div>
          <div className="home-carousel px-2">
            <img src={c2} className="mx-3" alt="Carousel 2" />
          </div>
          <div className="home-carousel px-2">
            <img src={c3} className="mx-3" alt="Carousel 3" />
          </div>
          <div className="home-carousel px-2">
            <img src={c4} className="mx-3" alt="Carousel 4" />
          </div>
        </Carousel>
        

        <div className="home-container">
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "24px",
              fontWeight: "600",
              color: "#000000",
              textAlign: "center",
              textTransform: "capitalize",
              margin: "20px 0",
              paddingBottom: "5px",
              borderBottom: "1px solid rgb(168, 173, 178)",
              letterSpacing: "1px",
              lineHeight: "1.5",
            }}
          >
            Mess Monitoring System
          </h2>
          <div className="flex-container">
            <Card hoverable style={{ background: "linear-gradient(to right, #E0F7FA, #4DD0E1)",boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)", margin: "3%" ,marginBottom:"18px"}}>
              <div className="flex-column">
                <IoMdAnalytics size={40} color="#b22222" style={{marginRight:"10px"}}/>
                <Text style={{ fontSize: 20 }}>
                  <b>Analytics</b>
                </Text>
                <br/>
                <Text>It have a Bargraph showing monthly wise raised complaints and a piechart showing category wise complaints of current month</Text>
              </div>
            </Card>
            <Card hoverable style={{ background: "linear-gradient(to right, #FFF9CC, #FFE77A)",boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)", margin: "3%", marginBottom:"18px" }}>
              <div className="flex-column">
                <MdFeedback size={40} color="#b22222" style={{marginRight:"10px"}} />
                <Text style={{ fontSize: 20 }}>
                  <b>Complaints</b>
                </Text>
                <br/>
                <Text>
                  Any Student Can Raise Complaints at any time and can attach images also and every complaint is digitally recorded.
                </Text>
              </div>
            </Card>
            <Card hoverable style={{ background: "linear-gradient(to right, #FDE2E4, #E8B1B4)",boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)", margin: "3%" }}>
              <div className="flex-column">
                <MdTimeline size={40} color="#b22222" style={{marginRight:"10px"}}/>
                <Text style={{ fontSize: 20 }}>
                  <b>Timeline</b>
                </Text>
                <br/>
                <Text>
                  Every complaint has Timeline to track when complaint is lodged and when complaint acknowledged and resolved.
                </Text>
              </div>
            </Card>
          </div>

          <footer className="footer mt-3 pb-1">
            <p>© 2024 RGUKT Mess Management System. All rights reserved.</p>
          </footer>
        </div>
      </Spin>
    </div>
  );
};

export default Home;

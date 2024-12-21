import React, { useEffect, useState } from 'react';
import { useContext } from "react"
import { Spin, Row, Col, Flex, Typography } from "antd";
import Header from '../../components/Header/Header';
import Sidebar from '../../components/sidebar/SideBar';
import Context from '../../context/Context';
import { FaPills, FaSquareFull } from 'react-icons/fa';
import axios from 'axios';
import { GiConsoleController } from 'react-icons/gi';
import BarGraph from '../../components/graphs/BarGraph';
import InventoryChart from '../../components/graphs/Inventory';

const { Text } = Typography;
const CoordinatorDashboard = props => {
    const [isHovered, setIsHovered] = useState(false);
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
        margin: "5px 0 5px 0",
        padding: "10px 20px 0 20px",
        transition: "all 0.3s ease-in-out", // Smooth transitions
        textShadow: isHovered
          ? "2px 2px 10px rgba(255, 117, 140, 0.5)" // Larger shadow on hover
          : "1px 1px 5px rgba(0, 0, 0, 0.2)", // Subtle shadow by default
        transform: isHovered ? "scale(1.05)" : "scale(1)", // Slight scaling on hover
        cursor: "pointer", // Pointer cursor for interactivity
    };
    const { loading, setLoading, success, error, contextHolder, changeActiveTab, user } = useContext(Context);

    const [graph_data, setGraph] = useState([]);
    const [pie_data, setPieData] = useState([{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }]);
    useEffect(() => {
        changeActiveTab('DASHBOARD');

    }, [])

    useEffect(() => {

        const fun = async () => {
setLoading(true)
            try {

                const result = await axios.get(import.meta.env.VITE_API_URL + '/dashboard', { withCredentials: true });
                console.log(result)
                setGraph(result.data.monthlyRaisedCounts)
                setPieData(result.data.categoryWiseCounts)

            }
            catch (err) {
                console.log(err);
                error("Unable to get data")

            }
            setLoading(false)

        }

        if (user) { fun() }

    }, [])




    return (
        <>
            {contextHolder}
            <Spin tip="Loading...." size='large' spinning={loading}>
                <div className="home-container">
                    <div className="home-header-sidebar"><Header /></div>

                    <div className="header-down">
                        <div className="sidebar-container">
                            <Sidebar />
                        </div>
                        <div className="main-content">
                        <h1
                        style={headingStyle}
                        onMouseEnter={() => setIsHovered(true)} // Set hover state to true
                        onMouseLeave={() => setIsHovered(false)}
                        >
                        Dashboard
                        </h1>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                
                                <h2
                                    style={{
                                        fontFamily: "'Roboto', sans-serif",
                                        fontSize: "24px",
                                        fontWeight: "600",
                                        color: "#003366",
                                        textAlign: "center",
                                        textTransform: "capitalize",
                                        margin: "10px 0 20px 0",
                                        paddingBottom: "10px",
                                        borderBottom: "2px solid #0066cc",
                                        letterSpacing: "1px",
                                        lineHeight: "1.5",
                                    }}
                                    >
                                        Monthlywise Complaints
                                    </h2>

                                    <BarGraph data={graph_data} />
                                </Col>
                                <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                
                                <h2
                                    style={{
                                        fontFamily: "'Roboto', sans-serif",
                                        fontSize: "24px",
                                        fontWeight: "600",
                                        color: "#003366",
                                        textAlign: "center",
                                        textTransform: "capitalize",
                                        margin: "10px 0 20px 0",
                                        paddingBottom: "10px",
                                        borderBottom: "2px solid #0066cc",
                                        letterSpacing: "1px",
                                        lineHeight: "1.5",
                                    }}
                                    >
                                        Complaints by Category
                                    </h2>

                                    <Flex vertical gap={10}  >
                                        <InventoryChart data={pie_data} />
                                        <Flex wrap gap={10}>
                                            <Text><FaSquareFull color='#FFBB28' /> <b>Service Quality</b></Text>
                                            <Text><FaSquareFull color='#0088FE' /> <b>Food Quality</b></Text>
                                            <Text><FaSquareFull color='#00C49F' /> <b>Cleanliness</b></Text>
                                            <Text><FaSquareFull color='blue' /> <b>Others</b></Text>
                                        </Flex>
                                    </Flex>
                                </Col>
                            </Row>



                        </div>
                    </div>

                </div>
            </Spin>
        </>

    );
};


export default CoordinatorDashboard;
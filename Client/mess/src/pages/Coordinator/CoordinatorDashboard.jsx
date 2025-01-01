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
import ViewTable from '../../components/Tables/ViewTable';


const { Text } = Typography;
const CoordinatorDashboard = props => {

    const headingStyle = {
        fontFamily: 'Times New Roman, Times, serif',
        fontSize: "2.2rem",
        fontWeight: 700,
        letterSpacing: "1px",
        textAlign: "center",
        color: "#b22222",
        margin: "20px 0 0 10px",
    };
    const { loading, setLoading, success, error, contextHolder, changeActiveTab, user } = useContext(Context);
    const [data, setData] = useState([])
    const [tabledata, setTabledata] = useState([]);
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
                console.log(result.data.data)
                const data = result.data.data.map((each) => {
                    const { time, user_details } = each;

                    return { time, ...each, user_details }

                })
                setData(data);

                const tabledata = data.map((each) => {

                    const { _id, category, time, des, user_details } = each;


                    return { category, date: time[0].date.split('T')[0], complaint: des.slice(0, 50), status: time[0].status, id: _id, user_details }

                })
                console.log(tabledata)
                setTabledata(tabledata)



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
                                Recurrent Complaints
                            </h2>
                            {
                                tabledata.length>0?
                            <ViewTable rowsData={tabledata} data={data} />
                            :  <div style={{ minHeight: 300, width: "100%" }} className='mt-5' >
                            <h1 className='text-center'>
                              No Reccurent Complaints are There
                            </h1>
                          </div>

                            }

                        </div>
                    </div>

                </div>
            </Spin>
        </>

    );
};


export default CoordinatorDashboard;
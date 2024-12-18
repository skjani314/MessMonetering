// import React from 'react'
// import Header from '../../components/Header/Header'
// import ComplaintsTable from '../../components/Student/ComplaintsTable'

// function Student() {
//   return (
//     <div>
//       <Header/>
//       <ComplaintsTable/>
//     </div>
//   )
// }

// export default Student


import React, { useEffect, useState } from 'react';
import { useContext } from "react"
import { Spin, Row, Col, Flex, Typography } from "antd";
import Header from '../../components/Header/Header';
import StudentSidebar from '../../components/sidebar/StudentSideBar';
import MenuTable from '../../components/Home/MenuTable';
import Context from '../../context/Context';
import { FaPills, FaSquareFull } from 'react-icons/fa';
import axios from 'axios';
import { GiConsoleController } from 'react-icons/gi';
import BarGraph from '../../components/graphs/BarGraph';
import InventoryChart from '../../components/graphs/Inventory';

const { Text } = Typography;
const Student = props => {


    const { loading, setLoading, success, error, contextHolder, changeActiveTab, user } = useContext(Context);

    const [graph_data, setGraph] = useState([]);
    const [pie_data, setPieData] = useState([{ count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }]);
    useEffect(() => {
        changeActiveTab('DASHBOARD');

    }, [])

    useEffect(() => {

        const fun = async () => {

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
                            <StudentSidebar />
                        </div>
                        <div>
                        <h2
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#003366",
                      textAlign: "start",
                      textTransform: "capitalize",
                      margin: "20px 0",
                      padding: "10px",
                      
                      letterSpacing: "1px",
                      
                    }}
                  >
                      Hi Welcome, {user.name}
                  </h2>
                        </div>
                        <div>
                        <h2
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#003366",
                      textAlign: "center",
                      textTransform: "capitalize",
                      margin: "20px 0",
                      paddingBottom: "10px",
                      borderBottom: "2px solid #0066cc",
                      letterSpacing: "1px",
                      lineHeight: "1.5",
                    }}
                  >
                      Mess Menu
                  </h2>
                    <MenuTable/>
                  </div>
                    </div>

                </div>
            </Spin>
        </>

    );
};


export default Student;
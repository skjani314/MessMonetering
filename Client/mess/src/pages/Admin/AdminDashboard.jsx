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
import AdminSidebar from '../../components/sidebar/AdminSidebar';

const { Text } = Typography;
const AdminDashBoard = props => {


    const { loading, setLoading, success, error, contextHolder, changeActiveTab ,user} = useContext(Context);

const [graph_data,setGraph]=useState([]);
const [pie_data,setPieData]=useState([{count:0},{count:0},{count:0},{count:0}]);
    useEffect(() => {
        changeActiveTab('DASHBOARD');

    }, [])

useEffect(()=>{

const fun=async ()=>{

try{

const result=await axios.get(import.meta.env.VITE_API_URL+'/dashboard',{withCredentials:true});
console.log(result)
setGraph(result.data.monthlyRaisedCounts)
setPieData(result.data.categoryWiseCounts)

}
catch(err){
console.log(err);
error("Unable to get data")

}
}

if(user){fun()}

},[])




    return (
        <>
            {contextHolder}
            <Spin tip="Loading...." size='large' spinning={loading}>
                <div className="home-container">
                    <div className="home-header-sidebar"><Header /></div>

                    <div className="header-down">
                        <div className="sidebar-container">
                            <AdminSidebar />
                        </div>
                        <div className="main-content">
                            <h1 >Dashboard</h1>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <h2>Monthlywise Complaints</h2>

                                    <BarGraph data={graph_data} />
                                </Col>
                                <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <h2>Current Month Categorywise Complaints</h2>

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


export default AdminDashBoard;
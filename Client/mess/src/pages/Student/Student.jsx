import React, { useEffect, useState } from 'react';
import { useContext } from "react"
import { Spin, Row, Col, Flex, Typography } from "antd";
import Header from '../../components/Header/Header';
import StudentSidebar from '../../components/sidebar/StudentSidebar';
import MenuTable from '../../components/Home/MenuTable';
import Context from '../../context/Context';
import axios from 'axios';


const Student = props => {


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
                        <StudentSidebar />
                    </div>
                    <div className="main-content">
                        <MenuTable/>
                    </div>
                </div>

            </div>
        </Spin>
    </>

        

    );
};


export default Student;
import React, { useEffect, useState } from 'react';
import { useContext } from "react"
import { Spin, Row, Col, Flex, Typography } from "antd";
import Header from '../../components/Header/Header';
import StudentSidebar from '../../components/sidebar/StudentSidebar';
import MenuTable from '../../components/Home/MenuTable';
import Context from '../../context/Context';


const Student = props => {


    const { loading, setLoading, success, error, contextHolder, changeActiveTab, user } = useContext(Context);

    useEffect(() => {
        changeActiveTab('DASHBOARD');

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
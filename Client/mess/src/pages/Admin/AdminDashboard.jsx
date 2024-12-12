import React, { useEffect } from 'react';
import { useContext } from "react"
import { Spin } from "antd";
import Header from '../../components/Header/Header';
import Context from '../../context/Context';
import AdminSidebar from '../../components/sidebar/AdminSidebar';

const AdminDashboard = props => {
    

    const { loading, setLoading, success, error, contextHolder, changeActiveTab} = useContext(Context);


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
                        <AdminSidebar />
                    </div>
                    <div className="main-content">
dashboard
                    </div>
                </div>

            </div>
        </Spin>
    </>

    );
};



export default AdminDashboard;
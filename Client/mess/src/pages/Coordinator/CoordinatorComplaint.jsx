import React, { useEffect } from 'react';
import { useContext } from "react"
import { Spin } from "antd";
import Header from '../../components/Header/Header';
import Sidebar from '../../components/sidebar/SideBar';
import Context from '../../context/Context';
import ComplaintsTable from '../../components/Coordinator/ComplaintsTable'


const CoordinatorComplaint = props => {


    const { loading, setLoading, success, error, contextHolder, changeActiveTab} = useContext(Context);


    useEffect(() => {
        changeActiveTab('COMPLAINT');

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
                    <h1 >Raise Complaint</h1>
                        <ComplaintsTable/>
                    </div>
                </div>

            </div>
        </Spin>
    </>
        
    );
};


export default CoordinatorComplaint;
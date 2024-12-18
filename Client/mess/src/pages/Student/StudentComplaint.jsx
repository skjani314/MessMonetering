import React, { useEffect } from 'react';
import { useContext } from "react"
import { Spin } from "antd";
import Header from '../../components/Header/Header';
import StudentSidebar from '../../components/sidebar/StudentSidebar';
import Context from '../../context/Context';
import ComplaintsTable from '../../components/Student/ComplaintsTable'


const StudentComplaint = props => {


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
                        <StudentSidebar />
                    </div>
                    <div className="main-content">
                        <ComplaintsTable/>
                    </div>
                </div>

            </div>
        </Spin>
    </>
        
    );
};


export default StudentComplaint;
import React, { useEffect } from 'react';
import { useContext } from "react"
import { Spin } from "antd";
import Header from '../../components/Header/Header';
import StudentSidebar from '../../components/sidebar/StudentSideBar';
import Context from '../../context/Context';
import Profile from '../../components/Profile/Profile';



const StudentProfile = props => {


    const { loading, setLoading, success, error, contextHolder, changeActiveTab,user} = useContext(Context);


    useEffect(() => {
        changeActiveTab('PROFILE');

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
                    <h1 >Personal Profile</h1>
                        
                        <Profile />
                    </div>
                </div>

            </div>
        </Spin>
    </>
        
    );
};


export default StudentProfile;
import React, { useEffect } from 'react';
import { useContext } from "react"
import { Spin } from "antd";
import Header from '../../components/Header/Header';
import StudentSidebar from '../../components/sidebar/StudentSidebar';
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
                    
                    <div>
        <h2
            style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: "24px",
                fontWeight: "600",
                color: "#003366",
                textAlign: "center",
                textTransform: "capitalize",
                margin: "15px 0 20px 0",
                paddingBottom: "10px",
                borderBottom: "2px solid #0066cc",
                letterSpacing: "1px",
                lineHeight: "1.5",
            }}
        >
            Personal Profile 
        </h2>
                    </div>
                        <Profile />
                    </div>
                </div>

            </div>
        </Spin>
    </>
        
    );
};


export default StudentProfile;
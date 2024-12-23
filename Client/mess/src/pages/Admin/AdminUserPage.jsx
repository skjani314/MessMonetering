import React, { useEffect } from 'react';
import { useContext, useState } from "react"
import { Spin, Button, Modal, Form, Input, Select, Dropdown, Space, Flex, Upload, DatePicker, Typography } from "antd";
import Header from '../../components/Header/Header';
import Context from '../../context/Context';
import AdminSidebar from '../../components/sidebar/AdminSidebar';
import axios from 'axios';
const { Option } = Select;
import AdminUser from '../../components/User/AdminUser';
import { useLocation } from 'react-router-dom';

const AdminUserPage = props => {
    const { loading, setLoading, success, error, contextHolder, changeActiveTab, user } = useContext(Context);
    const [search_value, setSearchValue] = useState("");
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
   const param=searchParams.get('id')





    return (
        <>
            {contextHolder}
            <Spin tip="Loading...." size='large' spinning={loading}>
                <div className="home-container">
                    <div className="home-header-sidebar">
                    <Header
                            search_value={search_value}
                            setSearchValue={setSearchValue}
                            placeHolder={"Search Student"}
                        />                    
                    </div>

                    <div className="header-down">
                        <div className="sidebar-container">
                            <AdminSidebar  />
                        </div>
                        <div className="main-content">
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
                                User Management
                            </h2>


                            <AdminUser param={param}  />
                        </div>
                    </div>

                </div>
            </Spin>
        </>
    );
};



export default AdminUserPage;
import React, { useEffect } from 'react';
import { useContext } from "react"
import { Spin } from "antd";
import Header from '../../components/Header/Header';
import Context from '../../context/Context';
import AdminSidebar from '../../components/sidebar/AdminSidebar';
import axios from 'axios';

const AdminStudent = props => {
    

    const { loading, setLoading, success, error, contextHolder, changeActiveTab,user} = useContext(Context);

    useEffect(() => {
        changeActiveTab('STUDENT');

    }, [])

useEffect(()=>{


const fun=async ()=>{

try{


const result =await axios.get(import.meta.env.VITE_API_URL+'/admin-complaints?role=student',{withCredentials:true});

console.log(result)
}
catch(err){
    console.log(err);
}
}

if(user)fun();

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
                        <h1>Student Complaints</h1>
                          
                    </div>
                </div>

            </div>
        </Spin>
    </>

    );
};



export default AdminStudent;
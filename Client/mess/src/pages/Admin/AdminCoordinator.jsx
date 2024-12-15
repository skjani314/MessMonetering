import React, { useEffect ,useState} from 'react';
import { useContext } from "react"
import { Spin } from "antd";
import Header from '../../components/Header/Header';
import Context from '../../context/Context';
import AdminSidebar from '../../components/sidebar/AdminSidebar';
import ViewTable from '../../components/Tables/ViewTable';
import axios from 'axios';
const AdminCoordinator = props => {
    

    const { loading, setLoading, success, error, contextHolder, changeActiveTab,user} = useContext(Context);
    const [data,setData]=useState([])

    const [tabledata,setTabledata]=useState([]);

    useEffect(() => {
        changeActiveTab('COORDINATOR');

    }, [])


    useEffect(()=>{


        const fun=async ()=>{
        
        try{
        
        
        const result =await axios.get(import.meta.env.VITE_API_URL+'/admin-complaints?role=coordinator',{withCredentials:true});
        
        console.log(result)
        const data=result.data.map((each)=>{
            const {time,_doc,user_details}=each;
            
            return {time,..._doc,user_details}
            
            })
            setData(data);
            
            const tabledata=data.map((each)=>{
            
              const {_id,category,time,des,user_details}=each;
            
            
              return {category,date:time[0].date.split('T')[0],complaint:des.slice(0,50),status:time[0].status,id:_id,user_details}
            
            })
            console.log(tabledata)
            setTabledata(tabledata)
        }
        catch(err){
            console.log(err);
        }
        }
        
        if(user)fun();
        
        },[user])
        




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
                        <h1 className='mb-2'>Representatives Complaints</h1>
                    <ViewTable rowsData={tabledata} data={data} />

                    </div>
                </div>

            </div>
        </Spin>
    </>

    );
};



export default AdminCoordinator;
import React, { useEffect } from 'react';
import { useContext, useState } from "react"
import { Spin, Button, Modal, Form, Input, Select, Dropdown, Space, Flex, Upload, DatePicker, Typography } from "antd";
import Header from '../../components/Header/Header';
import Context from '../../context/Context';
import AdminSidebar from '../../components/sidebar/AdminSidebar';
import axios from 'axios';
import ViewTable from '../../components/Tables/ViewTable';
const { Option } = Select;
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { MdOutlineClear } from "react-icons/md";


const { Text } = Typography
const AdminStudent = props => {


    const { loading, setLoading, success, error, contextHolder, changeActiveTab, user,socket } = useContext(Context);
    const [data, setData] = useState([])
    const [datseRange, setdatesrange] = useState({ start: '', end: '' });
    const [status_cat, setStatusCat] = useState({ status: "Select a status", category: "Select a category" });

    const [tabledata, setTabledata] = useState([]);


    const handleDatessubmit = async () => {
          setLoading(true)
        try {

            const result = await axios.get(import.meta.env.VITE_API_URL + '/admin-complaints?role=' + 'student' + '&status=' + status_cat.status + "&category=" + status_cat.category + "&start=" + datseRange.start + "&end=" + datseRange.end, { withCredentials: true });
            console.log(result)
            const data = result.data.map((each) => {
                const { time, _doc, user_details } = each;

                return { time, ..._doc, user_details }

            })
            setData(data);

            const tabledata = data.map((each) => {

                const { _id, category, time, des, user_details } = each;


                return { category, date: time[0].date.split('T')[0], complaint: des.slice(0, 50), status: time[0].status, id: _id, user_details }

            })
            console.log(tabledata)
            setTabledata(tabledata)
        }
        catch (err) {
            console.log(err);
            error("something went wrong")
        }
   setLoading(false)

    }


    useEffect(() => {
        changeActiveTab('STUDENT');

    }, [])

    useEffect(() => {


        const fun = async () => {
setLoading(true)
            try {


                const result = await axios.get(import.meta.env.VITE_API_URL + '/admin-complaints?role=' + 'student' + '&status=' + status_cat.status + "&category=" + status_cat.category + "&start=" + datseRange.start + "&end=" + datseRange.end, { withCredentials: true });

                console.log(result)
                const data = result.data.map((each) => {
                    const { time, _doc, user_details } = each;

                    return { time, ..._doc, user_details }

                })
                setData(data);

                const tabledata = data.map((each) => {

                    const { _id, category, time, des, user_details } = each;


                    return { category, date: time[0].date.split('T')[0], complaint: des.slice(0, 50), status: time[0].status, id: _id, user_details }

                })
                console.log(tabledata)
                setTabledata(tabledata)
            }
            catch (err) {
                console.log(err);
            }
            setLoading(false)
        }

        if (user) fun();

        socket.on('dataChanged', () => {
            console.log('Data changed, re-fetching...');
            fun(); // Re-fetch data when an update occurs
          });
      
          return () => {
            socket.off('dataChanged');
          };



    }, [user])








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
                                    Student Complaints
                                </h2>
                            <Text><b>Filter</b></Text>
                            <Flex style={{overflowX:"scroll"}} gap={10} justify="inline" className="mb-3">
                                <Dropdown menu={{ items: [{ key: "Service quality", label: "Service quality" }, { key: "Cleanliness", label: "Cleanliness" }, { key: "Food quality", label: "Food quality" }, { key: "Others", label: "Others" }], onClick: ({ key }) => { setStatusCat(prev => ({ ...prev, category: key })) } }}>
                                    <Button>
                                        <Space>
                                            {
                                                status_cat.category == "Select a category" ?
                                                    <Text disabled>{status_cat.category}
                                                        <DownOutlined /></Text>
                                                    :
                                                    <Text >{status_cat.category}
                                                        <MdOutlineClear className="mx-2" onClick={() => setStatusCat(prev => ({ ...prev, category: "Select a category" }))} />
                                                    </Text>
                                            }
                                        </Space>
                                    </Button>
                                </Dropdown>
                                <Dropdown menu={{ items: [{ key: "progress", label: "Progress" }, { key: "acknowledged", label: "Acknowledged" }, { key: "resolved", label: "Resolved" }], onClick: ({ key }) => { setStatusCat(prev => ({ ...prev, status: key })) } }}>
                                    <Button>
                                        <Space>
                                            {
                                                status_cat.status == "Select a status" ?
                                                    <Text disabled>{status_cat.status}
                                                        <DownOutlined /></Text>
                                                    :
                                                    <Text >{status_cat.status}
                                                        <MdOutlineClear className="mx-2" onClick={() => setStatusCat(prev => ({ ...prev, status: "Select a status" }))} /></Text>
                                            }
                                        </Space>
                                    </Button>
                                </Dropdown>
                                <DatePicker style={{ minWidth: '150px' }} placeholder="select Start Date" onChange={(e, s) => { setdatesrange((prev) => ({ ...prev, start: s })) }} />
                                <DatePicker style={{ minWidth: '150px' }} placeholder="select End Date" onChange={(e, s) => { setdatesrange((prev) => ({ ...prev, end: s })) }} />
                                <Button onClick={handleDatessubmit} type="primary">Submit</Button>
                            </Flex>

                            <ViewTable rowsData={tabledata} data={data} />

                        </div>
                    </div>

                </div>
            </Spin>
        </>

    );
};



export default AdminStudent;
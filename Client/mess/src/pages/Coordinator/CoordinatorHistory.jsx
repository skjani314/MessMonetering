import React, { useEffect, useState } from 'react';
import { useContext } from "react"
import {Button,   Select, Dropdown,Space, Spin,Flex, Upload, DatePicker,Typography } from "antd";
import Header from '../../components/Header/Header';
import Sidebar from '../../components/sidebar/SideBar';
import Context from '../../context/Context';
import ViewTable from '../../components/Tables/ViewTable';
import axios from 'axios';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { MdOutlineClear } from "react-icons/md";
const { Option } = Select;


const {Text}=Typography;
const CoordinatorHistory = props => {


    const { loading, setLoading, success, error, contextHolder, user, changeActiveTab } = useContext(Context);
    const [data, setData] = useState([])
    const [datseRange, setdatesrange] = useState({ start: '', end: '' });
    const [status_cat, setStatusCat] = useState({ status: "Select a status", category: "Select a category" });

    const [tabledata, setTabledata] = useState([]);
    useEffect(() => {
        changeActiveTab('HISTORY');

    }, [])

    const handleDatessubmit = async () => {
        setLoading(true)

        try {

            const result = await axios.get(import.meta.env.VITE_API_URL + '/complaint?level=' + 1 + '&status=' + status_cat.status + "&category=" + status_cat.category + "&start=" + datseRange.start + "&end=" + datseRange.end)
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

        const fun = async () => {

            setLoading(true)

            try {

                const result = await axios.get(import.meta.env.VITE_API_URL + '/complaint?level=' + 1 + '&status=' + status_cat.status + "&category=" + status_cat.category + "&start=" + datseRange.start + "&end=" + datseRange.end)
                console.log(result);
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
        if (user) {
            fun()
        }
    }, [user])



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

                                <Text>Filter</Text>
                            <Flex wrap gap={10} justify="inline" className="my-3">
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
                                <DatePicker placeholder="select Start Date" onChange={(e, s) => { setdatesrange((prev) => ({ ...prev, start: s })) }} />
                                <DatePicker placeholder="select End Date" onChange={(e, s) => { setdatesrange((prev) => ({ ...prev, end: s })) }} />
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


export default CoordinatorHistory;
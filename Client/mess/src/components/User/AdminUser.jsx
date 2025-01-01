import React from 'react';
import { useEffect, useContext, useState } from 'react';
import { Table, Button, Modal, Form, Card, Select, Dropdown, Space, Spin, Flex, Upload, DatePicker, Typography, Avatar } from "antd";
import { FaEdit, FaPlus, FaTrash, FaUpload } from 'react-icons/fa';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import xlDemo from './student.png';
import Context from '../../context/Context';
import ViewTable from '../Tables/ViewTable';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { MdOutlineClear } from "react-icons/md";


const { Text } = Typography;
const AdminUser = props => {
    const [student_form, setStudentForm] = useState({ bulk: false, single: false });
    const { loading, setLoading, success, error, changeActiveTab, user,socket } = useContext(Context);
    const [fileList, setFileList] = useState([]);
    const [formdata, setFormData] = useState({ user_id: '', name: '', email: '', role: '', designation: '' });
    const [deleteForm, setDeleteForm] = useState({ batch: '', flag: false });
    const [data, setData] = useState([]);
    const [tabledata, setTabledata] = useState([]);
    const [datseRange, setdatesrange] = useState({ start: '', end: '' });
    const [status_cat, setStatusCat] = useState({ status: "Select a status", category: "Select a category" });
    const [stu_details, setStudetails] = useState(null);
    const [roleUpdate, setRoleUpdate] = useState({ flag: false, role: "Select a Role" });




    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };
    useEffect(() => {
        changeActiveTab('USER');
    }, [])

    const handleFormUpload = async () => {

        setLoading(true);

        const form_Data = new FormData();
        fileList.forEach(file => {
            form_Data.append('img', file.originFileObj);
        });

        if (!student_form.bulk) {
            form_Data.append('user_id', formdata.user_id);
            form_Data.append('name', formdata.name);
            form_Data.append('email', formdata.email);
            form_Data.append('role', formdata.role);
            form_Data.append('designation', formdata.designation)
        }
        try {


            const result = await axios.post(import.meta.env.VITE_API_URL + '/student', form_Data, { withCredentials: true });
            console.log(formdata);
            success("Student Added Successfully");
            setFormData((prev) => ({ user_id: '', name: '', email: '', role: '', designation: '' }))
            setFileList([]);
            setStudentForm((prev) => ({ bulk: false, single: false }))
        }
        catch (err) {
            error("something went wrong");
        }
        setLoading(false)





    }
    const handleDelete = async () => {

        setLoading(true);
        try {


            const response = await axios.delete(import.meta.env.VITE_API_URL + '/student?flag=false&batch=' + deleteForm.batch, { withCredentials: true, });
            console.log(response);
            success("Batch Details are Deleted successfully");
        } catch (err) {
            error("something went wrong");
            console.log(err);
        }
        setLoading(false);
    }

    const handleDatessubmit = async () => {
        setLoading(true)

        try {

            const result = await axios.get(import.meta.env.VITE_API_URL + '/complaint?from=' + props.param + '&status=' + status_cat.status + "&category=" + status_cat.category + "&start=" + datseRange.start + "&end=" + datseRange.end,{withCredentials:true})
            console.log(result)
            const data = result.data.map((each) => {
                const { time, _doc } = each;

                return { time, ..._doc }

            })
            setData(data);

            const tabledata = data.map((each) => {

                const { _id, category, time, des } = each;


                return { category, date: time[0].date.split('T')[0], complaint: des.slice(0, 50), status: time[0].status, id: _id }

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


    const handleupdateUser = async () => {
        setLoading(true)
        try {
            if (roleUpdate.role == "Select a Role") {
                error("Select  Valid Role")
            }
            else {

                const form_data = new FormData();
                form_data.append('id', props.param);
                form_data.append('role', roleUpdate.role);
                const result = await axios.put(import.meta.env.VITE_API_URL + '/student', form_data, { withCredentials: true })
                console.log(result)
                success("Updated Successfully")
                setRoleUpdate({ flag: false, role: "Select a Role" })

            }
        } catch (err) {
            console.log(err);
            error("Unable to Update")
        }
        setLoading(false)
    }


    const handleDeleteUser = async () => {

        try {

            console.log(props.param)
            const result = await axios.delete(import.meta.env.VITE_API_URL + '/student?flag=' + 'true&' + 'id=' + props.param,{withCredentials:true})

            console.log(result);
            success("Deleted Successfully")

        }
        catch (err) {

            console.log(err)
            error("unable to Delete The user")
        }




    }



    useEffect(() => {


        const fun = async () => {


            try {
                const stu = await axios.get(import.meta.env.VITE_API_URL + '/user?id=' + props.param,{withCredentials:true})
                setStudetails(stu.data)
                const result = await axios.get(import.meta.env.VITE_API_URL + '/complaint?from=' + props.param + '&status=' + status_cat.status + "&category=" + status_cat.category + "&start=" + datseRange.start + "&end=" + datseRange.end,{withCredentials:true})
                const data = result.data.map((each) => {
                    const { time, _doc } = each;

                    return { time, ..._doc }

                })
                setData(data);

                const tabledata = data.map((each) => {

                    const { _id, category, time, des } = each;


                    return { category, date: time[0].date.split('T')[0], complaint: des.slice(0, 50), status: time[0].status, id: _id }

                })
                console.log(tabledata)
                setTabledata(tabledata)

            }
            catch (err) {
                console.log(err);
            }


        }


        if (props.param) {
            fun();
        }

        socket.on('dataChanged', () => {
            console.log('Data changed, re-fetching...');
            fun(); // Re-fetch data when an update occurs
          });
      
          return () => {
            socket.off('dataChanged');
          };

    }, [props.param])

    return (
        <div>
            <Flex gap={10} justify='end' className='mb-2' wrap>
                <Button onClick={() => { setStudentForm((prev) => ({ ...prev, single: true })) }} ><FaPlus /> Add Student</Button>
                <Button onClick={() => { setStudentForm((prev) => ({ ...prev, bulk: true })) }}><FaUpload /> Upload</Button>
                <Button onClick={() => { setDeleteForm((prev) => ({ ...prev, flag: true })) }}><FaTrash></FaTrash> Delete</Button>
            </Flex>

            {props.param && stu_details ?
                <><h2>Search Result for {stu_details.name}({stu_details.user_id})</h2>
                    <Card hoverable title="User Details">
                        <Flex gap={10}>
                            <Avatar size={150} shape="square" icon={<img src={stu_details.img ? stu_details.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu5GX1lkI6T4INseXlhyZhaGMtq07LNid9Tw&s"} />} />
                            <Flex vertical gap={10}>
                                <Text><b>Name:</b>{stu_details.name}</Text>
                                {stu_details.user_id ?
                                    <Text><b>Student Id:</b>{stu_details.user_id}</Text>
                                    : null
                                }
                                <Text><b>email:</b> {stu_details.email}</Text>
                                <Text><b>Role:</b> {stu_details.role}</Text>
                                <Text><b>Designation:</b> {stu_details.designation}</Text>
                            </Flex>
                        </Flex>
                        <br></br>
                        <Flex gap={10}>
                            <Button danger onClick={handleDeleteUser}  ><FaTrash></FaTrash> Delete</Button>
                            <Button style={{ background: 'yellow' }} onClick={() => setRoleUpdate(prev => ({ ...prev, flag: true }))} ><FaEdit></FaEdit> Update</Button>
                        </Flex>
                    </Card>
                    <br></br>
                    <Text><b>Filter</b></Text>
                    <Flex style={{ overflowX: "scroll" }} gap={10} justify="inline" className="mt-2 my-3 ">
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
                    <ViewTable admin rowsData={tabledata} data={data} />

                </>

                : <Flex justify='center'><img className='p-2 m-2 img-fluid' src="https://thumbs.dreamstime.com/b/no-found-symbol-unsuccessful-search-vecotr-upset-magnifying-glass-cute-not-zoom-icon-suitable-results-oops-page-failure-122786031.jpg"></img></Flex>}

            <Modal open={student_form.single} footer={null} onCancel={() => { setStudentForm((prev) => ({ ...prev, single: false })) }}>
                <Spin tip="Loading...." size='large' spinning={loading}>
                    <h1 className='mt-3'>Add New Student</h1>
                    <TextField className='w-100 m-1' label="Student Id" variant='outlined' value={formdata.user_id} onChange={(e) => { setFormData((prev) => ({ ...prev, user_id: e.target.value })) }} />
                    <TextField className='w-100 m-1' label="Name" variant='outlined' value={formdata.name} onChange={(e) => { setFormData((prev) => ({ ...prev, name: e.target.value })) }} />
                    <TextField className='w-100 m-1' label="Email" variant='outlined' value={formdata.email} onChange={(e) => { setFormData((prev) => ({ ...prev, email: e.target.value })) }} />
                    <TextField className='w-100 m-1' label="Role" variant='outlined' value={formdata.role} onChange={(e) => { setFormData((prev) => ({ ...prev, role: e.target.value })) }} />
                    <TextField className='w-100 m-1' label="designation" variant='outlined' value={formdata.designation} onChange={(e) => { setFormData((prev) => ({ ...prev, designation: e.target.value })) }} />

                    <Flex justify='end'>
                        <Button onClick={handleFormUpload} type='primary'>Submit</Button>

                    </Flex>

                </Spin>
            </Modal>

            <Modal open={student_form.bulk} footer={null} onCancel={() => { setStudentForm((prev) => ({ ...prev, bulk: false })) }}>
                <Spin tip="Loading...." size='large' spinning={loading}>
                    <h1>Add Student In Bulk</h1>
                    <h3>xlsheet Structure</h3>
                    <img className='img-fluid' alt='xlsheet structure' src={xlDemo}></img>

                    <Upload
                        multiple
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={handleUploadChange}
                    >

                        <Button className='mt-1 p-4'><FaUpload /> Upload Data</Button>
                    </Upload>
                    <Flex justify='end'>
                        <Button className='mt-1' type='primary' onClick={handleFormUpload}>Submit</Button>
                    </Flex>
                </Spin>
            </Modal>
            <Modal open={deleteForm.flag} footer={null} onCancel={() => { setDeleteForm((prev) => ({ ...prev, flag: false })) }}>
                <Spin tip="Loading...." size='large' spinning={loading}>
                    <h1>Delete Batch</h1>
                    <TextField label="Batch" className='w-100 m-1 mt-5' placeholder='Enter Batch' variant='outlined' value={deleteForm.batch} onChange={(e) => { setDeleteForm((prev) => ({ ...prev, batch: e.target.value })) }}></TextField>
                    <Flex justify='end'>
                        <Button className='mt-1' type='primary' onClick={handleDelete}>Submit</Button>
                    </Flex>
                </Spin>
            </Modal>

            <Modal open={roleUpdate.flag} footer={null} onCancel={() => { setRoleUpdate({ flag: false, role: '' }) }}>
                <Spin tip="Loading...." size='large' spinning={loading}>
                    <h2>Update Role</h2>
                    <Dropdown menu={{ items: [{ key: "student", label: "Student" }, { key: "coordinator", label: "Co-Ordinator" }], onClick: ({ key }) => { setRoleUpdate(prev => ({ ...prev, role: key })) } }}>
                        <Button>
                            <Space>
                                {
                                    roleUpdate.role == "Select a Role" ?
                                        <Text >{roleUpdate.role}
                                            <DownOutlined /></Text>
                                        :
                                        <Text >{roleUpdate.role}
                                            <MdOutlineClear className="mx-2" onClick={() => setRoleUpdate(prev => ({ ...prev, role: "Select a Role" }))} /></Text>
                                }
                            </Space>
                        </Button>
                    </Dropdown><Flex justify='end'>
                        <Button type='primary' onClick={handleupdateUser}> Update</Button>
                    </Flex>
                </Spin>
            </Modal>
        </div>
    );
};



export default AdminUser;
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Spin, Flex, Modal, Timeline, Typography, Upload } from 'antd'
import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import Context from '../../context/Context';
import { TextField, typographyClasses } from '@mui/material';
import { MdSettingsBackupRestore } from 'react-icons/md';
import { UploadOutlined } from "@ant-design/icons";

const { Text } = Typography;
const ViewTable = props => {


    const { success, error, user, loading, setLoading, setUser } = useContext(Context);
    const [des, setDes] = useState({ image_array: [], user_details: {} ,res_array:[]});
    const [items, setItems] = useState([]);
    const [isModel, setModel] = useState(false);
    const [res_model, setresModel] = useState("");
    const [res_Des, setResDes] = useState("");
    const [fileList, setFileList] = useState([]);
    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };
    const handleClick = async (id) => {

        try {
            setModel(true)
            const data = props.data.filter((each) => each._id === id)
            const complaint = { ...data[0] };

            const item = complaint.time.map((each) => {
                const { date, status } = each;
                let color = "";
                let st_text = "";

                if (status === "progress") {
                    color = "red";
                    st_text = "Lodged"

                } else if (status === "acknowledged") {
                    color = "yellow";
                    st_text = "Acknowledged"

                } else {
                    color = "green";
                    st_text = "Resolved";

                }
                return { children: date.split("T")[0] + " " + st_text, color };
            });

            setItems(item);

            if (complaint.resolved_by) {
                const resolver = await axios.get(
                    `${import.meta.env.VITE_API_URL}/user?id=${complaint.resolved_by}`,
                    { withCredentials: true }
                );
                complaint.resolved_by = resolver.data;
            }

            setDes(complaint); // Update the state with the complaint details
            setLoading(false);
        }
        catch (err) {
            console.log(err);
            error("Unable to show Full Data")
        }




    }



    const resolvedClick = async () => {

        try {


            const form_data = new FormData();
            form_data.append('complaint_id', res_model);
            form_data.append('status', "resolved");
            form_data.append('user_id', user._id);
            form_data.append('des', res_Des);
            fileList.forEach(file => {
                form_data.append('img', file.originFileObj);
            });

            const result = await axios.put(import.meta.env.VITE_API_URL + '/complaint', form_data, { withCredentials: true });
            console.log(result);
            setUser(prev => ({ ...prev }))
            setFileList([]);
            setResDes("");
            setresModel("");
        }
        catch (err) {

            console.log(err)
            error("Somethingwent Wrong")

        }





    }

    const handleStatusClick = async (id, status) => {


        try {
            let update = "";
            if (status == 'progress') {
                update = "acknowledged";
                const form_data = new FormData();
                form_data.append('complaint_id', id);
                form_data.append('status', update);
                form_data.append('user_id', user._id);
                const result = await axios.put(import.meta.env.VITE_API_URL + '/complaint', form_data, { withCredentials: true });
                console.log(result);
                setUser(prev => ({ ...prev }))
            }
            else if (status == "acknowledged") {
                setresModel(id)
            }
            else{
                error("Already resolved")
            }

        }
        catch (err) {
            error("Unable to Move Further")
            console.log(err);
        }



    }



    return (
        <Spin tip="Loading...."
            size='large'
            spinning={loading} >
            <TableContainer component={Paper} >
                <Table
                    size="small"
                    aria-label="a dense table" >
                    <TableHead >
                        <TableRow >
                            <TableCell align="center" ><b> DATE </b></TableCell>
                            <TableCell align="center" ><b> FROM </b></TableCell>
                            <TableCell align="center" ><b> CATEGORY</b> </TableCell>
                            <TableCell align="center" ><b> COMPLAINT</b> </TableCell>
                            <TableCell align="center" ><b> STATUS</b> </TableCell>
                            <TableCell align="center" ><b> VIEW</b> </TableCell>
                        </TableRow> </TableHead> <TableBody >
                        {
                            props.rowsData.map((row, index) => (
                                <TableRow key={index} sx={
                                    { '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell align="center"
                                        component="th"
                                        scope="row" > {row.date} </TableCell>
                                    <TableCell align="center" > {row.user_details.name} </TableCell>
                                    <TableCell align="center" > {row.category} </TableCell>
                                    <TableCell align="center" > {row.complaint} </TableCell>
                                    <TableCell align="center" >
                                        < Button onClick={() => handleStatusClick(row.id, row.status)} className={row.status == 'progress' ? 'bg-danger' : row.status == 'acknowledged' ? 'bg-warning' : 'bg-success'} > {row.status} </Button>
                                    </TableCell>
                                    <TableCell align="center" ><Button type='primary' onClick={() => handleClick(row.id)}>View</Button> </TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={isModel} footer={null} onCancel={() => setModel(false)}>
                <h3>
                    <b>
                        Complaint Details:</b>
                </h3>
                <br />

                <h4>Complaint Category:</h4>
                <p style={{ fontSize: '17px' }}>{des.category}</p>
                <h4>Issue:</h4>
                <p style={{ fontSize: '17px' }}>{des.issue}</p>
                <h4>Complaint Description:</h4>
                <p style={{ fontSize: '17px' }}>{des.des}</p>
                {des.image_array.length>0?
                    <>
                <h4>Complaint Images:</h4>
                {
                    des.image_array.map((each, index) => {
                        return <img src={each} key={index} className='img-fluid' style={{ height: '150px', width: '200px' }}></img>
                    })
                }</>
                :null
            }
                <h3><br></br><b>User Details</b></h3>
                <Flex vertical>
                <img src={des.user_details.img} className='img-fluid' style={{ height: '150px', width: '200px' }}></img>
<br></br>
                    <Text ><b>Name: </b>{des.user_details.name}</Text>
                    <Text><b>Email: </b>{des.user_details.email}</Text>
                    <Text ><b>Designation: </b>{des.user_details.designation}</Text>
                </Flex>

                {des.resolved_by ?
<>
                    <div className='my-3'>
                        <h3>Resolved By</h3>
                        <img src={des.resolved_by.img} style={{ height: '170px', width: '200px' }} className='img-fluid'></img>
                      <br></br>
                        <Text><b>Name:</b> {des.resolved_by.name}</Text><br></br>
                        <Text><b>Email:</b> {des.resolved_by.email}</Text><br></br>
                        <Text><b>Role:</b> {des.resolved_by.role}</Text><br></br>
                    </div>


                  

                <h3>Response</h3>
                <Text style={{ fontSize: '17px' }}>{des.res_des}</Text>
                {des.res_array.length>0?
                <>
                <h4>Response Images</h4>
                {
                    des.res_array.map((each, index) => {
                        return <img src={each} key={index} alt="img" className='img-fluid' style={{ height: '150px', width: '200px' }}></img>
                    })
                }
                </>:null
            }
                </>
                : null

            }
                <h3><br></br>
                    Time Line:
                    <br />
                    <h3>
                        <br />
                        <Timeline items={items} />
                    </h3>
                </h3>
            </Modal>

            <Modal open={res_model} footer={null} onCancel={() => setresModel(false)} title="Response On Issue " >

                <Flex vertical gap={10}>
                    <h4>Your Response</h4>
                    <TextField label="Description" value={res_Des} onChange={(e) => setResDes(e.target.value)} placeholder='Respond on issue' multiline rows={4} />
                    <h4>Upload Images</h4>
                    <Upload
                        multiple
                        listType="picture"
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={handleUploadChange}
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    <Flex justify='end'>
                        <Button type='primary' onClick={resolvedClick} >submit</Button>
                    </Flex>
                </Flex>


            </Modal>


        </Spin>

    );
};



export default ViewTable;
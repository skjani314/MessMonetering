import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Spin, Flex, Modal, Timeline, Typography, DatePicker, Select } from 'antd'
import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import Context from '../../context/Context';
const { Text } = Typography

const { Option } = Select;

const StudentComplaints = props => {


    const { success, error, user, loading, setLoading } = useContext(Context);
    const [des, setDes] = useState({ image_array: [], res_array: [] });
    const [items, setItems] = useState([]);
    const [isModel, setModel] = useState(false);


    const handleClick = async (id) => {
        try {
            setLoading(true);
            setModel(true);

            const data = props.data.filter((each) => each._id === id);
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
        } catch (err) {
            setLoading(false);
            console.error(err);
            error("Unable to show Full Data");
        }
    };




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
                            <TableCell align="center"><b> DATE </b></TableCell>
                            <TableCell align="center" ><b> CATEGORY </b></TableCell>
                            <TableCell align="center" ><b> COMPLAINT</b> </TableCell>
                            <TableCell align="center" ><b> STATUS </b></TableCell>
                        </TableRow> </TableHead> <TableBody >
                        {
                            props.rowsData.map((row, index) => (
                                <TableRow key={index} sx={
                                    { '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => handleClick(row.id)} >
                                    <TableCell align="center"
                                        component="th"
                                        scope="row" ><b> {row.date} </b></TableCell>
                                    <TableCell align="center" > {row.category} </TableCell>
                                    <TableCell align="center" > {row.complaint} </TableCell>
                                    <TableCell align="center" >
                                        < Button style={{ color: "white" }} className={row.status == 'progress' ? 'bg-danger' : row.status == 'acknowledged' ? 'bg-warning' : 'bg-success'} > {row.status} </Button></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={isModel} footer={null} onCancel={() => setModel(false)}>
                <Spin tip="Loading...."
                    size='large'
                    spinning={loading} >
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
                    <h4>Complaint Images:</h4>
                    {
                        des.image_array.map((each, index) => {
                            return <img src={each} key={index} alt="img" className='img-fluid' style={{ height: '150px', width: '200px' }}></img>
                        })
                    }

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
                            <h4>Response Images</h4>
                            {
                                des.res_array.map((each, index) => {
                                    return <img src={each} key={index} alt="img" className='img-fluid' style={{ height: '150px', width: '200px' }}></img>
                                })
                            }
                        </>
                        : null

                    }

                    <h3>
                        <br />
                        Time Line:
                        <br />
                    </h3>
                    <br />
                    <b><Timeline items={items} /></b>

                </Spin>

            </Modal>

        </Spin>

    );
};



export default StudentComplaints;
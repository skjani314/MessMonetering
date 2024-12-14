import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Spin, Flex, Modal, Timeline } from 'antd'
import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import Context from '../../context/Context';

const StudentComplaints = props => {


    const { success, error, user, loading, setLoading } = useContext(Context);
const [des,setDes]=useState({image_array:[]});
const [items,setItems]=useState([]);
const [isModel,setModel]=useState(false);
const handleClick=async (id)=>{

try{
setModel(true)
const data=props.data.filter((each)=>each._id===id)
    
const item=data[0].time.map(each=>{
    const {date,status}=each;
    let color="";
    if(status=='progress'){
color="red"
    }
    else if(status=="acknowledged"){
        color="yellow"
    }else{color="green"}
    return {children:date.split("T")[0],color}
})
setItems(item)
console.log(item);

setDes(data[0]);
}
catch(err)
{
    console.log(err);
    error("Unable to show Full Data")
}




}




    return (
        <Spin tip="Loading...."
            size='large'
            spinning={loading} >
            <TableContainer component={Paper} >
                <Table  sx={
                    { minWidth: 650 }}
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
                                <TableRow   key={index} sx={
                                    { '&:last-child td, &:last-child th': { border: 0 } }} onClick={()=>handleClick(row.id)} >
                                    <TableCell align="center"
                                        component="th"
                                        scope="row" ><b> {row.date} </b></TableCell>
                                    <TableCell align="center" > {row.category} </TableCell>
                                    <TableCell align="center" > {row.complaint} </TableCell>
                                    <TableCell align="center" >
                                        < Button style={{color:"white"}} className={row.status == 'progress' ? 'bg-danger' : row.status == 'acknowledged' ? 'bg-warning' : 'bg-success'} > {row.status} </Button></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

<Modal open={isModel} footer={null} onCancel={()=>setModel(false)}>
<h3>
<b>
Complaint Details:</b>
</h3>
<br/>

<h4>Complaint Category:</h4>
<p style={{fontSize:'17px'}}>{des.category}</p>
<h4>Issue:</h4>
<p style={{fontSize:'17px'}}>{des.issue}</p>
<h4>Complaint Description:</h4>
<p style={{fontSize:'17px'}}>{des.des}</p>
<h4>Images:</h4>
{
    des.image_array.map((each)=>{
      return  <img src={each} className='img-fluid' style={{height:'150px',width:'200px'}}></img>
    })
}

<h3>
<br/>
    Time Line:
    <br/>
    </h3>
    <br/>

    <b><Timeline items={items}/></b>
    


</Modal>

        </Spin>

    );
};



export default StudentComplaints;
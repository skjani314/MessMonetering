import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Spin, Flex, Modal, Timeline ,Typography} from 'antd'
import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import Context from '../../context/Context';
import { typographyClasses } from '@mui/material';
import { MdSettingsBackupRestore } from 'react-icons/md';

const {Text}=Typography;
const ViewTable = props => {


    const { success, error, user, loading, setLoading,setUser } = useContext(Context);
const [des,setDes]=useState({image_array:[],user_details:{}});
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
setDes(data[0]);
}
catch(err)
{
    console.log(err);
    error("Unable to show Full Data")
}




}

const handleStatusClick=async (id,status)=>{


try{
let update="";
if(status=='progress'){
update="acknowledged";
}
else if(status=="acknowledged"){
    update="resolved";
}

const form_data=new FormData();
form_data.append('complaint_id',id);
form_data.append('status',update);
const result=await axios.put(import.meta.env.VITE_API_URL+'/complaint',form_data,{withCredentials:true});
console.log(result);
setUser(prev=>({...prev}))

}
catch(err)
{
    error("Unable to Move Further")
    console.log(err);
}



}



    return (
        <Spin tip="Loading...."
            size='large'
            spinning={loading} >
            <TableContainer component={Paper} >
                <Table sx={
                    { minWidth: 650 }}
                    size="small"
                    aria-label="a dense table" >
                    <TableHead >
                        <TableRow >
                            <TableCell align="center" > DATE </TableCell>
                            <TableCell align="center" > FROM </TableCell>
                            <TableCell align="center" > CATEGORY </TableCell>
                            <TableCell align="center" > COMPLAINT </TableCell>
                            <TableCell align="center" > STATUS </TableCell>
                        </TableRow> </TableHead> <TableBody >
                        {
                            props.rowsData.map((row, index) => (
                                <TableRow   key={index} sx={
                                    { '&:last-child td, &:last-child th': { border: 0 } }} onClick={()=>handleClick(row.id)} >
                                    <TableCell align="center"
                                        component="th"
                                        scope="row" > {row.date} </TableCell>
                            <TableCell align="center" > {row.user_details.name} </TableCell>
                                    <TableCell align="center" > {row.category} </TableCell>
                                    <TableCell align="center" > {row.complaint} </TableCell>
                                    <TableCell align="center" >
                                        < Button onClick={()=>handleStatusClick(row.id,row.status)} className={row.status == 'progress' ? 'bg-danger' : row.status == 'acknowledged' ? 'bg-warning' : 'bg-success'} > {row.status} </Button></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

<Modal open={isModel} footer={null} onCancel={()=>setModel(false)}>
<h1>
<b>
Complaint Details</b>
</h1>

<h3>Complaint Category:</h3>
{des.category}
<h3>Issue:</h3>
{des.issue}
<h3>Complaint Description:</h3>
{des.des}
<h3>Images:</h3>
{
    des.image_array.map((each)=>{
      return  <img src={each} className='img-fluid'></img>
    })
}

<h3>User Details</h3>
<Flex vertical>

    <Text>{des.user_details.name}</Text>
    <Text>{des.user_details.email}</Text>
    <Text>{des.user_details.designation}</Text>
    <img src={des.user_details.img} className='img-fluid'></img>

</Flex>
<h3>
    Time Line:
    <Timeline items={items}/>
</h3>
</Modal>

        </Spin>

    );
};



export default ViewTable;
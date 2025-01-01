import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Dropdown,Space, Flex, Upload, DatePicker,Typography } from "antd";
import { UploadOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import "./ComplaintsTable.css";
import MenuTable from "../Home/MenuTable";
import { useContext } from "react";
import Context from "../../context/Context";
import axios from "axios";
import StudentComplaints from "../Tables/StdentComplaints";
const { Option } = Select;
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { MdOutlineClear } from "react-icons/md";


const {Text}=Typography
const ComplaintsTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const {loading,setLoading,success,error,contextHolder,user,setUser}=useContext(Context);

  const [datseRange, setdatesrange] = useState({ start: '', end: '' });
  const [status_cat,setStatusCat]=useState({status:"Select a status",category:"Select a category"});


  const [fileList, setFileList] = useState([]);
 const [data,setData]=useState([]);
 const [tabledata,setTabledata]=useState([]);

 const handleDatessubmit = async () => {
  setLoading(true)


  try {

        const result = await axios.get(import.meta.env.VITE_API_URL + '/complaint?from=' + user._id+'&status='+status_cat.status+"&category="+status_cat.category+"&start="+datseRange.start+"&end="+datseRange.end,{withCredentials:true})
        console.log(result)
        const data=result.data.map((each)=>{
          const {time,_doc}=each;
          
          return {time,..._doc}
          
          })
          setData(data);
          
          const tabledata=data.map((each)=>{
          
            const {_id,category,time,des}=each;
          
          
            return {category,date:time[0].date.split('T')[0],complaint:des.slice(0,50),status:time[0].status,id:_id}
          
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
  const handleRaiseComplaint = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
};

  const handleSubmit = async (values) => {

try{

  const form_data=new FormData();
  fileList.forEach(file => {
    form_data.append('img', file.originFileObj);
});
form_data.append('from',user._id);
form_data.append('issue',values.category);



let category="";
if(values.category=='Insufficient staff or adequacy of food at counters.' || values.category=='Lack of regular meetings and updates from mess supervisors.' || values.category=="Adherence to the menu and service timings."){
category="Service quality";
}
else if(values.category=='Hygiene in kitchens, dining areas, and stores.' || values.category=='Cleanliness of utensils and serving tools.'){
category="Cleanliness";
}
else if(values.category=="Quality and expiry of items in store inspections." || values.category=="Standards of raw materials used (IS/AGMARK/FPO/FSSAI)." || values.category=="Taste and quality of food."){
category="Food quality";}
else{
category="Others";
}
console.log(category);

form_data.append('category',category);


form_data.append('des',values.complaint);
form_data.append('level',2);
setIsModalVisible(false);
setFileList([]); 
form.resetFields();
setLoading(true)

const result=await axios.post(import.meta.env.VITE_API_URL+'/complaint',form_data,{withCredentials:true})
console.log(result);
success("Complaint Registered Successsfully");
setUser(prev=>({...prev}))
setLoading(false)

}catch(err){
  console.log(err);
  error("Unable to Raise complaint")
}


  };





useEffect(()=>{

const fun=async ()=>{
  setLoading(true)


try{

  const result = await axios.get(import.meta.env.VITE_API_URL + '/complaint?from=' + user._id+'&status='+status_cat.status+"&category="+status_cat.category+"&start="+datseRange.start+"&end="+datseRange.end,{withCredentials:true})
  const data=result.data.map((each)=>{
const {time,_doc}=each;

return {time,..._doc}

})
setData(data);

const tabledata=data.map((each)=>{

  const {_id,category,time,des}=each;


  return {category,date:time[0].date.split('T')[0],complaint:des.slice(0,50),status:time[0].status,id:_id}

})
console.log(tabledata)
setTabledata(tabledata)
}
catch(err)
{
  console.log(err);
}
setLoading(false)

}
if(user){
fun()
}
},[user])


  return (
    
    <div className="complaints-container">
      

      <div>
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
    My Complaints
</h2>

      </div>

      <div className="complaints-header">
        <Button type="primary" onClick={handleRaiseComplaint}>
          Raise a Complaint
        </Button>
      </div>


      <Text><b>Filter</b></Text>
      <Flex style={{overflowX:"scroll"}} gap={10} justify="inline" className="mb-4">
      <Dropdown menu={{items:[{key:"Service quality",label:"Service quality"},{key:"Cleanliness",label:"Cleanliness"},{key:"Food quality",label:"Food quality"},{key:"Others",label:"Others"}],onClick:({key})=>{setStatusCat(prev=>({...prev,category:key}))}}}>
      <Button>
        <Space>
          {
          status_cat.category=="Select a category"?
          <Text disabled>{status_cat.category}
          <DownOutlined /></Text>
          :
          <Text >{status_cat.category}
          <MdOutlineClear className="mx-2" onClick={()=>setStatusCat(prev=>({...prev,category:"Select a category"}))} />
          </Text>
}
        </Space>
      </Button>
    </Dropdown>
    <Dropdown menu={{items:[{key:"progress",label:"Progress"},{key:"acknowledged",label:"Acknowledged"},{key:"resolved",label:"Resolved"}],onClick:({key})=>{setStatusCat(prev=>({...prev,status:key}))}}}>
      <Button>
        <Space>
          {
          status_cat.status=="Select a status"?
          <Text disabled>{status_cat.status}
          <DownOutlined   /></Text>
          :
          <Text >{status_cat.status}
          <MdOutlineClear className="mx-2" onClick={()=>setStatusCat(prev=>({...prev,status:"Select a status"}))} /></Text>
}
        </Space>
      </Button>
    </Dropdown>
      <DatePicker  placeholder="select Start Date" onChange={(e, s) => { setdatesrange((prev) => ({ ...prev, start: s })) }} />
      <DatePicker  placeholder="select End Date" onChange={(e, s) => { setdatesrange((prev) => ({ ...prev, end: s })) }} />
      <Button onClick={handleDatessubmit} type="primary">Submit</Button>
      </Flex>


      <p style={{marginBottom:"10px"}}><b >Recent Complaints</b></p>
<StudentComplaints rowsData={tabledata} data={data}/>

      <Modal
        title="Raise a Complaint"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="category"
            label="Complaint Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select a category">
              <Option value="Quality and expiry of items in store inspections." key={1}>Quality and expiry of items in store inspections.</Option>
              <Option value="Standards of raw materials used (IS/AGMARK/FPO/FSSAI)." key={2}>Standards of raw materials used (IS/AGMARK/FPO/FSSAI).</Option>
              <Option value="Insufficient staff or adequacy of food at counters." key={3}>Insufficient staff or adequacy of food at counters.</Option>
              <Option value="Menu discrepancies or Insufficient cooking quantities." key={9}>Menu discrepancies or Insufficient cooking quantities.</Option>
              <Option value="Lack of regular meetings and updates from mess supervisors." key={4}> Lack of regular meetings and updates from mess supervisors.</Option>
              <Option value="Taste and quality of food." key={5}>Taste and quality of food.</Option>
              <Option value="Hygiene in kitchens, dining areas, and stores." key={6}>Hygiene in kitchens, dining areas, and stores.</Option>
              <Option value="Cleanliness of utensils and serving tools." key={7}>Cleanliness of utensils and serving tools.</Option>
              <Option value="Adherence to the menu and service timings." key={0}>Adherence to the menu and service timings.</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="complaint"
            label="Complaint Description"
            rules={[{ required: true, message: "Please provide a description" }]}
          >
            <Input.TextArea placeholder="Describe your complaint" rows={4} />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Image"
          >
            <Upload
                        multiple
                        listType="picture"
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={handleUploadChange}
                    >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    

      
    </div>
    
  );
};

export default ComplaintsTable;

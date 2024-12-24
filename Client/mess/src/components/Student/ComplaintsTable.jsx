import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Dropdown,Space, Flex, Upload, DatePicker,Typography } from "antd";
import { UploadOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import "./ComplaintsTable.css";
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
  const { loading, setLoading, success, error, contextHolder, user, setUser } = useContext(Context);
  const [datseRange, setdatesrange] = useState({ start: '', end: '' });
  const [status_cat,setStatusCat]=useState({status:"Select a status",category:"Select a category"});



  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState([]);
  const [tabledata, setTabledata] = useState([]);


  const handleDatessubmit = async () => {
    setLoading(true)

    try {
  
          const result = await axios.get(import.meta.env.VITE_API_URL + '/complaint?from=' + user._id+'&status='+status_cat.status+"&category="+status_cat.category+"&start="+datseRange.start+"&end="+datseRange.end)
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

    try {

      const form_data = new FormData();
      fileList.forEach(file => {
        form_data.append('img', file.originFileObj);
      });
      form_data.append('from', user._id);
      form_data.append('issue', values.category);
      let category = "";
      if (values.category == 'Timeliness' || values.category == 'Courtesy of Mess staff') {
        category = "Service quality";
      }
      else if (values.category == 'Cleanliness of Mess' || values.category == 'Staff hygine' || values.category == 'Cleanliness of Wash basins') {
        category = "Cleanliness";
      }
      else if (values.category == 'Quantity of food' || values.category == 'Quality of food') {
        category = "Food quality";
      }
      else {
        category = "Others";
      }
      console.log(category);

      form_data.append('category', category);
      form_data.append('des', values.complaint);
      form_data.append('level', 1);
      setIsModalVisible(false);
      setFileList([]);
      form.resetFields();
      setLoading(true)

      const result = await axios.post(import.meta.env.VITE_API_URL + '/complaint', form_data, { withCredentials: true })
      console.log(result);
      success("Complaint Registered Successsfully");
      setUser(prev => ({ ...prev }))
      setLoading(false)

    } catch (err) {
      console.log(err);
      error("Unable to Raise complaint")
    }


  };





  useEffect(() => {

    const fun = async () => {

      setLoading(true)

      try {

        const result = await axios.get(import.meta.env.VITE_API_URL + '/complaint?from=' + user._id+'&status='+status_cat.status+"&category="+status_cat.category+"&start="+datseRange.start+"&end="+datseRange.end)
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
      }
      setLoading(false)

    }
    if (user) {
      fun()
    }
  }, [user])


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
    Raise Complaint
</h2>



      </div>

      <div className="complaints-header">
        <Button type="primary" onClick={handleRaiseComplaint}>
          Raise a Complaint
        </Button>
      </div>
      <Text><b>Filter</b></Text>
      <Flex style={{overflowX:"scroll" }} gap={10} justify="inline" className="mt-2 my-3 ">
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
      <StudentComplaints rowsData={tabledata} data={data} />
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
            <Select placeholder="Select a category" key={1}>
              <Option value="Timeliness" key={2}>Timeliness of service</Option>
              <Option value="Cleanliness of Mess" key={3}>Cleanliness of dining hall,plates and surroundings</Option>
              <Option value="Quality of food" key={4}>Food Quality  including Rice,Snacks,Tea,Coffee and Breakfast</Option>
              <Option value="Quantity of food" key={5}>Quantity of food served as per Menu</Option>
              <Option value="Courtesy of Mess staff" key={6}> Courtesy of Mess staff as per the Menu</Option>
              <Option value="Staff hygine" key={7}>Staff Hygine(uniforms,gloves,masks)</Option>
              <Option value="Cooking and serving" key={8}>Cooking and Serving adherence to the menu</Option>
              <Option value="Cleanliness of Wash basins" key={9}>Cleanliness of wash basins and wash areas</Option>
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

import React from "react";
import { Card, Avatar, Descriptions } from "antd";
import { UserOutlined } from "@ant-design/icons";

const StudentProfile = ({ student }) => {
  return (
    <Card
      bordered={true}
      style={{ width: 400, margin: "0 auto", textAlign: "center" }}
    >
      {/* Profile Icon */}
      <Avatar size={100} icon={<UserOutlined />} style={{ marginBottom: 20 }} />

      {/* Profile Details */}
      <Descriptions column={1}>
        <Descriptions.Item label="Name">{student.name}</Descriptions.Item>
        <Descriptions.Item label="Age">{student.age}</Descriptions.Item>
        <Descriptions.Item label="ID">{student.id}</Descriptions.Item>
        <Descriptions.Item label="Branch">{student.branch}</Descriptions.Item>
        <Descriptions.Item label="Email">{student.email}</Descriptions.Item>
        <Descriptions.Item label="Phone No">{student.phone}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

// Example usage
const studentData = {
  name: "John Doe",
  age: 20,
  id: "123456",
  branch: "Computer Science",
  email: "johndoe@example.com",
  phone: "123-456-7890",
};

const App = () => {
  return (
    <div style={{ padding: "50px" }}>
      <StudentProfile student={studentData} />
    </div>
  );
};

export default App;

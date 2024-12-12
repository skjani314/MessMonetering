import React from "react";
import { Card, Descriptions } from "antd";

const Profile = ({ student }) => {
  return (
    <Card title="Student Profile" bordered={true} style={{ width: 400, margin: "0 auto" }}>
      <Descriptions column={1}>
        <Descriptions.Item label="Name">{student.name}</Descriptions.Item>
        <Descriptions.Item label="Age">{student.age}</Descriptions.Item>
        <Descriptions.Item label="Grade">{student.grade}</Descriptions.Item>
        <Descriptions.Item label="Email">{student.email}</Descriptions.Item>
        <Descriptions.Item label="Address">{student.address}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

// Example usage
const studentData = {
  name: "John Doe",
  age: 20,
  grade: "A",
  email: "johndoe@example.com",
  address: "123 Main St, City, Country",
};

const App = () => {
  return (
    <div style={{ padding: "50px" }}>
      <Profile student={studentData} />
    </div>
  );
};

export default App;

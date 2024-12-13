import React, { useState } from "react";
import { Upload, Button, Card, Typography, Space, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Meta } = Card;

const Profile = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const data = [
    {
      key: "1",
      name: "John Doe",
      age: 25,
      id: "12345",
      branch: "Computer Science",
      email: "john.doe@example.com",
      address: "123 Main Street, Cityville",
    },
    
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3} style={{ textAlign: "center" }}>Profile </Title>

      <Row gutter={[16, 16]} align="middle">
        {/* Profile Input Section */}
        <Col xs={24} lg={8} style={{ textAlign: "" }}>
          <div>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Profile"
                style={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover", marginBottom: 10 }}
              />
            ) : (
              <div
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  paddingLeft: "0px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                No Image
              </div>
            )}

            <Upload
              showUploadList={false}
              beforeUpload={() => false} // Disable automatic upload
              onChange={handleImageUpload}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </div>
        </Col>

        {/* Cards Section */}
        <Col xs={24} lg={16}>
          <Space direction="vertical" style={{ width: "100%" }}>
            {data.map((item) => (
              <Card
                key={item.key}
                title={item.name}
                bordered
                style={{ width: "100%" }}
              >
                <Meta
                  description={
                    <>
                      <p><strong>Age:</strong> {item.age}</p>
                      <p><strong>ID:</strong> {item.id}</p>
                      <p><strong>Branch:</strong> {item.branch}</p>
                      <p><strong>Email:</strong> {item.email}</p>
                      <p><strong>Address:</strong> {item.address}</p>
                    </>
                  }
                />
              </Card>
            ))}
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;

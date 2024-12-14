import React, { useContext, useState } from "react";
import { Upload, Button, Card, Typography, Space, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Context from "../../context/Context";

const { Title } = Typography;
const { Meta } = Card;

const Profile = () => {

const {user}=useContext(Context)

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3} style={{ textAlign: "center" }}> </Title>

      <Row gutter={[16, 16]} align="middle">
        
        <Col xs={24} lg={8} style={{ textAlign: "" }}>
          <div>
            {user.img ? (
              <img
                src={user.img}
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
          </div>
        </Col>

        <Col xs={24} lg={16}>
          <Space direction="vertical" style={{ width: "100%" }}>
              <Card   
                key={user._id}
                title={user.name}
                bordered
                style={{ width: "100%" }}
              >
                <Meta
                  description={
                    <>
                      <p><strong>ID:</strong> {user.user_id}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Role:</strong> {user.role}</p>
                    </>
                  }
                />
              </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;

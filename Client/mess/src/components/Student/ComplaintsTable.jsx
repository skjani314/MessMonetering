import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Tag, Timeline } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import "./ComplaintsTable.css";

const { Option } = Select;

const ComplaintsTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isComplaintDetailVisible, setIsComplaintDetailVisible] = useState(false);
  const [form] = Form.useForm();

  const [data, setData] = useState([
    {
      key: "1",
      date: "2024-12-12",
      category: "Food",
      complaint: "Quality of food is not good",
      status: "Pending",
      timeline: [
        { timestamp: "2024-12-12", action: "Complaint Registered" },
        { timestamp: "2024-12-13", action: "Complaint under review" },
      ],
    },
    {
      key: "2",
      date: "2024-12-11",
      category: "Cleanliness",
      complaint: "Rooms are not cleaned properly",
      status: "Resolved",
      timeline: [
        { timestamp: "2024-12-11", action: "Complaint Registered" },
        { timestamp: "2024-12-12", action: "Complaint resolved" },
      ],
    },
  ]);

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Complaint Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Complaint",
      dataIndex: "complaint",
      key: "complaint",
      render: (text, record) => (
        <a
          onClick={() => handleComplaintClick(record)}
          style={{ color: "#1890ff", cursor: "pointer" }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "Pending") {
          return (
            <Tag color="Red" icon={<ClockCircleOutlined />}>
              Pending
            </Tag>
          );
        } else if (status === "Resolved") {
          return (
            <Tag color="Green" icon={<CheckCircleOutlined />}>
              Resolved
            </Tag>
          );
        }
        return status;
      },
    },
  ];

  const handleRaiseComplaint = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    const newComplaint = {
      key: data.length + 1,
      date: new Date().toISOString().split("T")[0],
      category: values.category,
      complaint: values.complaint,
      status: "Pending",
      timeline: [{ timestamp: new Date().toISOString().split("T")[0], action: "Complaint Registered" }],
    };

    setData([...data, newComplaint]);
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint(complaint);
    setIsComplaintDetailVisible(true);
  };

  const handleComplaintDetailCancel = () => {
    setIsComplaintDetailVisible(false);
  };

  return (
    <div className="complaints-container">
      <div className="complaints-header">
        <Button type="primary" onClick={handleRaiseComplaint}>
          Raise a Complaint
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        className="complaints-table"
      />

      {/* Modal for Raising Complaint */}
      <Modal
        title="Raise a Complaint"
        visible={isModalVisible}
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
              <Option value="Food">Food</Option>
              <Option value="Cleanliness">Cleanliness</Option>
              <Option value="Electricity">Electricity</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="complaint"
            label="Complaint Description"
            rules={[{ required: true, message: "Please provide a description" }]}
          >
            <Input.TextArea placeholder="Describe your complaint" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Complaint Timeline and Description */}
      <Modal
        title="Complaint Details"
        visible={isComplaintDetailVisible}
        onCancel={handleComplaintDetailCancel}
        footer={null}
      >
        {selectedComplaint && (
          <div>
            <p><strong>Complaint Description:</strong> {selectedComplaint.complaint}</p>
            <Timeline>
              {selectedComplaint.timeline.map((entry, index) => (
                <Timeline.Item key={index} color={index % 2 === 0 ?"red" :"green"}>
                  <strong>{entry.timestamp}</strong>: {entry.action}
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ComplaintsTable;

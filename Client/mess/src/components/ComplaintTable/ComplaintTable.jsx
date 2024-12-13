import React from "react";
import { Table, Button } from "antd";

// Sample data for the table
const data = [
  {
    key: "1",
    date: "2024-12-12",
    from: "John Doe",
    category: "Billing Issue",
    complaint: "Overcharged for the last month."
  },
  {
    key: "2",
    date: "2024-12-11",
    from: "Jane Smith",
    category: "Technical Issue",
    complaint: "Internet connectivity problem."
  },
  {
    key: "3",
    date: "2024-12-10",
    from: "Alice Brown",
    category: "Customer Service",
    complaint: "Rude behavior from support staff."
  }
];

const ComplaintTable = () => {
  // Define columns for the table
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
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
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => alert(`Acknowledged complaint from ${record.from}`)}>
          Acknowledge
        </Button>
      ),
    }
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={data} 
      pagination={{ pageSize: 5 }} // Optional: Adjust page size
      bordered
    />
  );
};

export default ComplaintTable;

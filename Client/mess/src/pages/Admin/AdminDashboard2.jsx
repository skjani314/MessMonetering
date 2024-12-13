import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './AdminDashboard2.css';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard2 = () => {
  const [data] = useState({
    complaints: [
      { user: 'John Doe', complaint: 'Food quality is poor', status: 'Resolved' },
      { user: 'Jane Smith', complaint: 'Service was slow', status: 'Pending' },
      { user: 'Alice Johnson', complaint: 'Unclean tables', status: 'Resolved' },
    ],
  });

  const resolvedCount = data.complaints.filter(c => c.status === 'Resolved').length;
  const pendingCount = data.complaints.filter(c => c.status === 'Pending').length;

  // Pie Chart Data (Complaint Status)
  const pieData = {
    labels: ['Resolved', 'Pending'],
    datasets: [
      {
        data: [resolvedCount, pendingCount],
        backgroundColor: ['#66bb6a', '#ffa726'],
        hoverOffset: 4,
      },
    ],
  };

  // Bar Chart Data (Complaints by User)
  const barData = {
    labels: ['John Doe', 'Jane Smith', 'Alice Johnson'],
    datasets: [
      {
        label: 'Complaints',
        data: [1, 1, 1],
        backgroundColor: '#42a5f5',
        borderColor: '#1e88e5',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="new-dashboard-container">
      <div className="new-sidebar">
        <h2 className="new-sidebar-title">Admin Dashboard</h2>
        <ul className="new-sidebar-menu">
          <li className="new-sidebar-item">Overview</li>
          <li className="new-sidebar-item">Complaints</li>
          <li className="new-sidebar-item">Reports</li>
          <li className="new-sidebar-item">Settings</li>
        </ul>
      </div>
      <div className="new-main-content">
        <header className="new-header">
          <h1 className="new-header-title">Dashboard</h1>
        </header>
        <div className="new-charts-container">
          <div className="new-chart-card">
            <h3 className="new-chart-title">Complaint Status</h3>
            <Pie data={pieData} width={250} height={250} />
          </div>
          <div className="new-chart-card">
            <h3 className="new-chart-title">Complaints by User</h3>
            <Bar data={barData} width={250} height={150} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard2;

import { useState } from 'react'
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Context from './context/Context';
import { message } from 'antd';
import Home from './components/Home/Home';
import Coordinator from './pages/Coordinator';
import Header from './components/Header/Header';
import Student from './pages/Student'
import CoordinatorHistory from './pages/Coordinator/CoordinatorHistory';
import CoordinatorProfile from './pages/Coordinator/CoordinatorProfile';
import CoordinatorComplaint from './pages/Coordinator/CoordinatorComplaint';
import CoordinatorDashboard from './pages/Coordinator/CoordinatorDashboard';

function App() {




  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);


  const [messageApi, contextHolder] = message.useMessage();
  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };
  const error = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };


  const changeActiveTab = (tabId) => {
    setActiveTab(tabId);
  }
  const context_data = {
    activeTab,
    changeActiveTab: changeActiveTab,
    success,
    error,
    contextHolder,
    user,
    setUser,
    loading,
    setLoading,

  }
  return (
    <Context.Provider value={context_data}>
      <Routes>
        <Route  path='/' element={<Home/>} />
        
<Route path='/coordinator/dashboard' element={<CoordinatorDashboard/>}/>
<Route path='/coordinator/complaint' element={<CoordinatorComplaint/>} />
<Route path='/coordinator/history' element={<CoordinatorHistory/>} />
<Route path='/coordinator/profile' element={<CoordinatorProfile/>} />
        <Route path="/student" element={<Student/>}/>
</Routes>
  </Context.Provider>
  )
}

export default App;

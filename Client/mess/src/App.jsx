import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Context from './context/Context';
import { message } from 'antd';
import Home from './components/Home/Home';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminStudent from './pages/Admin/AdminStudent';
import AdminCoordinator from './pages/Admin/AdminCoordinator';
import AdminProfile from './pages/Admin/AdminProfile';
import Student from './pages/Student/Student'
import CoordinatorHistory from './pages/Coordinator/CoordinatorHistory';
import CoordinatorProfile from './pages/Coordinator/CoordinatorProfile';
import CoordinatorComplaint from './pages/Coordinator/CoordinatorComplaint';
import CoordinatorDashboard from './pages/Coordinator/CoordinatorDashboard';
import Forgotpass from './components/LogIn/Forgotpass';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import NotFoundPage from './components/NotFound/NotFound';
import StudentComplaint from './pages/Student/StudentComplaint';
import StudentProfile from './pages/Student/StudentProfile';
import AdminUserPage from './pages/Admin/AdminUserPage';

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

  window.receiveData = (data) => {
    localStorage.setItem("userToken", data);
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

useEffect(()=>{

setLoading(true)
const getuser=async ()=>{



try{


const result=await axios.post(import.meta.env.VITE_API_URL+'/get-user',{},{withCredentials:true})  

setUser(result.data);
console.log(result)

}
catch(err){
console.log(err)

}



}


getuser()
setLoading(false)

},[])


  return (
    
    <Context.Provider value={context_data}>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/forgot/:token' element={<Forgotpass/>} />
        <Route path='/admin/dashboard' element={user && user.role=="admin"?<AdminDashboard />:<NotFoundPage/>} />
        <Route path='/admin/student' element={user && user.role=="admin"?<AdminStudent />:<NotFoundPage/>} />
        <Route path='/admin/users' element={user && user.role=="admin"?<AdminUserPage />:<NotFoundPage/>} />
        <Route path='/admin/coordinator' element={user && user.role=="admin"?<AdminCoordinator />:<NotFoundPage/>} />
        <Route path='/admin/profile' element={user && user.role=="admin"?<AdminProfile />:<NotFoundPage/>} />
        <Route path='/coordinator/dashboard' element={user && user.role=="coordinator"?<CoordinatorDashboard />:<NotFoundPage/>} />
        <Route path='/coordinator/complaint' element={user && user.role=="coordinator"?<CoordinatorComplaint />:<NotFoundPage/>} />
        <Route path='/coordinator/history' element={user && user.role=="coordinator"?<CoordinatorHistory />:<NotFoundPage/>} />
        <Route path='/coordinator/profile' element={user && user.role=="coordinator"?<CoordinatorProfile />:<NotFoundPage/>} />
        <Route path="/student" element={user && user.role=="student"?<Student />:<NotFoundPage/>} />
        <Route path="/student/complaint" element={user && user.role=="student"?<StudentComplaint />:<NotFoundPage/>} />
        <Route path="/student/profile" element={user && user.role=="student"?<StudentProfile />:<NotFoundPage/>} />
      </Routes>
    </Context.Provider>
    
  )
}

export default App;

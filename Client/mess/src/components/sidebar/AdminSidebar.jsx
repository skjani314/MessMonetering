import { MdDashboard } from "react-icons/md";
import Context from "../../context/Context";
import pharmacyImage from './logo-rgukt.png'
import { FaHandsHelping, FaUserCog } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";

import { CgProfile } from "react-icons/cg";

import './Sidebar.css'
import {Link} from 'react-router-dom'

const sidebarItems=[
    {
        id:"DASHBOARD",
        displayText:"Dashboard",
        icon:<MdDashboard />,
        path:'/admin/dashboard'
    },
    {
        id:'STUDENT',
        displayText:'Student',
        icon:<PiStudentBold className="mb-2"/>,
        path:'/admin/student',
    },
    
    {
        id:"COORDINATOR",
        displayText:'Co-ordinator',
        icon:<FaHandsHelping className="mb-2"/>,
        path:'/admin/coordinator',
    },
    {
        id:"PROFILE",
        displayText:'Profile',
        icon:<CgProfile className="mb-2"/>,
        path:'/admin/profile',
    },
    {
        id:"USER",
        displayText:'User',
        icon:<FaUserCog className="mb-2"/>,
        path:'/admin/users',
    }
]

const AdminSidebar=()=>{
   return <Context.Consumer>
    {
        value=>{
            const {changeActiveTab,activeTab}=value;
            return( 
                <>
                <div className='sidebar-container-md' >
                   <div style={{borderBottom:'1px solid black'}}>
                        <h1 className="main-heading">MESS MAINTAINANCE</h1>
                        <img src={pharmacyImage} alt="pharmacy" className="pharmacy-image img-fluid"/>
                    </div>
                <ul className="unordered-list">
                    {sidebarItems.map((eachItem)=>(
                        <li key={eachItem.id}>
                           <Link to={eachItem.path} className="Link"><div className={`sidebar-icon-container ${eachItem.id===activeTab?'active-tab-color':''}`} onClick={()=>{changeActiveTab(eachItem.id)}} >
                                {eachItem.icon}
                                <p className="mt-3">{eachItem.displayText}</p>   
                            </div></Link> 
                        </li>
                    ))}
                </ul>
                </div>
                <ul className='sidebar-container-mobile' style={{zIndex:100}}>
                {sidebarItems.map((eachItem)=>(
                        <li key={eachItem.id}>
                          <Link to={eachItem.path} className="Link">  <div  className={`icon-container-mobile ${eachItem.id===activeTab?'active-tab-color':''}`} onClick={()=>{changeActiveTab(eachItem.id)}}>
                                 {eachItem.icon}
                                 </div></Link>
                        </li>
                ))}
               
                </ul>
                </>
                
            )
        }
    }
    </Context.Consumer>
   
}
export default AdminSidebar
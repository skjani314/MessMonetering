import { RxDashboard } from "react-icons/rx";
import Context from "../../context/Context";
import pharmacyImage from './logo-rgukt.png'
import { PiStudentBold } from "react-icons/pi";
import { CiCirclePlus } from "react-icons/ci";
import { TbReport } from "react-icons/tb";
import { TbReportMedical } from "react-icons/tb";




import './Sidebar.css'
import {Link} from 'react-router-dom'

const sidebarItems=[
    {
        id:"DASHBOARD",
        displayText:"Dashboard",
        icon:<RxDashboard />,
        path:'/student'
    },
    {
        id:'COMPLAINT',
        displayText:'Report',
        icon:<TbReportMedical className="mb-2"/>,
        path:'/student/complaint',
    },
    
    
    {
        id:"PROFILE",
        displayText:'Profile',
        icon:<PiStudentBold className="mb-2"/>,
        path:'/student/profile',
    },
    
]

const StudentSidebar=()=>{
   return <Context.Consumer>
    {
        value=>{
            const {changeActiveTab,activeTab}=value;
            return( 
                <>
                <div className='sidebar-container-md' >
                    <div style={{borderBottom:'1px solid black'}}>
                        <h1 className="main-heading">MESS MANAGEMENT</h1>
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
export default StudentSidebar
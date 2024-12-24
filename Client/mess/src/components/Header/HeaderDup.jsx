import React from 'react';
import logorgukt from './icon.jpeg';
import { IoIosNotifications } from "react-icons/io";
import './Header.css'
// import { useContext } from "react"
import Context from "../../context/Context"
import LogIn from '../LogIn/LogIn';

const HeaderDup = props => {
   
        return (
            <div className='header-main-container' style={{position:'static',background:"white"}}>
               <div className='header-container' style={{zIndex:-100}} >
                   <div>
                       <img src={logorgukt} className="styling-logo" alt="logo" />
                   </div>
                   <div className="logout-container">
                       
                       <IoIosNotifications className="styling-icon" />
                       <LogIn />
                   </div>
               </div>


           </div>
       
   );
    
};


export default HeaderDup;
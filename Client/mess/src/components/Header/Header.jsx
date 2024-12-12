import React from 'react';
import logorgukt from './logo-rgukt.png';
import { IoIosNotifications } from "react-icons/io";
import './Header.css'
// import { useContext } from "react"
import Context from "../../context/Context"
import LogIn from '../LogIn/LogIn';


const Header = (props) => {
   
    // const { success,setLoading, error ,user,setUser,loading}=useContext(Context);
   
    



    return (
             <div className='header-main-container' style={{ zIndex: 1000 }}>
                <div className='header-container'  >
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
export default Header;
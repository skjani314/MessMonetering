import React from 'react';
import logorgukt from './logo-rgukt.png';
import { IoIosNotifications } from "react-icons/io";
import './Header.css'
import { useContext } from "react"
import Context from "../../context/Context"
import LogIn from '../LogIn/LogIn';
import HeaderDup from './HeaderDup';
import { CgProfile } from "react-icons/cg";


const Header = (props) => {

    const { success,setLoading, error ,user,setUser,loading}=useContext(Context);





    return (
    <>
        <HeaderDup />
        <div className='header-main-container' style={{ zIndex: 1000 }}>
            <div className='header-container'  >
                <div>
                    <img src={logorgukt} className="styling-logo" alt="logo" />
                </div>
                <div className="logout-container">

                    <IoIosNotifications className="styling-icon" />
                    <CgProfile className="profile-icon"/>
                    <LogIn />
                </div>
            </div>


        </div>
    </>

    );
};
export default Header;
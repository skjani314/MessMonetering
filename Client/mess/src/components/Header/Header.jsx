import React from 'react';
import logorgukt from './logo-rgukt.png';
import { IoIosNotifications, IoMdSearch } from "react-icons/io";
import './Header.css'
import { useContext ,useState} from "react"
import Context from "../../context/Context"
import LogIn from '../LogIn/LogIn';
import HeaderDup from './HeaderDup';
import { CgProfile } from "react-icons/cg";
import { Spin, Input, Flex ,Typography} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;
const {Text}=Typography;
const Header = (props) => {

    const { success,setLoading, error ,user,setUser,loading}=useContext(Context);
      const [data, setData] = useState([]);
      const [tabledata, setTabledata] = useState([]);
const navigate=useNavigate();
    const [showSearch, setSearch] = useState(false);
    const {search_value,setSearchValue}=props;
    const [search_result,setSearchResult]=useState([])
    const searchBar = props.placeHolder == null && 'remove-search';
    const onClickSearchIcon = () => {
        setSearch((prevState) => (!prevState));
    }
const handleSearch=async (e)=>{

setSearchValue(e.target.value);

try{

if(e.target.value!=""){
const data=await axios.get(import.meta.env.VITE_API_URL + '/student'+'?user_id='+e.target.value,{withCredentials:true})
setSearchResult([...data.data])
}else{
    setSearchResult([])
}
}
catch(err)
{
    console.log(err);
}


}
const handleSearchSubmit=()=>{
error("Please select Proper Id")

}

const handleSearchResultClick=async (id)=>{
setSearchResult([])
setSearchValue("")
setSearch(false)
navigate('/admin/users?id='+id)

}


    return (
    <>
        <HeaderDup />
        <div className='header-main-container' style={{ zIndex: 1000 }}>
            <div className='header-container'  >
                <div>
                    <img src={logorgukt} className="styling-logo" alt="logo" /> <b style={{fontSize:18}} className='my-3'>RGUKT</b>
                
                </div>
                <div className="logout-container">
                <div className={`search-container ${searchBar}`}  >
                            <Search
                                placeholder={props.placeHolder}
                                allowClear
                                enterButton
                                size={"large"}
                                onChange={handleSearch}
                                value={search_value}
                                onSearch={handleSearchSubmit}
                            />

                            <div className='mt-2' style={{ position: 'fixed', top: '55px', background: 'whitesmoke' }}>
                                {
                                    search_result.map((each)=>(
                                      <Flex key={each._id} vertical className='m-1 p-2 search-suggestion' style={{background:"white",width:"100%"}} onClick={()=>handleSearchResultClick(each._id)}>
                                        <Text>{each.user_id}</Text>
                                        <Text style={{fontSize:11}}>{each.name}</Text>
                                        </Flex>
                                    ))
                                }

                            </div>
                        </div>
                        <IoMdSearch className={`styling-search-icon ${searchBar}`} onClick={onClickSearchIcon} />
                    <IoIosNotifications className="styling-icon" />
                    <LogIn />
                </div>
            </div>
            <div className={`search-container-bottom  ${showSearch ? 'show-search' : 'remove-search'}`} >
                    <Flex vertical justify='start'>
                        <Search
                            placeholder={props.placeHolder}
                            allowClear
                            enterButton="Search"
                            size="large"
                            onChange={handleSearch}
                            onSearch={handleSearchSubmit}
                            style={{zIndex:1000}}
                        />
                        <div className='mt-2' style={{ position: 'fixed', top: '125px', background: 'whitesmoke',width:'100%' }}>
                        {
                                    search_result.map((each)=>(
                                        <Flex vertical className='m-1 p-2 search-suggestion' style={{background:"white",width:"100%"}} onClick={()=>handleSearchResultClick(each._id)}>
                                        <Text>{each.user_id}</Text>
                                        <Text style={{fontSize:11}}>{each.name}</Text>
                                        </Flex>
                                    ))
                                }

                        </div>

                    </Flex>
                </div>


        </div>
    </>

    );
};
export default Header;
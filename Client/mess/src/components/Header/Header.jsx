import React from 'react';
import logorgukt from './logo-rgukt.png';
import { IoIosNotifications } from "react-icons/io";
import './Header.css'
import { useContext ,useState} from "react"
import Context from "../../context/Context"
import LogIn from '../LogIn/LogIn';
import HeaderDup from './HeaderDup';
import { CgProfile } from "react-icons/cg";
import { Spin, Input, Flex ,Typography} from 'antd';


const { Search } = Input;
const {Text}=Typography;
const Header = (props) => {

    const { success,setLoading, error ,user,setUser,loading}=useContext(Context);

    const [showSearch, setSearch] = useState(false);
    const {search_value,setSearchValue,page}=props;
const [search_result,setSerachResult]=useState([])
    let placeHolder = '';
    const searchBar = placeHolder === '' && 'remove-search';
    const onClickSearchIcon = () => {
        setSearch((prevState) => (!prevState));
    }
const handleSearch=()=>{}
const handleSearchSubmit=()=>{}

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
                                placeholder={placeHolder}
                                allowClear
                                enterButton
                                size={"large"}
                                onChange={handleSearch}
                                value={search_value}
                                onSearch={handleSearchSubmit}
                            />

                            <div className='mt-2' style={{ position: 'fixed', top: '55px', background: 'whitesmoke', }}>
                                {
                                    search_result.map((each,index)=>(
                                        !page?
                                        <SearchSuggest key={each.id} data={each} setSerachResult={setSerachResult}  setSearchValue={ setSearchValue}/>
                                        :<Flex key={index} vertical className='m-1 p-2 search-suggestion' style={{background:"white",width:"100%"}} onClick={()=>handleSearchResultClick(each.stu_id)}>
                                        <Text>{each.stu_id}</Text>
                                        <Text style={{fontSize:11}}>{each.name}</Text>
                                        </Flex>
                                    ))
                                }

                            </div>
                        </div>

                    <IoIosNotifications className="styling-icon" />
                    <LogIn />
                </div>
            </div>


        </div>
    </>

    );
};
export default Header;
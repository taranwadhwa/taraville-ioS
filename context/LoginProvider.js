import React,{createContext,useContext,useEffect,useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios  from 'axios';

const LoginContext = createContext();

const LoginProvider = ({children})=>{
    const[isLoggedIn,setIsLoggedIn] = useState(false);
    const[profile,setProfile] = useState({});
    const[loginPending,setLoginPending] = useState(false);

    const fetchUser = async() =>{
        setLoginPending(true)
       const token = await AsyncStorage.getItem('token');
        if(token!=null){            
            setIsLoggedIn(true) 
        }else{
            setIsLoggedIn(false) 
        }
        setLoginPending(false)
    }

    useEffect(()=>{
        fetchUser()
    },[])

    return(
        <LoginContext.Provider 
        value={{isLoggedIn,setIsLoggedIn,profile,setProfile,loginPending,setLoginPending}}
        />
    )




}
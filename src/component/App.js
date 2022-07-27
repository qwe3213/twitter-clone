import React ,{useEffect, useState}from "react";
import AppRouter from "component/Router";


import {authService} from "fbase";




//authService.currentUser
function App() {
  const [init,setInit]=useState(false);
  const [userObj,setUserObj]=useState(null)
  
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setUserObj(user)
      }
      setInit(true)
    });
  },[])
 
  return ( 
    <>
  {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Imitializing"}
  
  </>
   
  );
}

export default App;

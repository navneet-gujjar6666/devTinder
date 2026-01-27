import React from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constatnts'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addUser } from '../utils/userSlice'

const Body = () => {

  const dispatch= useDispatch();
  const navigate= useNavigate();
  const userData= useSelector((store)=> store.user);

  const fetchUser= async()=>{

    if(userData) return;

    try{
    const res= await axios.get(BASE_URL + "/profile/view", {
      withCredentials: true
    });
    console.log("fromBody: ", res.data);
    dispatch(addUser(res.data));
  } catch(err){
       if(err.status === 401){ //Means you have loggedOut or token timePeriod over, loggIn again now
          return navigate("/login");
       }
      console.error(err);
  }
  }

  useEffect(()=>{
      fetchUser();
  }, []); //Runs only on first render

 

  return (
    <>
     <div className="heightProblemFooterMergingWithContent min-h-[80vh] flex flex-col">
       <NavBar />
       <Outlet className="flex grow"/> {/* This Outlet used for two reasons:
        1.]Without this we cant render children routes of base route-(/Body)
        2.]Help to continue its content after <NavBar />, means: firstly for every children route the <NavBar /> content will
           always shown after it children respective route content will be there. */}
     </div>
       <Footer />    
    </>
  )
}

export default Body

/* FLOW OF CODE:
1. Body() function runs
2. JSX returned
3. UI rendered on screen
4. useEffect callback runs
5. fetchUser() runs
6. Redux state updates
7. Body() runs AGAIN (re-render)
*/
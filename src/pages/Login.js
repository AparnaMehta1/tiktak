import React,{ useState } from 'react';
import axios from "axios";
import { userSignUp, userSignin } from '../Api/Auth';
import {Dropdown, DropdownButton} from "react-bootstrap";
function Login() {
    const [showSignUp, setShowSignUp] = useState(false);
    const [userType, setUserType] = useState("CUSTOMER");
    const [userSignupData,setUserSignupData] = useState({});
    const [message, setMessage] = useState("");


    const toggleSignUp = () => {
        setShowSignUp(!showSignUp)
    }

    const handleSelect = (e) => {
        setUserType (e)
    }
   
    const updateSignupData=(e)=>{
      userSignupData[e.target.id]=e.target.value
      console.log(userSignupData);

    }
    const signupFn = (e) =>{
     const username = userSignupData.username;
     const userId = userSignupData.userId;
     const email = userSignupData.email;
     const password = userSignupData.password;
    const Data = {
      name : username,
      userId : userId,
      email : email,
      userType: userType,
      password: password,
    }
    
    console.log("DATA", Data);
    e.preventDefault();

    userSignUp(Data).then(function(response){
      if(response.status===201){
        window.location.href = "/"
      }
    })
    .catch(function(error){
      if(error.response.status===400){
        setMessage(error.response.data.message);
      }else{
        console.log(error);
      }
    })}

    const loginFn=(e)=>{
      const userId = document.getElementById("userId").value;
      const password = document.getElementById("password").value;

      const data = {
        userId : userId,
        password: password,
      }
      userSignin(data).then(function(response){
        console.log(response);
        if(response.status===200){
          localStorage.setItem("name", response.data.name);
        }
        if (response.data.userType==="CUSTOMER"){
          window.location.href = "/customer"
        }
      }).catch(function(error){
        if(error.response.status===400){
          setMessage(error.response.data.message);
        }else{
          console.log(error);
        }
      })
    }
  return (
     <div className="bg-primary d-flex justify-content-center align-item-center vh-100"> 
        <div className='card m-5 p-4'>
            <div className='row' >
              <div className='col   '>
                
                {
                    !showSignUp ?
                    (
                        <div className='login'>
                        <form onSubmit={loginFn}>
                               <div className='input-group m-1'>
                                 <input placeholder='User ID' id='userId' 
                                  type="text" className='form-control'/> 
                                </div>
                                <div className='input-group m-1'>
                                 <input placeholder='Password' id='password' 
                                  type="password" className='form-control'/> 
                                </div>
                                
                                <div className='input-group m-1'>
                                 <input value="log in" 
                                  type="submit" className='form-control btn btn-primary'/> 
                                </div>
                                <div className='text-info text-center pe-auto' 
                                onClick={toggleSignUp}>Don't have an account? SignUp</div>
                           

                        </form>
                        </div>

                    ):
                    ( <div className='signup'>
                         <form onSubmit={signupFn}>
                               <div className='input-group m-1'>
                                 <input placeholder='User ID' id='userId' onChange={updateSignupData}
                                  type="text" className='form-control'/> 
                                </div>
                                <div className='input-group m-1'>
                                 <input placeholder='Username'
                                  type="text" className='form-control' id='username' onChange={updateSignupData}/> 
                                </div>
                                
                                 <input placeholder='Email' id='email' onChange={updateSignupData}
                                  type="email" className='form-control m-1'/> 
                                
                                <div className='input-group m-1'>
                                 <input placeholder='Password' id='password' onChange={updateSignupData}
                                  type="password" className='form-control'/> 
                                </div>
                                <div className='input-group m-1'>
                                     <span classname="text-muted">User Type</span>
                                     <DropdownButton
                                     align="end" title={userType} 
                                     varient="light" className="mx-1" onSelect={handleSelect}>
                                         <Dropdown.Item eventkey="CUSTOMER">CUSTOMER</Dropdown.Item>
                                         <Dropdown.Item eventkey="ENGINEER">ENGINEER</Dropdown.Item>
                                         
                                         </DropdownButton>
                                 </div>
                                <div className='input-group m-1'>
                                 <input value="SignUp"
                                  type="submit" className='form-control btn btn-primary'/> 
                                </div>
                                <div className='text-info text-center' 
                                onClick={toggleSignUp}>Already have an account? Login</div>
                           

                        </form>
                    </div>)
                }
                     
               </div> 

           </div>

       </div>

    </div>
    
    )
}

export default Login;
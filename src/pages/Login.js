import React,{ useState } from 'react';
import { userSignUp, userSignin } from '../Api/Auth';
import {Dropdown, DropdownButton} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
function Login() {
    const [showSignUp, setShowSignUp] = useState(false);
    const [userType, setUserType] = useState("CUSTOMER");
    const [userSignupData,setUserSignupData] = useState({});
    const [message, setMessage] = useState("");


    const toggleSignUp = () => {
        setShowSignUp(!showSignUp);
    }

    const handleSelect = (e) => {
        setUserType(e);

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
      userTypes: userType,
      password: password,
    }
    
    console.log("DATA", Data);
    e.preventDefault();

    userSignUp(Data).then(function(response){
      if(response.status===201 && 204){
        history(0);
      }
    })
    .catch(function(error){
      if(error.response.status===400){
        setMessage(error.response.data.message);
      }else{
        console.log(error);
      }
    })
  } 
      const history = useNavigate();
      
    const loginFn=(e)=>{
      const userId = userSignupData.userId;
      const password = userSignupData.password;

      const data = {
        userId : userId,
        password: password,
      };
      console.log("DATA", data);

      e.preventDefault();

      userSignin(data)
      .then(function(response){
        console.log(response);
        if (response.status===200){
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("password", response.data.password);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("userTypes", response.data.userTypes);
          localStorage.setItem("userStatus", response.data.userStatus);
          localStorage.setItem("token", response.data.accessToken);

        if (response.data.userTypes==="CUSTOMER"){
          history( "/customer");
        } else if (response.data.userTypes==="ENGINEER"){
          history( "/engineer");
        } else {
          history("/admin");
        }
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
                               <h4 className="text-center p-3"> Login</h4>
                               <div className='input-group m-2'>
                                 <input placeholder='User ID' id='userId' 
                                  type="text" className='form-control' onChange={updateSignupData}/> 
                                </div>
                                <div className='input-group m-2'>
                                 <input placeholder='Password' id='password' 
                                  type="password" className='form-control' onChange={updateSignupData}/> 
                                </div>
                                
                                <div className='input-group m-2'>
                                 <input value="login" 
                                  type="submit" className='form-control btn btn-primary justify-content-center text-align-center'/> 
                                </div>
                                <div className='text-info text-center' 
                                onClick={()=> toggleSignUp()}>Don't have an account? SignUp</div>
                             </form>
                        </div>

                    ):
                    ( <div className='signup'>
                         <form onSubmit={signupFn}>
                              <h4 className="text-center p-3"> Signup</h4> 
                               <div className='input-group m-2'>
                                 <input placeholder='User ID' id='userId' onChange={updateSignupData}
                                  type="text" className='form-control'/> 
                                </div>
                                <div className='input-group m-2'>
                                 <input placeholder='Username'
                                  type="text" className='form-control' id='username' onChange={updateSignupData}/> 
                                </div>
                                
                                 <input placeholder='Email' id='email' onChange={updateSignupData}
                                  type="email" className='form-control m-2'/> 
                                
                                <div className='input-group m-2'>
                                 <input placeholder='Password' id='password' onChange={updateSignupData}
                                  type="password" className='form-control'/> 
                                </div>
                                <div className='input-group m-2'>
                                     <span classname="text-muted">User Type</span>
                                     <DropdownButton
                                     align="end" title={userType} 
                                     varient="light" className="mx-2" onSelect={handleSelect}>

                                         <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                                         <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                                         
                                         </DropdownButton>
                                 </div>
                                <div className='input-group m-2'>
                                 <input value="Signup"
                                  type="submit" className='form-control btn btn-primary d-flex justify-content-center align-items-center'/> 
                                </div>
                                <div className='text-info text-center' 
                                onClick={toggleSignUp}>Already have an account? Login</div>
                               <div className='text-danger text-center'>{message} </div>

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
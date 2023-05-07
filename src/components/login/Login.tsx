import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import ISuccesfullLoginData from '../../models/ISuccesfullLoginData';
import { ActionType } from '../../redux/action-type';
import { useNavigate } from 'react-router-dom';

function Login() {
    let [userName , setUserName] = useState("");
    let [password , setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function onLogin() {
      try {
        const response = await axios.post("http://localhost:8080/users/login", {userName , password});
        // console.log(response);
        let token: string = response.data;
        let decodedToken: any = jwt_decode(token);
        let strSuccessfulLoginResponse: string = decodedToken.sub;
        let successfulLoginResponse: ISuccesfullLoginData = JSON.parse(strSuccessfulLoginResponse);
        dispatch({type: ActionType.setUserDetails , payload: {successfulLoginResponse}});
        console.log(successfulLoginResponse);
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        if (successfulLoginResponse){
            navigate('/home');
        }
      } catch (e: any) {
        console.error(e)
        if(e.response?.data?.errorMessage){
          let message = e.response.data.errorMessage;
          alert(message);
        }else{
        let message = "Login failed, please try later";
        alert(message);
        }
      }
    }
  return (
    <div className='login'>
        <input className='username' type="text" placeholder=' Username' onChange={(event) => setUserName(event.target.value)}/>
        <input className='password' type="password" placeholder=' Password' onChange={(event) => setPassword(event.target.value)}/>
    </div>
    
  )
}

export default Login
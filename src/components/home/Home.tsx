import React, { useEffect, useState } from 'react'
import "./Home.css";
import axios from 'axios';
import { ActionType } from '../../redux/action-type';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/app-state';
import Person from '../Person/Person';
import IPerson from '../../models/IPerson';
import { IoPerson } from 'react-icons/io5';

function Home() {
  const usersList = useSelector((state: AppState) => state.usersList);
  const mainUser = useSelector((state: AppState) => state.userDetails);
  let currentUser = useSelector((state: AppState) => state.userToShow);
  let [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  
  useEffect(()=> {
    getCouponsByPage(pageNumber);
  }, [pageNumber]);

  

  async function getCouponsByPage(pageNumber: number){
    try{
        let url = `http://localhost:8080/users?page=${pageNumber}&userId=${mainUser.id}`;
        let response = await axios.get(url);
        let users = response.data;
        let userToShow = users[Math.floor((Math.random()* users.length))]
        dispatch({type: ActionType.SaveUsersList, payload: {users}});
        dispatch({type: ActionType.SaveUserToShow, payload: {userToShow}});
    }
    catch(e){
        console.error(e);
        alert("Failed to retrieve coupons");
    }
}
  return (
    <div className="main-page">
        <div className="main-page-component">
          <div className="wrapper">
            <div className="card-box">
                <Person id={currentUser.id} age={currentUser.age} gender={currentUser.gender} nickName={currentUser.nickName}></Person>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Home
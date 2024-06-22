import './App.css';
import React, { useEffect, createContext, useReducer, useContext, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import Signin from './components/screens/Signin';
import CreatePost from './components/screens/CreatePost';
import UserProfile from './components/screens/UserProfile';

import {BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import { reducer, initialState } from './reducers/userReducer';
import SubscribedUserPost from './components/screens/SubscribedUserPost';
import Reset from './components/screens/Reset';
import NewPassword from './components/screens/NewPassword';
import Loading from './components/Loading';
import axios from 'axios';

export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  useEffect(()=> {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      dispatch({type: 'USER', payload: user});
    }else{
      if(!(window.location.pathname.startsWith('/reset'))) {
        navigate('/signin');
      }
    }
  }, [navigate]);
  return (
    <Routes >
      <Route path="/signin" element={<Signin /> } />
      <Route exact path="/" element={<Home /> } />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/signup" element={<Signup /> } />
      <Route path="/create" element={<CreatePost /> } /> 
      <Route path="/profile/:userId" element={<UserProfile /> } /> 
      <Route path="/my-followings-post" element={<SubscribedUserPost /> } /> 
      <Route exact path="/reset-password" element={<Reset /> } /> 
      <Route path="/reset/:token" element={<NewPassword /> } /> 
    </Routes >
  );
}

function App() {
  const [ loading, setLoading ]  = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.interceptors.request.use((config) => {
      setLoading(true);
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
      setLoading(false);
      return response;
    }, (error) => {
      return Promise.reject(error);
    });
  }, []);
  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
        <Router>
          <Navbar />
          <Loading show={loading}/>
          <Routing />
        </Router>
      </UserContext.Provider>
    </>

  );
}

export default App;

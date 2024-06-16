import './App.css';
import React, { useEffect, createContext, useReducer, useContext } from 'react';
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import Signin from './components/screens/Signin';
import CreatePost from './components/screens/CreatePost';

import {BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import { reducer, initialState } from './reducers/userReducer';


export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  useEffect(()=> {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      dispatch({type: 'USER', payload: user});
      // navigate('/');
    }else{
      navigate('/signin');
    }
  }, []);
  return (
    <Routes >
      <Route exact path="/" element={<Home /> } />
      <Route path="/signin" element={<Signin /> } />
      <Route path="/signup" element={<Signup /> } />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create" element={<CreatePost /> } /> 
    </Routes >
  );
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>

  );
}

export default App;

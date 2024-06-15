import './App.css';
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import Signin from './components/screens/Signin';
import CreatePost from './components/screens/CreatePost';

import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes >
        <Route exact path="/" element={<Home /> } />
        <Route path="/signin" element={<Signin /> } />
        <Route path="/signup" element={<Signup /> } />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreatePost /> } /> 
      </Routes >
    </Router>

  );
}

export default App;

import './App.css';
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import Signin from './components/screens/Signin';
import {BrowserRouter, Route} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/" > <Home /> </Route>
      <Route path="/signin"> <Signin /> </Route>
      <Route path="/signup"> <Signup /> </Route>
      <Route path="/profile"> <Profile /> </Route>
    </BrowserRouter>

  );
}

export default App;

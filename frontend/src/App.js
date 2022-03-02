import './App.css';
import Header from './component/layout/Header/Header.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
import IssueDetails from './component/Issue/IssueDetails';
import Issues from './component/Issue/Issues.js';
import Profile from './component/User/Profile.js';
import LoginSignUp from './component/User/LoginSignup';
import UpdateProfile  from './component/User/UpdateProfile.js'
import UpdatePassword from './component/User/UpdatePassword.js'
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions.js'
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} key={user._id} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/issue/:id" element={<IssueDetails />} />
        <Route exact path="/issues" element={<Issues />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/details/update" element={<UpdateProfile />} />
        <Route exact path="/password/update" element={<UpdatePassword/>} />
        <Route exact path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;
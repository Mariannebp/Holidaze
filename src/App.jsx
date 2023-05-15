import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/layout';
import Home from './pages/home';
import About from './pages/about';
import Profile from './pages/profile';
import NewVenue from './pages/new-venue';
import Register from './pages/register';
import Login from './pages/login';
import Venue from './pages/venue-specific';
import Avatar from './pages/avatar';
import EditVenue from './pages/edit-venue.jsx';
import NotLoggedIn from './pages/error';

function App() {
  const user = localStorage.getItem("profile");

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="/pages/register" element={<Register />} />
        <Route path="/pages/login" element={<Login />} />
        <Route path="/pages/about" element={<About />} />

        <Route path="/pages/error" element={user ? <Navigate replace to={"/pages/profile"} /> : <NotLoggedIn />} />

        <Route path="/pages/profile" element={user ? <Profile /> : <Navigate replace to={"/pages/error"} />} />
        <Route path="/pages/new-venue" element={user ? <NewVenue /> : <Navigate replace to={"/pages/error"} />} />
        <Route path="/pages/venue-specific/:id" element={user ? <Venue /> : <Navigate replace to={"/pages/error"} />} />
        <Route path="/pages/edit-avatar" element={user ? <Avatar /> : <Navigate replace to={"/pages/error"} />} />
        <Route path="/pages/edit-venue" element={user ? <EditVenue /> : <Navigate replace to={"/pages/error"} />} />
      </Route>
    </Routes >
  );
}

export default App;
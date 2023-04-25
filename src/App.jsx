import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import Home from './pages/home';
import About from './pages/about';
import Profile from './pages/profile';
import NewVenue from './pages/new-venue';
import Register from './pages/register';
import Login from './pages/login';
import Venue from './pages/venue-specific';
import Avatar from './pages/avatar';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="/pages/about" element={<About />} />
        <Route path="/pages/profile" element={<Profile />} />
        <Route path="/pages/new-venue" element={<NewVenue />} />
        <Route path="/pages/register" element={<Register />} />
        <Route path="/pages/login" element={<Login />} />
        <Route path="/pages/venue-specific" element={<Venue />} />
        <Route path="/pages/edit-avatar" element={<Avatar />} />
      </Route>
    </Routes >

  );
}

export default App;

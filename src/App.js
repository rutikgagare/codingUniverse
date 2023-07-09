import React from 'react';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Write from './components/Write';
import DetailedBlog from './components/DetailedBlog';
import Profile from './components/Profile';
import SignInWrite from './components/SignInWrite';
import SignUpWrite from './components/SignUpWrite';
import EditBlog from './components/EditBlog';
import JobPortal from './components/jobPortal/JobPortal';
import AddJob from './components/jobPortal/AddJob';
import Admin from './components/jobPortal/Admin';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import './App.css';

const router = createBrowserRouter([
  { path: '/', element: <Home></Home>},
  { path: '/signin', element: <SignIn></SignIn> },
  { path: '/signinwrite', element: <SignInWrite></SignInWrite> },
  { path: '/signup', element: <SignUp></SignUp> },
  { path: '/signupwrite', element: <SignUpWrite></SignUpWrite>},
  { path: '/write', element: <Write></Write> },
  { path: '/profile', element: <Profile></Profile> },
  { path: '/jobs', element: <JobPortal></JobPortal> },
  { path: '/:blogitemId', element: <DetailedBlog/> },
  { path: 'profile/:editblogitemId', element: <EditBlog/> },
  { path: '/admin/addJob', element: <AddJob/> },
  { path: '/admin', element: <Admin/> },
]);

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App;
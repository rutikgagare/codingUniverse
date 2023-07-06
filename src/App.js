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
import Jobs from './components/Jobs';
import AddJob from './components/AddJob';
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
  { path: '/jobs', element: <Jobs></Jobs> },
  { path: '/:blogitemId', element: <DetailedBlog/> },
  { path: 'profile/:editblogitemId', element: <EditBlog/> },
  { path: '/addJob', element: <AddJob/> },
]);

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App;
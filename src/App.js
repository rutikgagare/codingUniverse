import React from 'react';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Write from './components/Write';
import DetailedBlog from './components/DetailedBlog';
import './App.css';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';


const router = createBrowserRouter([
  { path: '/', element: <Home></Home>},
  { path: '/signin', element: <SignIn></SignIn> },
  { path: '/signup', element: <SignUp></SignUp> },
  { path: '/write', element: <Write></Write> },
  { path: '/:blogitemId', element: <DetailedBlog/> }
]);

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App;
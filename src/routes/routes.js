import React from 'react';
import Dashboard from '../components/dashboard';
import Login from '../components/login';
import NotFound from '../components/notfound';
import Logout from '../components/logout';
import Post from '../components/post';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Dashboard />,
  },
  {
    path: '/post/:id',
    exact: false,
    component: () => <Post />,
  },
  {
    path: '/login',
    exact: false,
    component: () => <Login />,
  },
  {
    path: '/logout',
    exact: false,
    component: () => <Logout />,
  },
  {
    path: '',
    exact: false,
    component: () => <NotFound />,
  }
];

export default routes;

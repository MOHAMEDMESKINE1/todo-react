import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import TodoForm from './components/Todo/TodoForm';
import TodoList from './components/Todo/TodoList';
import 'react-toastify/dist/ReactToastify.css';

// router
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import TodoUpdate from './components/Todo/TodoUpdate';
import TodoCreate from './components/Todo/TodoCreate';
// router

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
    <Routes>
      
        <Route path="/" element={<Layout/>}>
            <Route index element={<TodoList/>}/>
            <Route path={'/todo/create'} element={<TodoCreate/>}/>
            <Route path={'/todo/update/:id'} element={<TodoUpdate/>}/>
           
        </Route>
     
    </Routes>
   </BrowserRouter>
  </React.StrictMode>
);


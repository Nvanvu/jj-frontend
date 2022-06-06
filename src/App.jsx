import './App.css';
import React, { Suspense, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import request from './Api/request';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from './Redux/authSlice';

import Planet from './component/Planet/Planet';
import NotFound from './component/NotFound/NotFound';
import MenuBar from './component/MenuBar/MenuBar';
import Home from './component/Home/Home';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import About from './component/About/About';
import Company from './component/Company/Company';
import Job from './component/Job/Job';
import JobSuccess from './component/Job/job.success';
import User from './component/User/User';

import UserRoute from './component/Route/UserRoute';
import CompanyRoute from './component/Route/CompanyRoute';
import GuestRoute from './component/Route/GuestRoute';
import AdminRoute from './component/Route/Admin';
import Admin from './component/Route/Admin';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const status = useSelector(state => state.auth.user);
  const verifyUserInfo = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      dispatch(setUserInfo({ status: 'success', data: null }));
      return;
    }
    try {
      const res = await request.get('/v4/auth/verify');
      if (res.success) {
        dispatch(setUserInfo({ status: 'success', data: res.data }));
      } else {
        dispatch(setUserInfo({ status: 'success', data: null }));
      }
    } catch (error) {
      dispatch(setUserInfo({ status: 'success', data: null }))
    }
  }
    , [dispatch]);


  useEffect(() => {
    verifyUserInfo();
  }, [verifyUserInfo]);

  if (status === 'idle' || status === 'loading') return (<div className='Planet'> <Planet />  </div>);
  if (status === 'error') return (<NotFound />);

  return (
    <Suspense fallback={<div className='Planet'> <Planet />  </div>}>
      <div className="App">
        <Router>
          <MenuBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route element={<GuestRoute />}>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Route>
            <Route element={<CompanyRoute user={user} />}>
              <Route path='/company' element={<Company />} />
              <Route path='/job' element={<Job />} />
              <Route path='/job-success' element={<JobSuccess />} />
            </Route>
            <Route element={<UserRoute user={user} />}>
              <Route path='/user' element={<User />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path='/addmin' element={<Admin />} />
            </Route>
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </Suspense>

  );
}

export default App;

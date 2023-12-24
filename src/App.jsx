import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavBar from './components/NavBar';
import PostOverview from './pages/PostOverview';
import MyProfile from './pages/MyProfile';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {

  function DynamicRouting() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('user'));

      if (userData) {
        dispatch({ type: "LOGIN", payload: userData });
        navigate("/allposts");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      }
    }, []);

    return (<>
      <Routes>
        <Route path='/' element={<PostOverview />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/allposts' element={<PostOverview />} />
        <Route path='/myprofile' element={<MyProfile />} />
      </Routes>
    </>)
  }

  return (
    <div className='bg-light-subtle'>
      <BrowserRouter>
        <NavBar />
        <DynamicRouting />
      </BrowserRouter>
    </div>
  );
}

export default App;

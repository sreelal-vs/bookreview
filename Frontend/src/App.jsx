import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Signin from './pages/Signin';
import Footer from './components/Footer';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUserThunk } from './Redux/authSlice';
import Bookresults from './pages/Bookresults';
import Discovery from './pages/Discovery';
import Aboutus from './pages/Aboutus';
import Profile from './pages/Profile';
import Library from './pages/Library';
import FavouriteBooks from './pages/FavouriteBooks';




function App() {
  const dispatch = useDispatch()
  const userFetched = useRef(false)
  useEffect(()=>{
    if(userFetched.current)return;
    userFetched.current = true;
    dispatch(getCurrentUserThunk())
  },[dispatch])
  return (
    <div className='app-container'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/results' element={<Bookresults/>}/>
          <Route path='/discovery' element={<Discovery/>}/>
          <Route path='/aboutus' element={<Aboutus/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/library' element={<Library/>}/>
          <Route path='/favourites' element={<FavouriteBooks/>}/>



        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App

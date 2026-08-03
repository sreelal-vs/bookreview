import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Signin from './pages/Signin';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUserThunk } from './Redux/authSlice';


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
   
    
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
          
        </Routes>
        <Footer />

      </BrowserRouter>
    </div>
  )
}

export default App

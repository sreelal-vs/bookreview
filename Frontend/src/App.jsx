import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';


function App() {
  

  return (
    <div className='w-100'>
      <BrowserRouter>
      <Header/>
     <Routes>
       <Route path='/home' element={<Home/>}/>

     </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App

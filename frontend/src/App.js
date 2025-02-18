import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/login';
import Brand from './components/brand';
import ProductPage from './components/Productpage';
import User from './components/users/user';
import Cart from './components/users/Cart';
import { CartProvider } from './components/users/CartContext';
import Checkout from './components/users/Checkout';


function App() {
  return (
    <div className="App">
      <CartProvider>
      <BrowserRouter>
     
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='login' element={<Login/>} />
        <Route path='brand' element={<Brand/>} />
        <Route path='user' element={<User/>} />
        <Route path='product' element={<ProductPage/>} /> 
  
        <Route path="/cart" element={<Cart />} />
        <Route path='/checkout' element={<Checkout/>}/>
       
      </Routes>
     
      </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
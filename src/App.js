import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import AddProduct from "./pages/AddProduct";
import Dashboard from './pages/Dashboard';
import AllProducts from './pages/AllProducts';
import AuthRequired from "./components/AuthRequired";
import EditProduct from './pages/EditProduct';
import AdminAuthRequired from './components/AdminAuthRequired';
import AllUsers from './pages/AllUsers';
import Profile from './pages/Profile';
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Toaster />
      <div className='container mx-auto px-5 md:px-0'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='dashboard' element={<AuthRequired><Dashboard /></AuthRequired>}>
            <Route index path='profile' element={<AdminAuthRequired><Profile /></AdminAuthRequired>}></Route>
            <Route path='addproduct' element={<AdminAuthRequired><AddProduct /></AdminAuthRequired>}></Route>
            <Route path='allproducts' element={<AdminAuthRequired><AllProducts /></AdminAuthRequired> }></Route>
            <Route path='manageadmins' element={<AdminAuthRequired><AllUsers /></AdminAuthRequired> }></Route>
            <Route path='editproduct/:id' element={<AdminAuthRequired><EditProduct /></AdminAuthRequired>}></Route>
          </Route>
          <Route path='*' element={<NotFound />}></Route> 
        </Routes>
      </div>
    </div>
  );
}

export default App;

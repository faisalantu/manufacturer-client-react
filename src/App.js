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
import AddReview from './pages/AddReview';
import Footer from "./components/Footer";
import Aos from "aos"
import 'aos/dist/aos.css';
import AddOrder from './pages/AddOrder';
import MyOrders from './pages/MyOrders';
import AllOrders from './pages/AllOrders';
import Payment from './pages/Payment';
import Blogs from './pages/Blogs';
import MyPortfolio from './pages/MyPortfolio';

function App() {
  Aos.init();
  return (
    <div>
      <Toaster />
      <Header />
      <div className='container mx-auto px-5 md:px-0'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='blogs' element={<Blogs />}></Route>
          <Route path='portfolio' element={<MyPortfolio />}></Route>
          <Route path='dashboard' element={<AuthRequired><Dashboard /></AuthRequired>}>
            <Route index element={<AuthRequired><Profile /></AuthRequired>}></Route>
            <Route index path='orders' element={<AuthRequired><MyOrders /></AuthRequired>}></Route>
            <Route index path='payment/:id' element={<AuthRequired><Payment /></AuthRequired>}></Route>
            <Route index path='addorder/:id' element={<AuthRequired><AddOrder /></AuthRequired>}></Route>
            <Route path='addreview' element={<AuthRequired><AddReview /></AuthRequired>}></Route>
            <Route index path='allorders' element={<AdminAuthRequired><AllOrders /></AdminAuthRequired>}></Route>
            <Route path='addproduct' element={<AdminAuthRequired><AddProduct /></AdminAuthRequired>}></Route>
            <Route path='allproducts' element={<AdminAuthRequired><AllProducts /></AdminAuthRequired> }></Route>
            <Route path='manageadmins' element={<AdminAuthRequired><AllUsers /></AdminAuthRequired> }></Route>
            <Route path='editproduct/:id' element={<AdminAuthRequired><EditProduct /></AdminAuthRequired>}></Route>
          </Route>
          <Route path='*' element={<NotFound />}></Route> 
        </Routes>
        
      </div>
      <Footer/>
    </div>
  );
}

export default App;

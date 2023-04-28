import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Header2 } from "../components/Header2";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import AddProduct from "../pages/AddProducts"
import LandingPage from "../pages/LandingPage";
import PaymentSuccess from "../pages/PaymentSuccess";
import { useSelector } from "react-redux";
import { cartProducts } from "../stores/cart/cartSlice";
import { Footer } from "../components/Footer";

const Navigation = () => {
    // const productsInCart = useSelector(cartProducts);

    return (
        <BrowserRouter>
            {/* <Header2 cartCount={productsInCart ? productsInCart.length : 0}/> */}
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/addProducts" element={<AddProduct />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default Navigation;
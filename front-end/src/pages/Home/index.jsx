import { Header3 } from "../../components/Header3";
import { Banner } from "../../components/Banner";
import { About } from "../../components/About";
import { ProductsPreview } from "../../components/ProductsPreview";
import { cartProducts } from "../../stores/cart/cartSlice";
import { useSelector } from "react-redux";

const Home = () => {
    const productsInCart = useSelector(cartProducts);
    return (
        <>
            <Header3 cartCount={productsInCart ? productsInCart.length : 0}/>
            <Banner />
            <ProductsPreview />
            <About />
        </>
    )
}

export default Home;
import { BannerLandingPage } from "../../components/BannerLandingPage";
import { About } from "../../components/About";
import { ProductsPreview } from "../../components/ProductsPreview";

const LandingPage = () => {
    return (
        <>
            <BannerLandingPage />
            <ProductsPreview />
            <About />
        </>
    )
}

export default LandingPage;